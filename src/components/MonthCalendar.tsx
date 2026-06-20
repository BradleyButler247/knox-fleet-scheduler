import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toDateKey, type Job } from "@/lib/schedule-store";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

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

function SingleMonth({
  month,
  selected,
  onSelect,
  jobs,
  compact = false,
  headerRight,
}: {
  month: Date;
  selected: Date;
  onSelect: (d: Date) => void;
  jobs: Job[];
  compact?: boolean;
  headerRight?: React.ReactNode;
}) {
  const today = new Date();

  const jobsByDate = useMemo(() => {
    const map = new Map<string, Job[]>();
    for (const j of jobs) {
      const arr = map.get(j.date) ?? [];
      arr.push(j);
      map.set(j.date, arr);
    }
    return map;
  }, [jobs]);

  const cells = useMemo(() => {
    const first = startOfMonth(month);
    const offset = first.getDay(); // 0 = Sunday
    const start = new Date(first);
    start.setDate(first.getDate() - offset);
    return Array.from({ length: 35 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [month]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-2xl tracking-wider">
          {month.toLocaleString(undefined, { month: "long", year: "numeric" })}
        </h3>
        {headerRight}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((d) => {
          const inMonth = d.getMonth() === month.getMonth();
          const isSelected = sameDay(d, selected);
          const isToday = sameDay(d, today);
          const dateKey = toDateKey(d);
          const dayJobs = jobsByDate.get(dateKey) ?? [];

          return (
            <DayCell
              key={d.toISOString()}
              date={d}
              inMonth={inMonth}
              isSelected={isSelected}
              isToday={isToday}
              dayJobs={dayJobs}
              onSelect={onSelect}
              compact={compact}
            />
          );
        })}
      </div>
    </div>
  );
}

const ITEM_HEIGHT = 16; // px per task row (badge body)
const ITEM_GAP = 2; // px gap between rows (space-y-0.5)
const MORE_HEIGHT = 12; // px for "+N more" row

function CountBadge({
  fractionLabel,
  fallbackLabel,
  allDone,
}: {
  fractionLabel: string;
  fallbackLabel: string;
  allDone: boolean;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Measure against parent width so we know if fraction fits
        const parent = el.parentElement;
        if (!parent) return;
        // Temporarily render fraction to test
        const test = document.createElement("span");
        test.textContent = fractionLabel;
        test.style.cssText = window.getComputedStyle(el).cssText;
        test.style.visibility = "hidden";
        test.style.position = "absolute";
        test.style.whiteSpace = "nowrap";
        document.body.appendChild(test);
        const fractionWidth = test.getBoundingClientRect().width;
        document.body.removeChild(test);
        // available width = parent width minus the date number span
        const dateSpan = parent.firstElementChild as HTMLElement | null;
        const dateWidth = dateSpan ? dateSpan.getBoundingClientRect().width : 0;
        const available = parent.getBoundingClientRect().width - dateWidth - 4;
        setOverflow(fractionWidth > available);
      });
    };
    check();
    const ro = new ResizeObserver(check);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [fractionLabel]);

  const label = overflow ? fallbackLabel : fractionLabel;
  return (
    <span
      ref={ref}
      className={cn(
        "rounded-sm px-1 text-[9px] font-bold leading-tight whitespace-nowrap",
        allDone
          ? "bg-green-500/20 text-green-700 dark:text-green-300"
          : "bg-primary/20 text-primary",
      )}
    >
      {label}
    </span>
  );
}

