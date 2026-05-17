import { parseCSV, csvResponse } from './_csvParser';

const VALID_TYPES = new Set([
  'Feature', 'Production', 'Single', 'Album Track', 'Other',
  'Mixtape Track', 'Loosie', 'EP Track', 'Compilation Track', 'Remix', 'Physical Release',
]);

function normalizeRow(row: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, val] of Object.entries(row)) {
    out[key === 'Track Length' ? 'Length' : key] = val;
  }
  return out;
}

export const onRequestGet: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const csvUrl = `${url.origin}/data/released.csv`;

  const res = await fetch(csvUrl);
  if (!res.ok) return new Response('CSV not found', { status: 404 });

  const text = await res.text();
  const rows = parseCSV(text);

  const filtered = rows
    .filter(row => (row['Era'] || '').trim() && VALID_TYPES.has((row['Type'] || '').trim()))
    .map(normalizeRow);

  return csvResponse(filtered);
};
