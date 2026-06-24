import { useEffect, useState } from "react";

const KEY = "paint-shop-truck-notes-v1";

type NotesMap = Record<string, string>;

function read(): NotesMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as NotesMap;
  } catch {
    return {};
  }
}

export function useTruckNotes() {
  const [notes, setNotes] = useState<NotesMap>({});

  useEffect(() => {
    setNotes(read());
  }, []);

  const persist = (updater: (prev: NotesMap) => NotesMap) => {
    setNotes((prev) => {
      const next = updater(prev);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const getNote = (truckId: string): string => notes[truckId] ?? "";

  const setNote = (truckId: string, value: string) => {
    persist((prev) => ({ ...prev, [truckId]: value }));
  };

  const renameTruckNote = (oldId: string, newId: string) => {
    persist((prev) => {
      if (!prev[oldId]) return prev;
      const { [oldId]: existing, ...rest } = prev;
      return { ...rest, [newId]: existing };
    });
  };

  const removeTruckNote = (truckId: string) => {
    persist((prev) => {
      if (!prev[truckId]) return prev;
      const { [truckId]: _removed, ...rest } = prev;
      return rest;
    });
  };

  return { notes, getNote, setNote, renameTruckNote, removeTruckNote };
}