function DayCell({
  date,
  inMonth,
  isSelected,
  isToday,
  dayJobs,
  onSelect,
  compact,
}: {
  date: Date;
  inMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  dayJobs: Job[];
  onSelect: (d: Date) => void;
  compact: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [metrics, setMetrics] = useState<{ fitAll: number; fitWithMore: number }>({
    fitAll: dayJobs.length,
    fitWithMore: dayJobs.length,
  });

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let raf = 0;
    const recompute = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = el.clientHeight;
        // How many full badges fit if we show all (no "+N more"):
        // n badges occupy n*ITEM_HEIGHT + (n-1)*ITEM_GAP
        const fitAll = Math.max(
          0,
          Math.floor((h + ITEM_GAP) / (ITEM_HEIGHT + ITEM_GAP)),
        );
        // How many full badges fit when reserving space for the "+N more" row:
        // n badges + gap + more row = n*ITEM_HEIGHT + n*ITEM_GAP + MORE_HEIGHT
        const fitWithMore = Math.max(
          0,
          Math.floor(
            (h - MORE_HEIGHT) / (ITEM_HEIGHT + ITEM_GAP),
          ),
        );
        setMetrics({ fitAll, fitWithMore });
      });
    };
    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [dayJobs.length]);

  const { fitAll, fitWithMore } = metrics;
  const showAll = expanded || dayJobs.length <= fitAll;
  const visible = showAll ? dayJobs : dayJobs.slice(0, fitWithMore);
  const hidden = dayJobs.length - visible.length;

  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  return (
    <button
      onClick={() => onSelect(date)}
      className={cn(
        "group @container/day relative flex flex-col items-stretch overflow-hidden rounded-md border border-border/50 p-1.5 text-left transition-all",
        isWeekend ? "bg-muted/60 dark:bg-white/10" : "bg-card/40",
        !expanded && "aspect-square",
        isWeekend ? "hover:border-primary/60 hover:bg-muted dark:hover:bg-white/15" : "hover:border-primary/60 hover:bg-card",
        !inMonth && "opacity-35",
        isSelected && "border-primary bg-primary/10 ring-1 ring-primary",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "font-display text-sm leading-none",
            isToday && "text-primary",
            !isToday && "text-foreground/80",
          )}
        >
          {date.getDate()}
        </span>
        {dayJobs.length > 0 && (() => {
          const done = dayJobs.filter((j) => j.completed).length;
          const total = dayJobs.length;
          const allDone = done === total;
          const fractionLabel = done === 0 || allDone ? `${total}` : `${done}/${total}`;
          return (
            <CountBadge
              fractionLabel={fractionLabel}
              fallbackLabel={`${total}`}
              allDone={allDone}
            />
          );
        })()}
      </div>

      {!compact && dayJobs.length > 0 && (
        <>
          {/* Wide: as many badges as fit + "+N more" */}
          <div
            ref={listRef}
            className="mt-1 flex-1 space-y-0.5 overflow-hidden hidden @[5rem]/day:block"
          >
            {visible.map((j) => (
              <div
                key={j.id}
                className={cn(
                  "flex items-center gap-1 truncate rounded-sm px-1 py-0.5 text-[10px] leading-tight",
                  j.completed
                    ? "bg-muted text-muted-foreground"
                    : workColorClass(j.work),
                )}
                title={`${j.truckId} — ${j.work} (${j.bay})${j.completed ? " ✓" : ""}`}
              >
                <span
                  className={cn(
                    "truncate",
                    j.completed && "line-through opacity-80",
                  )}
                >
                  <span className="font-semibold">{j.truckId}</span>
                  <span className="ml-1 text-foreground/70">{j.work}</span>
                </span>
                {j.completed ? (
                  <Check className="ml-auto h-3 w-3 shrink-0" />
                ) : (
                  <span className="ml-auto shrink-0 font-semibold tabular-nums opacity-80">
                    {String(j.bay).replace(/\D/g, "")}
                  </span>
                )}
              </div>
            ))}
            {hidden > 0 && !expanded && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    setExpanded(true);
                  }
                }}
                className="block cursor-pointer text-[9px] text-muted-foreground hover:text-foreground"
              >
                +{hidden} more
              </span>
            )}
            {expanded && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    setExpanded(false);
                  }
                }}
                className="block cursor-pointer text-[9px] text-muted-foreground hover:text-foreground"
              >
                Show less
              </span>
            )}
          </div>

          {/* Medium: no extra text — count badge in header already shows totals */}
        </>
      )}

    </button>
  );
}

export function MonthCalendar({
  month,
  onMonthChange,
  selected,
  onSelect,
  jobs,
  compact = false,
}: {
  month: Date;
  onMonthChange: (d: Date) => void;
  selected: Date;
  onSelect: (d: Date) => void;
  jobs: Job[];
  compact?: boolean;
}) {
  const [count, setCount] = useState(1);
  const today = new Date();

  const months = Array.from({ length: count }, (_, i) => addMonths(month, i));

  return (
    <div className="space-y-6">
      {months.map((m, idx) => (
        <SingleMonth
          key={`${m.getFullYear()}-${m.getMonth()}`}
          month={m}
          selected={selected}
          onSelect={onSelect}
          jobs={jobs}
          compact={compact}
          headerRight={
            idx === 0 ? (
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-accent/20 hover:text-accent"
                onClick={() => {
                  onMonthChange(startOfMonth(today));
                  onSelect(today);
                  setCount(1);
                }}
              >
                Today
              </Button>
            ) : null
          }
        />
      ))}
      <div className="flex gap-2">
        {count > 1 && (
          <Button
            type="button"
            variant="outline"
            className="flex-1 hover:bg-accent/20 hover:text-accent hover:border-accent"
            aria-label="Collapse to single month"
            onClick={() => setCount(1)}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          className="flex-1 hover:bg-accent/20 hover:text-accent hover:border-accent"
          aria-label="Show next month"
          onClick={() => setCount((c) => c + 1)}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
