import { MapPin, Truck, StickyNote, ChevronDown, ChevronLeft, ChevronRight, User, Calendar as CalendarIcon, Plus, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ScheduleForm } from "@/components/ScheduleForm";
import { useEffect, useRef, useState } from "react";
import { toDateKey, type Job } from "@/lib/schedule-store";

type Cell = { bays: string[]; rowSpan?: number; empty?: boolean };

const CELLS: Cell[] = [
  { bays: ["Outhouse"], rowSpan: 4 },
  { bays: [], empty: true, rowSpan: 3 },
  { bays: ["Sandblast Area"], rowSpan: 3 },
  { bays: ["Paint Booth 1"], rowSpan: 3 },
  { bays: ["Paint Booth 2"], rowSpan: 3 },
  { bays: ["Yard"], rowSpan: 8 },
  { bays: ["Bay 3"], rowSpan: 3 },
  { bays: ["Bay 4"], rowSpan: 3 },
  { bays: ["Bay 1"], rowSpan: 3 },
  { bays: ["Bay 2"], rowSpan: 3 },
];

const NOTES_KEY = "paint-shop-bay-notes-v1";

function bayLabel(b: string) {
  return /^\d+$/.test(b) ? `Bay ${b}` : b;
}

function workColorClass(work: string) {
  switch (work) {
    case "Assembly":
    case "Disassembly":
    case "Reassemble":
    case "Disassemble":
      return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/40";
    case "Sandblast":
      return "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/40";
    case "Sanding":
      return "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/40";
    case "Paint":
    case "Paint 1":
    case "Paint 2":
    case "Paint 3":
      return "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/40";
    default:
      return "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/40";
  }
}

