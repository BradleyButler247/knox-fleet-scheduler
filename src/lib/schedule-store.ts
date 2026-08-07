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
  date: string; // YYYY-MM-DD (start date)
  endDate?: string; // YYYY-MM-DD (optional, defaults to date)
  shift: Shift;
  createdAt: number;
  completed?: boolean;
  company?: string;
  color?: string;
  priority?: number;
  /** When true, this task is pinned to its dates and may share a day with others. */
  allowOverlap?: boolean;
};

type Row = {
  id: string;
  truck_id: string;
  work: string;
  bay: string;
  employee: string;
  date: string;
  end_date: string | null;
  shift: string;
  completed: boolean;
  company: string | null;
  color: string | null;
  priority: number | null;
  allow_overlap: boolean | null;
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
    endDate: r.end_date ?? undefined,
    shift: (r.shift as Shift) ?? "ALL_DAY",
    completed: r.completed ?? false,
    company: r.company ?? undefined,
    color: r.color ?? undefined,
    priority: r.priority ?? undefined,
    allowOverlap: r.allow_overlap ?? false,
    createdAt: Number(r.created_at_ms) || Date.now(),
  };
}

/** A job occupies every day from its start date through its end date (inclusive). */
export function jobCoversDate(j: Job, dateKey: string) {
  const end = j.endDate && j.endDate > j.date ? j.endDate : j.date;
  return j.date <= dateKey && dateKey <= end;
}

/** All date keys a job spans. */
export function jobDateKeys(j: Job): string[] {
  const end = j.endDate && j.endDate > j.date ? j.endDate : j.date;
  const keys: string[] = [];
  const d = new Date(`${j.date}T00:00:00`);
  const last = new Date(`${end}T00:00:00`);
  while (d <= last) {
    keys.push(toDateKey(d));
    d.setDate(d.getDate() + 1);
  }
  return keys.length ? keys : [j.date];
}

function jobToRow(j: Partial<Job>): Record<string, unknown> {
  const r: Record<string, unknown> = {};
  if (j.truckId !== undefined) r.truck_id = j.truckId;
  if (j.work !== undefined) r.work = j.work;
  if (j.bay !== undefined) r.bay = j.bay;
  if (j.employee !== undefined) r.employee = j.employee;
  if (j.date !== undefined) r.date = j.date;
  if (j.endDate !== undefined) r.end_date = j.endDate ?? null;
  if (j.shift !== undefined) r.shift = j.shift;
  if (j.completed !== undefined) r.completed = j.completed;
  if (j.company !== undefined) r.company = j.company ?? null;
  if (j.color !== undefined) r.color = j.color ?? null;
  if (j.priority !== undefined) r.priority = j.priority ?? null;
  if (j.allowOverlap !== undefined) r.allow_overlap = !!j.allowOverlap;
  return r;
}

// ---- business-day helpers (pure) ----
export function bumpToBusinessDay(d: Date) {
  const out = new Date(d);
  while (isNonBusinessDay(out)) out.setDate(out.getDate() + 1);
  return out;
}

export function addBusinessDaysTo(date: Date, n: number) {
  const out = new Date(date);
  const dir = n >= 0 ? 1 : -1;
  let remaining = Math.abs(n);
  while (remaining > 0) {
    out.setDate(out.getDate() + dir);
    if (!isNonBusinessDay(out)) remaining--;
  }
  return out;
}

export function businessDaysBetweenDates(a: Date, b: Date) {
  if (toDateKey(a) === toDateKey(b)) return 0;
  const dir = b.getTime() > a.getTime() ? 1 : -1;
  const cur = new Date(a);
  let count = 0;
  const target = toDateKey(b);
  while (toDateKey(cur) !== target) {
    cur.setDate(cur.getDate() + dir);
    if (!isNonBusinessDay(cur)) count += dir;
  }
  return count;
}

export function nextBusinessDay(d: Date) {
  const out = new Date(d);
  out.setDate(out.getDate() + 1);
  return bumpToBusinessDay(out);
}

/**
 * Enforce one task per business day per truck. Pinned tasks (manually placed,
 * `allowOverlap`, or listed in `pinnedIds`) keep their dates but still act as
 * anchors so following tasks land after them. Returns the changed jobs.
 */
