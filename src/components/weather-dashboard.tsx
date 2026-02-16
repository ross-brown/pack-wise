"use client";

import { WeatherSummary, TempUnit } from "@/types";
import { formatTemp, cn } from "@/lib/utils";
import { DropletsIcon } from "lucide-react";

interface WeatherDashboardProps {
  weather: WeatherSummary;
  unit: TempUnit;
}

function getTempColorHex(tempF: number): string {
  if (tempF <= 25) return "#64748b";
  if (tempF <= 35) return "#7a8fa5";
  if (tempF <= 45) return "#6a9a8a";
  if (tempF <= 55) return "#94a89a";
  if (tempF <= 65) return "#a8b090";
  if (tempF <= 72) return "#b8a87a";
  if (tempF <= 80) return "#c2903e";
  if (tempF <= 88) return "#c2703e";
  if (tempF <= 95) return "#b85450";
  return "#a04040";
}

function getTempBarWidth(tempF: number): number {
  return Math.max(0, Math.min(100, ((tempF + 20) / 140) * 100));
}

function getWeatherEmoji(precipProb: number): string {
  if (precipProb > 70) return "\u{1F327}\u{FE0F}";
  if (precipProb > 40) return "\u{1F326}\u{FE0F}";
  if (precipProb > 20) return "\u26C5";
  return "\u2600\u{FE0F}";
}

function formatDayLabel(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
  });
}

export function WeatherDashboard({ weather, unit }: WeatherDashboardProps) {
  return (
    <div className="space-y-16">
      {/* Big temperature hero numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
            Avg High
          </p>
          <p className="font-heading text-6xl sm:text-7xl tracking-tight" style={{ color: "var(--accent-orange-fg)" }}>
            {formatTemp(weather.avgHigh, unit)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
            Avg Low
          </p>
          <p className="font-heading text-6xl sm:text-7xl tracking-tight" style={{ color: "var(--accent-blue-fg)" }}>
            {formatTemp(weather.avgLow, unit)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
            Avg Precip
          </p>
          <p className="font-heading text-6xl sm:text-7xl tracking-tight" style={{ color: "var(--accent-teal-fg)" }}>
            {weather.avgPrecipitation}
            <span className="text-2xl text-muted-foreground ml-1">mm</span>
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
            Rainy Days
          </p>
          <p className="font-heading text-6xl sm:text-7xl tracking-tight" style={{ color: "var(--accent-indigo-fg)" }}>
            {weather.totalPrecipDays}
          </p>
        </div>
      </div>

      {/* Daily Breakdown */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-6">
          Daily Breakdown
        </h3>
        <div className="space-y-0 stagger">
          {weather.daily.map((day, i) => (
            <div
              key={day.date}
              className={cn(
                "flex items-center gap-4 py-4 transition-colors hover:bg-muted/30",
                i !== weather.daily.length - 1 && "border-b border-border/50"
              )}
            >
              <span className="text-xl w-8 text-center shrink-0">
                {getWeatherEmoji(day.precipitationProbability)}
              </span>
              <span className="text-sm w-28 shrink-0 text-muted-foreground">
                {formatDayLabel(day.date)}
              </span>
              <div className="flex-1 flex items-center gap-3 min-w-0">
                <span className="text-sm w-14 text-right shrink-0 text-muted-foreground tabular-nums">
                  {formatTemp(day.tempMin, unit)}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden relative">
                  <div
                    className="absolute h-full rounded-full"
                    style={{
                      left: `${getTempBarWidth(day.tempMin)}%`,
                      width: `${Math.max(4, getTempBarWidth(day.tempMax) - getTempBarWidth(day.tempMin))}%`,
                      background: `linear-gradient(to right, ${getTempColorHex(day.tempMin)}, ${getTempColorHex(day.tempMax)})`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium w-14 shrink-0 tabular-nums">
                  {formatTemp(day.tempMax, unit)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 w-14 justify-end shrink-0">
                <DropletsIcon className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground tabular-nums">
                  {day.precipitationProbability}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
