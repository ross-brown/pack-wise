import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TempUnit } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertTemp(fahrenheit: number, unit: TempUnit): number {
  if (unit === "C") {
    return Math.round(((fahrenheit - 32) * 5) / 9 * 10) / 10;
  }
  return Math.round(fahrenheit * 10) / 10;
}

export function formatTemp(fahrenheit: number, unit: TempUnit): string {
  const value = convertTemp(fahrenheit, unit);
  return `${Math.round(value)}°${unit}`;
}
