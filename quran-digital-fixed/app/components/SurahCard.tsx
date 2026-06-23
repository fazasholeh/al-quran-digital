import Link from "next/link";
import type { SurahListItem } from "@/app/types";

interface SurahCardProps {
  surah: SurahListItem;
}

export function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link
      href={`/quran/${surah.nomor}`}
      className="group card-hover flex items-center gap-4"
    >
      {/* Number */}
      <div className="flex-shrink-0 w-9 h-9 rounded-full border border-stone-200 group-hover:border-sage-700/40 flex items-center justify-center transition-colors">
        <span className="text-xs font-mono text-stone-500 tabular-nums">{surah.nomor}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-stone-800 leading-tight">
          {surah.namaLatin}
        </p>
        <p className="text-xs text-stone-400 mt-0.5 truncate">
          {surah.arti} · {surah.jumlahAyat} ayat · {surah.tempatTurun === "Makkiyah" ? "Makkah" : "Madinah"}
        </p>
      </div>

      {/* Arabic name */}
      <div className="flex-shrink-0 text-right">
        <p className="font-arabic text-lg text-stone-700 leading-none">{surah.nama}</p>
      </div>
    </Link>
  );
}
