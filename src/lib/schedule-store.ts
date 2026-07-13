import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { isNonBusinessDay } from "./holidays";

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
  priority?: number;
};

type Row = {
  id: string;
  truck_id: string;
  work: string;
  bay: string;
  employee: string;
  date: string;
  shift: string;
  completed: boolean;
  company: string | null;
  color: string | null;
  priority: number | null;
  created_at_ms: number;
};

export function toDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function rowToJob(r: Row): Job {
  return {
    id: r.id,
    truckId: r.truck_id,
    work: r.work,
    bay: r.bay,
    employee: r.employee ?? "",
    date: r.date,
    shift: (r.shift as Shift) ?? "ALL_DAY",
    completed: r.completed ?? false,
    company: r.company ?? undefined,
    color: r.color ?? undefined,
    priority: r.priority ?? undefined,
    createdAt: Number(r.created_at_ms) || Date.now(),
  };
}

function jobToRow(j: Partial<Job>): Record<string, unknown> {
  const r: Record<string, unknown> = {};
  if (j.truckId !== undefined) r.truck_id = j.truckId;
  if (j.work !== undefined) r.work = j.work;
  if (j.bay !== undefined) r.bay = j.bay;
  if (j.employee !== undefined) r.employee = j.employee;
  if (j.date !== undefined) r.date = j.date;
  if (j.shift !== undefined) r.shift = j.shift;
  if (j.completed !== undefined) r.completed = j.completed;
  if (j.company !== undefined) r.company = j.company ?? null;
  if (j.color !== undefined) r.color = j.color ?? null;
  if (j.priority !== undefined) r.priority = j.priority ?? null;
  return r;
}

