"use client";

import { WeatherSummary, TempUnit } from "@/types";
import { formatTemp, cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  ThermometerIcon,
  ThermometerSnowflakeIcon,
  CloudRainIcon,
  DropletsIcon,
} from "lucide-react";

interface WeatherDashboardProps {
  weather: WeatherSummary;
  unit: TempUnit;
}

function getTempColorHex(tempF: number): string {
  if (tempF <= 25) return "#3b82f6";
  if (tempF <= 35) return "#60a5fa";
  if (tempF <= 45) return "#38bdf8";
  if (tempF <= 55) return "#2dd4bf";
  if (tempF <= 65) return "#4ade80";
  if (tempF <= 72) return "#a3e635";
  if (tempF <= 80) return "#facc15";
  if (tempF <= 88) return "#fb923c";
  if (tempF <= 95) return "#f87171";
  return "#dc2626";
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
    <div className="space-y-8">
      {/* Section header */}
      <div className="flex items-center gap-4">
        <h2 className="font-heading text-2xl italic shrink-0">
          Weather Forecast
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 stagger">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className="size-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--accent-orange-bg)" }}
              >
                <ThermometerIcon className="size-5" style={{ color: "var(--accent-orange-fg)" }} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Avg High
                </p>
                <p className="text-xl font-bold mt-0.5">
                  {formatTemp(weather.avgHigh, unit)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className="size-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--accent-blue-bg)" }}
              >
                <ThermometerSnowflakeIcon className="size-5" style={{ color: "var(--accent-blue-fg)" }} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Avg Low
                </p>
                <p className="text-xl font-bold mt-0.5">
                  {formatTemp(weather.avgLow, unit)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className="size-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--accent-teal-bg)" }}
              >
                <DropletsIcon className="size-5" style={{ color: "var(--accent-teal-fg)" }} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Avg Precip
                </p>
                <p className="text-xl font-bold mt-0.5">
                  {weather.avgPrecipitation}
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    mm
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className="size-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--accent-indigo-bg)" }}
              >
                <CloudRainIcon className="size-5" style={{ color: "var(--accent-indigo-fg)" }} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Rainy Days
                </p>
                <p className="text-xl font-bold mt-0.5">
                  {weather.totalPrecipDays}
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    day{weather.totalPrecipDays !== 1 ? "s" : ""}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Breakdown */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Daily Breakdown
        </h3>
        <div className="rounded-2xl border bg-card overflow-hidden stagger">
          {weather.daily.map((day, i) => (
            <div
              key={day.date}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40",
                i !== weather.daily.length - 1 && "border-b border-border/50",
                i % 2 === 1 && "bg-muted/20"
              )}
            >
              <span className="text-xl w-8 text-center shrink-0">
                {getWeatherEmoji(day.precipitationProbability)}
              </span>
              <span className="text-sm font-medium w-24 shrink-0">
                {formatDayLabel(day.date)}
              </span>
              <div className="flex-1 flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-mono w-12 text-right shrink-0 text-muted-foreground">
                  {formatTemp(day.tempMin, unit)}
                </span>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden relative">
                  <div
                    className="absolute h-full rounded-full"
                    style={{
                      left: `${getTempBarWidth(day.tempMin)}%`,
                      width: `${Math.max(4, getTempBarWidth(day.tempMax) - getTempBarWidth(day.tempMin))}%`,
                      background: `linear-gradient(to right, ${getTempColorHex(day.tempMin)}, ${getTempColorHex(day.tempMax)})`,
                    }}
                  />
                </div>
                <span className="text-xs font-mono font-semibold w-12 shrink-0">
                  {formatTemp(day.tempMax, unit)}
                </span>
              </div>
              <div className="flex items-center gap-1 w-12 justify-end shrink-0">
                <DropletsIcon className="size-3 text-blue-400" />
                <span className="text-xs text-muted-foreground">
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
