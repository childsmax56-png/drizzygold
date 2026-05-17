import { parseCSV, csvResponse } from './_csvParser';

function normalizeRow(row: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(row)) {
    if (k.startsWith('Notes'))
      out['Notes'] = v;
    else if (k === 'Currently Available')
      out['Available Length'] = v;
    else
      out[k] = v;
  }
  return out;
}

export const onRequestGet: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const csvUrl = `${url.origin}/data/fakes.csv`;

  const res = await fetch(csvUrl);
  if (!res.ok) return new Response('CSV not found', { status: 404 });

  const text = await res.text();
  const rows = parseCSV(text);

  const filtered = rows.filter(row => (row['Era'] || '').trim() && (row['Name'] || '').trim());

  return csvResponse(filtered.map(normalizeRow));
};
