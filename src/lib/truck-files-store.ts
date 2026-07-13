import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type TruckFile = {
  id: string;
  name: string;
  type: string;
  size: number;
  dataUrl: string;
  uploadedAt: number;
};

type FilesMap = Record<string, TruckFile[]>;

type Row = {
  id: string;
  truck_id: string;
  name: string;
  type: string;
  size: number;
  data_url: string;
  uploaded_at_ms: number;
};

function rowToFile(r: Row): TruckFile {
  return {
    id: r.id,
    name: r.name,
    type: r.type,
    size: Number(r.size) || 0,
    dataUrl: r.data_url,
    uploadedAt: Number(r.uploaded_at_ms) || Date.now(),
  };
}

async function fetchAll(): Promise<FilesMap> {
  const { data, error } = await supabase.from("truck_files").select("*");
  if (error) {
    console.error("[truck_files] fetch failed", error);
    return {};
  }
  const map: FilesMap = {};
  for (const r of (data ?? []) as Row[]) {
    const list = map[r.truck_id] ?? [];
    list.push(rowToFile(r));
    map[r.truck_id] = list;
  }
  return map;
}

export function useTruckFiles() {
  const [files, setFiles] = useState<FilesMap>({});

  const refresh = () => fetchAll().then(setFiles);

  useEffect(() => {
    refresh();
    const channel = supabase
      .channel(`truck-files-changes-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "truck_files" },
        () => refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getFiles = (truckId: string): TruckFile[] => files[truckId] ?? [];

  const addFile = async (truckId: string, file: TruckFile) => {
    setFiles((prev) => ({ ...prev, [truckId]: [...(prev[truckId] ?? []), file] }));
    const { data, error } = await supabase
      .from("truck_files")
      .insert({
        truck_id: truckId,
        name: file.name,
        type: file.type,
        size: file.size,
        data_url: file.dataUrl,
        uploaded_at_ms: file.uploadedAt,
      } as never)
      .select("*")
      .single();
    if (error) {
      console.error("[truck_files] insert failed", error);
      setFiles((prev) => ({
        ...prev,
        [truckId]: (prev[truckId] ?? []).filter((f) => f.id !== file.id),
      }));
      return;
    }
    const real = rowToFile(data as Row);
    setFiles((prev) => ({
      ...prev,
      [truckId]: (prev[truckId] ?? []).map((f) => (f.id === file.id ? real : f)),
    }));
  };

  const removeFile = async (truckId: string, fileId: string) => {
    setFiles((prev) => {
      const list = (prev[truckId] ?? []).filter((f) => f.id !== fileId);
      const next = { ...prev };
      if (list.length === 0) delete next[truckId];
      else next[truckId] = list;
      return next;
    });
    const { error } = await supabase.from("truck_files").delete().eq("id", fileId);
    if (error) console.error("[truck_files] delete failed", error);
  };

  const renameTruckFiles = async (oldId: string, newId: string) => {
    setFiles((prev) => {
      if (!prev[oldId]) return prev;
      const { [oldId]: existing, ...rest } = prev;
      return { ...rest, [newId]: existing };
    });
    const { error } = await supabase
      .from("truck_files")
      .update({ truck_id: newId } as never)
      .eq("truck_id", oldId);
    if (error) console.error("[truck_files] rename failed", error);
  };

  const removeTruckFiles = async (truckId: string) => {
    setFiles((prev) => {
      if (!prev[truckId]) return prev;
      const { [truckId]: _omit, ...rest } = prev;
      return rest;
    });
    const { error } = await supabase.from("truck_files").delete().eq("truck_id", truckId);
    if (error) console.error("[truck_files] delete truck failed", error);
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
