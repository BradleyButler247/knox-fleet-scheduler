import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Plus, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toDateKey, jobCoversDate, type Job } from "@/lib/schedule-store";
import { getHoliday } from "@/lib/holidays";

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

function startOfWeek(d: Date) {
  // Monday-based week start
  const s = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dow = s.getDay(); // 0=Sun
  s.setDate(s.getDate() - ((dow + 6) % 7));
  return s;
}

function addDays(d: Date, n: number) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

export function DayGrid({
  date,
  jobs,
  onEditJob,
  onAddJob,
}: {
  date: Date;
  jobs: Job[];
  onEditJob?: (job: Job) => void;
  onAddJob?: (date: Date, truckId?: string) => void;
}) {
  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeek(date));
  const [query, setQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState<string>("__all__");

  // Two weeks of weekdays only (Mon–Fri x 2)
  const days = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => addDays(weekStart, i)).filter(
        (d) => d.getDay() !== 0 && d.getDay() !== 6,
      ),
    [weekStart],
  );
  const dayKeys = days.map(toDateKey);

  const weekJobs = useMemo(
    () => jobs.filter((j) => dayKeys.some((k) => jobCoversDate(j, k))),
    [jobs, dayKeys.join("|")],
  );

  const companies = useMemo(
    () =>
      Array.from(
        new Set(jobs.map((j) => (j.company ?? "").trim()).filter(Boolean)),
      ).sort((a, b) => a.localeCompare(b)),
    [jobs],
  );

  const truckCompanies = useMemo(() => {
    const map = new Map<string, string>();
    for (const j of jobs) {
      const c = (j.company ?? "").trim();
      if (c && !map.has(j.truckId)) map.set(j.truckId, c);
    }
    return map;
  }, [jobs]);

  const truckIds = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Array.from(new Set(weekJobs.map((j) => j.truckId)))
      .filter((id) => {
        if (q && !id.toLowerCase().includes(q)) return false;
        const c = truckCompanies.get(id) ?? "";
        if (companyFilter === "__all__") return true;
        if (companyFilter === "__none__") return !c;
        return c === companyFilter;
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, [weekJobs, query, companyFilter, truckCompanies]);

  const todayKey = toDateKey(new Date());
  const gridCols = "grid grid-cols-[7rem_repeat(10,minmax(0,1fr))]";
  const dividerClass = (i: number) =>
    i === 5 ? "border-l-2 border-l-foreground/40" : "border-l border-border/40";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Two weeks of</p>
          <h2 className="font-display text-2xl text-foreground">
            {days[0].toLocaleDateString(undefined, { month: "long", day: "numeric" })} –{" "}
            {days[days.length - 1].toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Previous week" onClick={() => setWeekStart(addDays(weekStart, -7))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setWeekStart(startOfWeek(new Date()))}>
            This week
          </Button>
          <Button variant="outline" size="icon" aria-label="Next week" onClick={() => setWeekStart(addDays(weekStart, 7))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center print:hidden">
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

      <div className="max-h-[calc(100vh-15rem)] overflow-auto print:max-h-none print:overflow-visible">
        <div className="min-w-[1100px]">
          {/* Header row */}
          <div className={`${gridCols} sticky top-0 z-20 border-b border-border bg-background print:static`}>
            <div className="px-2 py-2 text-xs uppercase tracking-widest text-muted-foreground">Truck</div>
            {days.map((d, i) => {
              const key = toDateKey(d);
              const holiday = getHoliday(d);
              return (
                <div
                  key={key}
                  className={`px-2 py-2 text-center ${dividerClass(i)} ${key === todayKey ? "bg-primary/10" : ""}`}
                >
                  <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    {d.toLocaleDateString(undefined, { weekday: "short" })}
                  </p>
                  <p className="font-display text-lg leading-tight text-foreground">
                    {d.toLocaleDateString(undefined, { month: "numeric", day: "numeric" })}
                  </p>
                  {holiday && (
                    <p className="truncate text-[0.6rem] text-destructive">{holiday.short}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Truck rows */}
          {truckIds.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No jobs scheduled in these two weeks.
            </div>
          ) : (
            truckIds.map((truckId) => (
              <div
                key={truckId}
                className={`${gridCols} border-b border-border/60`}
              >
                <div className="flex items-center px-2 py-2 font-display text-base tracking-wider [overflow-wrap:anywhere]">
                  {truckId}
                </div>
                {days.map((d, i) => {
                  const key = toDateKey(d);
                  const cellJobs = weekJobs.filter(
                    (j) => j.truckId === truckId && jobCoversDate(j, key),
                  );
                  return (
                    <div
                      key={key}
                      className={`min-h-[4.5rem] space-y-1 p-1 ${dividerClass(i)} ${
                        key === todayKey ? "bg-primary/5" : ""
                      }`}
                    >
                      {cellJobs.map((job) => (
                        <button
                          key={job.id}
                          type="button"
                          onClick={() => onEditJob?.(job)}
                          className={`w-full rounded-md border px-1.5 py-1 text-left text-xs transition-colors hover:border-accent ${workColorClass(
                            job.work,
                          )} ${job.completed ? "opacity-60 line-through" : ""}`}
                        >
                          <span className="block font-medium [overflow-wrap:anywhere]">
                            {job.work}
                            {job.color ? ` — ${job.color}` : ""}
                          </span>
                          <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.65rem] opacity-80">
                            <span className="inline-flex items-center gap-0.5">
                              <MapPin className="h-2.5 w-2.5" />
                              {/^\d+$/.test(job.bay) ? `Bay ${job.bay}` : job.bay}
                            </span>
                            <span className="inline-flex items-center gap-0.5 [overflow-wrap:anywhere]">
                              <User className="h-2.5 w-2.5" />
                              {job.employee}
                            </span>
                          </span>
                        </button>
                      ))}
                      {onAddJob && (
                        <button
                          type="button"
                          onClick={() => onAddJob(d, truckId)}
                          aria-label={`Add job on ${key}`}
                          className="flex w-full items-center justify-center rounded-md border border-dashed border-transparent py-1 text-muted-foreground opacity-0 transition hover:border-accent hover:text-accent focus:opacity-100 group-hover:opacity-100 hover:opacity-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{weekJobs.length} jobs in view</Badge>
        {onAddJob && (
          <Button size="sm" variant="outline" onClick={() => onAddJob(date)}>
            <Plus className="h-4 w-4" /> Add job
          </Button>
        )}
      </div>
    </div>
  );
}