export function BayGrid({
  date,
  jobs,
  showCompany = false,
  addJob,
  removeJob,
}: {
  date: Date;
  jobs: Job[];
  showCompany?: boolean;
  addJob?: (j: Omit<Job, "id" | "createdAt">) => void;
  removeJob?: (id: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dayJobs = jobs.filter((j) => j.date === toDateKey(selectedDate));
  const [notes, setNotes] = useState("");
  const [notesExtra, setNotesExtra] = useState(0);
  const [activeCell, setActiveCell] = useState<Cell | null>(null);
  const [addForCell, setAddForCell] = useState<Cell | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Job | null>(null);
  const [expandedCells, setExpandedCells] = useState<Set<number>>(new Set());
  const toggleExpanded = (i: number) => {
    setExpandedCells((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    try {
      setNotes(localStorage.getItem(NOTES_KEY) ?? "");
    } catch {
      /* ignore */
    }
  }, []);

  const handleNotesChange = (v: string) => {
    setNotes(v);
    try {
      localStorage.setItem(NOTES_KEY, v);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Showing schedule for
        </p>
        <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous day"
              className="hover:bg-primary hover:text-primary-foreground hover:border-primary"
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() - 1);
                setSelectedDate(d);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start gap-2 text-left font-normal hover:bg-primary hover:text-primary-foreground hover:border-primary",
                  !selectedDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="h-4 w-4" />
                {mounted
                  ? selectedDate.toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </Button>
            </PopoverTrigger>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next day"
              className="hover:bg-primary hover:text-primary-foreground hover:border-primary"
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() + 1);
                setSelectedDate(d);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(d) => {
                if (d) {
                  setSelectedDate(d);
                  setDatePickerOpen(false);
                }
              }}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div
        className={cn("grid grid-cols-3 gap-2", expandedCells.size === 0 && "overflow-hidden")}
        style={{
          [expandedCells.size > 0 ? "minHeight" : "height"]: `calc(100dvh - 18rem + ${notesExtra}px)`,
          gridTemplateRows: `repeat(12, minmax(0, 1fr)) minmax(0, ${120 + notesExtra}px)`,
        }}
      >
      {CELLS.map((cell, i) => {
        if (cell.empty) {
          return (
            <div
              key={i}
              aria-hidden
              style={cell.rowSpan ? { gridRow: `span ${cell.rowSpan}` } : undefined}
            />
          );
        }
        const cellJobs = dayJobs.filter((j) => cell.bays.includes(j.bay));
        const label = cell.bays.map(bayLabel).join(" / ");
        const isExpanded = expandedCells.has(i);
        const baseSpan = cell.rowSpan ?? 1;
        const expandedSpan = isExpanded ? Math.max(baseSpan, cellJobs.length + 2) : baseSpan;
        return (
          <button
            type="button"
            key={i}
            onClick={() => setActiveCell(cell)}
            className={cn(
              "flex flex-col gap-2 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "overflow-hidden",
            )}
            style={{ gridRow: `span ${expandedSpan}` }}
          >
            <div className="flex items-center gap-1.5 border-b border-border/60 pb-2">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              <span className="font-display text-sm tracking-wider text-foreground">
                {label}
              </span>
              <Badge variant="secondary" className="ml-auto text-xs">
                {cellJobs.length}
              </Badge>
              {addJob && (
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Add job to ${label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddForCell(cell);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      setAddForCell(cell);
                    }
                  }}
                  className="cursor-pointer rounded-full p-0.5 text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
            <div className={cn("flex-1 space-y-1.5 min-h-0", isExpanded ? "overflow-y-auto" : "overflow-hidden") }>
              {(() => {
                const maxVisible = Math.max(1, (cell.rowSpan ?? 3) - 1);
                const visible = isExpanded ? cellJobs : cellJobs.slice(0, maxVisible);
                const hidden = cellJobs.length - visible.length;
                if (cellJobs.length === 0) {
                  return <p className="text-xs text-muted-foreground/60">No jobs</p>;
                }
                return (
                  <>
                    {visible.map((j) => (
                      <div
                        key={j.id}
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCell(cell);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            setActiveCell(cell);
                          }
                        }}
                        className={`flex min-w-0 cursor-pointer items-center gap-1.5 rounded border border-border/60 bg-background/50 px-2 py-1 text-xs hover:bg-accent/20 ${
                          j.completed ? "opacity-50 line-through" : ""
                        }`}
                      >
                        <Truck className="h-3 w-3 text-primary shrink-0" />
                        <span className="shrink-0 truncate font-medium">
                          {j.truckId}
                          {showCompany && j.company ? ` - ${j.company}` : ""}
                        </span>
                        <Badge
                          variant="outline"
                          className={`min-w-0 flex-1 justify-start truncate text-[10px] px-1.5 py-0 ${workColorClass(j.work)} ${j.completed ? "line-through opacity-70" : ""}`}
                        >
                          {j.work}
                        </Badge>
                        {removeJob && (
                          <span
                            role="button"
                            tabIndex={0}
                            aria-label="Delete task"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDelete(j);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.stopPropagation();
                                setConfirmDelete(j);
                              }
                            }}
                            className="shrink-0 cursor-pointer rounded p-0.5 text-muted-foreground hover:bg-transparent hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                    ))}
                    {hidden > 0 && (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(i);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            toggleExpanded(i);
                          }
                        }}
                        className="block cursor-pointer rounded px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        +{hidden} more
                      </span>
                    )}
                    {isExpanded && cellJobs.length > maxVisible && (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(i);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            toggleExpanded(i);
                          }
                        }}
                        className="block cursor-pointer rounded px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        Show less
                      </span>
                    )}
                  </>
                );
              })()}
            </div>
          </button>
        );
      })}
      <NotesBlock
        notes={notes}
        onChange={handleNotesChange}
        extraHeight={notesExtra}
        onExtraHeightChange={setNotesExtra}
      />

      <Dialog open={activeCell !== null} onOpenChange={(o) => !o && setActiveCell(null)}>
        <DialogContent className="max-w-md [&>button]:hidden">
          {activeCell && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-display text-2xl tracking-wider">
                  <span>{activeCell.bays.map(bayLabel).join(" / ")}</span>
                  {addJob && (
                    <Button
                      type="button"
                      size="icon"
                      className="rounded-full h-6 w-6"
                      onClick={() => {
                        setAddForCell(activeCell);
                        setActiveCell(null);
                      }}
                      aria-label="Add job"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-6 w-6 rounded-full text-muted-foreground hover:bg-transparent hover:text-foreground"
                    onClick={() => setActiveCell(null)}
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              {(() => {
                const cellJobs = dayJobs.filter((j) => activeCell.bays.includes(j.bay));
                if (cellJobs.length === 0) {
                  return (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                      No tasks scheduled for this area today.
                    </p>
                  );
                }
                return (
                  <ul className="space-y-2">
                    {cellJobs.map((j) => (
                      <li
                        key={j.id}
                        className={`rounded-lg border border-border bg-card p-3 ${
                          j.completed ? "opacity-60" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-primary" />
                          <span
                            className={`font-display text-lg tracking-wider ${
                              j.completed ? "line-through" : ""
                            }`}
                          >
                            {j.truckId}
                          </span>
                          <Badge variant="outline" className="ml-auto text-xs">
                            {j.work}
                            {j.color ? ` — ${j.color}` : ""}
                          </Badge>
                          {removeJob && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:bg-transparent hover:text-destructive"
                              onClick={() => setConfirmDelete(j)}
                              aria-label="Delete task"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" /> {j.employee}
                          </span>
                          <span>{j.shift === "ALL_DAY" ? "All Day" : j.shift}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                );
              })()}
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={addForCell !== null} onOpenChange={(o) => !o && setAddForCell(null)}>
        <DialogContent className="max-w-md">
          {addForCell && addJob && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl tracking-wider">
                  New Job — {addForCell.bays.map(bayLabel).join(" / ")}
                </DialogTitle>
              </DialogHeader>
              <ScheduleForm
                selectedDate={selectedDate}
                existingJobs={jobs}
                defaultBay={addForCell.bays[0]}
                onSubmit={(j) => {
                  addJob(j);
                  setAddForCell(null);
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDelete !== null} onOpenChange={(o) => !o && setConfirmDelete(null)}>
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
                if (confirmDelete && removeJob) removeJob(confirmDelete.id);
                setConfirmDelete(null);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </div>
  );
}

function NotesBlock({
  notes,
  onChange,
  extraHeight,
  onExtraHeightChange,
}: {
  notes: string;
  onChange: (v: string) => void;
  extraHeight: number;
  onExtraHeightChange: (h: number) => void;
}) {
  const startRef = useRef<{ y: number; h: number; scrollY: number } | null>(null);
  const lastClientYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const applyHeight = () => {
    const s = startRef.current;
    if (!s) return;
    const scrollDelta = window.scrollY - s.scrollY;
    const delta = lastClientYRef.current - s.y + scrollDelta;
    onExtraHeightChange(Math.max(0, s.h + delta));
  };

  const tickAutoScroll = () => {
    if (!startRef.current) {
      rafRef.current = null;
      return;
    }
    const y = lastClientYRef.current;
    const threshold = 30;
    const distFromBottom = window.innerHeight - y;
    if (distFromBottom < threshold) {
      const speed = Math.min(6, (threshold - distFromBottom) / 6);
      window.scrollBy(0, speed);
      applyHeight();
    }
    rafRef.current = requestAnimationFrame(tickAutoScroll);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    startRef.current = { y: e.clientY, h: extraHeight, scrollY: window.scrollY };
    lastClientYRef.current = e.clientY;
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(tickAutoScroll);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!startRef.current) return;
    lastClientYRef.current = e.clientY;
    applyHeight();
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    startRef.current = null;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  return (
    <div className="col-span-3 flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
      <div className="flex items-center gap-1.5 border-b border-border/60 pb-2">
        <StickyNote className="h-3.5 w-3.5 text-accent" />
        <span className="font-display text-sm tracking-wider text-foreground">
          Notes
        </span>
      </div>
      <Textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add notes for the day…"
        className="flex-1 resize-none border-0 bg-transparent px-0 text-sm focus-visible:ring-0"
      />
      <button
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Drag to resize notes"
        className="mx-auto -mb-1 flex h-4 w-12 cursor-ns-resize items-center justify-center rounded text-muted-foreground/60 hover:text-foreground touch-none select-none"
      >
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}
