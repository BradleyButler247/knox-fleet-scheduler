import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type NotesMap = Record<string, string>;

async function fetchAll(): Promise<NotesMap> {
  const { data, error } = await supabase.from("truck_notes").select("*");
  if (error) {
    console.error("[truck_notes] fetch failed", error);
    return {};
  }
  const map: NotesMap = {};
  for (const r of (data ?? []) as { truck_id: string; note: string }[]) {
    map[r.truck_id] = r.note;
  }
  return map;
}

export function useTruckNotes() {
  const [notes, setNotes] = useState<NotesMap>({});

  const refresh = () => fetchAll().then(setNotes);

  useEffect(() => {
    refresh();
    const channel = supabase
      .channel(`truck-notes-changes-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "truck_notes" },
        () => refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getNote = (truckId: string): string => notes[truckId] ?? "";

  const setNote = async (truckId: string, value: string) => {
    setNotes((prev) => ({ ...prev, [truckId]: value }));
    const { error } = await supabase
      .from("truck_notes")
      .upsert({ truck_id: truckId, note: value, updated_at: new Date().toISOString() } as never);
    if (error) console.error("[truck_notes] upsert failed", error);
  };

  const renameTruckNote = async (oldId: string, newId: string) => {
    setNotes((prev) => {
      if (!prev[oldId]) return prev;
      const { [oldId]: existing, ...rest } = prev;
      return { ...rest, [newId]: existing };
    });
    const cur = notes[oldId];
    if (cur === undefined) return;
    await supabase.from("truck_notes").delete().eq("truck_id", oldId);
    const { error } = await supabase
      .from("truck_notes")
      .upsert({ truck_id: newId, note: cur } as never);
    if (error) console.error("[truck_notes] rename failed", error);
  };

  const removeTruckNote = async (truckId: string) => {
    setNotes((prev) => {
      if (!prev[truckId]) return prev;
      const { [truckId]: _removed, ...rest } = prev;
      return rest;
    });
    const { error } = await supabase.from("truck_notes").delete().eq("truck_id", truckId);
    if (error) console.error("[truck_notes] delete failed", error);
  };

  return { notes, getNote, setNote, renameTruckNote, removeTruckNote };
}
