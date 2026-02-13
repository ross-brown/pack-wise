"use client";

import { TempUnit } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TempUnitToggleProps {
  unit: TempUnit;
  onUnitChange: (unit: TempUnit) => void;
}

export function TempUnitToggle({ unit, onUnitChange }: TempUnitToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={unit}
      onValueChange={(value) => {
        if (value) onUnitChange(value as TempUnit);
      }}
      variant="outline"
      size="sm"
    >
      <ToggleGroupItem value="F" aria-label="Fahrenheit" className="w-9 px-0">
        °F
      </ToggleGroupItem>
      <ToggleGroupItem value="C" aria-label="Celsius" className="w-9 px-0">
        °C
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
