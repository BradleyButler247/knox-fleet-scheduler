import { useEffect, useState } from "react";

export type Shift = "AM" | "PM" | "ALL_DAY";

export type Job = {
  id: string;
  truckId: string;
  work: string;
  bay: string;
  employee: string;
  date: string; // YYYY-MM-DD
  shift: Shift;
  createdAt: number;
  completed?: boolean;
  company?: string;
  color?: string;
};

const KEY = "paint-shop-schedule-v1";

export function toDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function read(): Job[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Job[];
    return parsed.map((j) => ({ ...j, shift: j.shift ?? "ALL_DAY" }));
  } catch {
    return [];
  }
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setJobs(read());
  }, []);

  const persist = (updater: (prev: Job[]) => Job[]) => {
    setJobs((prev) => {
      const next = updater(prev);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const addJob = (j: Omit<Job, "id" | "createdAt">) => {
    persist((prev) => [
      ...prev,
      { ...j, id: crypto.randomUUID(), createdAt: Date.now() },
    ]);
  };

  const removeJob = (id: string) => {
    persist((prev) => prev.filter((j) => j.id !== id));
  };

  const bumpWeekendToMonday = (d: Date) => {
    const day = d.getDay();
    if (day === 6) d.setDate(d.getDate() + 2);
    else if (day === 0) d.setDate(d.getDate() + 1);
    return d;
  };

  const updateJob = (id: string, updates: Omit<Job, "id" | "createdAt">) => {
    persist((prev) => {
      const target = prev.find((j) => j.id === id);
      if (!target) return prev;

      const oldDate = target.date;
      let newDate = updates.date;
      const truckId = target.truckId;

      // If the new date lands on a weekend, bump it to Monday.
      if (newDate && newDate !== oldDate) {
        const bumped = bumpWeekendToMonday(new Date(`${newDate}T00:00:00`));
        newDate = toDateKey(bumped);
      }

      // If the date changed, shift every other job for the same truck by the
      // same number of days so their relative positions are preserved.
      let deltaDays = 0;
      if (newDate && newDate !== oldDate) {
        const a = new Date(`${oldDate}T00:00:00`).getTime();
        const b = new Date(`${newDate}T00:00:00`).getTime();
        deltaDays = Math.round((b - a) / 86400000);
      }

      const finalUpdates = { ...updates, date: newDate };

      return prev.map((j) => {
        if (j.id === id) return { ...j, ...finalUpdates };
        if (deltaDays !== 0 && j.truckId === truckId) {
          const shifted = new Date(`${j.date}T00:00:00`);
          shifted.setDate(shifted.getDate() + deltaDays);
          bumpWeekendToMonday(shifted);
          return { ...j, date: toDateKey(shifted) };
        }
        return j;
      });
    });
  };

  const toggleComplete = (id: string) => {
    persist((prev) =>
      prev.map((j) => (j.id === id ? { ...j, completed: !j.completed } : j)),
    );
  };

  const renameTruck = (oldId: string, newId: string) => {
    persist((prev) =>
      prev.map((j) => (j.truckId === oldId ? { ...j, truckId: newId } : j)),
    );
  };

  return { jobs, addJob, removeJob, updateJob, toggleComplete, renameTruck };
}
