"use client";

import { useState } from "react";
import { WeatherSummary, TempUnit } from "@/types";
import { getPackingSuggestions } from "@/lib/packing-rules";
import { formatTemp, cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

interface PackingListProps {
  weather: WeatherSummary;
  unit: TempUnit;
}

function getCategoryAccent(name: string): {
  borderColor: string;
  iconBg: string;
  iconFg: string;
} {
  if (name.includes("Freezing"))
    return {
      borderColor: "var(--accent-blue-fg)",
      iconBg: "var(--accent-blue-bg)",
      iconFg: "var(--accent-blue-fg)",
    };
  if (name.includes("Cold"))
    return {
      borderColor: "var(--accent-sky-fg)",
      iconBg: "var(--accent-sky-bg)",
      iconFg: "var(--accent-sky-fg)",
    };
  if (name.includes("Cool"))
    return {
      borderColor: "var(--accent-teal-fg)",
      iconBg: "var(--accent-teal-bg)",
      iconFg: "var(--accent-teal-fg)",
    };
  if (name.includes("Mild"))
    return {
      borderColor: "var(--accent-emerald-fg)",
      iconBg: "var(--accent-emerald-bg)",
      iconFg: "var(--accent-emerald-fg)",
    };
  if (name.includes("Warm"))
    return {
      borderColor: "var(--accent-amber-fg)",
      iconBg: "var(--accent-amber-bg)",
      iconFg: "var(--accent-amber-fg)",
    };
  if (name.includes("Hot"))
    return {
      borderColor: "var(--accent-red-fg)",
      iconBg: "var(--accent-red-bg)",
      iconFg: "var(--accent-red-fg)",
    };
  if (name.includes("Rain"))
    return {
      borderColor: "var(--accent-indigo-fg)",
      iconBg: "var(--accent-indigo-bg)",
      iconFg: "var(--accent-indigo-fg)",
    };
  if (name.includes("Layer"))
    return {
      borderColor: "var(--accent-violet-fg)",
      iconBg: "var(--accent-violet-bg)",
      iconFg: "var(--accent-violet-fg)",
    };
  return {
    borderColor: "var(--primary)",
    iconBg: "var(--accent)",
    iconFg: "var(--primary)",
  };
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
    <div className="space-y-8">
      {/* Section header */}
      <div className="flex items-center gap-4">
        <h2 className="font-heading text-2xl italic shrink-0">What to Pack</h2>
        {checkedCount > 0 && (
          <span className="text-sm text-muted-foreground shrink-0">
            {checkedCount}/{totalItems} packed
          </span>
        )}
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger">
        {categories.map((category) => {
          const accent = getCategoryAccent(category.name);
          return (
            <Card
              key={category.name}
              className="border-l-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
              style={{ borderLeftColor: accent.borderColor }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="size-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ backgroundColor: accent.iconBg }}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      {formatReason(category.reason)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => {
                    const isChecked = checkedItems.has(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleItem(item)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm transition-all",
                          "hover:bg-muted/60 cursor-pointer select-none",
                          isChecked
                            ? "bg-muted/40 text-muted-foreground line-through opacity-60"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "size-3.5 rounded border flex items-center justify-center shrink-0 transition-colors",
                            isChecked
                              ? "bg-primary border-primary"
                              : "border-muted-foreground/40"
                          )}
                        >
                          {isChecked && (
                            <CheckIcon className="size-2.5 text-primary-foreground" />
                          )}
                        </span>
                        {item}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
