import { NextRequest, NextResponse } from "next/server";

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const peptideName = searchParams.get("peptideName");

  if (!peptideName) {
    return NextResponse.json({ error: "peptideName is required" }, { status: 400 });
  }

  const cacheKey = peptideName.toLowerCase();
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const apiKey = process.env.OPENFDA_API_KEY || "";
    const keyParam = apiKey ? `&api_key=${apiKey}` : "";
    const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(peptideName)}"+openfda.brand_name:"${encodeURIComponent(peptideName)}"&limit=3${keyParam}`;

    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      // FDA may not have data for research peptides
      const fallback = { results: [], meta: { disclaimer: "No FDA data available for this compound." } };
      cache.set(cacheKey, { data: fallback, timestamp: Date.now() });
      return NextResponse.json(fallback);
    }

    const data = await response.json();

    const sanitized = {
      results: (data.results || []).map((r: Record<string, unknown>) => ({
        description: r.description || [],
        warnings: r.warnings || [],
        adverse_reactions: r.adverse_reactions || [],
        indications_and_usage: r.indications_and_usage || [],
        dosage_and_administration: r.dosage_and_administration || [],
      })),
      meta: data.meta,
    };

    cache.set(cacheKey, { data: sanitized, timestamp: Date.now() });
    return NextResponse.json(sanitized);
  } catch {
    return NextResponse.json(
      { results: [], meta: { disclaimer: "Unable to fetch FDA data at this time." } },
      { status: 200 }
    );
  }
}
