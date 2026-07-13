import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type TruckStatus = {
  completed: boolean;
  invoiced: boolean;
};

type StatusMap = Record<string, TruckStatus>;

async function fetchAll(): Promise<StatusMap> {
  const { data, error } = await supabase.from("truck_status").select("*");
  if (error) {
    console.error("[truck_status] fetch failed", error);
    return {};
  }
  const map: StatusMap = {};
  for (const r of (data ?? []) as { truck_id: string; completed: boolean; invoiced: boolean }[]) {
    map[r.truck_id] = { completed: !!r.completed, invoiced: !!r.invoiced };
  }
  return map;
}

export function useTruckStatus() {
  const [statuses, setStatuses] = useState<StatusMap>({});

  const refresh = () => fetchAll().then(setStatuses);

  useEffect(() => {
    refresh();
    const channel = supabase
      .channel(`truck-status-changes-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "truck_status" },
        () => refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStatus = (truckId: string): TruckStatus =>
    statuses[truckId] ?? { completed: false, invoiced: false };

  const setField = async (
    truckId: string,
    field: keyof TruckStatus,
    value: boolean,
  ) => {
    const current = statuses[truckId] ?? { completed: false, invoiced: false };
    const next = { ...current, [field]: value };
    setStatuses((prev) => ({ ...prev, [truckId]: next }));
    const { error } = await supabase
      .from("truck_status")
      .upsert({
        truck_id: truckId,
        completed: next.completed,
        invoiced: next.invoiced,
        updated_at: new Date().toISOString(),
      } as never);
    if (error) console.error("[truck_status] upsert failed", error);
  };

  const renameTruckStatus = async (oldId: string, newId: string) => {
    const existing = statuses[oldId];
    setStatuses((prev) => {
      if (!prev[oldId]) return prev;
      const { [oldId]: existing2, ...rest } = prev;
      return { ...rest, [newId]: existing2 };
    });
    if (!existing) return;
    await supabase.from("truck_status").delete().eq("truck_id", oldId);
    const { error } = await supabase
      .from("truck_status")
      .upsert({
        truck_id: newId,
        completed: existing.completed,
        invoiced: existing.invoiced,
      } as never);
    if (error) console.error("[truck_status] rename failed", error);
  };

  const removeTruckStatus = async (truckId: string) => {
    setStatuses((prev) => {
      if (!prev[truckId]) return prev;
      const { [truckId]: _removed, ...rest } = prev;
      return rest;
    });
    const { error } = await supabase.from("truck_status").delete().eq("truck_id", truckId);
    if (error) console.error("[truck_status] delete failed", error);
  };

  return { statuses, getStatus, setField, renameTruckStatus, removeTruckStatus };
}
