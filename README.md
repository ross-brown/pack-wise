# Pack-Wise

Weather-based travel packing recommendations — search a city, pick your dates, get a smart packing list.

## Features

- **Weather forecasts** for any city up to 16 days out
- **Smart packing lists** generated from temperature thresholds, precipitation, and temperature swings
- **Dark mode** support
- **No API keys needed** — powered by free, public Open-Meteo APIs
- **Fahrenheit / Celsius toggle**

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19 and TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with OKLCH color space
- [shadcn/ui](https://ui.shadcn.com) (new-york style) with Radix UI primitives and Lucide icons
- [date-fns](https://date-fns.org) + [react-day-picker](https://react-day-picker.js.org) for date handling

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

| Command | Description |
|---------|-------------|
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm start` | Start production server |

## Project Structure

```
src/
  app/
    api/geocode/   # Proxies city search to Open-Meteo Geocoding API
    api/weather/   # Proxies forecast requests to Open-Meteo Forecast API
    page.tsx       # Main container — manages weatherData, location, and unit state
  components/
    ui/            # shadcn/ui primitives (managed by shadcn CLI)
    city-search    # Debounced city autocomplete (300ms)
    trip-form      # Date range picker
    weather-dashboard  # Forecast display
    packing-list   # Generated packing recommendations
    temp-unit-toggle   # Fahrenheit / Celsius switcher
  lib/
    packing-rules.ts  # Packing logic with temperature thresholds
    utils.ts           # cn() helper and convertTemp()
  types/
    index.ts       # TypeScript type definitions
```

## How It Works

1. **Search** for a destination city (autocomplete powered by Open-Meteo Geocoding)
2. **Select** your trip dates (up to 16 days out)
3. **View** daily weather forecasts for the trip window
4. **Pack** using the generated packing list

### Packing logic

The packing engine in `src/lib/packing-rules.ts` categorizes items by temperature bands:

| Range | Category |
|-------|----------|
| Below 32 °F | Freezing — heavy winter gear |
| 32–50 °F | Cold — layering essentials |
| 50–65 °F | Cool — light layers |
| 65–78 °F | Mild — standard clothing |
| 78–90 °F | Warm — lightweight clothing |
| Above 90 °F | Hot — heat-appropriate gear |

Additional rules trigger for precipitation in the forecast and large daily temperature swings.

## Attribution

Weather data provided by [Open-Meteo](https://open-meteo.com) — free, open-source weather APIs.
