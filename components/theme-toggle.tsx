"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const cycleTheme = () => {
    const next =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    if (document.startViewTransition) {
      const goingDark = next === "dark";
      if (goingDark) document.documentElement.classList.add("to-dark");
      const transition = document.startViewTransition(() => setTheme(next));
      transition.finished.finally(() => {
        document.documentElement.classList.remove("to-dark");
      });
    } else {
      setTheme(next);
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      default:
        return "System";
    }
  };

  return (
    <>
      <Button
        aria-label={`Current theme: ${getLabel()}. Click to change theme.`}
        className="inline-flex rounded-full border-0 text-muted-foreground"
        onClick={cycleTheme}
        size="icon"
        variant="ghost"
      >
        {getIcon()}
      </Button>
    </>
  );
}
