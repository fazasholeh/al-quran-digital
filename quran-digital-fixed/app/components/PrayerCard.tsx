"use client";

import { usePrayerTimes } from "@/app/hooks/usePrayerTimes";
import { PRAYER_LABELS, formatTime24, getNextPrayer } from "@/app/lib/utils";
import { PrayerCardSkeleton } from "@/app/components/Skeleton";
import { useEffect, useReducer } from "react";

const MAIN_PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

export function PrayerCard() {
  const state = usePrayerTimes();
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    const id = setInterval(forceUpdate, 60000);
    return () => clearInterval(id);
  }, []);

  if (state.status === "idle" || state.status === "locating" || state.status === "loading") {
    return <PrayerCardSkeleton />;
  }

  if (state.status === "error") {
    return (
      <div className="card text-center py-8 text-stone-500">
        <p className="text-sm">Tidak dapat memuat jadwal salat.</p>
      </div>
    );
  }

  const { data, city } = state;
  const next = getNextPrayer(data.timings);
  const hijri = data.date.hijri;
  const gregorian = data.date.gregorian;

  return (
    <div className="card space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
        <div>
          <p className="text-xs text-stone-400 uppercase tracking-wider font-medium">Jadwal Salat</p>
          <h2 className="text-lg font-semibold text-stone-800 mt-0.5">
            {city ?? data.meta.timezone}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-stone-600">
            {hijri.day} {hijri.month.en} {hijri.year} H
          </p>
          <p className="text-xs text-stone-400">
            {gregorian.weekday.en}, {gregorian.day} {gregorian.month.en} {gregorian.year}
          </p>
        </div>
      </div>

      {/* Prayer grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {MAIN_PRAYERS.map((key) => {
          const isNext = next?.name === key;
          return (
            <div
              key={key}
              className={`rounded-xl px-4 py-3 flex flex-col gap-1 transition-all ${
                isNext
                  ? "bg-sage-700 text-white"
                  : "bg-stone-50 border border-stone-100 text-stone-700"
              }`}
            >
              <span className={`text-xs font-medium ${isNext ? "text-sage-100" : "text-stone-400"}`}>
                {PRAYER_LABELS[key]}
              </span>
              <span className={`font-mono font-semibold tabular-nums text-lg leading-none ${isNext ? "text-white" : "text-stone-800"}`}>
                {formatTime24(data.timings[key])}
              </span>
              {isNext && (
                <span className="text-xs text-sage-200 mt-0.5">{next.minutesLeft} mnt lagi</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Method note */}
      <p className="text-xs text-stone-400">
        Metode: {data.meta.method.name}
      </p>
    </div>
  );
}
