"use client";

import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="size-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
    >
      {dark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </button>
  );
}
