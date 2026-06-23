import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white mt-16">
      <div className="section-container py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-stone-700">
            Al-Qur'an Digital{" "}
            <span className="text-stone-400 font-normal">by</span>{" "}
            <span className="text-sage-700">Faza</span>
          </p>
          <p className="text-xs text-stone-400 mt-0.5">
            Data: Equran.id API &amp; Aladhan API
          </p>
        </div>
        <nav className="flex items-center gap-4 text-xs text-stone-500">
          <Link href="/quran" className="hover:text-stone-700 transition-colors">Al-Qur'an</Link>
          <Link href="/salat" className="hover:text-stone-700 transition-colors">Jadwal Salat</Link>
          <Link href="/doa"   className="hover:text-stone-700 transition-colors">Doa Harian</Link>
        </nav>
      </div>
    </footer>
  );
}
