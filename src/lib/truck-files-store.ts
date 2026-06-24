import { useEffect, useState } from "react";

const KEY = "paint-shop-truck-files-v1";

export type TruckFile = {
  id: string;
  name: string;
  type: string;
  size: number;
  dataUrl: string;
  uploadedAt: number;
};

type FilesMap = Record<string, TruckFile[]>;

function read(): FilesMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as FilesMap;
  } catch {
    return {};
  }
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useTruckFiles() {
  const [files, setFiles] = useState<FilesMap>({});

  useEffect(() => {
    setFiles(read());
  }, []);

  const persist = (updater: (prev: FilesMap) => FilesMap) => {
    setFiles((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save truck files (storage full?)", e);
      }
      return next;
    });
  };

  const getFiles = (truckId: string): TruckFile[] => files[truckId] ?? [];

  const addFile = (truckId: string, file: TruckFile) => {
    persist((prev) => ({
      ...prev,
      [truckId]: [...(prev[truckId] ?? []), file],
    }));
  };

  const removeFile = (truckId: string, fileId: string) => {
    persist((prev) => {
      const list = prev[truckId];
      if (!list) return prev;
      const next = list.filter((f) => f.id !== fileId);
      if (next.length === 0) {
        const { [truckId]: _omit, ...rest } = prev;
        return rest;
      }
      return { ...prev, [truckId]: next };
    });
  };

  const renameTruckFiles = (oldId: string, newId: string) => {
    persist((prev) => {
      if (!prev[oldId]) return prev;
      const { [oldId]: existing, ...rest } = prev;
      return { ...rest, [newId]: existing };
    });
  };

  const removeTruckFiles = (truckId: string) => {
    persist((prev) => {
      if (!prev[truckId]) return prev;
      const { [truckId]: _omit, ...rest } = prev;
      return rest;
    });
  };

  return { getFiles, addFile, removeFile, renameTruckFiles, removeTruckFiles };
}

export async function fileToTruckFile(file: File): Promise<TruckFile> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size,
    dataUrl,
    uploadedAt: Date.now(),
  };
}
