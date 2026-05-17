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
    // Skip stats/summary rows that have OG file counts in the Era column
    if (/\d+\s+OG\s+File/.test(era)) return false;
    // Skip rows with no Era value
    if (!era) return false;
    return true;
  });

  return csvResponse(filtered);
};
