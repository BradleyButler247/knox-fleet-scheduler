import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HoursSection } from "@/components/ScheduleForm";

export function JobHoursDialog({
  jobId,
  defaultPerson,
  defaultDate,
  truckId,
  trigger,
}: {
  jobId: string;
  defaultPerson: string;
  defaultDate: string;
  truckId?: string;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display tracking-wider">
            Hours{truckId ? ` — ${truckId}` : ""}
          </DialogTitle>
        </DialogHeader>
        <HoursSection
          jobId={jobId}
          defaultPerson={defaultPerson}
          defaultDate={defaultDate}
        />
      </DialogContent>
    </Dialog>
  );
}
