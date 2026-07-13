import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type JobHoursItem = {
  id: string;
  person: string;
  date: string; // YYYY-MM-DD
  startTime: string | null; // HH:MM
  stopTime: string | null; // HH:MM
  createdAt: number;
};

type HoursMap = Record<string, JobHoursItem[]>;

type Row = {
  id: string;
  job_id: string;
  person: string;
  date: string;
  start_time: string | null;
  stop_time: string | null;
  created_at_ms: number;
};

function normalizeTime(t: string | null): string | null {
  if (!t) return null;
  // Postgres TIME returns "HH:MM:SS"; keep HH:MM.
  return t.slice(0, 5);
}

function toMap(rows: Row[]): HoursMap {
  const map: HoursMap = {};
  for (const r of rows) {
    const arr = map[r.job_id] ?? [];
    arr.push({
      id: r.id,
      person: r.person ?? "",
      date: r.date,
      startTime: normalizeTime(r.start_time),
      stopTime: normalizeTime(r.stop_time),
      createdAt: Number(r.created_at_ms),
    });
    map[r.job_id] = arr;
  }
  for (const k of Object.keys(map)) {
    map[k].sort((a, b) => a.createdAt - b.createdAt);
  }
  return map;
}

async function fetchAll(): Promise<HoursMap> {
  const { data, error } = await supabase.from("job_hours" as never).select("*");
  if (error) {
    console.error("[job_hours] fetch failed", error);
    return {};
  }
  return toMap((data ?? []) as Row[]);
}

export function useJobHours() {
  const [hours, setHours] = useState<HoursMap>({});

  const refresh = () => fetchAll().then(setHours);

  useEffect(() => {
    refresh();
    const channel = supabase
      .channel(`job-hours-changes-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "job_hours" },
        () => refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getHours = (jobId: string): JobHoursItem[] => hours[jobId] ?? [];

  const addHours = async (
    jobId: string,
    entry: { person: string; date: string; startTime: string | null; stopTime: string | null },
  ) => {
    const tempId = crypto.randomUUID();
    const item: JobHoursItem = {
      id: tempId,
      person: entry.person,
      date: entry.date,
      startTime: entry.startTime,
      stopTime: entry.stopTime,
      createdAt: Date.now(),
    };
    setHours((prev) => ({ ...prev, [jobId]: [...(prev[jobId] ?? []), item] }));
    const { data, error } = await supabase
      .from("job_hours" as never)
      .insert({
        job_id: jobId,
        person: entry.person,
        date: entry.date,
        start_time: entry.startTime,
        stop_time: entry.stopTime,
      } as never)
      .select("*")
      .single();
    if (error) {
      console.error("[job_hours] insert failed", error);
      setHours((prev) => ({
        ...prev,
        [jobId]: (prev[jobId] ?? []).filter((h) => h.id !== tempId),
      }));
      return;
    }
    const r = data as Row;
    setHours((prev) => ({
      ...prev,
      [jobId]: (prev[jobId] ?? []).map((h) =>
        h.id === tempId
          ? {
              id: r.id,
              person: r.person ?? "",
              date: r.date,
              startTime: normalizeTime(r.start_time),
              stopTime: normalizeTime(r.stop_time),
              createdAt: Number(r.created_at_ms),
            }
          : h,
      ),
    }));
  };

  const deleteHours = async (jobId: string, id: string) => {
    setHours((prev) => {
      const list = (prev[jobId] ?? []).filter((h) => h.id !== id);
      const next = { ...prev };
      if (list.length === 0) delete next[jobId];
      else next[jobId] = list;
      return next;
    });
    const { error } = await supabase.from("job_hours" as never).delete().eq("id", id);
    if (error) console.error("[job_hours] delete failed", error);
  };

  return { getHours, addHours, deleteHours };
}
