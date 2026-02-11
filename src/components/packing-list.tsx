"use client";

import { WeatherSummary, TempUnit } from "@/types";
import { getPackingSuggestions } from "@/lib/packing-rules";
import { formatTemp } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PackingListProps {
  weather: WeatherSummary;
  unit: TempUnit;
}

function getCategoryAccent(name: string): { border: string; iconBg: string } {
  if (name.includes("Freezing"))
    return { border: "border-l-blue-400", iconBg: "bg-blue-50" };
  if (name.includes("Cold"))
    return { border: "border-l-sky-400", iconBg: "bg-sky-50" };
  if (name.includes("Cool"))
    return { border: "border-l-teal-400", iconBg: "bg-teal-50" };
  if (name.includes("Mild"))
    return { border: "border-l-emerald-400", iconBg: "bg-emerald-50" };
  if (name.includes("Warm"))
    return { border: "border-l-amber-400", iconBg: "bg-amber-50" };
  if (name.includes("Hot"))
    return { border: "border-l-red-400", iconBg: "bg-red-50" };
  if (name.includes("Rain"))
    return { border: "border-l-indigo-400", iconBg: "bg-indigo-50" };
  if (name.includes("Layer"))
    return { border: "border-l-violet-400", iconBg: "bg-violet-50" };
  return { border: "border-l-primary", iconBg: "bg-primary/5" };
}

export function PackingList({ weather, unit }: PackingListProps) {
  const categories = getPackingSuggestions(weather);

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
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger">
        {categories.map((category) => {
          const accent = getCategoryAccent(category.name);
          return (
            <Card
              key={category.name}
              className={`border-l-4 ${accent.border} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`size-10 rounded-xl ${accent.iconBg} flex items-center justify-center text-lg shrink-0`}
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
                  {category.items.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="font-normal"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
