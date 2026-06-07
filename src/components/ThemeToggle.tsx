import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const KEY = "paint-shop-theme";

function applyTheme(dark: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", dark);
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    const initial =
      stored === "dark" ||
      (stored === null &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches);
    setDark(initial);
    applyTheme(initial);
  }, []);

  const toggle = (next: boolean) => {
    setDark(next);
    applyTheme(next);
    localStorage.setItem(KEY, next ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch
        checked={dark}
        onCheckedChange={toggle}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
