import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
import { toDateKey, type Job, type Shift } from "@/lib/schedule-store";
import { isNonBusinessDay } from "@/lib/holidays";
import { useJobHours } from "@/lib/job-hours-store";
import { Clock, Plus, Trash2 } from "lucide-react";

import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";


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
const WORK_OPTIONS = ["Mixer 2 Color", "Mixer 3 Color", "Disassembly", "Sandblast", "Sanding", "Paint", "Assembly", "Check-in", "Touchups", "Other"] as const;

export const MIXER_PRESETS: Record<string, string[]> = {
  "Mixer 2 Color": ["Disassembly", "Sandblast", "Sanding", "Paint 1", "Paint 2", "Assembly"],
  "Mixer 3 Color": ["Disassembly", "Sandblast", "Sanding", "Paint 1", "Paint 2", "Paint 3", "Assembly"],
};

export function pickBayForTask(
  task: string,
  dateKey: string,
  shift: Shift,
  existing: { date: string; bay: string; shift: Shift }[],
): string {
  const overlapsShift = (a: Shift, b: Shift) =>
    a === "ALL_DAY" || b === "ALL_DAY" || a === b;
  const isOccupied = (bay: string) =>
    existing.some(
      (j) => j.date === dateKey && j.bay === bay && overlapsShift(j.shift, shift),
    );
  const countOnDay = (bay: string) =>
    existing.filter((j) => j.date === dateKey && j.bay === bay).length;
  const pickFromOptions = (options: string[]) => {
    const free = options.find((o) => !isOccupied(o));
    if (free) return free;
    return options.reduce((min, b) => (countOnDay(b) < countOnDay(min) ? b : min), options[0]);
  };

  if (task === "Disassembly" || task === "Assembly") return "Bay 4";
  if (task === "Sandblast") return "Sandblast Area";
  if (task === "Sanding") return pickFromOptions(["Bay 1", "Bay 2", "Bay 3"]);
  if (task.startsWith("Paint")) return pickFromOptions(["Paint Booth 1", "Paint Booth 2"]);
  return "Unassigned";
}

export function addBusinessDays(date: Date, days: number): Date {
  const d = new Date(date);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    if (!isNonBusinessDay(d)) added++;
  }
  return d;
}


function parseWork(work: string): { type: string; other: string } {
  if (!work) return { type: "", other: "" };
  const match = (WORK_OPTIONS as readonly string[]).find((o) => o !== "Other" && o === work);
  if (match) return { type: match, other: "" };
  return { type: "Other", other: work };
}

function shiftsOverlap(a: Shift, b: Shift) {
  if (a === "ALL_DAY" || b === "ALL_DAY") return true;
  return a === b;
}

function shiftLabel(s: Shift) {
  return s === "ALL_DAY" ? "All Day" : s;
}

