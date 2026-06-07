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
import { toast } from "sonner";

const BAYS = ["Bay 1", "Bay 2", "Bay 3", "Bay 4", "Bay 5"];
const WORK_OPTIONS = ["Assembly", "Disassembly", "Sandblast", "Sanding", "Paint", "Other"] as const;

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
  existingJobs = [],
  onSubmit,
  onDelete,
}: {
  selectedDate: Date;
  initialJob?: Job;
  defaultTruckId?: string;
  lockTruckId?: boolean;
  existingJobs?: Job[];
  onSubmit: (j: Omit<Job, "id" | "createdAt">) => void;
  onDelete?: (id: string) => void;
}) {
  const isEdit = Boolean(initialJob);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [conflict, setConflict] = useState<Job | null>(null);
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
  const [bay, setBay] = useState((initialJob?.bay ?? "").replace(/\D/g, ""));
  const [employee, setEmployee] = useState(initialJob?.employee ?? "");
  const [shift, setShift] = useState<Shift>(initialJob?.shift ?? "ALL_DAY");

  const resolvedWork = workType === "Other" ? workOther.trim() : workType;
  const bayRequired = workType !== "Other";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!truckId.trim() || !resolvedWork || !employee.trim()) {
      toast.error("Fill in truck ID, work and employee");
      return;
    }
    if (bayRequired && !bay.trim()) {
      toast.error("Enter a bay number");
      return;
    }
    const finalBay = bay.trim();
    const dateKey = toDateKey(selectedDate);

    const normalizedTruck = truckId.trim().toUpperCase();
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
        setConflict(clash);
        return;
      }
    }

    const payload = {
      truckId: normalizedTruck,
      work: resolvedWork,
      bay: finalBay,
      employee: employee.trim(),
      date: dateKey,
      shift,
    };

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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="truck">Truck ID</Label>
          <Input
            id="truck"
            placeholder="-- Please enter a truck ID --"
            value={truckId}
            onChange={(e) => setTruckId(e.target.value)}
            disabled={lockTruckId}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bay">Bay #{bayRequired ? "" : " (optional)"}</Label>
          <Input
            id="bay"
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            placeholder="-- Please enter a bay # --"
            value={bay}
            onChange={(e) => setBay(e.target.value.replace(/\D/g, ""))}
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
        <Label htmlFor="emp">Employee</Label>
        <Input
          id="emp"
          placeholder="-- Please enter an employee --"
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

      <AlertDialog open={conflict !== null} onOpenChange={(o) => !o && setConflict(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Scheduling conflict</AlertDialogTitle>
            <AlertDialogDescription>
              {conflict && (
                <>
                  Bay {String(conflict.bay).replace(/\D/g, "") || conflict.bay} is already scheduled {conflict.shift === "ALL_DAY" ? "all day" : `during ${shiftLabel(conflict.shift)}`} for {conflict.work} on truck {conflict.truckId}. Please adjust scheduling.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setConflict(null)}>OK</AlertDialogAction>
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
