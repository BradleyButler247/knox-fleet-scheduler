import { useMemo, useState } from "react";
import {
  Truck,
  MapPin,
  User,
  Calendar as CalendarIcon,
  Search,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScheduleForm, MIXER_PRESETS, pickBayForTask, addBusinessDays } from "@/components/ScheduleForm";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toDateKey, type Job, type Shift } from "@/lib/schedule-store";
import { useTruckStatus } from "@/lib/truck-status-store";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

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
  color?: string;
};

function WeekGrid({
  weekStart,
  itemsByDay,
  onAddJob,
  onRemoveItem,
  onEditItem,
  roomy = false,
}: {
  weekStart: Date;
  itemsByDay: Map<string, WeekItem[]>;
  onAddJob: (date: Date) => void;
  onRemoveItem?: (id: string) => void;
  onEditItem?: (id: string) => void;
  roomy?: boolean;
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
          const isWeekend = d.getDay() === 0 || d.getDay() === 6;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onAddJob(d)}
              className={`group flex ${roomy ? "min-h-0" : "min-h-[140px]"} flex-col rounded-md border p-2 text-left transition-colors hover:border-primary hover:bg-primary/10 ${
                isToday
                  ? "border-primary/60 bg-primary/5"
                  : isWeekend
                    ? "border-border bg-muted/60 dark:bg-white/10"
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
                  <span className="mt-2 text-[11px] text-muted-foreground/60">—</span>
                ) : (
                  dayItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={(e) => {
                        if (!onEditItem) return;
                        e.stopPropagation();
                        onEditItem(item.id);
                      }}
                      className={`relative min-w-0 rounded border border-border/70 bg-background/60 p-1.5 pr-9 text-[11px] leading-snug ${onEditItem ? "cursor-pointer hover:border-primary/60 hover:bg-background" : ""}`}
                    >
                      <div className="absolute right-0.5 top-0.5 flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                        {onEditItem && (
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditItem(item.id);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.stopPropagation();
                                onEditItem(item.id);
                              }
                            }}
                            aria-label="Edit"
                            className="cursor-pointer rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <Pencil className="h-3 w-3" />
                          </span>
                        )}
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
                            className="cursor-pointer rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 space-y-1">
                        <div className="flex min-w-0 items-start gap-1 text-accent">
                          <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                          <span className="min-w-0 break-words font-medium">{item.bay}</span>
                        </div>
                        <span className="block w-fit max-w-full rounded bg-primary/15 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary">
                          {item.shift === "ALL_DAY" ? "All Day" : item.shift}
                        </span>
                      </div>
                      <p
                        className={`mt-1 break-words rounded px-1 py-0.5 ${workColorClass(item.work)}`}
                      >
                        {item.work}
                        {item.color ? ` — ${item.color}` : ""}
                      </p>
                      <div className="mt-1 flex min-w-0 items-start gap-1 text-muted-foreground">
                        <User className="mt-0.5 h-3 w-3 shrink-0" />
                        <span className="break-words">{item.employee}</span>
                      </div>
                    </div>
                  ))
                )}
                <span className={`${roomy ? "mt-1" : "mt-auto"} flex items-center justify-center gap-1 rounded border border-dashed border-transparent py-1 text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 transition-opacity group-hover:border-primary/40 group-hover:opacity-100`}>
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
  onEditItem,
  onRemoveItem,
}: {
  truckId: string;
  jobs: Job[];
  onAddJob: (date: Date) => void;
  onEditItem?: (id: string) => void;
  onRemoveItem?: (id: string) => void;
}) {
  const truckJobs = useMemo(() => jobs.filter((j) => j.truckId === truckId), [jobs, truckId]);

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

  const weeks = Array.from({ length: weekCount }, (_, i) => addDays(firstWeek, i * 7));

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      {weeks.map((w) => (
        <WeekGrid
          key={toDateKey(w)}
          weekStart={w}
          itemsByDay={jobsByDay}
          onAddJob={onAddJob}
          onEditItem={onEditItem}
          onRemoveItem={onRemoveItem}
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

const BAYS = [
  "Sandblast Area",
  "Outhouse",
  "Yard",
  "Bay 1",
  "Bay 2",
  "Bay 3",
  "Bay 4",
  "Paint Booth 1",
  "Paint Booth 2",
];
const WORK_OPTIONS = [
  "Mixer 2 Color",
  "Mixer 3 Color",
  "Disassembly",
  "Sandblast",
  "Sanding",
  "Paint",
  "Assembly",
  "Check-in",
  "Touchups",
  "Other",
] as const;

function PendingJobForm({
  date,
  existingPending = [],
  initial,
  onAdd,
  onAddMany,
  onCancel,
}: {
  date: Date;
  existingPending?: PendingJob[];
  initial?: Partial<Omit<PendingJob, "id" | "date">>;
  onAdd: (j: Omit<PendingJob, "id" | "date">) => void;
  onAddMany?: (jobs: Omit<PendingJob, "id">[]) => void;
  onCancel: () => void;
}) {
  const initialWorkType = initial?.work
    ? (WORK_OPTIONS as readonly string[]).includes(initial.work)
      ? initial.work
      : "Other"
    : "";
  const [workType, setWorkType] = useState<string>(initialWorkType);
  const [workOther, setWorkOther] = useState(initialWorkType === "Other" ? (initial?.work ?? "") : "");
  const [bay, setBay] = useState(initial?.bay && initial.bay !== "Unassigned" ? initial.bay : "");
  const [employee, setEmployee] = useState(initial?.employee ?? "");
  const [shift, setShift] = useState<Shift>(initial?.shift ?? "ALL_DAY");
  const [color, setColor] = useState(initial?.color ?? "");
  const [mixerColors, setMixerColors] = useState<string[]>(["", "", ""]);
  const isMixer = workType === "Mixer 2 Color" || workType === "Mixer 3 Color";
  const isEditing = !!initial;
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
          <Select value={bay || undefined} onValueChange={setBay}>
            <SelectTrigger>
              <SelectValue placeholder="Select bay" />
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
            placeholder="Enter employee name"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="work">Work to be done</Label>
        <Select
          value={workType}
          onValueChange={(v) => {
            setWorkType(v);
            if (v === "Mixer 2 Color" || v === "Mixer 3 Color") setBay("Bay 4");
          }}
        >
          <SelectTrigger id="work">
            <SelectValue placeholder="Select task" />
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
      {workType === "Paint" && (
        <div className="space-y-1.5">
          <Label htmlFor="paint-color">Color</Label>
          <Input
            id="paint-color"
            placeholder="e.g. Fleet White, PMS 286"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      )}
      {isMixer && (
        <div className="space-y-1.5">
          <Label>Paint Colors</Label>
          {Array.from({ length: workType === "Mixer 2 Color" ? 2 : 3 }).map((_, i) => (
            <Input
              key={i}
              placeholder={`Paint ${i + 1} color`}
              value={mixerColors[i] ?? ""}
              onChange={(e) => {
                const next = [...mixerColors];
                next[i] = e.target.value;
                setMixerColors(next);
              }}
            />
          ))}
        </div>
      )}
      <div className="space-y-1.5">
        <Label>Shift</Label>
        <ToggleGroup
          type="single"
          value={shift}
          onValueChange={(v) => v && setShift(v as Shift)}
          className="grid grid-cols-3 gap-2"
        >
          <ToggleGroupItem
            value="AM"
            className="border border-border data-[state=on]:border-primary"
          >
            AM
          </ToggleGroupItem>
          <ToggleGroupItem
            value="PM"
            className="border border-border data-[state=on]:border-primary"
          >
            PM
          </ToggleGroupItem>
          <ToggleGroupItem
            value="ALL_DAY"
            className="border border-border data-[state=on]:border-primary"
          >
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
            if (!resolvedWork) {
              toast.error("Select work to be done");
              return;
            }
            if (isMixer && onAddMany && !isEditing) {
              const tasks = MIXER_PRESETS[workType];
              const startDate = new Date(date);
              const scheduled: { date: string; bay: string; shift: Shift }[] = [];
              const out: Omit<PendingJob, "id">[] = [];
              let paintIdx = 0;
              const PAINT_COUNTER_KEY = "paint-booth-alternator-v1";
              const SAND_COUNTER_KEY = "sanding-bay-rotator-v1";
              let counter = 0;
              try {
                const raw = localStorage.getItem(PAINT_COUNTER_KEY);
                counter = raw ? parseInt(raw, 10) || 0 : 0;
              } catch {
                counter = 0;
              }
              const paintBay = counter % 2 === 0 ? "Paint Booth 1" : "Paint Booth 2";
              try {
                localStorage.setItem(PAINT_COUNTER_KEY, String(counter + 1));
              } catch {
                /* ignore */
              }
              let sandCounter = 0;
              try {
                const raw = localStorage.getItem(SAND_COUNTER_KEY);
                sandCounter = raw ? parseInt(raw, 10) || 0 : 0;
              } catch {
                sandCounter = 0;
              }
              const SAND_BAYS = ["Bay 1", "Bay 2", "Bay 3"];
              const sandBay = SAND_BAYS[sandCounter % 3];
              try {
                localStorage.setItem(SAND_COUNTER_KEY, String(sandCounter + 1));
              } catch {
                /* ignore */
              }
              tasks.forEach((taskName, i) => {
                const d = i === 0 ? startDate : addBusinessDays(startDate, i);
                const tDateKey = toDateKey(d);
                const isPaint = taskName.startsWith("Paint");
                const paintColor = isPaint ? (mixerColors[paintIdx] ?? "").trim() : "";
                if (isPaint) paintIdx++;
                const chosenBay = isPaint
                  ? paintBay
                  : taskName === "Sanding"
                  ? sandBay
                  : pickBayForTask(taskName, tDateKey, shift, [
                      ...existingPending,
                      ...scheduled,
                    ]);
                scheduled.push({ date: tDateKey, bay: chosenBay, shift });
                out.push({
                   date: tDateKey,
                   work: isPaint ? "Paint" : taskName,
                   bay: chosenBay,
                   employee: employee.trim(),
                   shift,
                   ...(isPaint && paintColor ? { color: paintColor } : {}),
                 });
              });

              onAddMany(out);
              return;
            }
            onAdd({
              work: resolvedWork,
              bay: bay.trim() || "Unassigned",
              employee: employee.trim(),
              shift,
              ...(workType === "Paint" && color.trim() ? { color: color.trim() } : {}),
            });
          }}
        >
          {isEditing ? "Save changes" : "Add to day"}
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

  const rows =
    pending.length === 0
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
        const isOther =
          !WORK_OPTIONS.includes(row.work as (typeof WORK_OPTIONS)[number]) && row.work !== "";
        const workType = isOther ? "Other" : row.work;
        return (
          <div key={row.id} className="space-y-3 rounded-md border border-border bg-card/40 p-3">
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
                onValueChange={(v) => updateRow(row.id, { work: v === "Other" ? "" : v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select task" />
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
              {row.work === "Paint" && (
                <Input
                  placeholder="Color (e.g. Fleet White)"
                  value={row.color ?? ""}
                  onChange={(e) => updateRow(row.id, { color: e.target.value })}
                  className="mt-2"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Bay{workType === "Other" ? " (optional)" : ""}</Label>
                <Select
                  value={row.bay || undefined}
                  onValueChange={(v) => updateRow(row.id, { bay: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select bay" />
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
                <Label>Employee</Label>
                <Input
                  placeholder="Enter employee name"
                  value={row.employee}
                  onChange={(e) => updateRow(row.id, { employee: e.target.value })}
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
                <ToggleGroupItem
                  value="AM"
                  className="border border-border data-[state=on]:border-primary"
                >
                  AM
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="PM"
                  className="border border-border data-[state=on]:border-primary"
                >
                  PM
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="ALL_DAY"
                  className="border border-border data-[state=on]:border-primary"
                >
                  All Day
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        );
      })}

      <Button type="button" variant="outline" className="w-full gap-2" onClick={addRow}>
        <Plus className="h-4 w-4" /> Add another task
      </Button>
    </div>
  );
}

function TruckScheduleForm({
  mode,
  initialTruckId = "",
  initialCompany = "",
  initialPending = [],
  onSubmit,
  onClose,
}: {
  mode: "create" | "edit";
  initialTruckId?: string;
  initialCompany?: string;
  initialPending?: PendingJob[];
  onSubmit: (truckId: string, company: string, jobs: PendingJob[]) => void;
  onClose: () => void;
}) {
  const [truckId, setTruckId] = useState(initialTruckId);
  const [company, setCompany] = useState(initialCompany);
  const [pending, setPending] = useState<PendingJob[]>(initialPending);
  const [weekCount, setWeekCount] = useState(1);
  const [weeksBack, setWeeksBack] = useState(0);
  const [addFor, setAddFor] = useState<Date | null>(null);
  const [editFor, setEditFor] = useState<PendingJob | null>(null);

  const baseWeek = useMemo(() => {
    if (mode === "edit" && initialPending.length > 0) {
      const earliest = initialPending
        .map((p) => new Date(`${p.date}T00:00:00`))
        .sort((a, b) => a.getTime() - b.getTime())[0];
      return startOfWeek(earliest);
    }
    return startOfWeek(new Date());
  }, [mode, initialPending]);
  const firstWeek = useMemo(() => addDays(baseWeek, -weeksBack * 7), [baseWeek, weeksBack]);
  const weeks = Array.from({ length: weekCount + weeksBack }, (_, i) => addDays(firstWeek, i * 7));

  const itemsByDay = useMemo(() => {
    const map = new Map<string, WeekItem[]>();
    for (const p of pending) {
      const arr = map.get(p.date) ?? [];
      arr.push(p);
      map.set(p.date, arr);
    }
    return map;
  }, [pending]);

  const handleSubmit = () => {
    if (!truckId.trim()) {
      toast.error("Enter a truck ID");
      return;
    }
    if (pending.length === 0) {
      toast.error("Add at least one job to the schedule");
      return;
    }
    for (const p of pending) {
      if (!p.date || !p.work.trim()) {
        toast.error("Fill in date and work to be done for every task");
        return;
      }
    }
    onSubmit(truckId.trim().toUpperCase(), company.trim(), pending);
  };

  const submitLabel =
    mode === "create"
      ? `Create truck (${pending.length} ${pending.length === 1 ? "job" : "jobs"})`
      : `Save changes (${pending.length} ${pending.length === 1 ? "job" : "jobs"})`;

  return (
    <div className="flex min-h-0 flex-1 flex-col space-y-4 pr-1">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="ts-truck">Truck ID</Label>
          <Input
            id="ts-truck"
            placeholder="Enter truck ID"
            value={truckId}
            onChange={(e) => setTruckId(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ts-truck-company">Company</Label>
          <Input
            id="ts-truck-company"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Schedule</Label>
        <p className="hidden md:block text-xs text-muted-foreground">
          Click any day to add work for this truck. Click a task to edit it.
        </p>
      </div>

      {/* Desktop / tablet: week calendar grid */}
      <div className="hidden md:flex md:min-h-0 md:flex-1 md:flex-col md:space-y-4 md:overflow-y-auto md:pr-1">
        {weeks.map((w) => (
          <WeekGrid
            key={toDateKey(w)}
            weekStart={w}
            itemsByDay={itemsByDay}
            onAddJob={(d) => setAddFor(d)}
            roomy
            onRemoveItem={(id) => setPending((prev) => prev.filter((p) => p.id !== id))}
            onEditItem={(id) => {
              const item = pending.find((p) => p.id === id);
              if (item) setEditFor(item);
            }}
          />
        ))}
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            onClick={() => setWeeksBack((c) => c + 1)}
          >
            <ChevronUp className="h-4 w-4" /> Show previous week
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            onClick={() => setWeekCount((c) => c + 1)}
          >
            <ChevronDown className="h-4 w-4" /> Show next week
          </Button>
        </div>
      </div>

      {/* Mobile: stacked date + task rows */}
      <div className="md:hidden">
        <MobileTaskRows pending={pending} setPending={setPending} />
      </div>

      <div className="flex justify-end gap-2 border-t border-border pt-3">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="font-display tracking-wider">
          {submitLabel}
        </Button>
      </div>

      <Dialog open={addFor !== null} onOpenChange={(o) => !o && setAddFor(null)}>
        <DialogContent className="max-w-md">
          {addFor && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl tracking-wider">New Job</DialogTitle>
              </DialogHeader>
              <PendingJobForm
                date={addFor}
                existingPending={pending}
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
                onAddMany={(jobs) => {
                  setPending((prev) => [
                    ...prev,
                    ...jobs.map((j) => ({ ...j, id: crypto.randomUUID() })),
                  ]);
                  setAddFor(null);
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={editFor !== null} onOpenChange={(o) => !o && setEditFor(null)}>
        <DialogContent className="max-w-md">
          {editFor && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl tracking-wider">Edit Task</DialogTitle>
              </DialogHeader>
              <PendingJobForm
                date={new Date(`${editFor.date}T00:00:00`)}
                existingPending={pending}
                initial={{
                  work: editFor.work,
                  bay: editFor.bay,
                  employee: editFor.employee,
                  shift: editFor.shift,
                  color: editFor.color,
                }}
                onCancel={() => setEditFor(null)}
                onAdd={(j) => {
                  setPending((prev) =>
                    prev.map((p) =>
                      p.id === editFor.id
                        ? { ...p, ...j, date: editFor.date }
                        : p,
                    ),
                  );
                  setEditFor(null);
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}



function ReschedulePopover({
  currentDate,
  dim,
  onConfirm,
}: {
  currentDate: Date;
  dim: boolean;
  onConfirm: (picked: Date) => void;
}) {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<Date | undefined>(currentDate);

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o) setPicked(currentDate);
      }}
    >
      <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
        <span
          role="button"
          tabIndex={0}
          aria-label="Reschedule from this task"
          className={`cursor-pointer rounded p-0.5 hover:bg-muted ${dim ? "text-muted-foreground" : "text-primary"}`}
        >
          <CalendarIcon className="h-3.5 w-3.5" />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" onClick={(e) => e.stopPropagation()}>
        <Calendar
          mode="single"
          selected={picked}
          onSelect={setPicked}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
        <div className="flex justify-end gap-2 border-t border-border p-2">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => {
              if (!picked) return;
              onConfirm(picked);
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function TruckSchedule({
  jobs,
  addJob,
  updateJob,
  renameTruck,
  onToggleComplete,
  removeJob,
  rescheduleFromJob,
}: {
  jobs: Job[];
  addJob: (j: Omit<Job, "id" | "createdAt">) => void;
  updateJob?: (id: string, updates: Omit<Job, "id" | "createdAt">) => void;
  renameTruck?: (oldId: string, newId: string) => void;
  onToggleComplete?: (id: string) => void;
  removeJob?: (id: string) => void;
  rescheduleFromJob?: (id: string, newDate: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [openTruck, setOpenTruck] = useState<string | null>(null);
  const [addFor, setAddFor] = useState<{ truckId: string; date: Date } | null>(null);
  const [newTruckOpen, setNewTruckOpen] = useState(false);
  const [editTruck, setEditTruck] = useState<string | null>(null);
  const [deleteTruck, setDeleteTruck] = useState<string | null>(null);
  const [deleteJob, setDeleteJob] = useState<Job | null>(null);
  const { getStatus, setField, renameTruckStatus, removeTruckStatus } = useTruckStatus();
  const [companyFilter, setCompanyFilter] = useState<string>("__all__");

  const grouped = useMemo(() => {
    const map = new Map<string, Job[]>();
    for (const j of jobs) {
      const arr = map.get(j.truckId) ?? [];
      arr.push(j);
      map.set(j.truckId, arr);
    }
    return Array.from(map.entries())
      .map(([truckId, list]) => {
        const sorted = list.sort((a, b) => a.date.localeCompare(b.date));
        const company = sorted.find((j) => (j.company ?? "").trim() !== "")?.company?.trim() ?? "";
        return { truckId, jobs: sorted, company };
      })
      .sort((a, b) => {
        const ad = a.jobs[0]?.date ?? "";
        const bd = b.jobs[0]?.date ?? "";
        if (ad !== bd) return ad.localeCompare(bd);
        return a.truckId.localeCompare(b.truckId);
      });
  }, [jobs]);

  const companies = useMemo(() => {
    const set = new Set<string>();
    for (const g of grouped) if (g.company) set.add(g.company);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [grouped]);

  const filtered = grouped.filter((g) => {
    if (companyFilter === "__all__") {
      // no-op
    } else if (companyFilter === "__none__") {
      if (g.company) return false;
    } else if (g.company !== companyFilter) {
      return false;
    }
    const q = query.trim().toLowerCase();
    if (q && !g.truckId.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between border-b border-border pb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Schedule by</p>
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search truck ID…"
            className="pl-9"
          />
        </div>
        <Select value={companyFilter} onValueChange={setCompanyFilter}>
          <SelectTrigger className="sm:w-56">
            <SelectValue placeholder="Filter by company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All companies</SelectItem>
            <SelectItem value="__none__">No company</SelectItem>
            {companies.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 py-12 text-center">
          <Truck className="h-10 w-10 text-muted-foreground/60" />
          <p className="mt-3 text-sm text-muted-foreground">
            {jobs.length === 0 ? "No trucks scheduled yet." : "No trucks match your search."}
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {filtered.map(({ truckId, jobs: tjobs, company }) => {
            const status = getStatus(truckId);
            const grayed = status.completed && status.invoiced;
            return (
              <li key={truckId}>
                <button
                  type="button"
                  onClick={() => setOpenTruck(truckId)}
                  className={`w-full rounded-lg border p-4 text-left transition-colors hover:border-primary/60 ${
                    grayed
                      ? "border-border/50 bg-muted/40 opacity-70"
                      : "border-border bg-card hover:bg-card/80"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2">
                    <div className="flex items-center gap-2">
                      <Truck
                        className={`h-4 w-4 ${grayed ? "text-muted-foreground" : "text-primary"}`}
                      />
                      <span
                        className={`font-display text-xl tracking-wider ${grayed ? "text-muted-foreground line-through" : "text-foreground"}`}
                      >
                        {truckId}
                        {company ? ` - ${company}` : ""}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <label
                        className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer select-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={status.completed}
                          onCheckedChange={(v) => setField(truckId, "completed", v === true)}
                        />
                        Job Completed
                      </label>
                      <label
                        className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer select-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={status.invoiced}
                          onCheckedChange={(v) => setField(truckId, "invoiced", v === true)}
                        />
                        Invoiced
                      </label>
                      <Badge
                        variant="outline"
                        className={grayed ? "border-muted-foreground/30 text-muted-foreground" : ""}
                      >
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
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              setEditTruck(truckId);
                            }
                          }}
                          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-transparent hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </span>
                      )}
                      {removeJob && (
                        <span
                          role="button"
                          tabIndex={0}
                          aria-label={`Delete ${truckId}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTruck(truckId);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              setDeleteTruck(truckId);
                            }
                          }}
                          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-transparent hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {tjobs.map((job) => {
                      const d = new Date(`${job.date}T00:00:00`);
                      const dim = grayed || job.completed;
                      return (
                        <li
                          key={job.id}
                          className={`flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm ${job.completed ? "opacity-60" : ""}`}
                        >
                          {onToggleComplete && (
                            <span onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                checked={!!job.completed}
                                onCheckedChange={() => onToggleComplete(job.id)}
                                aria-label="Mark task complete"
                              />
                            </span>
                          )}
                          <span
                            className={`flex items-center gap-1.5 font-medium ${dim ? "text-muted-foreground" : "text-foreground"}`}
                          >
                            {rescheduleFromJob ? (
                              <ReschedulePopover
                                currentDate={d}
                                dim={!!dim}
                                onConfirm={(picked) => rescheduleFromJob(job.id, toDateKey(picked))}
                              />
                            ) : (
                              <CalendarIcon
                                className={`h-3.5 w-3.5 ${dim ? "text-muted-foreground" : "text-primary"}`}
                              />
                            )}
                            {d.toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <Badge
                            variant="outline"
                            className={
                              dim
                                ? "border-muted-foreground/30 text-muted-foreground"
                                : "border-accent/50 text-accent"
                            }
                          >
                            <MapPin className="mr-1 h-3 w-3" />
                            {job.bay}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-muted-foreground/30 text-muted-foreground"
                          >
                            {job.shift === "ALL_DAY" ? "All Day" : job.shift}
                          </Badge>
                          <span
                            className={`flex-1 rounded px-2 py-0.5 text-xs font-medium ${dim ? "bg-muted/40 text-muted-foreground" : workColorClass(job.work)}`}
                          >
                            {job.work}
                            {job.color ? ` — ${job.color}` : ""}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            {job.employee}
                          </span>
                          {removeJob && (
                            <span
                              role="button"
                              tabIndex={0}
                              aria-label="Delete task"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteJob(job);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.stopPropagation();
                                  setDeleteJob(job);
                                }
                              }}
                              className="ml-auto cursor-pointer rounded p-1 text-muted-foreground hover:bg-transparent hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Dialog open={openTruck !== null} onOpenChange={(o) => !o && setOpenTruck(null)}>
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
                onEditItem={() => setEditTruck(openTruck)}
                onRemoveItem={(id) => {
                  const job = jobs.find((j) => j.id === id && j.truckId === openTruck);
                  if (job) setDeleteJob(job);
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={addFor !== null} onOpenChange={(o) => !o && setAddFor(null)}>
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
        <DialogContent className="flex max-h-[95vh] w-[calc(100%-2rem)] max-w-5xl flex-col">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl tracking-wider">New Truck</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Enter the truck ID and click days on the week to schedule work.
            </p>
          </DialogHeader>
          <TruckScheduleForm
            mode="create"
            onClose={() => setNewTruckOpen(false)}
            onSubmit={(truckId, company, items) => {
              for (const it of items) {
                addJob({
                  truckId,
                  work: it.work,
                  bay: it.bay,
                  employee: it.employee,
                  date: it.date,
                  shift: it.shift,
                  company: company || undefined,
                  color: it.color,
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
        <DialogContent className="flex max-h-[95vh] w-[calc(100%-2rem)] max-w-5xl flex-col">
          {editTruck && (() => {
            const truckJobs = jobs.filter((j) => j.truckId === editTruck);
            const initialCompany =
              truckJobs.find((j) => (j.company ?? "").trim() !== "")?.company?.trim() ?? "";
            const initialPending: PendingJob[] = truckJobs.map((j) => ({
              id: j.id,
              date: j.date,
              work: j.work,
              bay: j.bay,
              employee: j.employee,
              shift: j.shift,
              ...(j.color ? { color: j.color } : {}),
            }));
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl tracking-wider">
                    Edit Truck
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    Update truck details, add new work, or click a scheduled task to edit it.
                  </p>
                </DialogHeader>
                <TruckScheduleForm
                  mode="edit"
                  initialTruckId={editTruck}
                  initialCompany={initialCompany}
                  initialPending={initialPending}
                  onClose={() => setEditTruck(null)}
                  onSubmit={(nextTruckId, nextCompany, items) => {
                    if (nextTruckId !== editTruck && grouped.some((g) => g.truckId === nextTruckId)) {
                      toast.error("A truck with that ID already exists");
                      return;
                    }
                    const originalIds = new Set(truckJobs.map((j) => j.id));
                    const pendingIds = new Set(items.map((p) => p.id));
                    const companyVal = nextCompany || undefined;

                    if (nextTruckId !== editTruck) {
                      renameTruck?.(editTruck, nextTruckId);
                      renameTruckStatus(editTruck, nextTruckId);
                    }

                    // Removals
                    if (removeJob) {
                      for (const j of truckJobs) {
                        if (!pendingIds.has(j.id)) removeJob(j.id);
                      }
                    }

                    // Updates + additions
                    for (const it of items) {
                      if (originalIds.has(it.id) && updateJob) {
                        const orig = truckJobs.find((j) => j.id === it.id)!;
                        const changed =
                          orig.work !== it.work ||
                          orig.bay !== it.bay ||
                          orig.employee !== it.employee ||
                          orig.date !== it.date ||
                          orig.shift !== it.shift ||
                          (orig.color ?? "") !== (it.color ?? "") ||
                          (orig.company ?? "") !== (companyVal ?? "") ||
                          orig.truckId !== nextTruckId;
                        if (changed) {
                          updateJob(it.id, {
                            truckId: nextTruckId,
                            work: it.work,
                            bay: it.bay,
                            employee: it.employee,
                            date: it.date,
                            shift: it.shift,
                            company: companyVal,
                            color: it.color,
                            completed: orig.completed,
                          });
                        }
                      } else if (!originalIds.has(it.id)) {
                        addJob({
                          truckId: nextTruckId,
                          work: it.work,
                          bay: it.bay,
                          employee: it.employee,
                          date: it.date,
                          shift: it.shift,
                          company: companyVal,
                          color: it.color,
                        });
                      }
                    }

                    // Sync company on any untouched original jobs if company changed
                    if (updateJob) {
                      for (const j of truckJobs) {
                        if (!pendingIds.has(j.id)) continue;
                        // already handled above
                      }
                    }

                    toast.success(`Saved ${nextTruckId}`);
                    setEditTruck(null);
                  }}
                />
              </>
            );
          })()}
        </DialogContent>
      </Dialog>


      <AlertDialog open={deleteTruck !== null} onOpenChange={(o) => !o && setDeleteTruck(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete truck {deleteTruck}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the truck and all of its scheduled jobs. This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (!deleteTruck || !removeJob) return;
                const ids = jobs.filter((j) => j.truckId === deleteTruck).map((j) => j.id);
                for (const id of ids) removeJob(id);
                removeTruckStatus(deleteTruck);
                toast.success(`Deleted ${deleteTruck}`);
                setDeleteTruck(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <AlertDialog open={deleteJob !== null} onOpenChange={(o) => !o && setDeleteJob(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Please confirm</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteJob && removeJob) removeJob(deleteJob.id);
                setDeleteJob(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
