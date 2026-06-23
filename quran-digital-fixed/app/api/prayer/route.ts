import { NextRequest, NextResponse } from "next/server";
import { getPrayerTimes, getPrayerTimesByCity } from "@/app/lib/prayer";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  try {
    if (searchParams.has("lat") && searchParams.has("lng")) {
      const lat = parseFloat(searchParams.get("lat")!);
      const lng = parseFloat(searchParams.get("lng")!);
      const data = await getPrayerTimes(lat, lng);
      return NextResponse.json(data);
    }

    const city    = searchParams.get("city")    ?? "Jakarta";
    const country = searchParams.get("country") ?? "ID";
    const data = await getPrayerTimesByCity(city, country);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
