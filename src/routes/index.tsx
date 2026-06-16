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
import { MonthCalendar } from "@/components/MonthCalendar";
import { TruckSchedule } from "@/components/TruckSchedule";
import { BayGrid } from "@/components/BayGrid";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useJobs, toDateKey } from "@/lib/schedule-store";

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
  const { jobs, addJob, removeJob, updateJob, toggleComplete, renameTruck, rescheduleFromJob } = useJobs();
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
      <main className="mx-auto hidden w-full px-6 py-6 lg:block">
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
            {(() => {
              const calendarContent = (
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <MonthCalendar
                      month={month}
                      onMonthChange={setMonth}
                      selected={openDay ?? today}
                      onSelect={handleSelect}
                      jobs={jobs}
                    />
                  </CardContent>
                </Card>
              );

              const selectedDate = openDay ?? today;
              const dayJobCount = jobs.filter(
                (j) => j.date === toDateKey(selectedDate),
              ).length;
              const dayContent = (
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-end justify-between border-b border-border pb-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {selectedDate.toLocaleDateString(undefined, { weekday: "long" })}
                          </p>
                          <h2 className="font-display text-3xl text-foreground">
                            {selectedDate.toLocaleDateString(undefined, { month: "long", day: "numeric" })}
                          </h2>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="font-display text-base px-3 py-1">
                            {dayJobCount} {dayJobCount === 1 ? "job" : "jobs"}
                          </Badge>
                          {mode === "schedule" ? (
                            <Button
                              size="icon"
                              onClick={() => setMode("form")}
                              aria-label="Add new job"
                              className="rounded-full"
                            >
                              <Plus className="h-5 w-5" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setMode("schedule");
                                setEditingId(null);
                              }}
                              aria-label="Back to schedule"
                            >
                              <ArrowLeft className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {mode === "schedule" ? (
                        <DaySchedule
                          date={selectedDate}
                          jobs={jobs}
                          onRemove={removeJob}
                          onToggleComplete={toggleComplete}
                          onEdit={(job) => {
                            setEditingId(job.id);
                            setMode("form");
                          }}
                        />
                      ) : (
                        <ScheduleForm
                          selectedDate={selectedDate}
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
                      )}
                    </div>
                  </CardContent>
                </Card>
              );

              if (!mounted) {
                return (
                  <div className="grid gap-6 lg:grid-cols-[3fr_minmax(24rem,1fr)]">
                    {calendarContent}
                    {dayContent}
                  </div>
                );
              }

              return (
                <ResizablePanelGroup className="min-h-[600px] w-full overflow-hidden">
                  <ResizablePanel
                    panelRef={calendarPanelRef}
                    defaultSize={67}
                    minSize="20rem"
                    collapsible
                    collapsedSize="3rem"
                    id="calendar-panel-v2"
                    className="pr-3"
                    onResize={() => {
                      const c = calendarPanelRef.current?.isCollapsed() ?? false;
                      setCalendarCollapsed(c);
                    }}
                  >
                    {calendarCollapsed ? (
                      <button
                        onClick={() => calendarPanelRef.current?.expand()}
                        aria-label="Expand calendar"
                        className="flex h-full w-full items-center justify-center rounded-md border border-border bg-card/40 text-muted-foreground transition-colors hover:bg-accent/20 hover:text-accent"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    ) : (
                      calendarContent
                    )}
                  </ResizablePanel>
                  <ResizableHandle withHandle className="mx-1.5 bg-transparent" />
                  <ResizablePanel
                    panelRef={dayPanelRef}
                    defaultSize={33}
                    minSize="18rem"
                    collapsible
                    collapsedSize="3rem"
                    id="day-panel-v2"
                    className="pl-3"
                    onResize={() => {
                      const c = dayPanelRef.current?.isCollapsed() ?? false;
                      setDayCollapsed(c);
                    }}
                  >
                    {dayCollapsed ? (
                      <button
                        onClick={() => dayPanelRef.current?.expand()}
                        aria-label="Expand day schedule"
                        className="flex h-full w-full items-center justify-center rounded-md border border-border bg-card/40 text-muted-foreground transition-colors hover:bg-accent/20 hover:text-accent"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                    ) : (
                      dayContent
                    )}
                  </ResizablePanel>
                </ResizablePanelGroup>
              );
            })()}
          </TabsContent>

          <TabsContent value="bay" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <BayGrid date={today} jobs={jobs} showCompany addJob={addJob} removeJob={removeJob} updateJob={updateJob} />
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="truck" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <TruckSchedule jobs={jobs} addJob={addJob} updateJob={updateJob} renameTruck={renameTruck} onToggleComplete={toggleComplete} removeJob={removeJob} rescheduleFromJob={rescheduleFromJob} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile / tablet: tabs */}
      <main className="mx-auto max-w-2xl px-4 py-6 lg:hidden">
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
                <BayGrid date={today} jobs={jobs} addJob={addJob} removeJob={removeJob} updateJob={updateJob} />
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
                <TruckSchedule jobs={jobs} addJob={addJob} updateJob={updateJob} renameTruck={renameTruck} onToggleComplete={toggleComplete} removeJob={removeJob} rescheduleFromJob={rescheduleFromJob} />
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
                    {jobs.filter((j) => j.date === toDateKey(openDay)).length}{" "}
                    {jobs.filter((j) => j.date === toDateKey(openDay)).length === 1 ? "job" : "jobs"}
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
    </div>
  );
}
