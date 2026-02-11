import { NextRequest, NextResponse } from "next/server";
import { DailyWeather, WeatherSummary } from "@/types";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const lat = params.get("lat");
  const lon = params.get("lon");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");

  if (!lat || !lon || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing required parameters: lat, lon, startDate, endDate" },
      { status: 400 }
    );
  }

  // Validate date range is within the next 16 days
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 16);

  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");

  if (start < today) {
    return NextResponse.json(
      { error: "Start date cannot be in the past" },
      { status: 400 }
    );
  }

  if (end > maxDate) {
    return NextResponse.json(
      { error: "End date must be within the next 16 days" },
      { status: 400 }
    );
  }

  if (end < start) {
    return NextResponse.json(
      { error: "End date must be on or after start date" },
      { status: 400 }
    );
  }

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set(
    "daily",
    "temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max"
  );
  url.searchParams.set("temperature_unit", "fahrenheit");
  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", endDate);
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url.toString());

  if (!response.ok) {
    return NextResponse.json(
      { error: "Weather API request failed" },
      { status: 502 }
    );
  }

  const data = await response.json();

  if (!data.daily || !data.daily.time) {
    return NextResponse.json(
      { error: "Unexpected weather API response" },
      { status: 502 }
    );
  }

  const daily: DailyWeather[] = data.daily.time.map(
    (date: string, i: number) => ({
      date,
      tempMax: data.daily.temperature_2m_max[i],
      tempMin: data.daily.temperature_2m_min[i],
      tempMean:
        (data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) /
        2,
      precipitation: data.daily.precipitation_sum[i],
      precipitationProbability: data.daily.precipitation_probability_max[i],
    })
  );

  const avgHigh =
    daily.reduce((sum: number, d: DailyWeather) => sum + d.tempMax, 0) /
    daily.length;
  const avgLow =
    daily.reduce((sum: number, d: DailyWeather) => sum + d.tempMin, 0) /
    daily.length;
  const avgMean =
    daily.reduce((sum: number, d: DailyWeather) => sum + d.tempMean, 0) /
    daily.length;
  const avgPrecipitation =
    daily.reduce(
      (sum: number, d: DailyWeather) => sum + d.precipitation,
      0
    ) / daily.length;
  const totalPrecipDays = daily.filter(
    (d: DailyWeather) => d.precipitationProbability > 50
  ).length;

  const summary: WeatherSummary = {
    daily,
    avgHigh: Math.round(avgHigh * 10) / 10,
    avgLow: Math.round(avgLow * 10) / 10,
    avgMean: Math.round(avgMean * 10) / 10,
    avgPrecipitation: Math.round(avgPrecipitation * 10) / 10,
    totalPrecipDays,
  };

  return NextResponse.json(summary);
}
