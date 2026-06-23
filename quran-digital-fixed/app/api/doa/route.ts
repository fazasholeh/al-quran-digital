import { NextResponse } from "next/server";

const MYQURAN_BASE = "https://api.myquran.com/v2";

export async function GET() {
  try {
    const res = await fetch(`${MYQURAN_BASE}/doa/semua`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `API returned ${res.status}` },
        { status: res.status }
      );
    }

    const json = await res.json();
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