export function resequenceTruck(
  all: Job[],
  truckId: string,
  pinnedIds?: Set<string>,
): { id: string; date: string; endDate?: string }[] {
  const list = all
    .filter((j) => j.truckId === truckId)
    .sort((a, b) =>
      a.date === b.date ? a.createdAt - b.createdAt : a.date < b.date ? -1 : 1,
    );

  const changes: { id: string; date: string; endDate?: string }[] = [];
  let cursor: Date | null = null;

  for (const j of list) {
    const origStart = new Date(`${j.date}T00:00:00`);
    const origEnd =
      j.endDate && j.endDate > j.date
        ? new Date(`${j.endDate}T00:00:00`)
        : new Date(origStart);

    const pinned = j.allowOverlap || pinnedIds?.has(j.id);
    if (pinned) {
      const next = nextBusinessDay(origEnd);
      if (!cursor || next.getTime() > cursor.getTime()) cursor = next;
      continue;
    }

    const span = Math.max(0, businessDaysBetweenDates(origStart, origEnd));

    let start = bumpToBusinessDay(origStart);
    if (cursor && start.getTime() < cursor.getTime()) start = new Date(cursor);

    const end = span > 0 ? addBusinessDaysTo(start, span) : new Date(start);
    const nd = toDateKey(start);
    const ne = toDateKey(end);
    const curEnd = j.endDate && j.endDate > j.date ? j.endDate : undefined;
    if (nd !== j.date || (ne !== nd ? ne : undefined) !== curEnd) {
      changes.push({ id: j.id, date: nd, endDate: ne !== nd ? ne : undefined });
    }
    cursor = nextBusinessDay(end);
  }
  return changes;
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
  const [pendingResequence, setPendingResequence] = useState<{
    truckId: string;
    changes: { id: string; date: string; endDate?: string }[];
  } | null>(null);

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
    let merged: Job[] = [];
    setJobs((prev) => {
      merged = prev.map((x) => (x.id === tempId ? real : x));
      return merged;
    });
    await proposeResequence(merged, real.truckId, [], [real.id]);
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

  /**
   * Instead of silently pushing following tasks, persist the user's change and
   * surface a prompt asking whether the remaining tasks should each get their
   * own day or stay on their current dates.
   */
  const proposeResequence = async (
    nextJobs: Job[],
    truckId: string,
    batch: { id: string; row: Record<string, unknown> }[],
    pinnedIds?: string[],
  ) => {
    if (batch.length) await persistBatch(batch);
    const changes = resequenceTruck(nextJobs, truckId, new Set(pinnedIds ?? []));
    if (changes.length) setPendingResequence({ truckId, changes });
  };

  const resolveResequence = async (apply: boolean) => {
    const pending = pendingResequence;
    setPendingResequence(null);
    if (!pending) return;

    if (!apply) {
      // Keep the tasks where they are and stop asking again about them.
      const ids = pending.changes.map((c) => c.id);
      setJobs((prev) =>
        prev.map((j) => (ids.includes(j.id) ? { ...j, allowOverlap: true } : j)),
      );
      await persistBatch(ids.map((id) => ({ id, row: { allow_overlap: true } })));
      return;
    }

    const map = new Map(pending.changes.map((c) => [c.id, c]));
    setJobs((prev) =>
      prev.map((j) => {
        const c = map.get(j.id);
        return c ? { ...j, date: c.date, endDate: c.endDate, allowOverlap: false } : j;
      }),
    );
    await persistBatch(
      pending.changes.map((c) => ({
        id: c.id,
        row: { date: c.date, end_date: c.endDate ?? null, allow_overlap: false },
      })),
    );
  };





  const updateJob = async (
    id: string,
    updates: Omit<Job, "id" | "createdAt">,
  ) => {
    let target: Job | undefined;
    let finalUpdates = updates;

    // Compute optimistic new state.
    const newJobs = jobs.map((j) => {
      if (j.id === id) target = j;
      return j;
    });
    if (!target) return;

    const oldDate = target.date;
    const oldEndDate = target.endDate ?? target.date;
    let newDate = updates.date;
    // A manual schedule change pins the task to the chosen range: it may share
    // days with other tasks and must not move the rest of the truck schedule.
    const manualMove = !!newDate && newDate !== oldDate;
    if (manualMove) {
      const bumped = bumpWeekendToMonday(new Date(`${newDate}T00:00:00`));
      newDate = toDateKey(bumped);
    }
    const newEndDate = updates.endDate ?? updates.date;
    const manualScheduleChange =
      manualMove || (!!newEndDate && newEndDate !== oldEndDate);
    finalUpdates = {
      ...updates,
      date: newDate ?? updates.date,
      allowOverlap: manualScheduleChange
        ? true
        : (updates.allowOverlap ?? target.allowOverlap ?? false),
    };
    const truckId = target.truckId;

    // When a paint task is moved to a different booth, keep every later paint
    // task for the same truck in that booth too.
    const isPaint = (j: { work: string }) => j.work.trim().toLowerCase().startsWith("paint");
    const newBay = finalUpdates.bay;
    const bayChanged = !!newBay && newBay !== target.bay;
    const targetRef = target;
    const targetIsFirstPaint = !jobs.some(
      (j) =>
        j.id !== id &&
        j.truckId === targetRef.truckId &&
        isPaint(j) &&
        j.date < targetRef.date,
    );
    const cascadePaint = bayChanged && isPaint(finalUpdates) && isPaint(target) && targetIsFirstPaint;
    const cascadeBay = cascadePaint ? newBay : undefined;
    const isLaterPaint = (j: Job) =>
      cascadePaint &&
      j.id !== id &&
      j.truckId === truckId &&
      isPaint(j) &&
      j.date >= targetRef.date;

    const patched: Job[] = newJobs.map((j) => {
      if (j.id === id) return { ...j, ...finalUpdates };
      let next = j;
      if (isLaterPaint(j) && cascadeBay) next = { ...next, bay: cascadeBay };
      return next;
    });
    setJobs(patched);

    const batch: { id: string; row: Record<string, unknown> }[] = [
      { id, row: jobToRow(finalUpdates) },
    ];
    for (const j of jobs) {
      if (j.id === id) continue;
      const row: Record<string, unknown> = {};
      if (isLaterPaint(j) && cascadeBay) row.bay = cascadeBay;
      if (Object.keys(row).length > 0) batch.push({ id: j.id, row });
    }
    await proposeResequence(patched, truckId, batch, [id]);

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
    await proposeResequence(nextJobs, target.truckId, batch, [id]);

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
    const merged = [...shifted, real];
    setJobs(merged);
    await proposeResequence(merged, target.truckId, [], [real.id]);
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
    pendingResequence,
    resolveResequence,
  };
}
