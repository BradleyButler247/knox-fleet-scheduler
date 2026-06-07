import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root, P as Portal, C as Content$1, a as Close, T as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { Y as Yt, U as Ut, Q as Qt } from "../_libs/react-resizable-panels.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { R as Root$1 } from "../_libs/radix-ui__react-label.mjs";
import { S as Select$1, a as SelectValue$1, b as SelectTrigger$1, c as SelectIcon, d as SelectPortal, e as SelectContent$1, f as SelectViewport, g as SelectItem$1, h as SelectItemIndicator, i as SelectItemText, j as SelectScrollUpButton$1, k as SelectScrollDownButton$1, l as SelectLabel$1, m as SelectSeparator$1 } from "../_libs/radix-ui__react-select.mjs";
import { R as Root2$2, I as Item2 } from "../_libs/radix-ui__react-toggle-group.mjs";
import { R as Root$2 } from "../_libs/radix-ui__react-toggle.mjs";
import { R as Root2$1, P as Portal2, C as Content2, T as Title2, D as Description2, a as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { S as Switch$1, a as SwitchThumb } from "../_libs/radix-ui__react-switch.mjs";
import { P as Paintbrush, C as CalendarDays, T as Truck, a as Plus, A as ArrowLeft, b as ChevronRight, c as ChevronLeft, L as ListChecks, S as Sun, M as Moon, d as ClipboardList, e as MapPin, f as Check, U as User, g as Pencil, G as GripVertical, h as Search, i as Calendar, j as ChevronUp, k as ChevronDown, X } from "../_libs/lucide-react.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content$1.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
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
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const ResizablePanelGroup = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Ut,
  {
    className: cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className),
    ...props
  }
);
const ResizablePanel = Yt;
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Qt,
  {
    className: cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    ),
    ...props,
    children: withHandle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-2.5 w-2.5" }) })
  }
);
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root$1.displayName;
const Select = Select$1;
const SelectValue = SelectValue$1;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectTrigger$1,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectIcon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectTrigger$1.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollUpButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollDownButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPortal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectContent$1,
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectViewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectContent$1.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectLabel$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectLabel$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectItem$1,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectItem$1.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectSeparator$1,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectSeparator$1.displayName;
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
const Toggle = reactExports.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$2,
  {
    ref,
    className: cn(toggleVariants({ variant, size, className })),
    ...props
  }
));
Toggle.displayName = Root$2.displayName;
const ToggleGroupContext = reactExports.createContext({
  size: "default",
  variant: "default"
});
const ToggleGroup = reactExports.forwardRef(({ className, variant, size, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root2$2,
  {
    ref,
    className: cn("flex items-center justify-center gap-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupContext.Provider, { value: { variant, size }, children })
  }
));
ToggleGroup.displayName = Root2$2.displayName;
const ToggleGroupItem = reactExports.forwardRef(({ className, children, variant, size, ...props }, ref) => {
  const context = reactExports.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
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
ToggleGroupItem.displayName = Item2.displayName;
const AlertDialog = Root2$1;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
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
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
const KEY$1 = "paint-shop-schedule-v1";
function toDateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function read() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY$1);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((j) => ({ ...j, shift: j.shift ?? "ALL_DAY" }));
  } catch {
    return [];
  }
}
function useJobs() {
  const [jobs, setJobs] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setJobs(read());
  }, []);
  const persist = (updater) => {
    setJobs((prev) => {
      const next = updater(prev);
      localStorage.setItem(KEY$1, JSON.stringify(next));
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
  const updateJob = (id, updates) => {
    persist((prev) => prev.map((j) => j.id === id ? { ...j, ...updates } : j));
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
const WORK_OPTIONS$1 = ["Assembly", "Disassembly", "Sandblast", "Sanding", "Paint", "Other"];
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
  const [confirmOpen, setConfirmOpen] = reactExports.useState(false);
  const [conflict, setConflict] = reactExports.useState(null);
  const [duplicateBlock, setDuplicateBlock] = reactExports.useState(null);
  const [duplicateConfirm, setDuplicateConfirm] = reactExports.useState(null);
  const [truckId, setTruckId] = reactExports.useState(
    initialJob?.truckId ?? defaultTruckId ?? ""
  );
  const initialWork = parseWork(initialJob?.work ?? "");
  const [workType, setWorkType] = reactExports.useState(initialWork.type);
  const [workOther, setWorkOther] = reactExports.useState(initialWork.other);
  const [bay, setBay] = reactExports.useState((initialJob?.bay ?? "").replace(/\D/g, ""));
  const [employee, setEmployee] = reactExports.useState(initialJob?.employee ?? "");
  const [shift, setShift] = reactExports.useState(initialJob?.shift ?? "ALL_DAY");
  const resolvedWork = workType === "Other" ? workOther.trim() : workType;
  const bayRequired = workType !== "Other";
  const handleSubmit = (e) => {
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
      shift
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
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "truck", children: "Truck ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "bay", children: [
          "Bay #",
          bayRequired ? "" : " (optional)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "bay",
            type: "number",
            inputMode: "numeric",
            min: 1,
            step: 1,
            placeholder: "-- Please enter a bay # --",
            value: bay,
            onChange: (e) => setBay(e.target.value.replace(/\D/g, ""))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "work", children: "Work to be done" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: workType, onValueChange: setWorkType, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "work", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "-- Select One --" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: WORK_OPTIONS$1.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o, children: o }, o)) })
      ] }),
      workType === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Enter task",
          value: workOther,
          onChange: (e) => setWorkOther(e.target.value),
          className: "mt-2"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "emp", children: "Employee" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "emp",
          placeholder: "-- Please enter an employee --",
          value: employee,
          onChange: (e) => setEmployee(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Shift" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        ToggleGroup,
        {
          type: "single",
          value: shift,
          onValueChange: (v) => v && setShift(v),
          className: "grid grid-cols-3 gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "AM", className: "border border-border data-[state=on]:border-primary", children: "AM" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "PM", className: "border border-border data-[state=on]:border-primary", children: "PM" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "ALL_DAY", className: "border border-border data-[state=on]:border-primary", children: "All Day" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "default", className: "w-full text-base font-normal tracking-wider", children: isEdit ? "Save changes" : `Schedule for ${selectedDate.toLocaleDateString(void 0, { month: "short", day: "numeric" })}` }),
    isEdit && onDelete && initialJob && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "destructive",
          className: "w-full text-base font-normal tracking-wider",
          onClick: () => setConfirmOpen(true),
          children: "Delete task"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: confirmOpen, onOpenChange: setConfirmOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Please confirm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Are you sure you want to delete this task? This action cannot be undone." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: conflict !== null, onOpenChange: (o) => !o && setConflict(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Scheduling conflict" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: conflict && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => setConflict(null), children: "OK" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: duplicateBlock !== null, onOpenChange: (o) => !o && setDuplicateBlock(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Duplicate task" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: duplicateBlock && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          duplicateBlock.truckId,
          " is already scheduled for ",
          duplicateBlock.work,
          " on bay ",
          String(duplicateBlock.bay).replace(/\D/g, "") || duplicateBlock.bay
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => setDuplicateBlock(null), children: "OK" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: duplicateConfirm !== null, onOpenChange: (o) => !o && setDuplicateConfirm(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Duplicate task" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: duplicateConfirm && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { onClick: () => setDuplicateConfirm(null), children: "No" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
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
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
function workColorClass$2(work) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: dayJobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 py-12 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-10 w-10 text-muted-foreground/60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "No jobs scheduled. Add one to fill the bays." })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: dayJobs.map((job) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "li",
    {
      className: `group relative overflow-hidden rounded-lg border bg-card p-4 transition-colors hover:border-primary/50 ${job.completed ? "border-border/40 opacity-60" : "border-border"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute left-0 top-0 h-full w-1 ${job.completed ? "bg-muted-foreground/40" : "bg-primary"}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 items-start gap-3 pl-2", children: [
            onToggleComplete && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: Boolean(job.completed),
                onCheckedChange: () => onToggleComplete(job.id),
                "aria-label": "Mark complete",
                className: "mt-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `font-display text-xl tracking-wider text-foreground ${job.completed ? "line-through" : ""}`,
                    children: job.truckId
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-accent/50 text-accent whitespace-nowrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-1 h-3 w-3" }),
                  /^\d+$/.test(job.bay) ? `Bay ${job.bay}` : job.bay
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-muted-foreground/30 text-muted-foreground whitespace-nowrap", children: job.shift === "ALL_DAY" ? "All Day" : job.shift }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: `whitespace-nowrap ${workColorClass$2(job.work)} ${job.completed ? "line-through opacity-70" : ""}`,
                    children: job.work
                  }
                ),
                job.completed && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
                  " Done"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: job.employee })
              ] })
            ] })
          ] }),
          onEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => onEdit(job),
              "aria-label": "Edit job",
              className: "opacity-0 transition-opacity group-hover:opacity-100",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
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
function SingleMonth({
  month,
  selected,
  onSelect,
  jobs,
  compact = false,
  headerRight
}) {
  const today = /* @__PURE__ */ new Date();
  const jobsByDate = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const j of jobs) {
      const arr = map.get(j.date) ?? [];
      arr.push(j);
      map.set(j.date, arr);
    }
    return map;
  }, [jobs]);
  const cells = reactExports.useMemo(() => {
    const first = startOfMonth(month);
    const offset = first.getDay();
    const start = new Date(first);
    start.setDate(first.getDate() - offset);
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [month]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl tracking-wider", children: month.toLocaleString(void 0, { month: "long", year: "numeric" }) }),
      headerRight
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-widest text-muted-foreground", children: WEEKDAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-1", children: d }, d)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: cells.map((d) => {
      const inMonth = d.getMonth() === month.getMonth();
      const isSelected = sameDay(d, selected);
      const isToday = sameDay(d, today);
      const dateKey = toDateKey(d);
      const dayJobs = jobsByDate.get(dateKey) ?? [];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  const ref = reactExports.useRef(null);
  const [overflow, setOverflow] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  const [expanded, setExpanded] = reactExports.useState(false);
  const listRef = reactExports.useRef(null);
  const [metrics, setMetrics] = reactExports.useState({
    fitAll: dayJobs.length,
    fitWithMore: dayJobs.length
  });
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              CountBadge,
              {
                fractionLabel,
                fallbackLabel: `${total}`,
                allDone
              }
            );
          })()
        ] }),
        !compact && dayJobs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: listRef,
            className: "mt-1 flex-1 space-y-0.5 overflow-hidden hidden @[5rem]/day:block",
            children: [
              visible.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "flex items-center gap-1 truncate rounded-sm px-1 py-0.5 text-[10px] leading-tight",
                    j.completed ? "bg-muted text-muted-foreground" : workColorClass$1(j.work)
                  ),
                  title: `${j.truckId} — ${j.work} (${j.bay})${j.completed ? " ✓" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: cn(
                          "truncate",
                          j.completed && "line-through opacity-80"
                        ),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: j.truckId }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-foreground/70", children: j.work })
                        ]
                      }
                    ),
                    j.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "ml-auto h-3 w-3 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto shrink-0 font-semibold tabular-nums opacity-80", children: String(j.bay).replace(/\D/g, "") })
                  ]
                },
                j.id
              )),
              hidden > 0 && !expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
              expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  const [count, setCount] = reactExports.useState(1);
  const today = /* @__PURE__ */ new Date();
  const months = Array.from({ length: count }, (_, i) => addMonths(month, i));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    months.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      SingleMonth,
      {
        month: m,
        selected,
        onSelect,
        jobs,
        compact,
        headerRight: idx === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      count > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex-1 hover:bg-accent/20 hover:text-accent hover:border-accent",
          "aria-label": "Collapse to single month",
          onClick: () => setCount(1),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex-1 hover:bg-accent/20 hover:text-accent hover:border-accent",
          "aria-label": "Show next month",
          onClick: () => setCount((c) => c + 1),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
function workColorClass(work) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-2", children: days.map((d) => {
      const key = toDateKey(d);
      const dayItems = itemsByDay.get(key) ?? [];
      const isToday = todayKey === key;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onAddJob(d),
          className: `group flex min-h-[140px] flex-col rounded-md border p-2 text-left transition-colors hover:border-primary hover:bg-primary/10 ${isToday ? "border-primary/60 bg-primary/5" : "border-border bg-card"}`,
          "aria-label": `Add job on ${d.toLocaleDateString()}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-baseline justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: d.toLocaleDateString(void 0, { weekday: "short" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base", children: d.getDate() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-1.5", children: [
              dayItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 text-[11px] text-muted-foreground/60", children: "—" }) : dayItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative rounded border border-border/70 bg-background/60 p-1.5 text-[11px]",
                  children: [
                    onRemoveItem && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-1 text-accent", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: item.bay })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-primary/15 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary", children: item.shift === "ALL_DAY" ? "All" : item.shift })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-0.5 line-clamp-2 pr-3 rounded px-1 py-0.5 ${workColorClass(item.work)}`, children: item.work }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex items-center gap-1 text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.employee })
                    ] })
                  ]
                },
                item.id
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-auto flex items-center justify-center gap-1 rounded border border-dashed border-transparent py-1 text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 transition-opacity group-hover:border-primary/40 group-hover:opacity-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
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
  const truckJobs = reactExports.useMemo(
    () => jobs.filter((j) => j.truckId === truckId),
    [jobs, truckId]
  );
  const firstWeek = reactExports.useMemo(() => {
    const upcoming = truckJobs.map((j) => /* @__PURE__ */ new Date(`${j.date}T00:00:00`)).sort((a, b) => a.getTime() - b.getTime())[0];
    return startOfWeek(upcoming ?? /* @__PURE__ */ new Date());
  }, [truckJobs]);
  const [weekCount, setWeekCount] = reactExports.useState(1);
  const jobsByDay = reactExports.useMemo(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-h-[70vh] overflow-y-auto pr-1", children: [
    weeks.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      WeekGrid,
      {
        weekStart: w,
        itemsByDay: jobsByDay,
        onAddJob
      },
      toDateKey(w)
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        className: "w-full gap-2",
        onClick: () => setWeekCount((c) => c + 1),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }),
          " Show next week"
        ]
      }
    )
  ] });
}
const BAYS = ["Bay 1", "Bay 2", "Bay 3", "Bay 4", "Bay 5"];
const WORK_OPTIONS = ["Assembly", "Disassembly", "Sandblast", "Sanding", "Paint", "Other"];
function PendingJobForm({
  date,
  onAdd,
  onCancel
}) {
  const [workType, setWorkType] = reactExports.useState("");
  const [workOther, setWorkOther] = reactExports.useState("");
  const [bay, setBay] = reactExports.useState(BAYS[0]);
  const [employee, setEmployee] = reactExports.useState("");
  const [shift, setShift] = reactExports.useState("ALL_DAY");
  const resolvedWork = workType === "Other" ? workOther.trim() : workType;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: date.toLocaleDateString(void 0, {
      weekday: "long",
      month: "long",
      day: "numeric"
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: bay, onValueChange: setBay, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BAYS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b, children: b }, b)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "emp", children: "Employee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "work", children: "Work to be done" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: workType, onValueChange: setWorkType, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "work", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "-- Select One --" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: WORK_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o, children: o }, o)) })
      ] }),
      workType === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Enter task",
          value: workOther,
          onChange: (e) => setWorkOther(e.target.value),
          className: "mt-2"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Shift" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        ToggleGroup,
        {
          type: "single",
          value: shift,
          onValueChange: (v) => v && setShift(v),
          className: "grid grid-cols-3 gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "AM", className: "border border-border data-[state=on]:border-primary", children: "AM" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "PM", className: "border border-border data-[state=on]:border-primary", children: "PM" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "ALL_DAY", className: "border border-border data-[state=on]:border-primary", children: "All Day" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: onCancel, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          onClick: () => {
            if (!resolvedWork || !employee.trim()) {
              toast.error("Fill in work and employee");
              return;
            }
            onAdd({
              work: resolvedWork,
              bay,
              employee: employee.trim(),
              shift
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    rows.map((row, idx) => {
      const isOther = !WORK_OPTIONS.includes(row.work) && row.work !== "";
      const workType = isOther ? "Other" : row.work;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "space-y-3 rounded-md border border-border bg-card/40 p-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
                "Task ",
                idx + 1
              ] }),
              rows.length > 1 && row.id !== "__draft__" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-6 w-6",
                  onClick: () => removeRow(row.id),
                  "aria-label": "Remove task",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: row.date,
                  onChange: (e) => updateRow(row.id, { date: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Task" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: workType || void 0,
                  onValueChange: (v) => updateRow(row.id, { work: v === "Other" ? "" : v }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "-- Select One --" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: WORK_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o, children: o }, o)) })
                  ]
                }
              ),
              workType === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Enter task",
                  value: row.work,
                  onChange: (e) => updateRow(row.id, { work: e.target.value }),
                  className: "mt-2"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                  "Bay #",
                  workType === "Other" ? " (optional)" : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    inputMode: "numeric",
                    min: 1,
                    step: 1,
                    placeholder: "-- Please enter a bay # --",
                    value: row.bay,
                    onChange: (e) => updateRow(row.id, {
                      bay: e.target.value.replace(/\D/g, "")
                    })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Employee" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "-- Please enter an employee --",
                    value: row.employee,
                    onChange: (e) => updateRow(row.id, { employee: e.target.value })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Shift" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                ToggleGroup,
                {
                  type: "single",
                  value: row.shift,
                  onValueChange: (v) => v && updateRow(row.id, { shift: v }),
                  className: "grid grid-cols-3 gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "AM", className: "border border-border data-[state=on]:border-primary", children: "AM" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "PM", className: "border border-border data-[state=on]:border-primary", children: "PM" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "ALL_DAY", className: "border border-border data-[state=on]:border-primary", children: "All Day" })
                  ]
                }
              )
            ] })
          ]
        },
        row.id
      );
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        className: "w-full gap-2",
        onClick: addRow,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
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
  const [truckId, setTruckId] = reactExports.useState("");
  const [pending, setPending] = reactExports.useState([]);
  const [weekCount, setWeekCount] = reactExports.useState(1);
  const [addFor, setAddFor] = reactExports.useState(null);
  const firstWeek = reactExports.useMemo(() => startOfWeek(/* @__PURE__ */ new Date()), []);
  const weeks = Array.from(
    { length: weekCount },
    (_, i) => addDays(firstWeek, i * 7)
  );
  const itemsByDay = reactExports.useMemo(() => {
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
      if (!p.date || !p.work.trim() || !p.employee.trim()) {
        toast.error("Fill in date, task, and employee for every task");
        return;
      }
      const isPreset = WORK_OPTIONS.includes(p.work);
      if (isPreset && !p.bay.trim()) {
        toast.error("Enter a bay # for every task");
        return;
      }
    }
    onCreate(truckId.trim().toUpperCase(), pending);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-h-[70vh] overflow-y-auto pr-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-truck", children: "Truck ID" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "new-truck",
          placeholder: "TRK-4821",
          value: truckId,
          onChange: (e) => setTruckId(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Schedule" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hidden md:block text-xs text-muted-foreground", children: "Click any day to add work for this truck." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:block space-y-4", children: [
      weeks.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        WeekGrid,
        {
          weekStart: w,
          itemsByDay,
          onAddJob: (d) => setAddFor(d),
          onRemoveItem: (id) => setPending((prev) => prev.filter((p) => p.id !== id))
        },
        toDateKey(w)
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "w-full gap-2",
          onClick: () => setWeekCount((c) => c + 1),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }),
            " Show next week"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MobileTaskRows, { pending, setPending }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 border-t border-border pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreate, className: "font-display tracking-wider", children: [
        "Create truck (",
        pending.length,
        " ",
        pending.length === 1 ? "job" : "jobs",
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: addFor !== null, onOpenChange: (o) => !o && setAddFor(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-md", children: addFor && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl tracking-wider", children: "New Job" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  renameTruck
}) {
  const [query, setQuery] = reactExports.useState("");
  const [openTruck, setOpenTruck] = reactExports.useState(null);
  const [addFor, setAddFor] = reactExports.useState(
    null
  );
  const [newTruckOpen, setNewTruckOpen] = reactExports.useState(false);
  const [editTruck, setEditTruck] = reactExports.useState(null);
  const [editValue, setEditValue] = reactExports.useState("");
  const grouped = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const j of jobs) {
      const arr = map.get(j.truckId) ?? [];
      arr.push(j);
      map.set(j.truckId, arr);
    }
    return Array.from(map.entries()).map(([truckId, list]) => ({
      truckId,
      jobs: list.sort((a, b) => a.date.localeCompare(b.date))
    })).sort((a, b) => a.truckId.localeCompare(b.truckId));
  }, [jobs]);
  const filtered = query.trim() ? grouped.filter(
    (g) => g.truckId.toLowerCase().includes(query.trim().toLowerCase())
  ) : grouped;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between border-b border-border pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Schedule by" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-foreground", children: "Truck" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "icon",
          onClick: () => setNewTruckOpen(true),
          "aria-label": "Add new truck",
          className: "rounded-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "Search truck ID…",
          className: "pl-9"
        }
      )
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-10 w-10 text-muted-foreground/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: jobs.length === 0 ? "No trucks scheduled yet." : "No trucks match your search." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: filtered.map(({ truckId, jobs: tjobs }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpenTruck(truckId),
        className: "w-full rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/60 hover:bg-card/80",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl tracking-wider text-foreground", children: truckId })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                tjobs.length,
                " ",
                tjobs.length === 1 ? "job" : "jobs"
              ] }),
              renameTruck && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2", children: tjobs.map((job) => {
            const d = /* @__PURE__ */ new Date(`${job.date}T00:00:00`);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-medium text-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 text-primary" }),
                    d.toLocaleDateString(void 0, {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "border-accent/50 text-accent",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-1 h-3 w-3" }),
                        job.bay
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-muted-foreground/30 text-muted-foreground", children: job.shift === "ALL_DAY" ? "All Day" : job.shift }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `flex-1 rounded px-2 py-0.5 text-xs font-medium ${workColorClass(job.work)}`,
                      children: job.work
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3" }),
                    job.employee
                  ] })
                ]
              },
              job.id
            );
          }) })
        ]
      }
    ) }, truckId)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: openTruck !== null,
        onOpenChange: (o) => !o && setOpenTruck(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-5xl", children: openTruck && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display text-2xl tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-5 w-5 text-primary" }),
            openTruck
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: addFor !== null,
        onOpenChange: (o) => !o && setAddFor(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-lg", children: addFor && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-2xl tracking-wider", children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: newTruckOpen, onOpenChange: setNewTruckOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "w-[calc(100%-2rem)] max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl tracking-wider", children: "New Truck" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enter the truck ID and click days on the week to schedule work." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        NewTruckForm,
        {
          onClose: () => setNewTruckOpen(false),
          onCreate: (truckId, items) => {
            for (const it of items) {
              addJob({
                truckId,
                work: it.work,
                bay: it.bay,
                employee: it.employee,
                date: it.date,
                shift: it.shift
              });
            }
            toast.success(`${truckId} scheduled (${items.length} jobs)`);
            setNewTruckOpen(false);
            setOpenTruck(truckId);
          }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: editTruck !== null, onOpenChange: (o) => !o && setEditTruck(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-sm", children: editTruck && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl tracking-wider", children: "Edit Truck" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-truck-id", children: "Truck ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "edit-truck-id",
              value: editValue,
              onChange: (e) => setEditValue(e.target.value),
              autoFocus: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setEditTruck(null), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Switch$1,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchThumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Switch$1.displayName;
const KEY = "paint-shop-theme";
function applyTheme(dark) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", dark);
}
function ThemeToggle() {
  const [dark, setDark] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Switch,
      {
        checked: dark,
        onCheckedChange: toggle,
        "aria-label": "Toggle dark mode"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4 text-muted-foreground" })
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
  const [month, setMonth] = reactExports.useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [openDay, setOpenDay] = reactExports.useState(null);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [mode, setMode] = reactExports.useState("schedule");
  const [editingId, setEditingId] = reactExports.useState(null);
  const [mounted, setMounted] = reactExports.useState(false);
  const calendarPanelRef = reactExports.useRef(null);
  const dayPanelRef = reactExports.useRef(null);
  const [calendarCollapsed, setCalendarCollapsed] = reactExports.useState(false);
  const [dayCollapsed, setDayCollapsed] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex w-full items-center justify-between px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paintbrush, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl leading-none", children: "Bay Sheet" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto hidden w-full px-6 py-8 lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "calendar", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full max-w-md grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "calendar", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4" }),
          " By Day"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "truck", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4" }),
          " By Truck"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "calendar", className: "mt-4", children: (() => {
        const calendarContent = /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MonthCalendar, { month, onMonthChange: setMonth, selected: openDay ?? today, onSelect: handleSelect, jobs }) }) });
        const selectedDate = openDay ?? today;
        const dayJobCount = jobs.filter((j) => j.date === toDateKey(selectedDate)).length;
        const dayContent = /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between border-b border-border pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: selectedDate.toLocaleDateString(void 0, {
                weekday: "long"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-foreground", children: selectedDate.toLocaleDateString(void 0, {
                month: "long",
                day: "numeric"
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "font-display text-base px-3 py-1", children: [
                dayJobCount,
                " ",
                dayJobCount === 1 ? "job" : "jobs"
              ] }),
              mode === "schedule" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", onClick: () => setMode("form"), "aria-label": "Add new job", className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
                setMode("schedule");
                setEditingId(null);
              }, "aria-label": "Back to schedule", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) })
            ] })
          ] }),
          mode === "schedule" ? /* @__PURE__ */ jsxRuntimeExports.jsx(DaySchedule, { date: selectedDate, jobs, onRemove: removeJob, onToggleComplete: toggleComplete, onEdit: (job) => {
            setEditingId(job.id);
            setMode("form");
          } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ScheduleForm, { selectedDate, initialJob: editingJob, existingJobs: jobs, onSubmit: (j) => {
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
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[3fr_minmax(24rem,1fr)]", children: [
            calendarContent,
            dayContent
          ] });
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(ResizablePanelGroup, { className: "min-h-[600px] w-full overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { panelRef: calendarPanelRef, defaultSize: 70, minSize: "20rem", collapsible: true, collapsedSize: "3rem", id: "calendar-panel", className: "pr-3", onResize: () => {
            const c = calendarPanelRef.current?.isCollapsed() ?? false;
            setCalendarCollapsed(c);
          }, children: calendarCollapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => calendarPanelRef.current?.expand(), "aria-label": "Expand calendar", className: "flex h-full w-full items-center justify-center rounded-md border border-border bg-card/40 text-muted-foreground transition-colors hover:bg-accent/20 hover:text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" }) }) : calendarContent }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResizableHandle, { withHandle: true, className: "mx-1.5 bg-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { panelRef: dayPanelRef, defaultSize: 30, minSize: "18rem", collapsible: true, collapsedSize: "3rem", id: "day-panel", className: "pl-3", onResize: () => {
            const c = dayPanelRef.current?.isCollapsed() ?? false;
            setDayCollapsed(c);
          }, children: dayCollapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => dayPanelRef.current?.expand(), "aria-label": "Expand day schedule", className: "flex h-full w-full items-center justify-center rounded-md border border-border bg-card/40 text-muted-foreground transition-colors hover:bg-accent/20 hover:text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }) : dayContent })
        ] });
      })() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "truck", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TruckSchedule, { jobs, addJob, renameTruck }) }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-2xl px-4 py-6 lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "calendar", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-1 h-auto sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "calendar", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4" }),
          " Calendar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "today", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-4 w-4" }),
          " Today"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "truck", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4" }),
          " By Truck"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "calendar", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MonthCalendar, { month, onMonthChange: setMonth, selected: today, onSelect: handleSelectMobile, jobs, compact: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-xs uppercase tracking-widest text-muted-foreground", children: "Tap a day to see its schedule" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "today", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DaySchedule, { date: today, jobs, onRemove: removeJob, onToggleComplete: toggleComplete, onEdit: (job) => {
          setOpenDay(new Date(today));
          setEditingId(job.id);
          setMode("form");
          setDialogOpen(true);
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-4 w-full", onClick: () => handleSelectMobile(new Date(today)), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Add job for today"
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "truck", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TruckSchedule, { jobs, addJob, renameTruck }) }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen && openDay !== null, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg max-h-[90vh] flex flex-col overflow-hidden", children: [
      openDay && mode === "schedule" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "flex-row items-center justify-between gap-3 space-y-0 pr-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-2xl tracking-wider flex flex-col items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: openDay.toLocaleDateString(void 0, {
              weekday: "long"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: openDay.toLocaleDateString(void 0, {
              month: "long",
              day: "numeric"
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "font-display text-base px-3 py-1", children: [
              jobs.filter((j) => j.date === toDateKey(openDay)).length,
              " ",
              jobs.filter((j) => j.date === toDateKey(openDay)).length === 1 ? "job" : "jobs"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", onClick: () => setMode("form"), "aria-label": "Add new job", className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto -mx-6 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DaySchedule, { date: openDay, jobs, onRemove: removeJob, onToggleComplete: toggleComplete, onEdit: (job) => {
          setEditingId(job.id);
          setMode("form");
        } }) })
      ] }),
      openDay && mode === "form" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
            setMode("schedule");
            setEditingId(null);
          }, "aria-label": "Back to schedule", className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-2xl tracking-wider", children: [
            editingJob ? "Edit Job" : "New Job",
            " —",
            " ",
            openDay.toLocaleDateString(void 0, {
              month: "short",
              day: "numeric"
            })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto -mx-6 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScheduleForm, { selectedDate: openDay, initialJob: editingJob, existingJobs: jobs, onSubmit: (j) => {
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