export function ScheduleForm({
  selectedDate,
  initialJob,
  defaultTruckId,
  lockTruckId,
  defaultBay,
  existingJobs = [],
  onSubmit,
  onDelete,
}: {
  selectedDate: Date;
  initialJob?: Job;
  defaultTruckId?: string;
  lockTruckId?: boolean;
  defaultBay?: string;
  existingJobs?: Job[];
  onSubmit: (j: Omit<Job, "id" | "createdAt">) => void;
  onDelete?: (id: string) => void;
}) {
  const isEdit = Boolean(initialJob);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [conflictConfirm, setConflictConfirm] = useState<{
    existing: Job;
    payload: Omit<Job, "id" | "createdAt">;
  } | null>(null);
  const [duplicateBlock, setDuplicateBlock] = useState<Job | null>(null);
  const [duplicateConfirm, setDuplicateConfirm] = useState<{
    existing: Job;
    payload: Omit<Job, "id" | "createdAt">;
  } | null>(null);
  const [truckId, setTruckId] = useState(
    initialJob?.truckId ?? defaultTruckId ?? "",
  );
  const initialWork = parseWork(initialJob?.work ?? "");
  const [workType, setWorkType] = useState<string>(initialWork.type);
  const [workOther, setWorkOther] = useState<string>(initialWork.other);
  const [bay, setBay] = useState(initialJob?.bay ?? defaultBay ?? "");
  const [employee, setEmployee] = useState(initialJob?.employee ?? "");
  const [shift, setShift] = useState<Shift>(initialJob?.shift ?? "ALL_DAY");
  const [color, setColor] = useState(initialJob?.color ?? "");
  const [company, setCompany] = useState(initialJob?.company ?? "");
  const [mixerColors, setMixerColors] = useState<string[]>(["", "", ""]);
  const [dateKeyState, setDateKeyState] = useState(
    initialJob?.date ?? toDateKey(selectedDate),
  );

  const isMixer = workType === "Mixer 2 Color" || workType === "Mixer 3 Color";
  const resolvedWork = workType === "Other" ? workOther.trim() : workType;
  const bayRequired = workType !== "Other";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!truckId.trim() || !resolvedWork) {
      toast.error("Fill in truck ID and work to be done");
      return;
    }
    const finalBay = bay.trim() || "Unassigned";
    let dateKey = isEdit ? dateKeyState : toDateKey(selectedDate);
    // Never schedule on a non-business day (weekend or holiday) — bump forward.
    {
      const d = new Date(`${dateKey}T00:00:00`);
      while (isNonBusinessDay(d)) d.setDate(d.getDate() + 1);
      dateKey = toDateKey(d);
    }
    const normalizedTruck = truckId.trim().toUpperCase();


    if (isMixer && !isEdit) {
      const tasks = MIXER_PRESETS[workType];
      const startDate = new Date(`${dateKey}T00:00:00`);
      const scheduled: { date: string; bay: string; shift: Shift }[] = [];
      let paintIdx = 0;
      const PAINT_COUNTER_KEY = "paint-booth-alternator-v1";
      // Shared counter so alternation works across all users.
      const { data: bumpValue, error: bumpError } = await supabase.rpc(
        "bump_counter",
        { _key: PAINT_COUNTER_KEY },
      );
      if (bumpError) console.error("[paint counter] bump failed", bumpError);
      const counter = Number(bumpValue ?? 0);
      // bump_counter returns the NEW value; the "current" booth uses value-1.
      const paintBay = (counter - 1) % 2 === 0 ? "Paint Booth 1" : "Paint Booth 2";
      const sandBay = "Bay 1";

      tasks.forEach((taskName, i) => {
        const d = i === 0 ? startDate : addBusinessDays(startDate, i);
        const tDateKey = toDateKey(d);
        const isPaint = taskName.startsWith("Paint");
        const paintColor = isPaint ? (mixerColors[paintIdx] ?? "").trim() : "";
        if (isPaint) paintIdx++;
        let chosenBay: string;
        if (isPaint) {
          chosenBay = paintBay;
        } else if (taskName === "Sanding") {
          chosenBay = sandBay;
        } else {
          chosenBay = pickBayForTask(taskName, tDateKey, shift, [
            ...existingJobs,
            ...scheduled,
          ]);
        }

        scheduled.push({ date: tDateKey, bay: chosenBay, shift });
        onSubmit({
          truckId: normalizedTruck,
          work: isPaint ? "Paint" : taskName,
          bay: chosenBay,
          employee: employee.trim(),
          date: tDateKey,
          shift,
          ...(company.trim() ? { company: company.trim() } : {}),
          ...(isPaint && paintColor ? { color: paintColor } : {}),
        });
      });
      toast.success(`Scheduled ${tasks.length} tasks for ${normalizedTruck}`);
      setTruckId("");
      setWorkType("Assembly");
      setWorkOther("");
      setEmployee("");
      setColor("");
      setMixerColors(["", "", ""]);
      return;
    }

    const payload = {
      truckId: normalizedTruck,
      work: resolvedWork,
      bay: finalBay,
      employee: employee.trim(),
      date: dateKey,
      shift,
      ...(company.trim() ? { company: company.trim() } : {}),
      ...(workType === "Paint" && color.trim() ? { color: color.trim() } : {}),
    };

    if (finalBay) {
      const clash = existingJobs.find(
        (j) =>
          j.id !== initialJob?.id &&
          j.date === dateKey &&
          j.bay === finalBay &&
          shiftsOverlap(j.shift, shift) &&
          j.truckId !== normalizedTruck,
      );
      if (clash) {
        setConflictConfirm({ existing: clash, payload });
        return;
      }
    }

    if (workType !== "Other") {
      const sameTruckTask = existingJobs.filter(
        (j) =>
          j.id !== initialJob?.id &&
          j.truckId === normalizedTruck &&
          j.work === resolvedWork,
      );
      const sameDay = sameTruckTask.find((j) => j.date === dateKey);
      if (sameDay) {
        setDuplicateBlock(sameDay);
        return;
      }
      if (sameTruckTask.length > 0) {
        setDuplicateConfirm({ existing: sameTruckTask[0], payload });
        return;
      }
    }

    finalizeSubmit(payload);
  };


  const finalizeSubmit = (payload: Omit<Job, "id" | "createdAt">) => {
    onSubmit(payload);
    toast.success(
      isEdit
        ? `Job updated for ${selectedDate.toLocaleDateString()}`
        : `Job booked for ${selectedDate.toLocaleDateString()}`,
    );
    if (!isEdit) {
      setTruckId("");
      setWorkType("Assembly");
      setWorkOther("");
      setEmployee("");
      setColor("");
      setCompany("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="truck">Truck ID</Label>
          <Input
            id="truck"
            placeholder="Enter truck ID"
            value={truckId}
            onChange={(e) => setTruckId(e.target.value)}
            disabled={lockTruckId}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bay">Bay{bayRequired ? "" : " (optional)"}</Label>
          <Select value={bay || undefined} onValueChange={setBay}>
            <SelectTrigger id="bay">
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
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          placeholder="Enter company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>


      <div className="space-y-1.5">
        <Label htmlFor="work">Work to be done</Label>
        <Select
          value={workType}
          onValueChange={(v) => {
            setWorkType(v);
            if (v === "Mixer 2 Color" || v === "Mixer 3 Color") setBay("Bay 4");
            if (v === "Assembly" || v === "Disassembly") setBay("Bay 4");
            if (v === "Sandblast") setBay("Sandblast Area");
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
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
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
        <Label htmlFor="emp">Employee</Label>
        <Input
          id="emp"
          placeholder="Enter employee name"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        />
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

      {isEdit && (
        <div className="space-y-1.5">
          <Label htmlFor="job-date">Date</Label>
          <Input
            id="job-date"
            type="date"
            value={dateKeyState}
            onChange={(e) => setDateKeyState(e.target.value)}
          />
        </div>
      )}


      <Button type="submit" variant="default" className="w-full text-base font-normal tracking-wider">
        {isEdit
          ? "Save changes"
          : `Schedule for ${selectedDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`}
      </Button>

      {isEdit && onDelete && initialJob && (
        <>
          <Button
            type="button"
            variant="destructive"
            className="w-full text-base font-normal tracking-wider"
            onClick={() => setConfirmOpen(true)}
          >
            Delete task
          </Button>
          <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
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
                  onClick={() => {
                    onDelete(initialJob.id);
                    setConfirmOpen(false);
                  }}
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      <AlertDialog open={conflictConfirm !== null} onOpenChange={(o) => !o && setConflictConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Scheduling conflict</AlertDialogTitle>
            <AlertDialogDescription>
              {conflictConfirm && (
                <>
                  Bay {String(conflictConfirm.existing.bay).replace(/\D/g, "") || conflictConfirm.existing.bay} is already scheduled {conflictConfirm.existing.shift === "ALL_DAY" ? "all day" : `during ${shiftLabel(conflictConfirm.existing.shift)}`} for {conflictConfirm.existing.work} on truck {conflictConfirm.existing.truckId}. Would you still like to add this task?
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConflictConfirm(null)}>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (conflictConfirm) finalizeSubmit(conflictConfirm.payload);
                setConflictConfirm(null);
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <AlertDialog open={duplicateBlock !== null} onOpenChange={(o) => !o && setDuplicateBlock(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Duplicate task</AlertDialogTitle>
            <AlertDialogDescription>
              {duplicateBlock && (
                <>
                  {duplicateBlock.truckId} is already scheduled for {duplicateBlock.work} on bay {String(duplicateBlock.bay).replace(/\D/g, "") || duplicateBlock.bay}
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setDuplicateBlock(null)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={duplicateConfirm !== null} onOpenChange={(o) => !o && setDuplicateConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Duplicate task</AlertDialogTitle>
            <AlertDialogDescription>
              {duplicateConfirm && (
                <>
                  {duplicateConfirm.existing.truckId} is already scheduled on {new Date(duplicateConfirm.existing.date + "T00:00:00").toLocaleDateString()} for {duplicateConfirm.existing.work} on bay {String(duplicateConfirm.existing.bay).replace(/\D/g, "") || duplicateConfirm.existing.bay}. Would you still like to add this task?
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDuplicateConfirm(null)}>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (duplicateConfirm) finalizeSubmit(duplicateConfirm.payload);
                setDuplicateConfirm(null);
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}

export function HoursSection({
  jobId,
  defaultPerson,
  defaultDate,
}: {
  jobId: string;
  defaultPerson: string;
  defaultDate: string;
}) {
  const { getHours, addHours, deleteHours } = useJobHours();
  const entries = getHours(jobId);

  const [adding, setAdding] = useState(false);
  const [person, setPerson] = useState(defaultPerson);
  const [date, setDate] = useState(defaultDate);
  const [start, setStart] = useState("");
  const [stop, setStop] = useState("");

  const openAdd = () => {
    setPerson(defaultPerson);
    setDate(defaultDate);
    setStart("");
    setStop("");
    setAdding(true);
  };

  const save = async () => {
    if (!person.trim() || !date) {
      toast.error("Enter a name and date");
      return;
    }
    await addHours(jobId, {
      person: person.trim(),
      date,
      startTime: start || null,
      stopTime: stop || null,
    });
    setAdding(false);
  };

  const formatTime = (t: string | null) => {
    if (!t) return "—";
    const [h, m] = t.split(":");
    const hour = Number(h);
    const suffix = hour >= 12 ? "PM" : "AM";
    const hh = ((hour + 11) % 12) + 1;
    return `${hh}:${m} ${suffix}`;
  };

  return (
    <div className="space-y-2 rounded-lg border border-border bg-card/40 p-3">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-1.5 text-sm">
          <Clock className="h-4 w-4" /> Hours
        </Label>
        {!adding && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-7 gap-1 px-2 text-xs"
            onClick={openAdd}
          >
            <Plus className="h-3.5 w-3.5" /> Add hours
          </Button>
        )}
      </div>

      {entries.length > 0 && (
        <ul className="space-y-1.5">
          {entries.map((h) => (
            <li
              key={h.id}
              className="flex items-center gap-2 rounded border border-border/60 bg-background/60 px-2 py-1.5 text-xs"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-foreground">{h.person}</div>
                <div className="text-muted-foreground">
                  {new Date(`${h.date}T00:00:00`).toLocaleDateString()} · {formatTime(h.startTime)} – {formatTime(h.stopTime)}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={() => deleteHours(jobId, h.id)}
                aria-label="Delete hours"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {adding && (
        <div className="space-y-2 rounded border border-border/60 bg-background/60 p-2">
          <div className="space-y-1">
            <Label htmlFor="hours-person" className="text-xs">Name</Label>
            <Input
              id="hours-person"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              placeholder="Person"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="hours-date" className="text-xs">Date</Label>
            <Input
              id="hours-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="hours-start" className="text-xs">Start</Label>
              <Input
                id="hours-start"
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="hours-stop" className="text-xs">Stop</Label>
              <Input
                id="hours-stop"
                type="time"
                value={stop}
                onChange={(e) => setStop(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setAdding(false)}
            >
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={save}>
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
