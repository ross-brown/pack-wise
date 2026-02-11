# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pack-Wise is a weather-based travel packing recommendation app. Users search for a city, select trip dates, and get weather forecasts with intelligent packing suggestions. It uses free, public Open-Meteo APIs (no API keys needed).

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm start` — Start production server

No test framework is configured.

## Tech Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4** with OKLCH color space and dark mode support
- **shadcn/ui** (new-york style) with Radix UI primitives and Lucide icons
- **date-fns** + **react-day-picker** for date handling

## Architecture

The app is a stateless client-side SPA with Next.js API routes as a proxy layer.

**Data flow:** `page.tsx` (container) manages top-level state (`weatherData`, `location`, `unit`) and passes it down via props. No external state management library.

**Key directories:**
- `src/app/api/` — Two API routes: `/api/geocode` and `/api/weather` that proxy requests to Open-Meteo
- `src/components/` — Feature components (`trip-form`, `city-search`, `weather-dashboard`, `packing-list`, `temp-unit-toggle`)
- `src/components/ui/` — shadcn/ui primitives (do not edit manually; managed by shadcn CLI)
- `src/lib/packing-rules.ts` — Core business logic: temperature-based packing categories with thresholds at 32°F, 50°F, 65°F, 78°F, 90°F; precipitation and temperature-swing detection
- `src/lib/utils.ts` — `cn()` helper and `convertTemp()` for F↔C conversion
- `src/types/index.ts` — All TypeScript type definitions (`WeatherSummary`, `GeocodingResult`, `TempUnit`, etc.)

**API constraints:** Weather forecasts are limited to 16 days out. City search uses 300ms debounce.

## Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json).
