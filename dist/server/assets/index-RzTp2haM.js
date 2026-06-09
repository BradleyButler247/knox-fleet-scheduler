import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, GripVertical, ChevronDown, Check, ChevronUp, ClipboardList, Truck, MapPin, User, Pencil, Plus, Search, Calendar, StickyNote, Sun, Moon, Paintbrush, LayoutGrid, CalendarDays, ArrowLeft, ChevronRight, ChevronLeft, ListChecks } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Panel, Group, Separator } from "react-resizable-panels";
import { Toaster as Toaster$1, toast } from "sonner";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as SwitchPrimitives from "@radix-ui/react-switch";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Card = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const ResizablePanelGroup = ({ className, ...props }) => /* @__PURE__ */ jsx(
  Group,
  {
    className: cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className),
    ...props
  }
);
const ResizablePanel = Panel;
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  Separator,
  {
    className: cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    ),
    ...props,
    children: withHandle && /* @__PURE__ */ jsx("div", { className: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border", children: /* @__PURE__ */ jsx(GripVertical, { className: "h-2.5 w-2.5" }) })
  }
);
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ jsx(
  TogglePrimitive.Root,
  {
    ref,
    className: cn(toggleVariants({ variant, size, className })),
    ...props
  }
));
Toggle.displayName = TogglePrimitive.Root.displayName;
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default"
});
const ToggleGroup = React.forwardRef(({ className, variant, size, children, ...props }, ref) => /* @__PURE__ */ jsx(
  ToggleGroupPrimitive.Root,
  {
    ref,
    className: cn("flex items-center justify-center gap-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ToggleGroupContext.Provider, { value: { variant, size }, children })
  }
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
const ToggleGroupItem = React.forwardRef(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Item,
    {
      ref,
      className: cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        className
      ),
      ...props,
      children
    }
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
const KEY$2 = "paint-shop-schedule-v1";
function toDateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function read$1() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY$2);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((j) => ({ ...j, shift: j.shift ?? "ALL_DAY" }));
  } catch {
    return [];
  }
}
function useJobs() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    setJobs(read$1());
  }, []);
  const persist = (updater) => {
    setJobs((prev) => {
      const next = updater(prev);
      localStorage.setItem(KEY$2, JSON.stringify(next));
      return next;
    });
  };
  const addJob = (j) => {
    persist((prev) => [
      ...prev,
      { ...j, id: crypto.randomUUID(), createdAt: Date.now() }
    ]);
  };
  const removeJob = (id) => {
    persist((prev) => prev.filter((j) => j.id !== id));
  };
  const bumpWeekendToMonday = (d) => {
    const day = d.getDay();
    if (day === 6) d.setDate(d.getDate() + 2);
    else if (day === 0) d.setDate(d.getDate() + 1);
    return d;
  };
  const updateJob = (id, updates) => {
    persist((prev) => {
      const target = prev.find((j) => j.id === id);
      if (!target) return prev;
      const oldDate = target.date;
      let newDate = updates.date;
      const truckId = target.truckId;
      if (newDate && newDate !== oldDate) {
        const bumped = bumpWeekendToMonday(/* @__PURE__ */ new Date(`${newDate}T00:00:00`));
        newDate = toDateKey(bumped);
      }
      let deltaDays = 0;
      if (newDate && newDate !== oldDate) {
        const a = (/* @__PURE__ */ new Date(`${oldDate}T00:00:00`)).getTime();
        const b = (/* @__PURE__ */ new Date(`${newDate}T00:00:00`)).getTime();
        deltaDays = Math.round((b - a) / 864e5);
      }
      const finalUpdates = { ...updates, date: newDate };
      return prev.map((j) => {
        if (j.id === id) return { ...j, ...finalUpdates };
        if (deltaDays !== 0 && j.truckId === truckId) {
          const shifted = /* @__PURE__ */ new Date(`${j.date}T00:00:00`);
          shifted.setDate(shifted.getDate() + deltaDays);
          bumpWeekendToMonday(shifted);
          return { ...j, date: toDateKey(shifted) };
        }
        return j;
      });
    });
  };
  const toggleComplete = (id) => {
    persist(
      (prev) => prev.map((j) => j.id === id ? { ...j, completed: !j.completed } : j)
    );
  };
  const renameTruck = (oldId, newId) => {
    persist(
      (prev) => prev.map((j) => j.truckId === oldId ? { ...j, truckId: newId } : j)
    );
  };
  return { jobs, addJob, removeJob, updateJob, toggleComplete, renameTruck };
}
const BAYS$1 = [
  "Sandblast Area",
  "Outhouse",
  "Yard",
  "Bay 1",
  "Bay 2",
  "Bay 3",
  "Bay 4",
  "Paint Booth 1",
  "Paint Booth 2"
];
const WORK_OPTIONS$1 = ["Assembly", "Check-in", "Disassembly", "Mixer 2 Color", "Mixer 3 Color", "Other", "Paint", "Sandblast", "Sanding", "Touchups"];
const MIXER_PRESETS = {
  "Mixer 2 Color": ["Disassemble", "Sandblast", "Sanding", "Paint 1", "Paint 2", "Reassemble"],
  "Mixer 3 Color": ["Disassemble", "Sandblast", "Sanding", "Paint 1", "Paint 2", "Paint 3", "Reassemble"]
};
function addBusinessDays(date, days) {
  const d = new Date(date);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return d;
}
function parseWork(work) {
  if (!work) return { type: "", other: "" };
  const match = WORK_OPTIONS$1.find((o) => o !== "Other" && o === work);
  if (match) return { type: match, other: "" };
  return { type: "Other", other: work };
}
function shiftsOverlap(a, b) {
  if (a === "ALL_DAY" || b === "ALL_DAY") return true;
  return a === b;
}
function shiftLabel(s) {
  return s === "ALL_DAY" ? "All Day" : s;
}
function ScheduleForm({
  selectedDate,
  initialJob,
  defaultTruckId,
  lockTruckId,
  existingJobs = [],
  onSubmit,
  onDelete
}) {
  const isEdit = Boolean(initialJob);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [conflict, setConflict] = useState(null);
  const [duplicateBlock, setDuplicateBlock] = useState(null);
  const [duplicateConfirm, setDuplicateConfirm] = useState(null);
  const [truckId, setTruckId] = useState(
    initialJob?.truckId ?? defaultTruckId ?? ""
  );
  const initialWork = parseWork(initialJob?.work ?? "");
  const [workType, setWorkType] = useState(initialWork.type);
  const [workOther, setWorkOther] = useState(initialWork.other);
  const [bay, setBay] = useState(initialJob?.bay ?? "");
  const [employee, setEmployee] = useState(initialJob?.employee ?? "");
  const [shift, setShift] = useState(initialJob?.shift ?? "ALL_DAY");
  const [color, setColor] = useState(initialJob?.color ?? "");
  const [mixerColors, setMixerColors] = useState(["", "", ""]);
  const [dateKeyState, setDateKeyState] = useState(
    initialJob?.date ?? toDateKey(selectedDate)
  );
  const isMixer = workType === "Mixer 2 Color" || workType === "Mixer 3 Color";
  const resolvedWork = workType === "Other" ? workOther.trim() : workType;
  const bayRequired = workType !== "Other";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!truckId.trim() || !resolvedWork) {
      toast.error("Fill in truck ID and work to be done");
      return;
    }
    const finalBay = bay.trim();
    const dateKey = isEdit ? dateKeyState : toDateKey(selectedDate);
    const normalizedTruck = truckId.trim().toUpperCase();
    if (isMixer && !isEdit) {
      const tasks = MIXER_PRESETS[workType];
      const startDate = /* @__PURE__ */ new Date(`${dateKey}T00:00:00`);
      let paintIdx = 0;
      tasks.forEach((taskName, i) => {
        const d = i === 0 ? startDate : addBusinessDays(startDate, i);
        const isPaint = taskName.startsWith("Paint");
        const paintColor = isPaint ? (mixerColors[paintIdx] ?? "").trim() : "";
        if (isPaint) paintIdx++;
        onSubmit({
          truckId: normalizedTruck,
          work: taskName,
          bay: finalBay,
          employee: employee.trim(),
          date: toDateKey(d),
          shift,
          ...isPaint && paintColor ? { color: paintColor } : {}
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
    if (finalBay) {
      const clash = existingJobs.find(
        (j) => j.id !== initialJob?.id && j.date === dateKey && j.bay === finalBay && shiftsOverlap(j.shift, shift) && j.truckId !== normalizedTruck
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
      ...workType === "Paint" && color.trim() ? { color: color.trim() } : {}
    };
    if (workType !== "Other") {
      const sameTruckTask = existingJobs.filter(
        (j) => j.id !== initialJob?.id && j.truckId === normalizedTruck && j.work === resolvedWork
      );
      const sameDay2 = sameTruckTask.find((j) => j.date === dateKey);
      if (sameDay2) {
        setDuplicateBlock(sameDay2);
        return;
      }
      if (sameTruckTask.length > 0) {
        setDuplicateConfirm({ existing: sameTruckTask[0], payload });
        return;
      }
    }
    finalizeSubmit(payload);
  };
  const finalizeSubmit = (payload) => {
    onSubmit(payload);
    toast.success(
      isEdit ? `Job updated for ${selectedDate.toLocaleDateString()}` : `Job booked for ${selectedDate.toLocaleDateString()}`
    );
    if (!isEdit) {
      setTruckId("");
      setWorkType("Assembly");
      setWorkOther("");
      setEmployee("");
      setColor("");
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "truck", children: "Truck ID" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "truck",
            placeholder: "-- Please enter a truck ID --",
            value: truckId,
            onChange: (e) => setTruckId(e.target.value),
            disabled: lockTruckId
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "bay", children: [
          "Bay",
          bayRequired ? "" : " (optional)"
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: bay || void 0, onValueChange: setBay, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { id: "bay", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "-- Select bay --" }) }),
          /* @__PURE__ */ jsx(SelectContent, { children: BAYS$1.map((b) => /* @__PURE__ */ jsx(SelectItem, { value: b, children: b }, b)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "work", children: "Work to be done" }),
      /* @__PURE__ */ jsxs(Select, { value: workType, onValueChange: setWorkType, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { id: "work", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "-- Select One --" }) }),
        /* @__PURE__ */ jsx(SelectContent, { children: WORK_OPTIONS$1.map((o) => /* @__PURE__ */ jsx(SelectItem, { value: o, children: o }, o)) })
      ] }),
      workType === "Other" && /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Enter task",
          value: workOther,
          onChange: (e) => setWorkOther(e.target.value),
          className: "mt-2"
        }
      )
    ] }),
    workType === "Paint" && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "color", children: "Color" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "color",
          placeholder: "e.g. Fleet White, PMS 286",
          value: color,
          onChange: (e) => setColor(e.target.value)
        }
      )
    ] }),
    isMixer && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { children: "Paint Colors" }),
      Array.from({ length: workType === "Mixer 2 Color" ? 2 : 3 }).map((_, i) => /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: `Paint ${i + 1} color`,
          value: mixerColors[i] ?? "",
          onChange: (e) => {
            const next = [...mixerColors];
            next[i] = e.target.value;
            setMixerColors(next);
          }
        },
        i
      ))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "emp", children: "Employee" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "emp",
          placeholder: "-- Please enter an employee --",
          value: employee,
          onChange: (e) => setEmployee(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { children: "Shift" }),
      /* @__PURE__ */ jsxs(
        ToggleGroup,
        {
          type: "single",
          value: shift,
          onValueChange: (v) => v && setShift(v),
          className: "grid grid-cols-3 gap-2",
          children: [
            /* @__PURE__ */ jsx(ToggleGroupItem, { value: "AM", className: "border border-border data-[state=on]:border-primary", children: "AM" }),
            /* @__PURE__ */ jsx(ToggleGroupItem, { value: "PM", className: "border border-border data-[state=on]:border-primary", children: "PM" }),
            /* @__PURE__ */ jsx(ToggleGroupItem, { value: "ALL_DAY", className: "border border-border data-[state=on]:border-primary", children: "All Day" })
          ]
        }
      )
    ] }),
    isEdit && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "job-date", children: "Date" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "job-date",
          type: "date",
          value: dateKeyState,
          onChange: (e) => setDateKeyState(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", variant: "default", className: "w-full text-base font-normal tracking-wider", children: isEdit ? "Save changes" : `Schedule for ${selectedDate.toLocaleDateString(void 0, { month: "short", day: "numeric" })}` }),
    isEdit && onDelete && initialJob && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "destructive",
          className: "w-full text-base font-normal tracking-wider",
          onClick: () => setConfirmOpen(true),
          children: "Delete task"
        }
      ),
      /* @__PURE__ */ jsx(AlertDialog, { open: confirmOpen, onOpenChange: setConfirmOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
        /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Please confirm" }),
          /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Are you sure you want to delete this task? This action cannot be undone." })
        ] }),
        /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
          /* @__PURE__ */ jsx(
            AlertDialogAction,
            {
              onClick: () => {
                onDelete(initialJob.id);
                setConfirmOpen(false);
              },
              children: "Confirm"
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(AlertDialog, { open: conflict !== null, onOpenChange: (o) => !o && setConflict(null), children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Scheduling conflict" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: conflict && /* @__PURE__ */ jsxs(Fragment, { children: [
          "Bay ",
          String(conflict.bay).replace(/\D/g, "") || conflict.bay,
          " is already scheduled ",
          conflict.shift === "ALL_DAY" ? "all day" : `during ${shiftLabel(conflict.shift)}`,
          " for ",
          conflict.work,
          " on truck ",
          conflict.truckId,
          ". Please adjust scheduling."
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(AlertDialogFooter, { children: /* @__PURE__ */ jsx(AlertDialogAction, { onClick: () => setConflict(null), children: "OK" }) })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: duplicateBlock !== null, onOpenChange: (o) => !o && setDuplicateBlock(null), children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Duplicate task" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: duplicateBlock && /* @__PURE__ */ jsxs(Fragment, { children: [
          duplicateBlock.truckId,
          " is already scheduled for ",
          duplicateBlock.work,
          " on bay ",
          String(duplicateBlock.bay).replace(/\D/g, "") || duplicateBlock.bay
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(AlertDialogFooter, { children: /* @__PURE__ */ jsx(AlertDialogAction, { onClick: () => setDuplicateBlock(null), children: "OK" }) })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: duplicateConfirm !== null, onOpenChange: (o) => !o && setDuplicateConfirm(null), children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Duplicate task" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: duplicateConfirm && /* @__PURE__ */ jsxs(Fragment, { children: [
          duplicateConfirm.existing.truckId,
          " is already scheduled on ",
          (/* @__PURE__ */ new Date(duplicateConfirm.existing.date + "T00:00:00")).toLocaleDateString(),
          " for ",
          duplicateConfirm.existing.work,
          " on bay ",
          String(duplicateConfirm.existing.bay).replace(/\D/g, "") || duplicateConfirm.existing.bay,
          ". Would you still like to add this task?"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { onClick: () => setDuplicateConfirm(null), children: "No" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: () => {
              if (duplicateConfirm) finalizeSubmit(duplicateConfirm.payload);
              setDuplicateConfirm(null);
            },
            children: "Yes"
          }
        )
      ] })
    ] }) })
  ] });
}
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
function workColorClass$3(work) {
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
function DaySchedule({
  date,
  jobs,
  onRemove,
  onEdit,
  onToggleComplete
}) {
  const dayJobs = jobs.filter((j) => j.date === toDateKey(date)).sort((a, b) => a.bay.localeCompare(b.bay));
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: dayJobs.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 py-12 text-center", children: [
    /* @__PURE__ */ jsx(ClipboardList, { className: "h-10 w-10 text-muted-foreground/60" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "No jobs scheduled. Add one to fill the bays." })
  ] }) : /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: dayJobs.map((job) => /* @__PURE__ */ jsxs(
    "li",
    {
      className: `group relative overflow-hidden rounded-lg border bg-card p-4 transition-colors hover:border-primary/50 ${job.completed ? "border-border/40 opacity-60" : "border-border"}`,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `absolute left-0 top-0 h-full w-1 ${job.completed ? "bg-muted-foreground/40" : "bg-primary"}`
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 items-start gap-3 pl-2", children: [
            onToggleComplete && /* @__PURE__ */ jsx(
              Checkbox,
              {
                checked: Boolean(job.completed),
                onCheckedChange: () => onToggleComplete(job.id),
                "aria-label": "Mark complete",
                className: "mt-1"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsx(Truck, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `font-display text-xl tracking-wider text-foreground ${job.completed ? "line-through" : ""}`,
                    children: job.truckId
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "border-accent/50 text-accent whitespace-nowrap", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "mr-1 h-3 w-3" }),
                  /^\d+$/.test(job.bay) ? `Bay ${job.bay}` : job.bay
                ] }),
                /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-muted-foreground/30 text-muted-foreground whitespace-nowrap", children: job.shift === "ALL_DAY" ? "All Day" : job.shift }),
                /* @__PURE__ */ jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: `whitespace-nowrap ${workColorClass$3(job.work)} ${job.completed ? "line-through opacity-70" : ""}`,
                    children: [
                      job.work,
                      job.color ? ` — ${job.color}` : ""
                    ]
                  }
                ),
                job.completed && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "gap-1 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }),
                  " Done"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsx(User, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsx("span", { children: job.employee })
              ] })
            ] })
          ] }),
          onEdit && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => onEdit(job),
              "aria-label": "Edit job",
              className: "opacity-0 transition-opacity group-hover:opacity-100",
              children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
            }
          )
        ] })
      ]
    },
    job.id
  )) }) });
}
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d, n) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function workColorClass$2(work) {
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
  headerRight
}) {
  const today = /* @__PURE__ */ new Date();
  const jobsByDate = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const j of jobs) {
      const arr = map.get(j.date) ?? [];
      arr.push(j);
      map.set(j.date, arr);
    }
    return map;
  }, [jobs]);
  const cells = useMemo(() => {
    const first = startOfMonth(month);
    const offset = first.getDay();
    const start = new Date(first);
    start.setDate(first.getDate() - offset);
    return Array.from({ length: 35 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [month]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl tracking-wider", children: month.toLocaleString(void 0, { month: "long", year: "numeric" }) }),
      headerRight
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-widest text-muted-foreground", children: WEEKDAYS.map((d) => /* @__PURE__ */ jsx("div", { className: "py-1", children: d }, d)) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1", children: cells.map((d) => {
      const inMonth = d.getMonth() === month.getMonth();
      const isSelected = sameDay(d, selected);
      const isToday = sameDay(d, today);
      const dateKey = toDateKey(d);
      const dayJobs = jobsByDate.get(dateKey) ?? [];
      return /* @__PURE__ */ jsx(
        DayCell,
        {
          date: d,
          inMonth,
          isSelected,
          isToday,
          dayJobs,
          onSelect,
          compact
        },
        d.toISOString()
      );
    }) })
  ] });
}
const ITEM_HEIGHT = 16;
const ITEM_GAP = 2;
const MORE_HEIGHT = 12;
function CountBadge({
  fractionLabel,
  fallbackLabel,
  allDone
}) {
  const ref = useRef(null);
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const parent = el.parentElement;
        if (!parent) return;
        const test = document.createElement("span");
        test.textContent = fractionLabel;
        test.style.cssText = window.getComputedStyle(el).cssText;
        test.style.visibility = "hidden";
        test.style.position = "absolute";
        test.style.whiteSpace = "nowrap";
        document.body.appendChild(test);
        const fractionWidth = test.getBoundingClientRect().width;
        document.body.removeChild(test);
        const dateSpan = parent.firstElementChild;
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
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: cn(
        "rounded-sm px-1 text-[9px] font-bold leading-tight whitespace-nowrap",
        allDone ? "bg-green-500/20 text-green-700 dark:text-green-300" : "bg-primary/20 text-primary"
      ),
      children: label
    }
  );
}
function DayCell({
  date,
  inMonth,
  isSelected,
  isToday,
  dayJobs,
  onSelect,
  compact
}) {
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef(null);
  const [metrics, setMetrics] = useState({
    fitAll: dayJobs.length,
    fitWithMore: dayJobs.length
  });
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let raf = 0;
    const recompute = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = el.clientHeight;
        const fitAll2 = Math.max(
          0,
          Math.floor((h + ITEM_GAP) / (ITEM_HEIGHT + ITEM_GAP))
        );
        const fitWithMore2 = Math.max(
          0,
          Math.floor(
            (h - MORE_HEIGHT) / (ITEM_HEIGHT + ITEM_GAP)
          )
        );
        setMetrics({ fitAll: fitAll2, fitWithMore: fitWithMore2 });
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
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => onSelect(date),
      className: cn(
        "group @container/day relative flex flex-col items-stretch overflow-hidden rounded-md border border-border/50 bg-card/40 p-1.5 text-left transition-all",
        !expanded && "aspect-square",
        "hover:border-primary/60 hover:bg-card",
        !inMonth && "opacity-35",
        isSelected && "border-primary bg-primary/10 ring-1 ring-primary"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "font-display text-sm leading-none",
                isToday && "text-primary",
                !isToday && "text-foreground/80"
              ),
              children: date.getDate()
            }
          ),
          dayJobs.length > 0 && (() => {
            const done = dayJobs.filter((j) => j.completed).length;
            const total = dayJobs.length;
            const allDone = done === total;
            const fractionLabel = done === 0 || allDone ? `${total}` : `${done}/${total}`;
            return /* @__PURE__ */ jsx(
              CountBadge,
              {
                fractionLabel,
                fallbackLabel: `${total}`,
                allDone
              }
            );
          })()
        ] }),
        !compact && dayJobs.length > 0 && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
          "div",
          {
            ref: listRef,
            className: "mt-1 flex-1 space-y-0.5 overflow-hidden hidden @[5rem]/day:block",
            children: [
              visible.map((j) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: cn(
                    "flex items-center gap-1 truncate rounded-sm px-1 py-0.5 text-[10px] leading-tight",
                    j.completed ? "bg-muted text-muted-foreground" : workColorClass$2(j.work)
                  ),
                  title: `${j.truckId} — ${j.work} (${j.bay})${j.completed ? " ✓" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxs(
                      "span",
                      {
                        className: cn(
                          "truncate",
                          j.completed && "line-through opacity-80"
                        ),
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: j.truckId }),
                          /* @__PURE__ */ jsx("span", { className: "ml-1 text-foreground/70", children: j.work })
                        ]
                      }
                    ),
                    j.completed ? /* @__PURE__ */ jsx(Check, { className: "ml-auto h-3 w-3 shrink-0" }) : /* @__PURE__ */ jsx("span", { className: "ml-auto shrink-0 font-semibold tabular-nums opacity-80", children: String(j.bay).replace(/\D/g, "") })
                  ]
                },
                j.id
              )),
              hidden > 0 && !expanded && /* @__PURE__ */ jsxs(
                "span",
                {
                  role: "button",
                  tabIndex: 0,
                  onClick: (e) => {
                    e.stopPropagation();
                    setExpanded(true);
                  },
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      setExpanded(true);
                    }
                  },
                  className: "block cursor-pointer text-[9px] text-muted-foreground hover:text-foreground",
                  children: [
                    "+",
                    hidden,
                    " more"
                  ]
                }
              ),
              expanded && /* @__PURE__ */ jsx(
                "span",
                {
                  role: "button",
                  tabIndex: 0,
                  onClick: (e) => {
                    e.stopPropagation();
                    setExpanded(false);
                  },
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      setExpanded(false);
                    }
                  },
                  className: "block cursor-pointer text-[9px] text-muted-foreground hover:text-foreground",
                  children: "Show less"
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
function MonthCalendar({
  month,
  onMonthChange,
  selected,
  onSelect,
  jobs,
  compact = false
}) {
  const [count, setCount] = useState(1);
  const today = /* @__PURE__ */ new Date();
  const months = Array.from({ length: count }, (_, i) => addMonths(month, i));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    months.map((m, idx) => /* @__PURE__ */ jsx(
      SingleMonth,
      {
        month: m,
        selected,
        onSelect,
        jobs,
        compact,
        headerRight: idx === 0 ? /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "hover:bg-accent/20 hover:text-accent",
            onClick: () => {
              onMonthChange(startOfMonth(today));
              onSelect(today);
              setCount(1);
            },
            children: "Today"
          }
        ) : null
      },
      `${m.getFullYear()}-${m.getMonth()}`
    )),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      count > 1 && /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex-1 hover:bg-accent/20 hover:text-accent hover:border-accent",
          "aria-label": "Collapse to single month",
          onClick: () => setCount(1),
          children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex-1 hover:bg-accent/20 hover:text-accent hover:border-accent",
          "aria-label": "Show next month",
          onClick: () => setCount((c) => c + 1),
          children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
const KEY$1 = "paint-shop-truck-status-v1";
function read() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY$1);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
function useTruckStatus() {
  const [statuses, setStatuses] = useState({});
  useEffect(() => {
    setStatuses(read());
  }, []);
  const persist = (updater) => {
    setStatuses((prev) => {
      const next = updater(prev);
      localStorage.setItem(KEY$1, JSON.stringify(next));
      return next;
    });
  };
  const getStatus = (truckId) => statuses[truckId] ?? { completed: false, invoiced: false };
  const setField = (truckId, field, value) => {
    persist((prev) => ({
      ...prev,
      [truckId]: { ...prev[truckId] ?? { completed: false, invoiced: false }, [field]: value }
    }));
  };
  const renameTruckStatus = (oldId, newId) => {
    persist((prev) => {
      if (!prev[oldId]) return prev;
      const { [oldId]: existing, ...rest } = prev;
      return { ...rest, [newId]: existing };
    });
  };
  const removeTruckStatus = (truckId) => {
    persist((prev) => {
      if (!prev[truckId]) return prev;
      const { [truckId]: _removed, ...rest } = prev;
      return rest;
    });
  };
  return { statuses, getStatus, setField, renameTruckStatus, removeTruckStatus };
}
function workColorClass$1(work) {
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
function startOfWeek(d) {
  const out = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  out.setDate(out.getDate() - out.getDay());
  return out;
}
function addDays(d, n) {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}
function WeekGrid({
  weekStart,
  itemsByDay,
  onAddJob,
  onRemoveItem
}) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekEnd = addDays(weekStart, 6);
  const todayKey = toDateKey(/* @__PURE__ */ new Date());
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
      "Week of",
      " ",
      weekStart.toLocaleDateString(void 0, {
        month: "short",
        day: "numeric"
      }),
      " ",
      "–",
      " ",
      weekEnd.toLocaleDateString(void 0, {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-2", children: days.map((d) => {
      const key = toDateKey(d);
      const dayItems = itemsByDay.get(key) ?? [];
      const isToday = todayKey === key;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onAddJob(d),
          className: `group flex min-h-[140px] flex-col rounded-md border p-2 text-left transition-colors hover:border-primary hover:bg-primary/10 ${isToday ? "border-primary/60 bg-primary/5" : "border-border bg-card"}`,
          "aria-label": `Add job on ${d.toLocaleDateString()}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-1 flex items-baseline justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: d.toLocaleDateString(void 0, { weekday: "short" }) }),
              /* @__PURE__ */ jsx("span", { className: "font-display text-base", children: d.getDate() })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-1.5", children: [
              dayItems.length === 0 ? /* @__PURE__ */ jsx("span", { className: "mt-2 text-[11px] text-muted-foreground/60", children: "—" }) : dayItems.map((item) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "relative rounded border border-border/70 bg-background/60 p-1.5 text-[11px]",
                  children: [
                    onRemoveItem && /* @__PURE__ */ jsx(
                      "span",
                      {
                        role: "button",
                        tabIndex: 0,
                        onClick: (e) => {
                          e.stopPropagation();
                          onRemoveItem(item.id);
                        },
                        onKeyDown: (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            onRemoveItem(item.id);
                          }
                        },
                        "aria-label": "Remove",
                        className: "absolute right-0.5 top-0.5 cursor-pointer rounded p-0.5 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100",
                        children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-1 text-accent", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
                        /* @__PURE__ */ jsx("span", { className: "font-medium", children: item.bay })
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "rounded bg-primary/15 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary", children: item.shift === "ALL_DAY" ? "All" : item.shift })
                    ] }),
                    /* @__PURE__ */ jsxs("p", { className: `mt-0.5 line-clamp-2 pr-3 rounded px-1 py-0.5 ${workColorClass$1(item.work)}`, children: [
                      item.work,
                      item.color ? ` — ${item.color}` : ""
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mt-0.5 flex items-center gap-1 text-muted-foreground", children: [
                      /* @__PURE__ */ jsx(User, { className: "h-3 w-3" }),
                      /* @__PURE__ */ jsx("span", { className: "truncate", children: item.employee })
                    ] })
                  ]
                },
                item.id
              )),
              /* @__PURE__ */ jsxs("span", { className: "mt-auto flex items-center justify-center gap-1 rounded border border-dashed border-transparent py-1 text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 transition-opacity group-hover:border-primary/40 group-hover:opacity-100", children: [
                /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" }),
                " Add"
              ] })
            ] })
          ]
        },
        key
      );
    }) })
  ] });
}
function TruckWeekView({
  truckId,
  jobs,
  onAddJob
}) {
  const truckJobs = useMemo(
    () => jobs.filter((j) => j.truckId === truckId),
    [jobs, truckId]
  );
  const firstWeek = useMemo(() => {
    const upcoming = truckJobs.map((j) => /* @__PURE__ */ new Date(`${j.date}T00:00:00`)).sort((a, b) => a.getTime() - b.getTime())[0];
    return startOfWeek(upcoming ?? /* @__PURE__ */ new Date());
  }, [truckJobs]);
  const [weekCount, setWeekCount] = useState(1);
  const jobsByDay = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const j of truckJobs) {
      const arr = map.get(j.date) ?? [];
      arr.push(j);
      map.set(j.date, arr);
    }
    return map;
  }, [truckJobs]);
  const weeks = Array.from(
    { length: weekCount },
    (_, i) => addDays(firstWeek, i * 7)
  );
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-h-[70vh] overflow-y-auto pr-1", children: [
    weeks.map((w) => /* @__PURE__ */ jsx(
      WeekGrid,
      {
        weekStart: w,
        itemsByDay: jobsByDay,
        onAddJob
      },
      toDateKey(w)
    )),
    /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        className: "w-full gap-2",
        onClick: () => setWeekCount((c) => c + 1),
        children: [
          /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" }),
          " Show next week"
        ]
      }
    )
  ] });
}
const BAYS = [
  "Sandblast Area",
  "Outhouse",
  "Yard",
  "Bay 1",
  "Bay 2",
  "Bay 3",
  "Bay 4",
  "Paint Booth 1",
  "Paint Booth 2"
];
const WORK_OPTIONS = ["Assembly", "Check-in", "Disassembly", "Other", "Paint", "Sandblast", "Sanding", "Touchups"];
function PendingJobForm({
  date,
  onAdd,
  onCancel
}) {
  const [workType, setWorkType] = useState("");
  const [workOther, setWorkOther] = useState("");
  const [bay, setBay] = useState(BAYS[0]);
  const [employee, setEmployee] = useState("");
  const [shift, setShift] = useState("ALL_DAY");
  const [color, setColor] = useState("");
  const resolvedWork = workType === "Other" ? workOther.trim() : workType;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: date.toLocaleDateString(void 0, {
      weekday: "long",
      month: "long",
      day: "numeric"
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { children: "Bay" }),
        /* @__PURE__ */ jsxs(Select, { value: bay, onValueChange: setBay, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: BAYS.map((b) => /* @__PURE__ */ jsx(SelectItem, { value: b, children: b }, b)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "emp", children: "Employee" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "emp",
            placeholder: "Jordan Rivera",
            value: employee,
            onChange: (e) => setEmployee(e.target.value)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "work", children: "Work to be done" }),
      /* @__PURE__ */ jsxs(Select, { value: workType, onValueChange: setWorkType, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { id: "work", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "-- Select One --" }) }),
        /* @__PURE__ */ jsx(SelectContent, { children: WORK_OPTIONS.map((o) => /* @__PURE__ */ jsx(SelectItem, { value: o, children: o }, o)) })
      ] }),
      workType === "Other" && /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Enter task",
          value: workOther,
          onChange: (e) => setWorkOther(e.target.value),
          className: "mt-2"
        }
      )
    ] }),
    workType === "Paint" && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "paint-color", children: "Color" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "paint-color",
          placeholder: "e.g. Fleet White, PMS 286",
          value: color,
          onChange: (e) => setColor(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { children: "Shift" }),
      /* @__PURE__ */ jsxs(
        ToggleGroup,
        {
          type: "single",
          value: shift,
          onValueChange: (v) => v && setShift(v),
          className: "grid grid-cols-3 gap-2",
          children: [
            /* @__PURE__ */ jsx(ToggleGroupItem, { value: "AM", className: "border border-border data-[state=on]:border-primary", children: "AM" }),
            /* @__PURE__ */ jsx(ToggleGroupItem, { value: "PM", className: "border border-border data-[state=on]:border-primary", children: "PM" }),
            /* @__PURE__ */ jsx(ToggleGroupItem, { value: "ALL_DAY", className: "border border-border data-[state=on]:border-primary", children: "All Day" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: onCancel, children: "Cancel" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          onClick: () => {
            if (!resolvedWork) {
              toast.error("Select work to be done");
              return;
            }
            onAdd({
              work: resolvedWork,
              bay,
              employee: employee.trim(),
              shift,
              ...workType === "Paint" && color.trim() ? { color: color.trim() } : {}
            });
          },
          children: "Add to day"
        }
      )
    ] })
  ] });
}
function MobileTaskRows({
  pending,
  setPending
}) {
  const todayKey = toDateKey(/* @__PURE__ */ new Date());
  const rows = pending.length === 0 ? [
    {
      id: "__draft__",
      date: todayKey,
      work: "",
      bay: "",
      employee: "",
      shift: "ALL_DAY"
    }
  ] : pending;
  const updateRow = (id, patch) => {
    setPending((prev) => {
      if (prev.length === 0) {
        const seed = {
          id: crypto.randomUUID(),
          date: todayKey,
          work: "",
          bay: "",
          employee: "",
          shift: "ALL_DAY",
          ...patch
        };
        return [seed];
      }
      return prev.map((r) => r.id === id ? { ...r, ...patch } : r);
    });
  };
  const removeRow = (id) => {
    setPending((prev) => prev.filter((r) => r.id !== id));
  };
  const addRow = () => {
    setPending((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        date: todayKey,
        work: "",
        bay: "",
        employee: "",
        shift: "ALL_DAY"
      }
    ]);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    rows.map((row, idx) => {
      const isOther = !WORK_OPTIONS.includes(row.work) && row.work !== "";
      const workType = isOther ? "Other" : row.work;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "space-y-3 rounded-md border border-border bg-card/40 p-3",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
                "Task ",
                idx + 1
              ] }),
              rows.length > 1 && row.id !== "__draft__" && /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-6 w-6",
                  onClick: () => removeRow(row.id),
                  "aria-label": "Remove task",
                  children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { children: "Date" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "date",
                  value: row.date,
                  onChange: (e) => updateRow(row.id, { date: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { children: "Task" }),
              /* @__PURE__ */ jsxs(
                Select,
                {
                  value: workType || void 0,
                  onValueChange: (v) => updateRow(row.id, { work: v === "Other" ? "" : v }),
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "-- Select One --" }) }),
                    /* @__PURE__ */ jsx(SelectContent, { children: WORK_OPTIONS.map((o) => /* @__PURE__ */ jsx(SelectItem, { value: o, children: o }, o)) })
                  ]
                }
              ),
              workType === "Other" && /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Enter task",
                  value: row.work,
                  onChange: (e) => updateRow(row.id, { work: e.target.value }),
                  className: "mt-2"
                }
              ),
              row.work === "Paint" && /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Color (e.g. Fleet White)",
                  value: row.color ?? "",
                  onChange: (e) => updateRow(row.id, { color: e.target.value }),
                  className: "mt-2"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxs(Label, { children: [
                  "Bay",
                  workType === "Other" ? " (optional)" : ""
                ] }),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    value: row.bay || void 0,
                    onValueChange: (v) => updateRow(row.id, { bay: v }),
                    children: [
                      /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "-- Select bay --" }) }),
                      /* @__PURE__ */ jsx(SelectContent, { children: BAYS.map((b) => /* @__PURE__ */ jsx(SelectItem, { value: b, children: b }, b)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx(Label, { children: "Employee" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    placeholder: "-- Please enter an employee --",
                    value: row.employee,
                    onChange: (e) => updateRow(row.id, { employee: e.target.value })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { children: "Shift" }),
              /* @__PURE__ */ jsxs(
                ToggleGroup,
                {
                  type: "single",
                  value: row.shift,
                  onValueChange: (v) => v && updateRow(row.id, { shift: v }),
                  className: "grid grid-cols-3 gap-2",
                  children: [
                    /* @__PURE__ */ jsx(ToggleGroupItem, { value: "AM", className: "border border-border data-[state=on]:border-primary", children: "AM" }),
                    /* @__PURE__ */ jsx(ToggleGroupItem, { value: "PM", className: "border border-border data-[state=on]:border-primary", children: "PM" }),
                    /* @__PURE__ */ jsx(ToggleGroupItem, { value: "ALL_DAY", className: "border border-border data-[state=on]:border-primary", children: "All Day" })
                  ]
                }
              )
            ] })
          ]
        },
        row.id
      );
    }),
    /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        className: "w-full gap-2",
        onClick: addRow,
        children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
          " Add another task"
        ]
      }
    )
  ] });
}
function NewTruckForm({
  onCreate,
  onClose
}) {
  const [truckId, setTruckId] = useState("");
  const [company, setCompany] = useState("");
  const [pending, setPending] = useState([]);
  const [weekCount, setWeekCount] = useState(1);
  const [addFor, setAddFor] = useState(null);
  const firstWeek = useMemo(() => startOfWeek(/* @__PURE__ */ new Date()), []);
  const weeks = Array.from(
    { length: weekCount },
    (_, i) => addDays(firstWeek, i * 7)
  );
  const itemsByDay = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const p of pending) {
      const arr = map.get(p.date) ?? [];
      arr.push(p);
      map.set(p.date, arr);
    }
    return map;
  }, [pending]);
  const handleCreate = () => {
    if (!truckId.trim()) {
      toast.error("Enter a truck ID");
      return;
    }
    if (pending.length === 0) {
      toast.error("Add at least one job to the schedule");
      return;
    }
    for (const p of pending) {
      if (!p.date || !p.work.trim()) {
        toast.error("Fill in date and work to be done for every task");
        return;
      }
    }
    onCreate(truckId.trim().toUpperCase(), company.trim(), pending);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-h-[70vh] overflow-y-auto pr-1", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "new-truck", children: "Truck ID" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "new-truck",
            placeholder: "TRK-4821",
            value: truckId,
            onChange: (e) => setTruckId(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "new-truck-company", children: "Company" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "new-truck-company",
            placeholder: "Acme Logistics",
            value: company,
            onChange: (e) => setCompany(e.target.value)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { children: "Schedule" }),
      /* @__PURE__ */ jsx("p", { className: "hidden md:block text-xs text-muted-foreground", children: "Click any day to add work for this truck." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden md:block space-y-4", children: [
      weeks.map((w) => /* @__PURE__ */ jsx(
        WeekGrid,
        {
          weekStart: w,
          itemsByDay,
          onAddJob: (d) => setAddFor(d),
          onRemoveItem: (id) => setPending((prev) => prev.filter((p) => p.id !== id))
        },
        toDateKey(w)
      )),
      /* @__PURE__ */ jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "w-full gap-2",
          onClick: () => setWeekCount((c) => c + 1),
          children: [
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" }),
            " Show next week"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(MobileTaskRows, { pending, setPending }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 border-t border-border pt-3", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleCreate, className: "font-display tracking-wider", children: [
        "Create truck (",
        pending.length,
        " ",
        pending.length === 1 ? "job" : "jobs",
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: addFor !== null, onOpenChange: (o) => !o && setAddFor(null), children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-md", children: addFor && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "font-display text-xl tracking-wider", children: "New Job" }) }),
      /* @__PURE__ */ jsx(
        PendingJobForm,
        {
          date: addFor,
          onCancel: () => setAddFor(null),
          onAdd: (j) => {
            setPending((prev) => [
              ...prev,
              {
                ...j,
                id: crypto.randomUUID(),
                date: toDateKey(addFor)
              }
            ]);
            setAddFor(null);
          }
        }
      )
    ] }) }) })
  ] });
}
function TruckSchedule({
  jobs,
  addJob,
  renameTruck,
  onToggleComplete
}) {
  const [query, setQuery] = useState("");
  const [openTruck, setOpenTruck] = useState(null);
  const [addFor, setAddFor] = useState(
    null
  );
  const [newTruckOpen, setNewTruckOpen] = useState(false);
  const [editTruck, setEditTruck] = useState(null);
  const [editValue, setEditValue] = useState("");
  const { getStatus, setField, renameTruckStatus } = useTruckStatus();
  const [companyFilter, setCompanyFilter] = useState("__all__");
  const grouped = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const j of jobs) {
      const arr = map.get(j.truckId) ?? [];
      arr.push(j);
      map.set(j.truckId, arr);
    }
    return Array.from(map.entries()).map(([truckId, list]) => {
      const sorted = list.sort((a, b) => a.date.localeCompare(b.date));
      const company = sorted.find((j) => (j.company ?? "").trim() !== "")?.company?.trim() ?? "";
      return { truckId, jobs: sorted, company };
    }).sort((a, b) => {
      const ad = a.jobs[0]?.date ?? "";
      const bd = b.jobs[0]?.date ?? "";
      if (ad !== bd) return ad.localeCompare(bd);
      return a.truckId.localeCompare(b.truckId);
    });
  }, [jobs]);
  const companies = useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    for (const g of grouped) if (g.company) set.add(g.company);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [grouped]);
  const filtered = grouped.filter((g) => {
    if (companyFilter === "__all__") ;
    else if (companyFilter === "__none__") {
      if (g.company) return false;
    } else if (g.company !== companyFilter) {
      return false;
    }
    const q = query.trim().toLowerCase();
    if (q && !g.truckId.toLowerCase().includes(q)) return false;
    return true;
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between border-b border-border pb-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Schedule by" }),
        /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl text-foreground", children: "Truck" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(
        Button,
        {
          size: "icon",
          onClick: () => setNewTruckOpen(true),
          "aria-label": "Add new truck",
          className: "rounded-full",
          children: /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "Search truck ID…",
            className: "pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: companyFilter, onValueChange: setCompanyFilter, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "sm:w-56", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Filter by company" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "__all__", children: "All companies" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "__none__", children: "No company" }),
          companies.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c, children: c }, c))
        ] })
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 py-12 text-center", children: [
      /* @__PURE__ */ jsx(Truck, { className: "h-10 w-10 text-muted-foreground/60" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: jobs.length === 0 ? "No trucks scheduled yet." : "No trucks match your search." })
    ] }) : /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: filtered.map(({ truckId, jobs: tjobs, company }) => {
      const status = getStatus(truckId);
      const grayed = status.completed && status.invoiced;
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOpenTruck(truckId),
          className: `w-full rounded-lg border p-4 text-left transition-colors hover:border-primary/60 ${grayed ? "border-border/50 bg-muted/40 opacity-70" : "border-border bg-card hover:bg-card/80"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Truck, { className: `h-4 w-4 ${grayed ? "text-muted-foreground" : "text-primary"}` }),
                /* @__PURE__ */ jsxs("span", { className: `font-display text-xl tracking-wider ${grayed ? "text-muted-foreground line-through" : "text-foreground"}`, children: [
                  truckId,
                  company ? ` - ${company}` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
                /* @__PURE__ */ jsxs(
                  "label",
                  {
                    className: "flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer select-none",
                    onClick: (e) => e.stopPropagation(),
                    children: [
                      /* @__PURE__ */ jsx(
                        Checkbox,
                        {
                          checked: status.completed,
                          onCheckedChange: (v) => setField(truckId, "completed", v === true)
                        }
                      ),
                      "Job Completed"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "label",
                  {
                    className: "flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer select-none",
                    onClick: (e) => e.stopPropagation(),
                    children: [
                      /* @__PURE__ */ jsx(
                        Checkbox,
                        {
                          checked: status.invoiced,
                          onCheckedChange: (v) => setField(truckId, "invoiced", v === true)
                        }
                      ),
                      "Invoiced"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: grayed ? "border-muted-foreground/30 text-muted-foreground" : "", children: [
                  tjobs.length,
                  " ",
                  tjobs.length === 1 ? "job" : "jobs"
                ] }),
                renameTruck && /* @__PURE__ */ jsx(
                  "span",
                  {
                    role: "button",
                    tabIndex: 0,
                    "aria-label": `Edit ${truckId}`,
                    onClick: (e) => {
                      e.stopPropagation();
                      setEditTruck(truckId);
                      setEditValue(truckId);
                    },
                    onKeyDown: (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        setEditTruck(truckId);
                        setEditValue(truckId);
                      }
                    },
                    className: "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-2", children: tjobs.map((job) => {
              const d = /* @__PURE__ */ new Date(`${job.date}T00:00:00`);
              const dim = grayed || job.completed;
              return /* @__PURE__ */ jsxs(
                "li",
                {
                  className: `flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm ${job.completed ? "opacity-60" : ""}`,
                  children: [
                    onToggleComplete && /* @__PURE__ */ jsx("span", { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(
                      Checkbox,
                      {
                        checked: !!job.completed,
                        onCheckedChange: () => onToggleComplete(job.id),
                        "aria-label": "Mark task complete"
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("span", { className: `flex items-center gap-1.5 font-medium ${dim ? "text-muted-foreground" : "text-foreground"}`, children: [
                      /* @__PURE__ */ jsx(Calendar, { className: `h-3.5 w-3.5 ${dim ? "text-muted-foreground" : "text-primary"}` }),
                      d.toLocaleDateString(void 0, {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })
                    ] }),
                    /* @__PURE__ */ jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: dim ? "border-muted-foreground/30 text-muted-foreground" : "border-accent/50 text-accent",
                        children: [
                          /* @__PURE__ */ jsx(MapPin, { className: "mr-1 h-3 w-3" }),
                          job.bay
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-muted-foreground/30 text-muted-foreground", children: job.shift === "ALL_DAY" ? "All Day" : job.shift }),
                    /* @__PURE__ */ jsxs(
                      "span",
                      {
                        className: `flex-1 rounded px-2 py-0.5 text-xs font-medium ${dim ? "bg-muted/40 text-muted-foreground" : workColorClass$1(job.work)}`,
                        children: [
                          job.work,
                          job.color ? ` — ${job.color}` : ""
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsx(User, { className: "h-3 w-3" }),
                      job.employee
                    ] })
                  ]
                },
                job.id
              );
            }) })
          ]
        }
      ) }, truckId);
    }) }),
    /* @__PURE__ */ jsx(
      Dialog,
      {
        open: openTruck !== null,
        onOpenChange: (o) => !o && setOpenTruck(null),
        children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-5xl", children: openTruck && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2 font-display text-2xl tracking-wider", children: [
            /* @__PURE__ */ jsx(Truck, { className: "h-5 w-5 text-primary" }),
            openTruck
          ] }) }),
          /* @__PURE__ */ jsx(
            TruckWeekView,
            {
              truckId: openTruck,
              jobs,
              onAddJob: (d) => setAddFor({ truckId: openTruck, date: d })
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(
      Dialog,
      {
        open: addFor !== null,
        onOpenChange: (o) => !o && setAddFor(null),
        children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-lg", children: addFor && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, { className: "font-display text-2xl tracking-wider", children: [
            "New Job — ",
            addFor.truckId,
            " ·",
            " ",
            addFor.date.toLocaleDateString(void 0, {
              weekday: "short",
              month: "short",
              day: "numeric"
            })
          ] }) }),
          /* @__PURE__ */ jsx(
            ScheduleForm,
            {
              selectedDate: addFor.date,
              defaultTruckId: addFor.truckId,
              lockTruckId: true,
              existingJobs: jobs,
              onSubmit: (j) => {
                addJob(j);
                setAddFor(null);
              }
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(Dialog, { open: newTruckOpen, onOpenChange: setNewTruckOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "w-[calc(100%-2rem)] max-w-4xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { className: "font-display text-2xl tracking-wider", children: "New Truck" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Enter the truck ID and click days on the week to schedule work." })
      ] }),
      /* @__PURE__ */ jsx(
        NewTruckForm,
        {
          onClose: () => setNewTruckOpen(false),
          onCreate: (truckId, company, items) => {
            for (const it of items) {
              addJob({
                truckId,
                work: it.work,
                bay: it.bay,
                employee: it.employee,
                date: it.date,
                shift: it.shift,
                company: company || void 0,
                color: it.color
              });
            }
            toast.success(`${truckId} scheduled (${items.length} jobs)`);
            setNewTruckOpen(false);
            setOpenTruck(truckId);
          }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: editTruck !== null, onOpenChange: (o) => !o && setEditTruck(null), children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-sm", children: editTruck && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "font-display text-2xl tracking-wider", children: "Edit Truck" }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "edit-truck-id", children: "Truck ID" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "edit-truck-id",
              value: editValue,
              onChange: (e) => setEditValue(e.target.value),
              autoFocus: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => setEditTruck(null), children: "Cancel" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => {
                const next = editValue.trim().toUpperCase();
                if (!next) {
                  toast.error("Enter a truck ID");
                  return;
                }
                if (next !== editTruck && grouped.some((g) => g.truckId === next)) {
                  toast.error("A truck with that ID already exists");
                  return;
                }
                if (next !== editTruck) {
                  renameTruck?.(editTruck, next);
                  renameTruckStatus(editTruck, next);
                  toast.success(`Renamed to ${next}`);
                }
                setEditTruck(null);
              },
              children: "Save"
            }
          )
        ] })
      ] })
    ] }) }) })
  ] });
}
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const CELLS = [
  { bays: ["Outhouse"], rowSpan: 4 },
  { bays: [], empty: true, rowSpan: 3 },
  { bays: ["Sandblast Area"], rowSpan: 3 },
  { bays: ["Paint Booth 1"], rowSpan: 3 },
  { bays: ["Paint Booth 2"], rowSpan: 3 },
  { bays: ["Yard"], rowSpan: 8 },
  { bays: ["Bay 3"], rowSpan: 3 },
  { bays: ["Bay 4"], rowSpan: 3 },
  { bays: ["Bay 1"], rowSpan: 3 },
  { bays: ["Bay 2"], rowSpan: 3 }
];
const NOTES_KEY = "paint-shop-bay-notes-v1";
function bayLabel(b) {
  return /^\d+$/.test(b) ? `Bay ${b}` : b;
}
function workColorClass(work) {
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
function BayGrid({
  date,
  jobs,
  showCompany = false
}) {
  const dayJobs = jobs.filter((j) => j.date === toDateKey(date));
  const [notes, setNotes] = useState("");
  const [notesExtra, setNotesExtra] = useState(0);
  const [activeCell, setActiveCell] = useState(null);
  useEffect(() => {
    try {
      setNotes(localStorage.getItem(NOTES_KEY) ?? "");
    } catch {
    }
  }, []);
  const handleNotesChange = (v) => {
    setNotes(v);
    try {
      localStorage.setItem(NOTES_KEY, v);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "grid grid-cols-3 gap-3",
      style: {
        minHeight: `calc(100dvh - 15rem + ${notesExtra}px)`,
        gridTemplateRows: `repeat(12, minmax(40px, 1fr)) minmax(120px, ${120 + notesExtra}px)`
      },
      children: [
        CELLS.map((cell, i) => {
          if (cell.empty) {
            return /* @__PURE__ */ jsx(
              "div",
              {
                "aria-hidden": true,
                style: cell.rowSpan ? { gridRow: `span ${cell.rowSpan}` } : void 0
              },
              i
            );
          }
          const cellJobs = dayJobs.filter((j) => cell.bays.includes(j.bay));
          const label = cell.bays.map(bayLabel).join(" / ");
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveCell(cell),
              className: "flex flex-col gap-2 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              style: cell.rowSpan ? { gridRow: `span ${cell.rowSpan}` } : void 0,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 border-b border-border/60 pb-2", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 text-accent" }),
                  /* @__PURE__ */ jsx("span", { className: "font-display text-sm tracking-wider text-foreground", children: label }),
                  /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "ml-auto text-xs", children: cellJobs.length })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-1.5 overflow-y-auto", children: cellJobs.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground/60", children: "No jobs" }) : cellJobs.map((j) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `flex items-center gap-1.5 rounded border border-border/60 bg-background/50 px-2 py-1 text-xs ${j.completed ? "opacity-50 line-through" : ""}`,
                    children: [
                      /* @__PURE__ */ jsx(Truck, { className: "h-3 w-3 text-primary shrink-0" }),
                      /* @__PURE__ */ jsxs("span", { className: "font-medium truncate", children: [
                        j.truckId,
                        showCompany && j.company ? ` - ${j.company}` : ""
                      ] }),
                      /* @__PURE__ */ jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: `ml-auto whitespace-nowrap text-[10px] px-1.5 py-0 ${workColorClass(j.work)} ${j.completed ? "line-through opacity-70" : ""}`,
                          children: j.work
                        }
                      )
                    ]
                  },
                  j.id
                )) })
              ]
            },
            i
          );
        }),
        /* @__PURE__ */ jsx(
          NotesBlock,
          {
            notes,
            onChange: handleNotesChange,
            extraHeight: notesExtra,
            onExtraHeightChange: setNotesExtra
          }
        ),
        /* @__PURE__ */ jsx(Dialog, { open: activeCell !== null, onOpenChange: (o) => !o && setActiveCell(null), children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-md", children: activeCell && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "font-display text-2xl tracking-wider", children: activeCell.bays.map(bayLabel).join(" / ") }) }),
          (() => {
            const cellJobs = dayJobs.filter((j) => activeCell.bays.includes(j.bay));
            if (cellJobs.length === 0) {
              return /* @__PURE__ */ jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "No tasks scheduled for this area today." });
            }
            return /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: cellJobs.map((j) => /* @__PURE__ */ jsxs(
              "li",
              {
                className: `rounded-lg border border-border bg-card p-3 ${j.completed ? "opacity-60" : ""}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Truck, { className: "h-4 w-4 text-primary" }),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `font-display text-lg tracking-wider ${j.completed ? "line-through" : ""}`,
                        children: j.truckId
                      }
                    ),
                    /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "ml-auto text-xs", children: [
                      j.work,
                      j.color ? ` — ${j.color}` : ""
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-1.5 flex items-center gap-3 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(User, { className: "h-3 w-3" }),
                      " ",
                      j.employee
                    ] }),
                    /* @__PURE__ */ jsx("span", { children: j.shift === "ALL_DAY" ? "All Day" : j.shift })
                  ] })
                ]
              },
              j.id
            )) });
          })()
        ] }) }) })
      ]
    }
  );
}
function NotesBlock({
  notes,
  onChange,
  extraHeight,
  onExtraHeightChange
}) {
  const startRef = useRef(null);
  const lastClientYRef = useRef(0);
  const rafRef = useRef(null);
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
  const onPointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    startRef.current = { y: e.clientY, h: extraHeight, scrollY: window.scrollY };
    lastClientYRef.current = e.clientY;
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(tickAutoScroll);
    }
  };
  const onPointerMove = (e) => {
    if (!startRef.current) return;
    lastClientYRef.current = e.clientY;
    applyHeight();
  };
  const onPointerUp = (e) => {
    e.target.releasePointerCapture(e.pointerId);
    startRef.current = null;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "col-span-3 flex flex-col gap-2 rounded-lg border border-border bg-card p-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 border-b border-border/60 pb-2", children: [
      /* @__PURE__ */ jsx(StickyNote, { className: "h-3.5 w-3.5 text-accent" }),
      /* @__PURE__ */ jsx("span", { className: "font-display text-sm tracking-wider text-foreground", children: "Notes" })
    ] }),
    /* @__PURE__ */ jsx(
      Textarea,
      {
        value: notes,
        onChange: (e) => onChange(e.target.value),
        placeholder: "Add notes for the day…",
        className: "flex-1 resize-none border-0 bg-transparent px-0 text-sm focus-visible:ring-0"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerCancel: onPointerUp,
        "aria-label": "Drag to resize notes",
        className: "mx-auto -mb-1 flex h-4 w-12 cursor-ns-resize items-center justify-center rounded text-muted-foreground/60 hover:text-foreground touch-none select-none",
        children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
      }
    )
  ] });
}
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
const KEY = "paint-shop-theme";
function applyTheme(dark) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", dark);
}
function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    const initial = stored === "dark" || stored === null && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    setDark(initial);
    applyTheme(initial);
  }, []);
  const toggle = (next) => {
    setDark(next);
    applyTheme(next);
    localStorage.setItem(KEY, next ? "dark" : "light");
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ jsx(
      Switch,
      {
        checked: dark,
        onCheckedChange: toggle,
        "aria-label": "Toggle dark mode"
      }
    ),
    /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4 text-muted-foreground" })
  ] });
}
function Index() {
  const {
    jobs,
    addJob,
    removeJob,
    updateJob,
    toggleComplete,
    renameTruck
  } = useJobs();
  const today = /* @__PURE__ */ new Date();
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [openDay, setOpenDay] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState("schedule");
  const [editingId, setEditingId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const calendarPanelRef = useRef(null);
  const dayPanelRef = useRef(null);
  const [calendarCollapsed, setCalendarCollapsed] = useState(false);
  const [dayCollapsed, setDayCollapsed] = useState(false);
  useEffect(() => setMounted(true), []);
  const handleSelect = (d) => {
    setOpenDay(d);
    setMode("schedule");
    setEditingId(null);
  };
  const handleSelectMobile = (d) => {
    handleSelect(d);
    setDialogOpen(true);
  };
  const handleClose = (o) => {
    if (!o) {
      setDialogOpen(false);
      setMode("schedule");
      setEditingId(null);
    }
  };
  const editingJob = editingId ? jobs.find((j) => j.id === editingId) : void 0;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-right" }),
    /* @__PURE__ */ jsx("header", { className: "border-b border-border/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex w-full items-center justify-between px-6 py-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(Paintbrush, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl leading-none", children: "Bay Sheet" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-6", children: /* @__PURE__ */ jsx(ThemeToggle, {}) })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "mx-auto hidden w-full px-6 py-6 lg:block", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "bay", className: "w-full", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full max-w-lg grid-cols-3", children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "bay", className: "gap-2", children: [
          /* @__PURE__ */ jsx(LayoutGrid, { className: "h-4 w-4" }),
          " By Bay"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "truck", className: "gap-2", children: [
          /* @__PURE__ */ jsx(Truck, { className: "h-4 w-4" }),
          " By Truck"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "calendar", className: "gap-2", children: [
          /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4" }),
          " By Day"
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "calendar", className: "mt-4", children: (() => {
        const calendarContent = /* @__PURE__ */ jsx(Card, { className: "h-full", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsx(MonthCalendar, { month, onMonthChange: setMonth, selected: openDay ?? today, onSelect: handleSelect, jobs }) }) });
        const selectedDate = openDay ?? today;
        const dayJobCount = jobs.filter((j) => j.date === toDateKey(selectedDate)).length;
        const dayContent = /* @__PURE__ */ jsx(Card, { className: "h-full", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between border-b border-border pb-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: selectedDate.toLocaleDateString(void 0, {
                weekday: "long"
              }) }),
              /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl text-foreground", children: selectedDate.toLocaleDateString(void 0, {
                month: "long",
                day: "numeric"
              }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "font-display text-base px-3 py-1", children: [
                dayJobCount,
                " ",
                dayJobCount === 1 ? "job" : "jobs"
              ] }),
              mode === "schedule" ? /* @__PURE__ */ jsx(Button, { size: "icon", onClick: () => setMode("form"), "aria-label": "Add new job", className: "rounded-full", children: /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5" }) }) : /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
                setMode("schedule");
                setEditingId(null);
              }, "aria-label": "Back to schedule", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) })
            ] })
          ] }),
          mode === "schedule" ? /* @__PURE__ */ jsx(DaySchedule, { date: selectedDate, jobs, onRemove: removeJob, onToggleComplete: toggleComplete, onEdit: (job) => {
            setEditingId(job.id);
            setMode("form");
          } }) : /* @__PURE__ */ jsx(ScheduleForm, { selectedDate, initialJob: editingJob, existingJobs: jobs, onSubmit: (j) => {
            if (editingJob) {
              updateJob(editingJob.id, j);
            } else {
              addJob(j);
            }
            setEditingId(null);
            setMode("schedule");
          }, onDelete: (id) => {
            removeJob(id);
            setEditingId(null);
            setMode("schedule");
          } })
        ] }) }) });
        if (!mounted) {
          return /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[3fr_minmax(24rem,1fr)]", children: [
            calendarContent,
            dayContent
          ] });
        }
        return /* @__PURE__ */ jsxs(ResizablePanelGroup, { className: "min-h-[600px] w-full overflow-hidden", children: [
          /* @__PURE__ */ jsx(ResizablePanel, { panelRef: calendarPanelRef, defaultSize: 67, minSize: "20rem", collapsible: true, collapsedSize: "3rem", id: "calendar-panel-v2", className: "pr-3", onResize: () => {
            const c = calendarPanelRef.current?.isCollapsed() ?? false;
            setCalendarCollapsed(c);
          }, children: calendarCollapsed ? /* @__PURE__ */ jsx("button", { onClick: () => calendarPanelRef.current?.expand(), "aria-label": "Expand calendar", className: "flex h-full w-full items-center justify-center rounded-md border border-border bg-card/40 text-muted-foreground transition-colors hover:bg-accent/20 hover:text-accent", children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" }) }) : calendarContent }),
          /* @__PURE__ */ jsx(ResizableHandle, { withHandle: true, className: "mx-1.5 bg-transparent" }),
          /* @__PURE__ */ jsx(ResizablePanel, { panelRef: dayPanelRef, defaultSize: 33, minSize: "18rem", collapsible: true, collapsedSize: "3rem", id: "day-panel-v2", className: "pl-3", onResize: () => {
            const c = dayPanelRef.current?.isCollapsed() ?? false;
            setDayCollapsed(c);
          }, children: dayCollapsed ? /* @__PURE__ */ jsx("button", { onClick: () => dayPanelRef.current?.expand(), "aria-label": "Expand day schedule", className: "flex h-full w-full items-center justify-center rounded-md border border-border bg-card/40 text-muted-foreground transition-colors hover:bg-accent/20 hover:text-accent", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" }) }) : dayContent })
        ] });
      })() }),
      /* @__PURE__ */ jsx(TabsContent, { value: "bay", className: "mt-4", children: /* @__PURE__ */ jsx(Card, { className: "min-h-[calc(100dvh-13rem)]", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6 h-full", children: /* @__PURE__ */ jsx(BayGrid, { date: today, jobs, showCompany: true }) }) }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "truck", className: "mt-4", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsx(TruckSchedule, { jobs, addJob, renameTruck, onToggleComplete: toggleComplete }) }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "mx-auto max-w-2xl px-4 py-6 lg:hidden", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "bay", className: "w-full", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2 h-auto sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "bay", className: "gap-2", children: [
          /* @__PURE__ */ jsx(LayoutGrid, { className: "h-4 w-4" }),
          " By Bay"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "truck", className: "gap-2", children: [
          /* @__PURE__ */ jsx(Truck, { className: "h-4 w-4" }),
          " By Truck"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "today", className: "gap-2", children: [
          /* @__PURE__ */ jsx(ListChecks, { className: "h-4 w-4" }),
          " By Day"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "calendar", className: "gap-2", children: [
          /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4" }),
          " Calendar"
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "bay", className: "mt-4", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsx(BayGrid, { date: today, jobs }) }) }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "calendar", className: "mt-4", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsx(MonthCalendar, { month, onMonthChange: setMonth, selected: today, onSelect: handleSelectMobile, jobs, compact: true }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-center text-xs uppercase tracking-widest text-muted-foreground", children: "Tap a day to see its schedule" })
      ] }) }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "today", className: "mt-4", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsx(DaySchedule, { date: today, jobs, onRemove: removeJob, onToggleComplete: toggleComplete, onEdit: (job) => {
          setOpenDay(new Date(today));
          setEditingId(job.id);
          setMode("form");
          setDialogOpen(true);
        } }),
        /* @__PURE__ */ jsxs(Button, { className: "mt-4 w-full", onClick: () => handleSelectMobile(new Date(today)), children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
          " Add job for today"
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "truck", className: "mt-4", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsx(TruckSchedule, { jobs, addJob, renameTruck, onToggleComplete: toggleComplete }) }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: dialogOpen && openDay !== null, onOpenChange: handleClose, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg max-h-[90vh] flex flex-col overflow-hidden", children: [
      openDay && mode === "schedule" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(DialogHeader, { className: "flex-row items-center justify-between gap-3 space-y-0 pr-8", children: [
          /* @__PURE__ */ jsxs(DialogTitle, { className: "font-display text-2xl tracking-wider flex flex-col items-start", children: [
            /* @__PURE__ */ jsx("span", { children: openDay.toLocaleDateString(void 0, {
              weekday: "long"
            }) }),
            /* @__PURE__ */ jsx("span", { children: openDay.toLocaleDateString(void 0, {
              month: "long",
              day: "numeric"
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "font-display text-base px-3 py-1", children: [
              jobs.filter((j) => j.date === toDateKey(openDay)).length,
              " ",
              jobs.filter((j) => j.date === toDateKey(openDay)).length === 1 ? "job" : "jobs"
            ] }),
            /* @__PURE__ */ jsx(Button, { size: "icon", onClick: () => setMode("form"), "aria-label": "Add new job", className: "rounded-full", children: /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto -mx-6 px-6", children: /* @__PURE__ */ jsx(DaySchedule, { date: openDay, jobs, onRemove: removeJob, onToggleComplete: toggleComplete, onEdit: (job) => {
          setEditingId(job.id);
          setMode("form");
        } }) })
      ] }),
      openDay && mode === "form" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
            setMode("schedule");
            setEditingId(null);
          }, "aria-label": "Back to schedule", className: "h-8 w-8", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxs(DialogTitle, { className: "font-display text-2xl tracking-wider", children: [
            editingJob ? "Edit Job" : "New Job",
            " —",
            " ",
            openDay.toLocaleDateString(void 0, {
              month: "short",
              day: "numeric"
            })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto -mx-6 px-6", children: /* @__PURE__ */ jsx(ScheduleForm, { selectedDate: openDay, initialJob: editingJob, existingJobs: jobs, onSubmit: (j) => {
          if (editingJob) {
            updateJob(editingJob.id, j);
          } else {
            addJob(j);
          }
          setEditingId(null);
          setMode("schedule");
        }, onDelete: (id) => {
          removeJob(id);
          setEditingId(null);
          setMode("schedule");
        } }) })
      ] })
    ] }) })
  ] });
}
export {
  Index as component
};
