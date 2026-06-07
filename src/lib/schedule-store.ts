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

  const updateJob = (id: string, updates: Omit<Job, "id" | "createdAt">) => {
    persist((prev) => prev.map((j) => (j.id === id ? { ...j, ...updates } : j)));
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
