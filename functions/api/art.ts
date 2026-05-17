import { parseCSV, csvResponse } from './_csvParser';

function normalizeRow(row: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, val] of Object.entries(row)) {
    out[key.split('\n')[0].trim()] = val;
  }
  return out;
}

export const onRequestGet: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const csvUrl = `${url.origin}/data/art.csv`;

  const res = await fetch(csvUrl);
  if (!res.ok) return new Response('CSV not found', { status: 404 });

  const text = await res.text();
  const rows = parseCSV(text);

  return csvResponse(rows.map(normalizeRow));
};
