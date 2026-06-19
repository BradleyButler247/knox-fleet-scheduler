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
      // same number of BUSINESS days so their relative positions are preserved.
      let deltaBusinessDays = 0;
      if (newDate && newDate !== oldDate) {
        deltaBusinessDays = businessDaysBetween(
          new Date(`${oldDate}T00:00:00`),
          new Date(`${newDate}T00:00:00`),
        );
      }

      const finalUpdates = { ...updates, date: newDate };

      return prev.map((j) => {
        if (j.id === id) return { ...j, ...finalUpdates };
        if (deltaBusinessDays !== 0 && j.truckId === truckId) {
          const shifted = addBusinessDays(
            new Date(`${j.date}T00:00:00`),
            deltaBusinessDays,
          );
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

  const addBusinessDays = (date: Date, n: number) => {
    const out = new Date(date);
    const dir = n >= 0 ? 1 : -1;
    let remaining = Math.abs(n);
    while (remaining > 0) {
      out.setDate(out.getDate() + dir);
      const day = out.getDay();
      if (day !== 0 && day !== 6) remaining--;
    }
    return out;
  };

  const businessDaysBetween = (a: Date, b: Date) => {
    if (a.getTime() === b.getTime()) return 0;
    const dir = b.getTime() > a.getTime() ? 1 : -1;
    const cur = new Date(a);
    let count = 0;
    const target = toDateKey(b);
    while (toDateKey(cur) !== target) {
      cur.setDate(cur.getDate() + dir);
      const day = cur.getDay();
      if (day !== 0 && day !== 6) count += dir;
    }
    return count;
  };

  const rescheduleFromJob = (id: string, newDate: string) => {
    persist((prev) => {
      const target = prev.find((j) => j.id === id);
      if (!target) return prev;
      const oldD = new Date(`${target.date}T00:00:00`);
      const bumped = bumpWeekendToMonday(new Date(`${newDate}T00:00:00`));
      const delta = businessDaysBetween(oldD, bumped);
      if (delta === 0) return prev;
      const oldTime = oldD.getTime();
      return prev.map((j) => {
        if (j.truckId !== target.truckId) return j;
        const jd = new Date(`${j.date}T00:00:00`);
        if (j.id === id || jd.getTime() > oldTime) {
          const shifted = addBusinessDays(jd, delta);
          return { ...j, date: toDateKey(shifted) };
        }
        return j;
      });
    });
  };

  return { jobs, addJob, removeJob, updateJob, toggleComplete, renameTruck, rescheduleFromJob };
}
