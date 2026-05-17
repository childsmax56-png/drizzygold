import { parseCSV, csvResponse } from './_csvParser';

export const onRequestGet: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const csvUrl = `${url.origin}/data/unreleased.csv`;

  const res = await fetch(csvUrl);
  if (!res.ok) return new Response('CSV not found', { status: 404 });

  const text = await res.text();
  const rows = parseCSV(text);

  const filtered = rows.filter(row => {
    const era = (row['Era'] || '').trim();
    if (!era) return false;
    // Skip stats rows: "N OG File(s)..." or "N Full..." patterns
    if (/^\d+\s+(OG\s+File|Full|Total Links)/.test(era)) return false;
    // Skip changelog / guideline rows that contain a date in parentheses
    if (/\(\d{2}\/\d{2}\/\d{4}\)/.test(era)) return false;
    // Skip rows where Era is clearly a long guideline/note (>80 chars)
    if (era.length > 80) return false;
    return true;
  });

  return csvResponse(filtered);
};
