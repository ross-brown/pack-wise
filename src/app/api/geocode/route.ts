import { NextRequest, NextResponse } from "next/server";
import { GeocodingResult } from "@/types";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");

  if (!name || name.trim().length < 2) {
    return NextResponse.json([]);
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name.trim())}&count=5&language=en`;

  const response = await fetch(url);

  if (!response.ok) {
    return NextResponse.json(
      { error: "Geocoding request failed" },
      { status: 502 }
    );
  }

  const data = await response.json();

  if (!data.results) {
    return NextResponse.json([]);
  }

  const results: GeocodingResult[] = data.results.map(
    (r: { name: string; country: string; latitude: number; longitude: number; admin1?: string }) => ({
      name: r.name,
      country: r.country,
      latitude: r.latitude,
      longitude: r.longitude,
      admin1: r.admin1,
    })
  );

  return NextResponse.json(results);
}
