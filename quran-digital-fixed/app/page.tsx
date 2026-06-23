import Link from "next/link";
import { getSurahList, getDoaList } from "@/app/lib/quran";
import { PrayerCard } from "@/app/components/PrayerCard";
import { SurahCard } from "@/app/components/SurahCard";
import { DoaCard } from "@/app/components/DoaCard";

export const revalidate = 86400;

export default async function HomePage() {
  const [surahList, doaList] = await Promise.all([getSurahList(), getDoaList()]);
  const featured = surahList.slice(0, 6);
  const featuredDoa = doaList.slice(0, 4);

  return (
    <div className="section-container py-12 space-y-16">

      {/* Hero */}
      <section className="text-center space-y-4 py-6">
        <p className="text-sm text-stone-400 uppercase tracking-widest font-medium">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 leading-tight tracking-tight">
          Al-Qur'an Digital
        </h1>
        <p className="text-stone-500 max-w-md mx-auto text-base leading-relaxed">
          Baca Al-Qur'an dengan teks Arab, latin, dan terjemahan. Dilengkapi jadwal salat dan doa harian.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/quran"
            className="inline-flex items-center gap-2 bg-sage-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-sage-800 transition-colors"
          >
            Buka Al-Qur'an
          </Link>
          <Link
            href="/salat"
            className="inline-flex items-center gap-2 text-stone-700 text-sm font-medium px-5 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 transition-colors"
          >
            Jadwal Salat
          </Link>
        </div>
      </section>

      {/* Prayer times card */}
      <section>
        <PrayerCard />
      </section>

      {/* Featured surahs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-800">Surah Pilihan</h2>
          <Link href="/quran" className="text-sm text-sage-700 hover:text-sage-800 transition-colors">
            Lihat semua →
          </Link>
        </div>
        <div className="grid gap-2">
          {featured.map((surah) => (
            <SurahCard key={surah.nomor} surah={surah} />
          ))}
        </div>
      </section>

      {/* Featured doa */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-800">Doa Harian</h2>
          <Link href="/doa" className="text-sm text-sage-700 hover:text-sage-800 transition-colors">
            Lihat semua →
          </Link>
        </div>
        <div className="space-y-2">
          {featuredDoa.map((doa) => (
            <DoaCard key={doa.id} doa={doa} />
          ))}
        </div>
      </section>

    </div>
  );
}
