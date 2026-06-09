import { Truck, MapPin, User, X, ClipboardList, Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toDateKey, type Job } from "@/lib/schedule-store";

function workColorClass(work: string) {
  switch (work) {
    case "Assembly":
    case "Disassembly":
      return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/40";
    case "Sandblast":
      return "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/40";
    case "Sanding":
      return "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/40";
    case "Paint":
      return "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/40";
    default:
      return "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/40";
  }
}

export function DaySchedule({
  date,
  jobs,
  onRemove,
  onEdit,
  onToggleComplete,
}: {
  date: Date;
  jobs: Job[];
  onRemove: (id: string) => void;
  onEdit?: (job: Job) => void;
  onToggleComplete?: (id: string) => void;
}) {
  const dayJobs = jobs
    .filter((j) => j.date === toDateKey(date))
    .sort((a, b) => a.bay.localeCompare(b.bay));

  return (
    <div className="space-y-4">


      {dayJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 py-12 text-center">
          <ClipboardList className="h-10 w-10 text-muted-foreground/60" />
          <p className="mt-3 text-sm text-muted-foreground">
            No jobs scheduled. Add one to fill the bays.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {dayJobs.map((job) => (
            <li
              key={job.id}
              className={`group relative overflow-hidden rounded-lg border bg-card p-4 transition-colors hover:border-primary/50 ${
                job.completed
                  ? "border-border/40 opacity-60"
                  : "border-border"
              }`}
            >
              <div
                className={`absolute left-0 top-0 h-full w-1 ${
                  job.completed ? "bg-muted-foreground/40" : "bg-primary"
                }`}
              />
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-3 pl-2">
                  {onToggleComplete && (
                    <Checkbox
                      checked={Boolean(job.completed)}
                      onCheckedChange={() => onToggleComplete(job.id)}
                      aria-label="Mark complete"
                      className="mt-1"
                    />
                  )}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <span
                        className={`font-display text-xl tracking-wider text-foreground ${
                          job.completed ? "line-through" : ""
                        }`}
                      >
                        {job.truckId}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="border-accent/50 text-accent whitespace-nowrap">
                        <MapPin className="mr-1 h-3 w-3" />
                        {/^\d+$/.test(job.bay) ? `Bay ${job.bay}` : job.bay}
                      </Badge>
                      <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground whitespace-nowrap">
                        {job.shift === "ALL_DAY" ? "All Day" : job.shift}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`whitespace-nowrap ${workColorClass(job.work)} ${job.completed ? "line-through opacity-70" : ""}`}
                      >
                        {job.work}{job.color ? ` — ${job.color}` : ""}
                      </Badge>
                      {job.completed && (
                        <Badge variant="secondary" className="gap-1 whitespace-nowrap">
                          <Check className="h-3 w-3" /> Done
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{job.employee}</span>
                    </div>
                  </div>
                </div>
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(job)}
                    aria-label="Edit job"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