async function fetchAll(): Promise<Job[]> {
  const { data, error } = await supabase.from("jobs").select("*");
  if (error) {
    console.error("[jobs] fetch failed", error);
    return [];
  }
  return (data as Row[]).map(rowToJob);
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const refresh = () => {
    fetchAll().then(setJobs);
  };

  useEffect(() => {
    refresh();
    const channel = supabase
      .channel(`jobs-changes-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "jobs" },
        () => refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const optimistic = (updater: (prev: Job[]) => Job[]) =>
    setJobs((prev) => updater(prev));

  const addJob = async (j: Omit<Job, "id" | "createdAt">) => {
    const tempId = crypto.randomUUID();
    const temp: Job = { ...j, id: tempId, createdAt: Date.now() };
    optimistic((prev) => [...prev, temp]);
    const { data, error } = await supabase
      .from("jobs")
      .insert(jobToRow(j) as never)
      .select("*")
      .single();

    if (error) {
      console.error("[jobs] insert failed", error);
      optimistic((prev) => prev.filter((x) => x.id !== tempId));
      return;
    }
    const real = rowToJob(data as Row);
    optimistic((prev) => prev.map((x) => (x.id === tempId ? real : x)));
  };

  const removeJob = async (id: string) => {
    optimistic((prev) => prev.filter((j) => j.id !== id));
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) console.error("[jobs] delete failed", error);
  };

  const bumpWeekendToMonday = (d: Date) => {
    while (isNonBusinessDay(d)) d.setDate(d.getDate() + 1);
    return d;
  };

  const addBusinessDays = (date: Date, n: number) => {
    const out = new Date(date);
    const dir = n >= 0 ? 1 : -1;
    let remaining = Math.abs(n);
    while (remaining > 0) {
      out.setDate(out.getDate() + dir);
      if (!isNonBusinessDay(out)) remaining--;
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
      if (!isNonBusinessDay(cur)) count += dir;
    }
    return count;
  };

  const persistBatch = async (updates: { id: string; row: Record<string, unknown> }[]) => {
    // Send individual updates in parallel — small volumes only.
    const results = await Promise.all(
      updates.map((u) => supabase.from("jobs").update(u.row as never).eq("id", u.id)),
    );
    for (const r of results) {
      if (r.error) console.error("[jobs] update failed", r.error);
    }
  };

  const updateJob = async (
    id: string,
    updates: Omit<Job, "id" | "createdAt">,
  ) => {
    let deltaBusinessDays = 0;
    let target: Job | undefined;
    let finalUpdates = updates;

    // Compute optimistic new state.
    const newJobs = jobs.map((j) => {
      if (j.id === id) target = j;
      return j;
    });
    if (!target) return;

    const oldDate = target.date;
    let newDate = updates.date;
    if (newDate && newDate !== oldDate) {
      const bumped = bumpWeekendToMonday(new Date(`${newDate}T00:00:00`));
      newDate = toDateKey(bumped);
      deltaBusinessDays = businessDaysBetween(
        new Date(`${oldDate}T00:00:00`),
        new Date(`${newDate}T00:00:00`),
      );
    }
    finalUpdates = { ...updates, date: newDate ?? updates.date };
    const truckId = target.truckId;

    const patched: Job[] = newJobs.map((j) => {
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
    setJobs(patched);

    const batch: { id: string; row: Record<string, unknown> }[] = [
      { id, row: jobToRow(finalUpdates) },
    ];
    if (deltaBusinessDays !== 0) {
      for (const j of jobs) {
        if (j.id === id) continue;
        if (j.truckId === truckId) {
          const shifted = addBusinessDays(
            new Date(`${j.date}T00:00:00`),
            deltaBusinessDays,
          );
          batch.push({ id: j.id, row: { date: toDateKey(shifted) } });
        }
      }
    }
    await persistBatch(batch);
  };

  const toggleComplete = async (id: string) => {
    const cur = jobs.find((j) => j.id === id);
    if (!cur) return;
    const next = !cur.completed;
    optimistic((prev) =>
      prev.map((j) => (j.id === id ? { ...j, completed: next } : j)),
    );
    const { error } = await supabase
      .from("jobs")
      .update({ completed: next })
      .eq("id", id);
    if (error) console.error("[jobs] toggle failed", error);
  };

  const renameTruck = async (oldId: string, newId: string) => {
    optimistic((prev) =>
      prev.map((j) => (j.truckId === oldId ? { ...j, truckId: newId } : j)),
    );
    const { error } = await supabase
      .from("jobs")
      .update({ truck_id: newId })
      .eq("truck_id", oldId);
    if (error) console.error("[jobs] rename truck failed", error);
  };

  const rescheduleFromJob = async (id: string, newDate: string) => {
    const target = jobs.find((j) => j.id === id);
    if (!target) return;
    const oldD = new Date(`${target.date}T00:00:00`);
    const bumped = bumpWeekendToMonday(new Date(`${newDate}T00:00:00`));
    const delta = businessDaysBetween(oldD, bumped);
    if (delta === 0) return;
    const oldTime = oldD.getTime();
    const batch: { id: string; row: Record<string, unknown> }[] = [];
    const nextJobs = jobs.map((j) => {
      if (j.truckId !== target.truckId) return j;
      const jd = new Date(`${j.date}T00:00:00`);
      if (j.id === id || jd.getTime() > oldTime) {
        const shifted = addBusinessDays(jd, delta);
        const nd = toDateKey(shifted);
        batch.push({ id: j.id, row: { date: nd } });
        return { ...j, date: nd };
      }
      return j;
    });
    setJobs(nextJobs);
    await persistBatch(batch);
  };

  const duplicateJob = async (id: string, newDate: string) => {
    const target = jobs.find((j) => j.id === id);
    if (!target) return;
    const bumped = bumpWeekendToMonday(new Date(`${newDate}T00:00:00`));
    const newDateKey = toDateKey(bumped);
    const targetDate = new Date(`${target.date}T00:00:00`);
    const delta = businessDaysBetween(targetDate, bumped);

    const batch: { id: string; row: Record<string, unknown> }[] = [];
    const shifted = jobs.map((j) => {
      if (j.truckId !== target.truckId) return j;
      if (delta > 0 && j.date > target.date) {
        const sd = addBusinessDays(new Date(`${j.date}T00:00:00`), delta);
        const nd = toDateKey(sd);
        batch.push({ id: j.id, row: { date: nd } });
        return { ...j, date: nd };
      }
      return j;
    });

    const dup: Job = {
      ...target,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      date: newDateKey,
      completed: false,
    };
    setJobs([...shifted, dup]);
    await persistBatch(batch);
    const { data, error } = await supabase
      .from("jobs")
      .insert(jobToRow({ ...target, date: newDateKey, completed: false }) as never)
      .select("*")
      .single();
    if (error) {
      console.error("[jobs] duplicate insert failed", error);
      setJobs((prev) => prev.filter((x) => x.id !== dup.id));
      return;
    }
    const real = rowToJob(data as Row);
    setJobs((prev) => prev.map((x) => (x.id === dup.id ? real : x)));
  };

  const reorderJobs = async (updates: { id: string; priority: number }[]) => {
    const map = new Map(updates.map((u) => [u.id, u.priority]));
    optimistic((prev) =>
      prev.map((j) => {
        const p = map.get(j.id);
        return p !== undefined ? { ...j, priority: p } : j;
      }),
    );
    await persistBatch(updates.map((u) => ({ id: u.id, row: { priority: u.priority } })));
  };

  return {
    jobs,
    addJob,
    removeJob,
    updateJob,
    toggleComplete,
    renameTruck,
    rescheduleFromJob,
    duplicateJob,
    reorderJobs,
  };
}
