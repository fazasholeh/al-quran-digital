"use client";

import { usePrayerTimes } from "@/app/hooks/usePrayerTimes";
import { formatTime24 } from "@/app/lib/utils";
import { Skeleton } from "@/app/components/Skeleton";

const ALL_TIMINGS = [
  { key: "Imsak",   label: "Imsak",    note: "Batas sahur" },
  { key: "Fajr",    label: "Subuh",    note: "Awal waktu salat Subuh" },
  { key: "Sunrise", label: "Syuruq",   note: "Matahari terbit" },
  { key: "Dhuhr",   label: "Zuhur",    note: "Tengah hari" },
  { key: "Asr",     label: "Asar",     note: "" },
  { key: "Maghrib", label: "Magrib",   note: "Matahari terbenam" },
  { key: "Isha",    label: "Isya",     note: "" },
  { key: "Midnight", label: "Tengah Malam", note: "Nisf al-lail" },
] as const;

export function PrayerFullSchedule() {
  const state = usePrayerTimes();

  if (state.status !== "success") {
    return (
      <div className="card space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-stone-50 last:border-0">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
    );
  }

  const { data } = state;

  return (
    <div className="card">
      <h2 className="text-sm font-semibold text-stone-700 mb-4">Semua Waktu</h2>
      <div className="divide-y divide-stone-50">
        {ALL_TIMINGS.map(({ key, label, note }) => (
          <div key={key} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-stone-700">{label}</p>
              {note && <p className="text-xs text-stone-400 mt-0.5">{note}</p>}
            </div>
            <span className="font-mono text-base font-semibold tabular-nums text-stone-800">
              {formatTime24(data.timings[key])}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
