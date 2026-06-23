"use client";

import { useState } from "react";
import type { DoaMyQuranItem } from "@/app/types";
import { getDoaTitle, getDoaLatin, getDoaArti } from "@/app/types";

interface DoaMyQuranCardProps {
  doa: DoaMyQuranItem;
  index: number;
}

/** Cari teks Arab dari semua field yang ada di objek doa.
 *  Deteksi dengan Unicode range Arab (U+0600–U+06FF).
 *  Ini memastikan tulisan Arab tampil apapun nama field-nya dari API. */
function findArabicText(doa: DoaMyQuranItem): string {
  // Cek field yang sudah diketahui lebih dulu
  const knownFields = ["arab", "arabic", "do'a", "doa_arab", "text_arab", "ayat"];
  for (const field of knownFields) {
    const val = doa[field];
    if (typeof val === "string" && /[\u0600-\u06FF]/.test(val)) {
      return val;
    }
  }
  // Fallback: scan semua field untuk string yang mengandung karakter Arab
  for (const key of Object.keys(doa)) {
    const val = doa[key];
    if (typeof val === "string" && /[\u0600-\u06FF]/.test(val)) {
      return val;
    }
  }
  return "";
}

export function DoaMyQuranCard({ doa, index }: DoaMyQuranCardProps) {
  const [expanded, setExpanded] = useState(false);

  const title = getDoaTitle(doa);
  const arab  = findArabicText(doa);
  const latin = getDoaLatin(doa);
  const arti  = getDoaArti(doa);

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
        expanded
          ? "border-sage-700/30 shadow-sm"
          : "border-stone-200 hover:border-stone-300"
      }`}
    >
      {/* Header */}
      <button
        className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors ${
          expanded ? "bg-sage-50" : "bg-white hover:bg-stone-50"
        }`}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
            expanded ? "bg-sage-700 text-white" : "bg-stone-100 text-stone-500"
          }`}
        >
          {index + 1}
        </span>

        <span className="flex-1 text-sm font-medium text-stone-800 leading-snug">
          {title}
        </span>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`flex-shrink-0 transition-transform duration-200 ${
            expanded ? "rotate-180 text-sage-700" : "text-stone-400"
          }`}
        >
          <path
            d="M3 5.5l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-6 border-t border-stone-100 bg-white space-y-5 pt-5">

          {/* Arabic text */}
          {arab ? (
            <div className="bg-stone-50 rounded-lg px-5 py-4">
              <p
                dir="rtl"
                lang="ar"
                className="arabic text-right text-stone-900"
                style={{ fontSize: "1.6rem", lineHeight: "3rem" }}
              >
                {arab}
              </p>
            </div>
          ) : null}

          {/* Latin */}
          {latin ? (
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Latin
              </p>
              <p className="text-sm text-stone-500 italic leading-relaxed">
                {latin}
              </p>
            </div>
          ) : null}

          {/* Translation */}
          {arti ? (
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Artinya
              </p>
              <p className="text-sm text-stone-700 leading-relaxed border-l-2 border-sage-200 pl-3">
                {arti}
              </p>
            </div>
          ) : null}

          {!arab && !latin && !arti && (
            <p className="text-sm text-stone-400 italic">Data doa tidak tersedia.</p>
          )}
        </div>
      )}
    </div>
  );
}
