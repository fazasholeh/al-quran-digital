import type { Ayah } from "@/app/types";

interface AyahBlockProps {
  ayah: Ayah;
}

export function AyahBlock({ ayah }: AyahBlockProps) {
  return (
    <article className="py-7 border-b border-stone-100 last:border-0">
      {/* Ayah number badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center">
          <span className="text-xs font-mono text-stone-500 tabular-nums">
            {ayah.nomorAyat}
          </span>
        </div>
        <a
          href={Object.values(ayah.audio)[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-sage-700 transition-colors"
          aria-label={`Dengarkan ayat ${ayah.nomorAyat}`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M5.5 4.5l4 2.5-4 2.5V4.5z" fill="currentColor"/>
          </svg>
          Audio
        </a>
      </div>

      {/* Arabic text */}
      <p className="arabic text-arabic-lg text-stone-900 mb-6">
        {ayah.teksArab}
      </p>

      {/* Latin transliteration */}
      <p className="text-sm text-stone-400 italic leading-relaxed mb-3">
        {ayah.teksLatin}
      </p>

      {/* Indonesian translation */}
      <p className="text-sm text-stone-600 leading-relaxed">
        <span className="text-stone-300 font-medium mr-2">—</span>
        {ayah.teksIndonesia}
      </p>
    </article>
  );
}
