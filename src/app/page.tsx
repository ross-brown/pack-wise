"use client";

import { useState } from "react";
import { GeocodingResult, WeatherSummary, TempUnit } from "@/types";
import { TripForm } from "@/components/trip-form";
import { WeatherDashboard } from "@/components/weather-dashboard";
import { PackingList } from "@/components/packing-list";
import { TempUnitToggle } from "@/components/temp-unit-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal top nav */}
      <nav className="border-b border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-heading text-xl tracking-tight">
            Pack-Wise
          </h1>
          <div className="flex items-center gap-2">
            <TempUnitToggle unit={unit} onUnitChange={setUnit} />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero / Search Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 w-full animate-fade-in-up">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h2 className="font-heading text-5xl sm:text-6xl leading-tight tracking-tight">
            Where to next?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Enter your destination and travel dates. We&apos;ll tell you what
            the weather looks like and what to pack.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <TripForm onSubmit={handleSubmit} onLoadingChange={setLoading} />
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <section className="max-w-5xl mx-auto px-6 pb-16 w-full">
          <div className="animate-fade-in space-y-8">
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2Icon className="size-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground tracking-wide">
                Fetching forecast...
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 rounded-md shimmer-bg" />
              ))}
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 rounded-md shimmer-bg" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {!loading && weatherData && location && (
        <div className="animate-slide-in-up">
          {/* Location header — full width muted band */}
          <section className="border-y border-border/40 bg-muted/30">
            <div className="max-w-5xl mx-auto px-6 py-10 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Forecast for
              </p>
              <h3 className="font-heading text-4xl sm:text-5xl tracking-tight">
                {formatLocationName(location)}
              </h3>
            </div>
          </section>

          {/* Weather section */}
          <section className="max-w-5xl mx-auto px-6 py-16 w-full">
            <WeatherDashboard weather={weatherData} unit={unit} />
          </section>

          {/* Divider */}
          <div className="max-w-5xl mx-auto px-6">
            <div className="h-px bg-border" />
          </div>

          {/* Packing section */}
          <section className="max-w-5xl mx-auto px-6 py-16 w-full">
            <PackingList weather={weatherData} unit={unit} />
          </section>
        </div>
      )}

      <div className="flex-1" />

      <footer className="border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            Weather data by{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Open-Meteo
            </a>
          </p>
          <p>No account needed. No data stored.</p>
        </div>
      </footer>
    </div>
  );
}
