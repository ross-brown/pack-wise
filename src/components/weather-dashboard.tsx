"use client";

import { WeatherSummary, TempUnit } from "@/types";
import { formatTemp } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

function getTempColor(tempF: number): string {
  if (tempF < 32) return "bg-blue-500";
  if (tempF < 50) return "bg-sky-400";
  if (tempF < 65) return "bg-emerald-400";
  if (tempF < 78) return "bg-yellow-400";
  if (tempF < 90) return "bg-orange-400";
  return "bg-red-500";
}

function getTempBarWidth(tempF: number): number {
  // Scale from -20°F to 120°F mapped to 0-100%
  return Math.max(0, Math.min(100, ((tempF + 20) / 140) * 100));
}

function getWeatherEmoji(precipProb: number): string {
  if (precipProb > 70) return "🌧️";
  if (precipProb > 40) return "🌦️";
  if (precipProb > 20) return "⛅";
  return "☀️";
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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Weather Forecast</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <ThermometerIcon className="size-3.5" />
              Avg High
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold">
              {formatTemp(weather.avgHigh, unit)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <ThermometerSnowflakeIcon className="size-3.5" />
              Avg Low
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold">
              {formatTemp(weather.avgLow, unit)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <DropletsIcon className="size-3.5" />
              Avg Precip
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold">
              {weather.avgPrecipitation}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                mm
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <CloudRainIcon className="size-3.5" />
              Rainy Days
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold">
              {weather.totalPrecipDays}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                day{weather.totalPrecipDays !== 1 ? "s" : ""}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Breakdown */}
      <div>
        <h3 className="text-lg font-medium mb-3">Daily Forecast</h3>
        <div className="space-y-2">
          {weather.daily.map((day) => (
            <div
              key={day.date}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card"
            >
              <span className="text-lg w-8 text-center">
                {getWeatherEmoji(day.precipitationProbability)}
              </span>
              <span className="text-sm font-medium w-24 shrink-0">
                {formatDayLabel(day.date)}
              </span>
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <span className="text-sm w-12 text-right shrink-0 text-muted-foreground">
                  {formatTemp(day.tempMin, unit)}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden relative">
                  <div
                    className={`absolute h-full rounded-full ${getTempColor(day.tempMax)}`}
                    style={{
                      left: `${getTempBarWidth(day.tempMin)}%`,
                      width: `${Math.max(4, getTempBarWidth(day.tempMax) - getTempBarWidth(day.tempMin))}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium w-12 shrink-0">
                  {formatTemp(day.tempMax, unit)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground w-10 text-right shrink-0">
                {day.precipitationProbability}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
