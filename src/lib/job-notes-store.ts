import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type JobNoteItem = {
  id: string;
  text: string;
  createdAt: number;
};

type NotesMap = Record<string, JobNoteItem[]>;

type Row = {
  id: string;
  job_id: string;
  text: string;
  created_at_ms: number;
};

function toMap(rows: Row[]): NotesMap {
  const map: NotesMap = {};
  for (const r of rows) {
    const arr = map[r.job_id] ?? [];
    arr.push({ id: r.id, text: r.text, createdAt: Number(r.created_at_ms) });
    map[r.job_id] = arr;
  }
  for (const k of Object.keys(map)) {
    map[k].sort((a, b) => a.createdAt - b.createdAt);
  }
  return map;
}

async function fetchAll(): Promise<NotesMap> {
  const { data, error } = await supabase.from("job_notes").select("*");
  if (error) {
    console.error("[job_notes] fetch failed", error);
    return {};
  }
  return toMap((data ?? []) as Row[]);
}

export function useJobNotes() {
  const [notes, setNotes] = useState<NotesMap>({});

  const refresh = () => fetchAll().then(setNotes);

  useEffect(() => {
    refresh();
    const channel = supabase
      .channel(`job-notes-changes-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "job_notes" },
        () => refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getNotes = (jobId: string): JobNoteItem[] => notes[jobId] ?? [];

  const addNote = async (jobId: string, text: string) => {
    const tempId = crypto.randomUUID();
    const item: JobNoteItem = { id: tempId, text, createdAt: Date.now() };
    setNotes((prev) => ({ ...prev, [jobId]: [...(prev[jobId] ?? []), item] }));
    const { data, error } = await supabase
      .from("job_notes")
      .insert({ job_id: jobId, text } as never)
      .select("*")
      .single();
    if (error) {
      console.error("[job_notes] insert failed", error);
      setNotes((prev) => ({
        ...prev,
        [jobId]: (prev[jobId] ?? []).filter((n) => n.id !== tempId),
      }));
      return;
    }
    const r = data as Row;
    setNotes((prev) => ({
      ...prev,
      [jobId]: (prev[jobId] ?? []).map((n) =>
        n.id === tempId ? { id: r.id, text: r.text, createdAt: Number(r.created_at_ms) } : n,
      ),
    }));
  };

  const updateNote = async (jobId: string, noteId: string, text: string) => {
    setNotes((prev) => ({
      ...prev,
      [jobId]: (prev[jobId] ?? []).map((n) => (n.id === noteId ? { ...n, text } : n)),
    }));
    const { error } = await supabase
      .from("job_notes")
      .update({ text } as never)
      .eq("id", noteId);
    if (error) console.error("[job_notes] update failed", error);
  };

  const deleteNote = async (jobId: string, noteId: string) => {
    setNotes((prev) => {
      const list = (prev[jobId] ?? []).filter((n) => n.id !== noteId);
      const next = { ...prev };
      if (list.length === 0) delete next[jobId];
      else next[jobId] = list;
      return next;
    });
    const { error } = await supabase.from("job_notes").delete().eq("id", noteId);
    if (error) console.error("[job_notes] delete failed", error);
  };

  return { notes, getNotes, addNote, updateNote, deleteNote };
}
