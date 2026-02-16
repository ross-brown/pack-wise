"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GeocodingResult } from "@/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { SearchIcon, Loader2Icon } from "lucide-react";

interface CitySearchProps {
  value: GeocodingResult | null;
  onChange: (result: GeocodingResult | null) => void;
}

export function CitySearch({ value, onChange }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>(null);

  const searchCities = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/geocode?name=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setResults(data);
        setIsOpen(data.length > 0);
      }
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchCities(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, searchCities]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function formatCityLabel(result: GeocodingResult) {
    const parts = [result.name];
    if (result.admin1) parts.push(result.admin1);
    parts.push(result.country);
    return parts.join(", ");
  }

  function handleSelect(result: GeocodingResult) {
    onChange(result);
    setQuery(formatCityLabel(result));
    setIsOpen(false);
  }

  function handleInputChange(val: string) {
    setQuery(val);
    if (value) {
      onChange(null);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <Input
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (results.length > 0 && !value) setIsOpen(true);
          }}
          className="pl-12 h-12 text-base border-border/60 bg-card"
        />
        {isLoading && (
          <Loader2Icon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 animate-spin text-muted-foreground" />
        )}
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 rounded-md border bg-popover shadow-lg">
          <Command>
            <CommandList>
              {results.length === 0 ? (
                <CommandEmpty>
                  <div className="space-y-1">
                    <p>No cities found.</p>
                    <p className="text-xs text-muted-foreground">Try a different spelling</p>
                  </div>
                </CommandEmpty>
              ) : (
                <CommandGroup>
                  {results.map((result, index) => (
                    <CommandItem
                      key={`${result.latitude}-${result.longitude}-${index}`}
                      onSelect={() => handleSelect(result)}
                      className="cursor-pointer py-3"
                    >
                      <span className="text-sm">{formatCityLabel(result)}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
