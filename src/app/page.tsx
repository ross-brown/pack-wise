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
      {/* Hero gradient band */}
      <div className="hero-gradient">
        <div className="container mx-auto px-4 pt-8 pb-28 max-w-4xl">
          <nav className="flex items-center justify-between">
            <h1 className="font-heading text-2xl italic tracking-tight">
              Pack-Wise
            </h1>
            <TempUnitToggle unit={unit} onUnitChange={setUnit} />
          </nav>
          <p className="mt-10 text-lg text-foreground/60 leading-relaxed max-w-xs">
            Check the forecast.
            <br />
            Pack with confidence.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-4xl -mt-20 pb-16">
        {/* Trip Form — floating card */}
        <div className="bg-card rounded-2xl shadow-xl shadow-black/5 border border-border/60 overflow-hidden mb-12 animate-fade-in-up">
          <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />
          <div className="p-6 sm:p-8">
            <TripForm onSubmit={handleSubmit} onLoadingChange={setLoading} />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16 animate-fade-in">
            <div className="flex flex-col items-center gap-4">
              <Loader2Icon className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Checking the forecast...
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && weatherData && location && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Forecast for</p>
              <p className="font-heading text-2xl italic">
                {formatLocationName(location)}
              </p>
            </div>

            <WeatherDashboard weather={weatherData} unit={unit} />
            <PackingList weather={weatherData} unit={unit} />
          </div>
        )}
      </main>
    </div>
  );
}
