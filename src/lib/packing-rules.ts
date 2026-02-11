import { WeatherSummary, PackingCategory } from "@/types";

export function getPackingSuggestions(
  weather: WeatherSummary
): PackingCategory[] {
  const categories: PackingCategory[] = [];
  const avgHigh = weather.avgHigh;
  const avgLow = weather.avgLow;
  const tempSwing = avgHigh - avgLow;
  const hasRainyDays = weather.totalPrecipDays > 0;

  if (avgHigh < 32) {
    categories.push({
      name: "Freezing Cold Essentials",
      icon: "🥶",
      items: [
        "Heavy winter coat",
        "Thermal underwear",
        "Warm hat / beanie",
        "Insulated gloves",
        "Scarf / neck gaiter",
        "Insulated boots",
        "Thick wool socks",
      ],
      reason: `Highs around ${Math.round(avgHigh)}°F — bundle up for freezing conditions`,
    });
  } else if (avgHigh < 50) {
    categories.push({
      name: "Cold Weather Gear",
      icon: "🧥",
      items: [
        "Winter jacket",
        "Sweaters",
        "Long pants",
        "Warm layers",
        "Closed-toe shoes",
        "Warm socks",
      ],
      reason: `Highs around ${Math.round(avgHigh)}°F — dress warmly in layers`,
    });
  } else if (avgHigh < 65) {
    categories.push({
      name: "Cool Weather Layers",
      icon: "🧣",
      items: [
        "Light jacket",
        "Long-sleeve shirts",
        "Jeans / long pants",
        "Light layers",
        "Comfortable walking shoes",
      ],
      reason: `Highs around ${Math.round(avgHigh)}°F — layer up for cool weather`,
    });
  } else if (avgHigh < 78) {
    categories.push({
      name: "Mild Weather Clothing",
      icon: "👕",
      items: [
        "T-shirts",
        "Light pants / chinos",
        "Light sweater for evenings",
        "Comfortable shoes",
      ],
      reason: `Highs around ${Math.round(avgHigh)}°F — mild and comfortable`,
    });
  } else if (avgHigh < 90) {
    categories.push({
      name: "Warm Weather Essentials",
      icon: "☀️",
      items: [
        "Shorts",
        "T-shirts / tank tops",
        "Sundresses",
        "Sandals",
        "Sunscreen",
        "Sunglasses",
        "Sun hat",
      ],
      reason: `Highs around ${Math.round(avgHigh)}°F — pack light and stay cool`,
    });
  } else {
    categories.push({
      name: "Hot Weather Must-Haves",
      icon: "🔥",
      items: [
        "Lightweight breathable clothing",
        "Moisture-wicking fabrics",
        "Sun protection (hat, sunscreen)",
        "Sunglasses",
        "Reusable water bottle",
        "Sandals / breathable shoes",
      ],
      reason: `Highs above 90°F — protect yourself from the heat`,
    });
  }

  if (hasRainyDays) {
    categories.push({
      name: "Rain Gear",
      icon: "☔",
      items: [
        "Rain jacket / waterproof shell",
        "Compact umbrella",
        "Waterproof shoes or shoe covers",
      ],
      reason: `${weather.totalPrecipDays} day${weather.totalPrecipDays > 1 ? "s" : ""} with rain expected`,
    });
  }

  if (tempSwing > 25) {
    categories.push({
      name: "Layering Essentials",
      icon: "🔄",
      items: [
        "Removable layers (zip-up hoodie, cardigan)",
        "Versatile base layers",
        "Light scarf or wrap",
      ],
      reason: `Temperature swings of ${Math.round(tempSwing)}°F — layers are key`,
    });
  }

  categories.push({
    name: "Always Pack",
    icon: "🎒",
    items: [
      "Comfortable walking shoes",
      "Phone charger",
      "Toiletries",
      "Medications",
      "Travel documents",
    ],
    reason: "Essential items for any trip",
  });

  return categories;
}
