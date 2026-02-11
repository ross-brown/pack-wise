"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { GeocodingResult, WeatherSummary } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CitySearch } from "@/components/city-search";

interface TripFormProps {
  onSubmit: (
    location: GeocodingResult,
    weather: WeatherSummary
  ) => void;
  onLoadingChange: (loading: boolean) => void;
}

export function TripForm({ onSubmit, onLoadingChange }: TripFormProps) {
  const [location, setLocation] = useState<GeocodingResult | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 16);

  async function handleSubmit() {
    setError(null);

    if (!location) {
      setError("Please select a city.");
      return;
    }
    if (!startDate) {
      setError("Please select a start date.");
      return;
    }
    if (!endDate) {
      setError("Please select an end date.");
      return;
    }
    if (endDate < startDate) {
      setError("End date must be on or after start date.");
      return;
    }

    onLoadingChange(true);

    try {
      const startStr = format(startDate, "yyyy-MM-dd");
      const endStr = format(endDate, "yyyy-MM-dd");

      const res = await fetch(
        `/api/weather?lat=${location.latitude}&lon=${location.longitude}&startDate=${startStr}&endDate=${endStr}`
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to fetch weather data.");
        return;
      }

      const weather: WeatherSummary = await res.json();
      onSubmit(location, weather);
    } catch {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      onLoadingChange(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Where are you going?</label>
        <CitySearch value={location} onChange={setLocation} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">When?</label>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <Popover open={startOpen} onOpenChange={setStartOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-[200px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 size-4" />
                {startDate ? format(startDate, "MMM d, yyyy") : "Start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                  setStartOpen(false);
                  if (date && endDate && endDate < date) {
                    setEndDate(undefined);
                  }
                }}
                disabled={(date) => {
                  const d = new Date(date);
                  d.setHours(0, 0, 0, 0);
                  return d < today || d > maxDate;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <span className="hidden sm:inline text-muted-foreground">to</span>

          <Popover open={endOpen} onOpenChange={setEndOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-[200px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 size-4" />
                {endDate ? format(endDate, "MMM d, yyyy") : "End date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => {
                  setEndDate(date);
                  setEndOpen(false);
                }}
                disabled={(date) => {
                  const d = new Date(date);
                  d.setHours(0, 0, 0, 0);
                  const minDate = startDate || today;
                  return d < minDate || d > maxDate;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <Button
        onClick={handleSubmit}
        className="w-full shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/20 transition-all"
        size="lg"
      >
        Check Weather
      </Button>
    </div>
  );
}
