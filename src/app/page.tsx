"use client";

import { useState } from "react";
import { GeocodingResult, WeatherSummary, TempUnit } from "@/types";
import { TripForm } from "@/components/trip-form";
import { WeatherDashboard } from "@/components/weather-dashboard";
import { PackingList } from "@/components/packing-list";
import { TempUnitToggle } from "@/components/temp-unit-toggle";
import { Loader2Icon } from "lucide-react";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherSummary | null>(null);
  const [location, setLocation] = useState<GeocodingResult | null>(null);
  const [unit, setUnit] = useState<TempUnit>("F");
  const [loading, setLoading] = useState(false);

  function handleSubmit(loc: GeocodingResult, weather: WeatherSummary) {
    setLocation(loc);
    setWeatherData(weather);
  }

  function formatLocationName(loc: GeocodingResult): string {
    const parts = [loc.name];
    if (loc.admin1) parts.push(loc.admin1);
    parts.push(loc.country);
    return parts.join(", ");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">Pack-Wise</h1>
          <TempUnitToggle unit={unit} onUnitChange={setUnit} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Trip Form */}
        <div className="max-w-md mx-auto mb-12">
          <TripForm onSubmit={handleSubmit} onLoadingChange={setLoading} />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Results */}
        {!loading && weatherData && location && (
          <div className="space-y-10">
            <p className="text-center text-muted-foreground">
              Forecast for{" "}
              <span className="font-medium text-foreground">
                {formatLocationName(location)}
              </span>
            </p>

            <WeatherDashboard weather={weatherData} unit={unit} />
            <PackingList weather={weatherData} unit={unit} />
          </div>
        )}
      </main>
    </div>
  );
}
