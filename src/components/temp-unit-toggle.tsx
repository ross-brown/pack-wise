"use client";

import { TempUnit } from "@/types";
import { cn } from "@/lib/utils";

interface TempUnitToggleProps {
  unit: TempUnit;
  onUnitChange: (unit: TempUnit) => void;
}

export function TempUnitToggle({ unit, onUnitChange }: TempUnitToggleProps) {
  return (
    <div className="flex items-center border border-border rounded-md overflow-hidden text-xs">
      <button
        onClick={() => onUnitChange("F")}
        className={cn(
          "px-2.5 py-1.5 transition-colors cursor-pointer",
          unit === "F"
            ? "bg-foreground text-background font-medium"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Fahrenheit"
      >
        °F
      </button>
      <button
        onClick={() => onUnitChange("C")}
        className={cn(
          "px-2.5 py-1.5 transition-colors cursor-pointer",
          unit === "C"
            ? "bg-foreground text-background font-medium"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Celsius"
      >
        °C
      </button>
    </div>
  );
}
