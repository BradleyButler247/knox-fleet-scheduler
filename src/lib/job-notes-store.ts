import { useEffect, useState } from "react";

const KEY = "paint-shop-job-notes-v2";
const LEGACY_KEY = "paint-shop-job-notes-v1";

export type JobNoteItem = {
  id: string;
  text: string;
  createdAt: number;
};

type NotesMap = Record<string, JobNoteItem[]>;

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function migrateLegacy(): NotesMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const result: NotesMap = {};
    for (const [jobId, value] of Object.entries(parsed)) {
      if (typeof value === "string" && value.trim()) {
        result[jobId] = [{ id: generateId(), text: value, createdAt: Date.now() }];
      }
    }
    return result;
  } catch {
    return {};
  }
}

function read(): NotesMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const migrated = migrateLegacy();
      if (Object.keys(migrated).length > 0) {
        localStorage.setItem(KEY, JSON.stringify(migrated));
      }
      return migrated;
    }
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const result: NotesMap = {};
    for (const [jobId, value] of Object.entries(parsed)) {
      if (Array.isArray(value)) {
        result[jobId] = value as JobNoteItem[];
      }
    }
    return result;
  } catch {
    return {};
  }
}

export function useJobNotes() {
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

  const getNotes = (jobId: string): JobNoteItem[] => notes[jobId] ?? [];

  const addNote = (jobId: string, text: string) => {
    const item: JobNoteItem = { id: generateId(), text, createdAt: Date.now() };
    persist((prev) => {
      const list = prev[jobId] ? [...prev[jobId]] : [];
      list.push(item);
      return { ...prev, [jobId]: list };
    });
  };

  const updateNote = (jobId: string, noteId: string, text: string) => {
    persist((prev) => {
      const list = prev[jobId] ? [...prev[jobId]] : [];
      return { ...prev, [jobId]: list.map((n) => (n.id === noteId ? { ...n, text } : n)) };
    });
  };

  const deleteNote = (jobId: string, noteId: string) => {
    persist((prev) => {
      const list = prev[jobId] ? prev[jobId].filter((n) => n.id !== noteId) : [];
      const next = { ...prev };
      if (list.length === 0) {
        delete next[jobId];
      } else {
        next[jobId] = list;
      }
      return next;
    });
  };

  return { notes, getNotes, addNote, updateNote, deleteNote };
}
