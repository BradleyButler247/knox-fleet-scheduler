import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { PanelImperativeHandle } from "react-resizable-panels";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Toaster } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import { Paintbrush, Plus, ArrowLeft, CalendarDays, ListChecks, Truck, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScheduleForm } from "@/components/ScheduleForm";
import { DaySchedule } from "@/components/DaySchedule";
import { DayGrid } from "@/components/DayGrid";
import { MonthCalendar } from "@/components/MonthCalendar";
import { TruckSchedule } from "@/components/TruckSchedule";
import { BayGrid } from "@/components/BayGrid";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useJobs, toDateKey, jobCoversDate } from "@/lib/schedule-store";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bay Sheet — Truck Paint Scheduling" },
      {
        name: "description",
        content:
          "Schedule truck paint jobs by bay and employee, then see each day at a glance.",
      },
      { property: "og:title", content: "Bay Sheet — Truck Paint Scheduling" },
      {
        property: "og:description",
        content: "Schedule truck paint jobs by bay and employee.",
      },
    ],
  }),
  component: Index,
});

type Mode = "schedule" | "form";

function Index() {
  const { jobs, addJob, removeJob, updateJob, toggleComplete, renameTruck, rescheduleFromJob, duplicateJob, reorderJobs, pendingResequence, resolveResequence } = useJobs();
  const today = new Date();
  const [month, setMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [openDay, setOpenDay] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("schedule");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const calendarPanelRef = useRef<PanelImperativeHandle>(null);
  const dayPanelRef = useRef<PanelImperativeHandle>(null);
  const [calendarCollapsed, setCalendarCollapsed] = useState(false);
  const [dayCollapsed, setDayCollapsed] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSelect = (d: Date) => {
    setOpenDay(d);
    setMode("schedule");
    setEditingId(null);
  };

  const handleSelectMobile = (d: Date) => {
    handleSelect(d);
    setDialogOpen(true);
  };

  const handleClose = (o: boolean) => {
    if (!o) {
      setDialogOpen(false);
      setMode("schedule");
      setEditingId(null);
    }
  };


  const editingJob = editingId ? jobs.find((j) => j.id === editingId) : undefined;

  return (
    <div className="min-h-screen">
      <Toaster richColors position="top-right" />

      <header className="border-b border-border/60 backdrop-blur-sm">
        <div className="mx-auto flex w-full items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Paintbrush className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-2xl leading-none">Bay Sheet</h1>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Desktop */}
      <main className="mx-auto hidden w-full px-6 py-6 lg:block print:block">
        <Tabs defaultValue="bay" className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="bay" className="gap-2">
              <LayoutGrid className="h-4 w-4" /> By Bay
            </TabsTrigger>
            <TabsTrigger value="truck" className="gap-2">
              <Truck className="h-4 w-4" /> By Truck
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarDays className="h-4 w-4" /> By Day
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <DayGrid
                  date={openDay ?? today}
                  jobs={jobs}
                  onEditJob={(job) => {
                    setOpenDay(new Date(`${job.date}T00:00:00`));
                    setEditingId(job.id);
                    setMode("form");
                    setDialogOpen(true);
                  }}
                  onAddJob={(d) => {
                    setOpenDay(d);
                    setEditingId(null);
                    setMode("form");
                    setDialogOpen(true);
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="bay" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <BayGrid date={today} jobs={jobs} showCompany addJob={addJob} removeJob={removeJob} updateJob={updateJob} reorderJobs={reorderJobs} />
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="truck" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <TruckSchedule jobs={jobs} addJob={addJob} updateJob={updateJob} renameTruck={renameTruck} onToggleComplete={toggleComplete} removeJob={removeJob} rescheduleFromJob={rescheduleFromJob} duplicateJob={duplicateJob} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile / tablet: tabs */}
      <main className="mx-auto max-w-2xl px-4 py-6 lg:hidden print:hidden">
        <Tabs defaultValue="bay" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto sm:grid-cols-4">
            <TabsTrigger value="bay" className="gap-2">
              <LayoutGrid className="h-4 w-4" /> By Bay
            </TabsTrigger>
            <TabsTrigger value="truck" className="gap-2">
              <Truck className="h-4 w-4" /> By Truck
            </TabsTrigger>
            <TabsTrigger value="today" className="gap-2">
              <ListChecks className="h-4 w-4" /> By Day
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarDays className="h-4 w-4" /> Calendar
            </TabsTrigger>
          </TabsList>
          <TabsContent value="bay" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <BayGrid date={today} jobs={jobs} addJob={addJob} removeJob={removeJob} updateJob={updateJob} reorderJobs={reorderJobs} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="calendar" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <MonthCalendar
                  month={month}
                  onMonthChange={setMonth}
                  selected={today}
                  onSelect={handleSelectMobile}
                  jobs={jobs}
                  compact
                />
                <p className="mt-4 text-center text-xs uppercase tracking-widest text-muted-foreground">
                  Tap a day to see its schedule
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="today" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <DaySchedule
                  date={today}
                  jobs={jobs}
                  onRemove={removeJob}
                    onToggleComplete={toggleComplete}
                  onEdit={(job) => {
                    setOpenDay(new Date(today));
                    setEditingId(job.id);
                    setMode("form");
                    setDialogOpen(true);
                  }}
                />
                <Button
                  className="mt-4 w-full"
                  onClick={() => handleSelectMobile(new Date(today))}
                >
                  <Plus className="h-4 w-4" /> Add job for today
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="truck" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <TruckSchedule jobs={jobs} addJob={addJob} updateJob={updateJob} renameTruck={renameTruck} onToggleComplete={toggleComplete} removeJob={removeJob} rescheduleFromJob={rescheduleFromJob} duplicateJob={duplicateJob} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={dialogOpen && openDay !== null} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
          {openDay && mode === "schedule" && (
            <>
              <DialogHeader className="flex-row items-center justify-between gap-3 space-y-0 pr-8">
                <DialogTitle className="font-display text-2xl tracking-wider flex flex-col items-start">
                  <span>{openDay.toLocaleDateString(undefined, { weekday: "long" })}</span>
                  <span>
                    {openDay.toLocaleDateString(undefined, { month: "long", day: "numeric" })}
                  </span>
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-display text-base px-3 py-1">
                    {jobs.filter((j) => jobCoversDate(j, toDateKey(openDay))).length}{" "}
                    {jobs.filter((j) => jobCoversDate(j, toDateKey(openDay))).length === 1 ? "job" : "jobs"}
                  </Badge>
                  <Button
                    size="icon"
                    onClick={() => setMode("form")}
                    aria-label="Add new job"
                    className="rounded-full"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto -mx-6 px-6">
                <DaySchedule
                  date={openDay}
                  jobs={jobs}
                  onRemove={removeJob}
                  onToggleComplete={toggleComplete}
                  onEdit={(job) => {
                    setEditingId(job.id);
                    setMode("form");
                  }}
                />
              </div>
            </>
          )}

          {openDay && mode === "form" && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setMode("schedule");
                      setEditingId(null);
                    }}
                    aria-label="Back to schedule"
                    className="h-8 w-8"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <DialogTitle className="font-display text-2xl tracking-wider">
                    {editingJob ? "Edit Job" : "New Job"} —{" "}
                    {openDay.toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </DialogTitle>
                </div>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto -mx-6 px-6">
                <ScheduleForm
                  selectedDate={openDay}
                  initialJob={editingJob}
                  existingJobs={jobs}
                  onSubmit={(j) => {
                    if (editingJob) {
                      updateJob(editingJob.id, j);
                    } else {
                      addJob(j);
                    }
                    setEditingId(null);
                    setMode("schedule");
                  }}
                  onDelete={(id) => {
                    removeJob(id);
                    setEditingId(null);
                    setMode("schedule");
                  }}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!pendingResequence}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reschedule the following tasks?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingResequence
                ? `${pendingResequence.changes.length} later task${
                    pendingResequence.changes.length === 1 ? "" : "s"
                  } for truck ${pendingResequence.truckId} now share a day with another task. Would you like each of them moved to their own day, or left on their current dates?`
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => resolveResequence(false)}>
              Leave current dates
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => resolveResequence(true)}>
              Give each its own day
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
