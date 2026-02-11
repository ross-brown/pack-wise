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
      <ToggleGroupItem value="F" aria-label="Fahrenheit">
        °F
      </ToggleGroupItem>
      <ToggleGroupItem value="C" aria-label="Celsius">
        °C
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
