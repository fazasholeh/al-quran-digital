"use client";

import { useState } from "react";
import type { DoaItem } from "@/app/types";

interface DoaCardProps {
  doa: DoaItem;
  defaultExpanded?: boolean;
}

export function DoaCard({ doa, defaultExpanded = false }: DoaCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden">
      {/* Header / Toggle */}
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-stone-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="text-sm font-medium text-stone-800">{doa.doa}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`flex-shrink-0 text-stone-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        >
          <path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-6 border-t border-stone-100 bg-white space-y-4">
          {/* Arabic */}
          <p className="arabic text-arabic-base text-stone-900 pt-5 leading-loose">
            {doa.ayat}
          </p>

          {/* Latin */}
          <p className="text-sm text-stone-400 italic leading-relaxed">
            {doa.latin}
          </p>

          {/* Translation */}
          <p className="text-sm text-stone-600 leading-relaxed border-l-2 border-sage-200 pl-3">
            {doa.artinya}
          </p>
        </div>
      )}
    </div>
  );
}
