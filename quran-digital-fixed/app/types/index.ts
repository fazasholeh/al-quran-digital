// ─── Prayer Times ───────────────────────────────────────────────────────────
export interface PrayerTimings {
  Fajr:    string;
  Sunrise: string;
  Dhuhr:   string;
  Asr:     string;
  Maghrib: string;
  Isha:    string;
  Imsak:   string;
  Midnight: string;
  [key: string]: string;
}

export interface PrayerDate {
  readable: string;
  timestamp: string;
  hijri: {
    date: string;
    day: string;
    month: { number: number; en: string; ar: string };
    year: string;
    weekday: { en: string; ar: string };
  };
  gregorian: {
    date: string;
    day: string;
    month: { number: number; en: string };
    year: string;
    weekday: { en: string };
  };
}

export interface PrayerData {
  timings: PrayerTimings;
  date: PrayerDate;
  meta: {
    latitude: number;
    longitude: number;
    timezone: string;
    method: { id: number; name: string };
  };
}

// ─── Surah ───────────────────────────────────────────────────────────────────
export interface SurahListItem {
  nomor:           number;
  nama:            string;
  namaLatin:       string;
  jumlahAyat:      number;
  tempatTurun:     string;
  arti:            string;
  deskripsi:       string;
  audioFull:       Record<string, string>;
}

export interface Ayah {
  nomorAyat:   number;
  teksArab:    string;
  teksLatin:   string;
  teksIndonesia: string;
  audio:       Record<string, string>;
}

export interface SurahDetail extends SurahListItem {
  ayat: Ayah[];
  suratSelanjutnya: { nomor: number; namaLatin: string; nama: string } | false;
  suratSebelumnya:  { nomor: number; namaLatin: string; nama: string } | false;
}

// ─── Doa (equran.id - legacy) ─────────────────────────────────────────────────
export interface DoaItem {
  id:          number;
  doa:         string;
  ayat:        string;
  latin:       string;
  artinya:     string;
}

// ─── Doa (myQuran v2) ─────────────────────────────────────────────────────────
// Field names may vary between API versions; all known aliases are included
export interface DoaMyQuranItem {
  id:       number;
  judul?:   string;
  doa?:     string;
  title?:   string;
  arab?:    string;
  arabic?:  string;
  ayat?:    string;
  latin?:   string;
  arti?:    string;
  artinya?: string;
  [key: string]: unknown;
}

// Helper to extract display fields from any API variant
export function getDoaTitle(d: DoaMyQuranItem): string {
  return d.judul ?? d.doa ?? d.title ?? `Doa #${d.id}`;
}
export function getDoaArab(d: DoaMyQuranItem): string {
  return d.arab ?? d.arabic ?? d.ayat ?? "";
}
export function getDoaLatin(d: DoaMyQuranItem): string {
  return d.latin ?? "";
}
export function getDoaArti(d: DoaMyQuranItem): string {
  return d.arti ?? d.artinya ?? "";
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export type NavItem = {
  label: string;
  href:  string;
};
