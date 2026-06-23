"use client";

import { useState, useEffect } from "react";
import type { PrayerData } from "@/app/types";

type State =
  | { status: "idle" }
  | { status: "locating" }
  | { status: "loading"; lat: number; lng: number; city?: string }
  | { status: "success"; data: PrayerData; city?: string }
  | { status: "error"; message: string };

export function usePrayerTimes() {
  const [state, setState] = useState<State>({ status: "idle" });

  useEffect(() => {
    setState({ status: "locating" });

    if (!navigator.geolocation) {
      fetchByCity("Jakarta", "ID");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setState({ status: "loading", lat, lng });
        try {
          // Reverse geocode via nominatim
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const geo = await geoRes.json();
          const city =
            geo.address?.city ||
            geo.address?.town ||
            geo.address?.village ||
            "Lokasi Kamu";

          const res = await fetch(
            `/api/prayer?lat=${lat}&lng=${lng}`
          );
          if (!res.ok) throw new Error("Prayer API error");
          const data: PrayerData = await res.json();
          setState({ status: "success", data, city });
        } catch {
          fetchByCity("Jakarta", "ID");
        }
      },
      () => fetchByCity("Jakarta", "ID")
    );
  }, []);

  async function fetchByCity(city: string, country: string) {
    setState({ status: "loading", lat: 0, lng: 0, city });
    try {
      const res = await fetch(
        `/api/prayer?city=${encodeURIComponent(city)}&country=${country}`
      );
      if (!res.ok) throw new Error("Prayer API error");
      const data: PrayerData = await res.json();
      setState({ status: "success", data, city });
    } catch (e: unknown) {
      setState({ status: "error", message: String(e) });
    }
  }

  return state;
}
