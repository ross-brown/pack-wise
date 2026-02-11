export interface GeocodingResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

export interface DailyWeather {
  date: string;
  tempMax: number;
  tempMin: number;
  tempMean: number;
  precipitation: number;
  precipitationProbability: number;
}

export interface WeatherSummary {
  daily: DailyWeather[];
  avgHigh: number;
  avgLow: number;
  avgMean: number;
  avgPrecipitation: number;
  totalPrecipDays: number;
}

export interface TripInput {
  location: GeocodingResult;
  startDate: string;
  endDate: string;
}

export interface PackingCategory {
  name: string;
  icon: string;
  items: string[];
  reason: string;
}

export type TempUnit = "F" | "C";
