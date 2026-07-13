import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Key = string; // `${dateKey}::${bay}`
type NotesMap = Record<Key, string>;

const keyOf = (date: string, bay: string) => `${date}::${bay}`;

async function fetchAll(): Promise<NotesMap> {
  const { data, error } = await supabase.from("bay_notes").select("*");
  if (error) {
    console.error("[bay_notes] fetch failed", error);
    return {};
  }
  const map: NotesMap = {};
  for (const r of (data ?? []) as { date: string; bay: string; note: string }[]) {
    map[keyOf(r.date, r.bay)] = r.note ?? "";
  }
  return map;
}

export function useBayNotes() {
  const [notes, setNotes] = useState<NotesMap>({});

  const refresh = () => fetchAll().then(setNotes);

  useEffect(() => {
    refresh();
    const channel = supabase
      .channel(`bay-notes-changes-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bay_notes" },
        () => refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getNote = (date: string, bay: string): string =>
    notes[keyOf(date, bay)] ?? "";

  const setNote = async (date: string, bay: string, value: string) => {
    setNotes((prev) => ({ ...prev, [keyOf(date, bay)]: value }));
    const { error } = await supabase
      .from("bay_notes")
      .upsert({
        date,
        bay,
        note: value,
        updated_at: new Date().toISOString(),
      } as never);
    if (error) console.error("[bay_notes] upsert failed", error);
  };

  return { getNote, setNote };
}
