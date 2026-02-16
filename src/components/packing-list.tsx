"use client";

import { useState } from "react";
import { WeatherSummary, TempUnit } from "@/types";
import { getPackingSuggestions } from "@/lib/packing-rules";
import { formatTemp, cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface PackingListProps {
  weather: WeatherSummary;
  unit: TempUnit;
}

export function PackingList({ weather, unit }: PackingListProps) {
  const categories = getPackingSuggestions(weather);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const checkedCount = checkedItems.size;

  function toggleItem(item: string) {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  }

  function formatReason(reason: string): string {
    if (unit === "C") {
      return reason.replace(/(\d+)°F/g, (_, tempStr) => {
        const tempF = parseInt(tempStr, 10);
        return formatTemp(tempF, "C");
      });
    }
    return reason;
  }

  return (
    <div className="space-y-10">
      {/* Section header */}
      <div className="flex items-baseline gap-4">
        <h2 className="font-heading text-3xl tracking-tight shrink-0">What to Pack</h2>
        {checkedCount > 0 && (
          <span className="text-sm text-muted-foreground">
            {checkedCount} of {totalItems} packed
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 stagger">
        {categories.map((category) => (
          <div key={category.name} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <h3 className="font-medium text-sm">{category.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatReason(category.reason)}
                </p>
              </div>
            </div>
            <div className="space-y-1 pl-10">
              {category.items.map((item) => {
                const isChecked = checkedItems.has(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleItem(item)}
                    className={cn(
                      "flex items-center gap-3 w-full text-left py-2 px-3 rounded transition-all cursor-pointer select-none",
                      "hover:bg-muted/40",
                      isChecked && "opacity-50"
                    )}
                  >
                    <span
                      className={cn(
                        "size-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors",
                        isChecked
                          ? "bg-primary border-primary"
                          : "border-border"
                      )}
                    >
                      {isChecked && (
                        <CheckIcon className="size-3 text-primary-foreground" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-sm transition-all",
                        isChecked && "line-through text-muted-foreground"
                      )}
                    >
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
