import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-container py-24 text-center space-y-4">
      <p className="font-arabic text-4xl text-stone-300">٤٠٤</p>
      <h1 className="text-xl font-semibold text-stone-700">Halaman tidak ditemukan</h1>
      <p className="text-sm text-stone-500">Halaman yang Anda cari tidak tersedia.</p>
      <Link
        href="/"
        className="inline-block mt-4 text-sm text-sage-700 hover:text-sage-800 transition-colors"
      >
        ← Kembali ke beranda
      </Link>
    </div>
  );
}
