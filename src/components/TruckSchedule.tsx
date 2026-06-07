import { useMemo, useState } from "react";
import {
  Truck,
  MapPin,
  User,
  Calendar as CalendarIcon,
  Search,
  ChevronDown,
  Plus,
  X,
  Pencil,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScheduleForm } from "@/components/ScheduleForm";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toDateKey, type Job, type Shift } from "@/lib/schedule-store";

function workColorClass(work: string) {
  switch (work) {
    case "Assembly":
    case "Disassembly":
      return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300";
    case "Sandblast":
      return "bg-orange-500/20 text-orange-700 dark:text-orange-300";
    case "Sanding":
      return "bg-blue-500/20 text-blue-700 dark:text-blue-300";
    case "Paint":
      return "bg-green-500/20 text-green-700 dark:text-green-300";
    default:
      return "bg-purple-500/20 text-purple-700 dark:text-purple-300";
  }
}

function startOfWeek(d: Date) {
  const out = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  out.setDate(out.getDate() - out.getDay()); // Sunday start
  return out;
}

function addDays(d: Date, n: number) {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}


type WeekItem = {
  id: string;
  bay: string;
  work: string;
  employee: string;
  shift: Shift;
};

function WeekGrid({
  weekStart,
  itemsByDay,
  onAddJob,
  onRemoveItem,
}: {
  weekStart: Date;
  itemsByDay: Map<string, WeekItem[]>;
  onAddJob: (date: Date) => void;
  onRemoveItem?: (id: string) => void;
}) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekEnd = addDays(weekStart, 6);
  const todayKey = toDateKey(new Date());

  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Week of{" "}
        {weekStart.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}{" "}
        –{" "}
        {weekEnd.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const key = toDateKey(d);
          const dayItems = itemsByDay.get(key) ?? [];
          const isToday = todayKey === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onAddJob(d)}
              className={`group flex min-h-[140px] flex-col rounded-md border p-2 text-left transition-colors hover:border-primary hover:bg-primary/10 ${
                isToday
                  ? "border-primary/60 bg-primary/5"
                  : "border-border bg-card"
              }`}
              aria-label={`Add job on ${d.toLocaleDateString()}`}
            >
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {d.toLocaleDateString(undefined, { weekday: "short" })}
                </span>
                <span className="font-display text-base">{d.getDate()}</span>
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                {dayItems.length === 0 ? (
                  <span className="mt-2 text-[11px] text-muted-foreground/60">
                    —
                  </span>
                ) : (
                  dayItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative rounded border border-border/70 bg-background/60 p-1.5 text-[11px]"
                    >
                      {onRemoveItem && (
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveItem(item.id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              onRemoveItem(item.id);
                            }
                          }}
                          aria-label="Remove"
                          className="absolute right-0.5 top-0.5 cursor-pointer rounded p-0.5 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </span>
                      )}
                      <div className="flex items-center justify-between gap-1 text-accent">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="font-medium">{item.bay}</span>
                        </div>
                        <span className="rounded bg-primary/15 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary">
                          {item.shift === "ALL_DAY" ? "All" : item.shift}
                        </span>
                      </div>
                      <p className={`mt-0.5 line-clamp-2 pr-3 rounded px-1 py-0.5 ${workColorClass(item.work)}`}>
                        {item.work}
                      </p>
                      <div className="mt-0.5 flex items-center gap-1 text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span className="truncate">{item.employee}</span>
                      </div>
                    </div>
                  ))
                )}
                <span className="mt-auto flex items-center justify-center gap-1 rounded border border-dashed border-transparent py-1 text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 transition-opacity group-hover:border-primary/40 group-hover:opacity-100">
                  <Plus className="h-3 w-3" /> Add
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TruckWeekView({
  truckId,
  jobs,
  onAddJob,
}: {
  truckId: string;
  jobs: Job[];
  onAddJob: (date: Date) => void;
}) {
  const truckJobs = useMemo(
    () => jobs.filter((j) => j.truckId === truckId),
    [jobs, truckId],
  );

  const firstWeek = useMemo(() => {
    const upcoming = truckJobs
      .map((j) => new Date(`${j.date}T00:00:00`))
      .sort((a, b) => a.getTime() - b.getTime())[0];
    return startOfWeek(upcoming ?? new Date());
  }, [truckJobs]);

  const [weekCount, setWeekCount] = useState(1);

  const jobsByDay = useMemo(() => {
    const map = new Map<string, Job[]>();
    for (const j of truckJobs) {
      const arr = map.get(j.date) ?? [];
      arr.push(j);
      map.set(j.date, arr);
    }
    return map;
  }, [truckJobs]);

  const weeks = Array.from({ length: weekCount }, (_, i) =>
    addDays(firstWeek, i * 7),
  );

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      {weeks.map((w) => (
        <WeekGrid
          key={toDateKey(w)}
          weekStart={w}
          itemsByDay={jobsByDay}
          onAddJob={onAddJob}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2"
        onClick={() => setWeekCount((c) => c + 1)}
      >
        <ChevronDown className="h-4 w-4" /> Show next week
      </Button>
    </div>
  );
}

type PendingJob = WeekItem & { date: string };

const BAYS = ["Bay 1", "Bay 2", "Bay 3", "Bay 4", "Bay 5"];
const WORK_OPTIONS = ["Assembly", "Disassembly", "Sandblast", "Sanding", "Paint", "Other"] as const;

function PendingJobForm({
  date,
  onAdd,
  onCancel,
}: {
  date: Date;
  onAdd: (j: Omit<PendingJob, "id" | "date">) => void;
  onCancel: () => void;
}) {
  const [workType, setWorkType] = useState<string>("");
  const [workOther, setWorkOther] = useState("");
  const [bay, setBay] = useState(BAYS[0]);
  const [employee, setEmployee] = useState("");
  const [shift, setShift] = useState<Shift>("ALL_DAY");
  const resolvedWork = workType === "Other" ? workOther.trim() : workType;

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {date.toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Bay</Label>
          <Select value={bay} onValueChange={setBay}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BAYS.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="emp">Employee</Label>
          <Input
            id="emp"
            placeholder="Jordan Rivera"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="work">Work to be done</Label>
        <Select value={workType} onValueChange={setWorkType}>
          <SelectTrigger id="work">
            <SelectValue placeholder="-- Select One --" />
          </SelectTrigger>
          <SelectContent>
            {WORK_OPTIONS.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {workType === "Other" && (
          <Input
            placeholder="Enter task"
            value={workOther}
            onChange={(e) => setWorkOther(e.target.value)}
            className="mt-2"
          />
        )}
      </div>
      <div className="space-y-1.5">
        <Label>Shift</Label>
        <ToggleGroup
          type="single"
          value={shift}
          onValueChange={(v) => v && setShift(v as Shift)}
          className="grid grid-cols-3 gap-2"
        >
          <ToggleGroupItem value="AM" className="border border-border data-[state=on]:border-primary">
            AM
          </ToggleGroupItem>
          <ToggleGroupItem value="PM" className="border border-border data-[state=on]:border-primary">
            PM
          </ToggleGroupItem>
          <ToggleGroupItem value="ALL_DAY" className="border border-border data-[state=on]:border-primary">
            All Day
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (!resolvedWork || !employee.trim()) {
              toast.error("Fill in work and employee");
              return;
            }
            onAdd({
              work: resolvedWork,
              bay,
              employee: employee.trim(),
              shift,
            });
          }}
        >
          Add to day
        </Button>
      </div>
    </div>
  );
}

function MobileTaskRows({
  pending,
  setPending,
}: {
  pending: PendingJob[];
  setPending: React.Dispatch<React.SetStateAction<PendingJob[]>>;
}) {
  const todayKey = toDateKey(new Date());

  const rows = pending.length === 0
    ? [
        {
          id: "__draft__",
          date: todayKey,
          work: "",
          bay: "",
          employee: "",
          shift: "ALL_DAY" as Shift,
        } as PendingJob,
      ]
    : pending;

  const updateRow = (id: string, patch: Partial<PendingJob>) => {
    setPending((prev) => {
      if (prev.length === 0) {
        const seed: PendingJob = {
          id: crypto.randomUUID(),
          date: todayKey,
          work: "",
          bay: "",
          employee: "",
          shift: "ALL_DAY",
          ...patch,
        };
        return [seed];
      }
      return prev.map((r) => (r.id === id ? { ...r, ...patch } : r));
    });
  };

  const removeRow = (id: string) => {
    setPending((prev) => prev.filter((r) => r.id !== id));
  };

  const addRow = () => {
    setPending((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        date: todayKey,
        work: "",
        bay: "",
        employee: "",
        shift: "ALL_DAY",
      },
    ]);
  };

  return (
    <div className="space-y-3">
      {rows.map((row, idx) => {
        const isOther = !WORK_OPTIONS.includes(row.work as typeof WORK_OPTIONS[number]) && row.work !== "";
        const workType = isOther ? "Other" : row.work;
        return (
          <div
            key={row.id}
            className="space-y-3 rounded-md border border-border bg-card/40 p-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Task {idx + 1}
              </p>
              {rows.length > 1 && row.id !== "__draft__" && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeRow(row.id)}
                  aria-label="Remove task"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input
                type="date"
                value={row.date}
                onChange={(e) => updateRow(row.id, { date: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Task</Label>
              <Select
                value={workType || undefined}
                onValueChange={(v) =>
                  updateRow(row.id, { work: v === "Other" ? "" : v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- Select One --" />
                </SelectTrigger>
                <SelectContent>
                  {WORK_OPTIONS.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {workType === "Other" && (
                <Input
                  placeholder="Enter task"
                  value={row.work}
                  onChange={(e) => updateRow(row.id, { work: e.target.value })}
                  className="mt-2"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Bay #{workType === "Other" ? " (optional)" : ""}</Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  placeholder="-- Please enter a bay # --"
                  value={row.bay}
                  onChange={(e) =>
                    updateRow(row.id, {
                      bay: e.target.value.replace(/\D/g, ""),
                    })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Employee</Label>
                <Input
                  placeholder="-- Please enter an employee --"
                  value={row.employee}
                  onChange={(e) =>
                    updateRow(row.id, { employee: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Shift</Label>
              <ToggleGroup
                type="single"
                value={row.shift}
                onValueChange={(v) => v && updateRow(row.id, { shift: v as Shift })}
                className="grid grid-cols-3 gap-2"
              >
                <ToggleGroupItem value="AM" className="border border-border data-[state=on]:border-primary">
                  AM
                </ToggleGroupItem>
                <ToggleGroupItem value="PM" className="border border-border data-[state=on]:border-primary">
                  PM
                </ToggleGroupItem>
                <ToggleGroupItem value="ALL_DAY" className="border border-border data-[state=on]:border-primary">
                  All Day
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        );
      })}

      <Button
        type="button"
        variant="outline"
        className="w-full gap-2"
        onClick={addRow}
      >
        <Plus className="h-4 w-4" /> Add another task
      </Button>
    </div>
  );
}

function NewTruckForm({
  onCreate,
  onClose,
}: {
  onCreate: (truckId: string, jobs: PendingJob[]) => void;
  onClose: () => void;
}) {
  const [truckId, setTruckId] = useState("");
  const [pending, setPending] = useState<PendingJob[]>([]);
  const [weekCount, setWeekCount] = useState(1);
  const [addFor, setAddFor] = useState<Date | null>(null);

  const firstWeek = useMemo(() => startOfWeek(new Date()), []);
  const weeks = Array.from({ length: weekCount }, (_, i) =>
    addDays(firstWeek, i * 7),
  );

  const itemsByDay = useMemo(() => {
    const map = new Map<string, WeekItem[]>();
    for (const p of pending) {
      const arr = map.get(p.date) ?? [];
      arr.push(p);
      map.set(p.date, arr);
    }
    return map;
  }, [pending]);

  const handleCreate = () => {
    if (!truckId.trim()) {
      toast.error("Enter a truck ID");
      return;
    }
    if (pending.length === 0) {
      toast.error("Add at least one job to the schedule");
      return;
    }
    for (const p of pending) {
      if (!p.date || !p.work.trim() || !p.employee.trim()) {
        toast.error("Fill in date, task, and employee for every task");
        return;
      }
      const isPreset = (WORK_OPTIONS as readonly string[]).includes(p.work);
      if (isPreset && !p.bay.trim()) {
        toast.error("Enter a bay # for every task");
        return;
      }
    }
    onCreate(truckId.trim().toUpperCase(), pending);
  };

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="space-y-1.5">
        <Label htmlFor="new-truck">Truck ID</Label>
        <Input
          id="new-truck"
          placeholder="TRK-4821"
          value={truckId}
          onChange={(e) => setTruckId(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Schedule</Label>
        <p className="hidden md:block text-xs text-muted-foreground">
          Click any day to add work for this truck.
        </p>
      </div>

      {/* Desktop / tablet: week calendar grid */}
      <div className="hidden md:block space-y-4">
        {weeks.map((w) => (
          <WeekGrid
            key={toDateKey(w)}
            weekStart={w}
            itemsByDay={itemsByDay}
            onAddJob={(d) => setAddFor(d)}
            onRemoveItem={(id) =>
              setPending((prev) => prev.filter((p) => p.id !== id))
            }
          />
        ))}
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={() => setWeekCount((c) => c + 1)}
        >
          <ChevronDown className="h-4 w-4" /> Show next week
        </Button>
      </div>

      {/* Mobile: stacked date + task rows */}
      <div className="md:hidden">
        <MobileTaskRows pending={pending} setPending={setPending} />
      </div>

      <div className="flex justify-end gap-2 border-t border-border pt-3">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleCreate} className="font-display tracking-wider">
          Create truck ({pending.length}{" "}
          {pending.length === 1 ? "job" : "jobs"})
        </Button>
      </div>

      <Dialog open={addFor !== null} onOpenChange={(o) => !o && setAddFor(null)}>
        <DialogContent className="max-w-md">
          {addFor && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl tracking-wider">
                  New Job
                </DialogTitle>
              </DialogHeader>
              <PendingJobForm
                date={addFor}
                onCancel={() => setAddFor(null)}
                onAdd={(j) => {
                  setPending((prev) => [
                    ...prev,
                    {
                      ...j,
                      id: crypto.randomUUID(),
                      date: toDateKey(addFor),
                    },
                  ]);
                  setAddFor(null);
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}



export function TruckSchedule({
  jobs,
  addJob,
  renameTruck,
}: {
  jobs: Job[];
  addJob: (j: Omit<Job, "id" | "createdAt">) => void;
  renameTruck?: (oldId: string, newId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [openTruck, setOpenTruck] = useState<string | null>(null);
  const [addFor, setAddFor] = useState<{ truckId: string; date: Date } | null>(
    null,
  );
  const [newTruckOpen, setNewTruckOpen] = useState(false);
  const [editTruck, setEditTruck] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const grouped = useMemo(() => {
    const map = new Map<string, Job[]>();
    for (const j of jobs) {
      const arr = map.get(j.truckId) ?? [];
      arr.push(j);
      map.set(j.truckId, arr);
    }
    return Array.from(map.entries())
      .map(([truckId, list]) => ({
        truckId,
        jobs: list.sort((a, b) => a.date.localeCompare(b.date)),
      }))
      .sort((a, b) => a.truckId.localeCompare(b.truckId));
  }, [jobs]);

  const filtered = query.trim()
    ? grouped.filter((g) =>
        g.truckId.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : grouped;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between border-b border-border pb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Schedule by
          </p>
          <h2 className="font-display text-4xl text-foreground">Truck</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            onClick={() => setNewTruckOpen(true)}
            aria-label="Add new truck"
            className="rounded-full"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search truck ID…"
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 py-12 text-center">
          <Truck className="h-10 w-10 text-muted-foreground/60" />
          <p className="mt-3 text-sm text-muted-foreground">
            {jobs.length === 0
              ? "No trucks scheduled yet."
              : "No trucks match your search."}
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {filtered.map(({ truckId, jobs: tjobs }) => (
            <li key={truckId}>
              <button
                type="button"
                onClick={() => setOpenTruck(truckId)}
                className="w-full rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/60 hover:bg-card/80"
              >
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <span className="font-display text-xl tracking-wider text-foreground">
                      {truckId}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {tjobs.length} {tjobs.length === 1 ? "job" : "jobs"}
                    </Badge>
                    {renameTruck && (
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label={`Edit ${truckId}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditTruck(truckId);
                          setEditValue(truckId);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            setEditTruck(truckId);
                            setEditValue(truckId);
                          }
                        }}
                        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>
                <ul className="mt-3 space-y-2">
                  {tjobs.map((job) => {
                    const d = new Date(`${job.date}T00:00:00`);
                    return (
                      <li
                        key={job.id}
                        className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm"
                      >
                        <span className="flex items-center gap-1.5 font-medium text-foreground">
                          <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                          {d.toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <Badge
                          variant="outline"
                          className="border-accent/50 text-accent"
                        >
                          <MapPin className="mr-1 h-3 w-3" />
                          {job.bay}
                        </Badge>
                        <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
                          {job.shift === "ALL_DAY" ? "All Day" : job.shift}
                        </Badge>
                        <span
                          className={`flex-1 rounded px-2 py-0.5 text-xs font-medium ${workColorClass(job.work)}`}
                        >
                          {job.work}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          {job.employee}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog
        open={openTruck !== null}
        onOpenChange={(o) => !o && setOpenTruck(null)}
      >
        <DialogContent className="max-w-5xl">
          {openTruck && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-display text-2xl tracking-wider">
                  <Truck className="h-5 w-5 text-primary" />
                  {openTruck}
                </DialogTitle>
              </DialogHeader>
              <TruckWeekView
                truckId={openTruck}
                jobs={jobs}
                onAddJob={(d) => setAddFor({ truckId: openTruck, date: d })}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={addFor !== null}
        onOpenChange={(o) => !o && setAddFor(null)}
      >
        <DialogContent className="max-w-lg">
          {addFor && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl tracking-wider">
                  New Job — {addFor.truckId} ·{" "}
                  {addFor.date.toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </DialogTitle>
              </DialogHeader>
              <ScheduleForm
                selectedDate={addFor.date}
                defaultTruckId={addFor.truckId}
                lockTruckId
                existingJobs={jobs}
                onSubmit={(j) => {
                  addJob(j);
                  setAddFor(null);
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={newTruckOpen} onOpenChange={setNewTruckOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl tracking-wider">
              New Truck
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Enter the truck ID and click days on the week to schedule work.
            </p>
          </DialogHeader>
          <NewTruckForm
            onClose={() => setNewTruckOpen(false)}
            onCreate={(truckId, items) => {
              for (const it of items) {
                addJob({
                  truckId,
                  work: it.work,
                  bay: it.bay,
                  employee: it.employee,
                  date: it.date,
                  shift: it.shift,
                });
              }
              toast.success(`${truckId} scheduled (${items.length} jobs)`);
              setNewTruckOpen(false);
              setOpenTruck(truckId);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={editTruck !== null} onOpenChange={(o) => !o && setEditTruck(null)}>
        <DialogContent className="max-w-sm">
          {editTruck && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl tracking-wider">
                  Edit Truck
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-truck-id">Truck ID</Label>
                  <Input
                    id="edit-truck-id"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setEditTruck(null)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      const next = editValue.trim().toUpperCase();
                      if (!next) {
                        toast.error("Enter a truck ID");
                        return;
                      }
                      if (next !== editTruck && grouped.some((g) => g.truckId === next)) {
                        toast.error("A truck with that ID already exists");
                        return;
                      }
                      if (next !== editTruck) {
                        renameTruck?.(editTruck, next);
                        toast.success(`Renamed to ${next}`);
                      }
                      setEditTruck(null);
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
