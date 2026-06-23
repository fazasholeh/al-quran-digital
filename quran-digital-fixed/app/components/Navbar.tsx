"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePrayerTimes } from "@/app/hooks/usePrayerTimes";
import { getNextPrayer, formatTime24 } from "@/app/lib/utils";
import { useEffect, useReducer, useState } from "react";

const NAV = [
  { label: "Beranda",     href: "/" },
  { label: "Al-Qur'an",  href: "/quran" },
  { label: "Jadwal Salat", href: "/salat" },
  { label: "Doa Harian",  href: "/doa" },
];

export function Navbar() {
  const pathname = usePathname();
  const prayerState = usePrayerTimes();
  const [menuOpen, setMenuOpen] = useState(false);
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  // Refresh countdown every minute
  useEffect(() => {
    const id = setInterval(forceUpdate, 60000);
    return () => clearInterval(id);
  }, []);

  const next =
    prayerState.status === "success"
      ? getNextPrayer(prayerState.data.timings)
      : null;

  return (
    <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
      {/* Prayer countdown strip */}
      {next && (
        <div className="bg-sage-700 text-white text-xs py-1.5">
          <div className="section-container flex items-center justify-between gap-4">
            <span className="opacity-80">Salat berikutnya</span>
            <div className="flex items-center gap-3 font-medium">
              <span>{next.label}</span>
              <span className="opacity-60">·</span>
              <span className="font-mono tabular-nums">{formatTime24(next.time)}</span>
              <span className="opacity-60">·</span>
              <span className="opacity-80">{next.minutesLeft} menit lagi</span>
            </div>
          </div>
        </div>
      )}

      {/* Main nav */}
      <nav className="section-container flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Al-Qur'an Digital - Beranda"
        >
          <div className="w-7 h-7 rounded-lg bg-sage-700 flex items-center justify-center">
            <span className="text-white font-arabic text-sm leading-none">ق</span>
          </div>
          <span className="font-semibold text-stone-900 text-sm tracking-tight">
            Al-Qur'an Digital
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-sage-700 text-white font-medium"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {menuOpen ? (
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <>
                <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-stone-50">
          <ul className="section-container py-3 flex flex-col gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? "bg-sage-700 text-white font-medium"
                        : "text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
