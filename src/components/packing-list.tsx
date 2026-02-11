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

export function PackingList({ weather, unit }: PackingListProps) {
  const categories = getPackingSuggestions(weather);

  // Replace °F values in reason strings with the correct unit
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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">What to Pack</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((category) => (
          <Card key={category.name}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </CardTitle>
              <CardDescription className="text-xs">
                {formatReason(category.reason)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <Badge key={item} variant="secondary" className="font-normal">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
