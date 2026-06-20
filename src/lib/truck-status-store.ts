import { useEffect, useState } from "react";

export type TruckStatus = {
  completed: boolean;
  invoiced: boolean;
};

const KEY = "paint-shop-truck-status-v1";

type StatusMap = Record<string, TruckStatus>;

function read(): StatusMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as StatusMap;
  } catch {
    return {};
  }
}

export function useTruckStatus() {
  const [statuses, setStatuses] = useState<StatusMap>({});

  useEffect(() => {
    setStatuses(read());
  }, []);

  const persist = (updater: (prev: StatusMap) => StatusMap) => {
    setStatuses((prev) => {
      const next = updater(prev);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const getStatus = (truckId: string): TruckStatus =>
    statuses[truckId] ?? { completed: false, invoiced: false };

  const setField = (
    truckId: string,
    field: keyof TruckStatus,
    value: boolean,
  ) => {
    persist((prev) => ({
      ...prev,
      [truckId]: { ...(prev[truckId] ?? { completed: false, invoiced: false }), [field]: value },
    }));
  };

  const renameTruckStatus = (oldId: string, newId: string) => {
    persist((prev) => {
      if (!prev[oldId]) return prev;
      const { [oldId]: existing, ...rest } = prev;
      return { ...rest, [newId]: existing };
    });
  };

  const removeTruckStatus = (truckId: string) => {
    persist((prev) => {
      if (!prev[truckId]) return prev;
      const { [truckId]: _removed, ...rest } = prev;
      return rest;
    });
  };

  return { statuses, getStatus, setField, renameTruckStatus, removeTruckStatus };
}
