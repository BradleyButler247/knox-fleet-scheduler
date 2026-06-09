import { MapPin, Truck, StickyNote, ChevronDown, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
}: {
  date: Date;
  jobs: Job[];
  showCompany?: boolean;
}) {
  const dayJobs = jobs.filter((j) => j.date === toDateKey(date));
  const [notes, setNotes] = useState("");
  const [notesExtra, setNotesExtra] = useState(0);
  const [activeCell, setActiveCell] = useState<Cell | null>(null);

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
    <div
      className="grid grid-cols-3 gap-3"
      style={{
        minHeight: `calc(100dvh - 15rem + ${notesExtra}px)`,
        gridTemplateRows: `repeat(12, minmax(40px, 1fr)) minmax(120px, ${120 + notesExtra}px)`,
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
        return (
          <button
            type="button"
            key={i}
            onClick={() => setActiveCell(cell)}
            className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={cell.rowSpan ? { gridRow: `span ${cell.rowSpan}` } : undefined}
          >
            <div className="flex items-center gap-1.5 border-b border-border/60 pb-2">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              <span className="font-display text-sm tracking-wider text-foreground">
                {label}
              </span>
              <Badge variant="secondary" className="ml-auto text-xs">
                {cellJobs.length}
              </Badge>
            </div>
            <div className="flex-1 space-y-1.5 overflow-y-auto">
              {cellJobs.length === 0 ? (
                <p className="text-xs text-muted-foreground/60">No jobs</p>
              ) : (
                cellJobs.map((j) => (
                  <div
                    key={j.id}
                    className={`flex items-center gap-1.5 rounded border border-border/60 bg-background/50 px-2 py-1 text-xs ${
                      j.completed ? "opacity-50 line-through" : ""
                    }`}
                  >
                    <Truck className="h-3 w-3 text-primary shrink-0" />
                    <span className="font-medium truncate">
                      {j.truckId}
                      {showCompany && j.company ? ` - ${j.company}` : ""}
                    </span>
                    <Badge
                      variant="outline"
                      className={`ml-auto whitespace-nowrap text-[10px] px-1.5 py-0 ${workColorClass(j.work)} ${j.completed ? "line-through opacity-70" : ""}`}
                    >
                      {j.work}
                    </Badge>
                  </div>
                ))
              )}
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
        <DialogContent className="max-w-md">
          {activeCell && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl tracking-wider">
                  {activeCell.bays.map(bayLabel).join(" / ")}
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
