"use client";

import { useState, useMemo, ChangeEvent } from "react";
import type { DoaMyQuranItem } from "@/app/types";
import { getDoaTitle, getDoaArti, getDoaLatin } from "@/app/types";
import { DoaMyQuranCard } from "./DoaMyQuranCard";

interface DoaSearchProps {
  doaList: DoaMyQuranItem[];
}

export function DoaSearch({ doaList }: DoaSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return doaList;
    return doaList.filter((d: DoaMyQuranItem) => {
      const title = getDoaTitle(d).toLowerCase();
      const arti  = getDoaArti(d).toLowerCase();
      const latin = getDoaLatin(d).toLowerCase();
      return title.includes(q) || arti.includes(q) || latin.includes(q);
    });
  }, [query, doaList]);

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-stone-400"
          >
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M10.5 10.5L14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder="Cari doa... (nama, arti, atau latin)"
          className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-10 text-sm text-stone-800 placeholder:text-stone-400 focus:border-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-700/20 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-stone-400 hover:text-stone-600 transition-colors"
            aria-label="Hapus pencarian"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="text-xs text-stone-400">
        {query
          ? `${filtered.length} doa ditemukan untuk "${query}"`
          : `${doaList.length} doa tersedia`}
      </p>

      {/* Doa list */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-stone-50 px-6 py-12 text-center">
          <div className="mb-3 text-3xl">🔍</div>
          <p className="text-sm font-medium text-stone-600">Doa tidak ditemukan</p>
          <p className="mt-1 text-xs text-stone-400">
            Coba kata kunci lain seperti nama doa atau artinya
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((doa: DoaMyQuranItem) => {
            const originalIndex = doaList.indexOf(doa);
            return (
              <DoaMyQuranCard
                key={doa.id}
                doa={doa}
                index={originalIndex}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
