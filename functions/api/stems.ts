import { parseCSV, csvResponse } from './_csvParser';

function normalizeRow(row: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(row)) {
    if (k === 'f')
      out['Era'] = v;
    else if (k.startsWith('Name'))
      out['Name'] = v;
    else if (k.startsWith('Notes'))
      out['Notes\n(Join the Discord to help fix any issues + help with dead links)'] = v;
    else if (k === 'File')
      out['Leak Date'] = v;
    else if (k === 'Full Length' || k === 'Full\nLength')
      out['Full Length'] = v;
    else if (k === 'Leak Date' || k === 'Leak\nDate')
      out['Leak Date'] = v;
    else if (k === 'Available Length' || k === 'Available\nLength')
      out['Available Length'] = v;
    else
      out[k] = v;
  }
  return out;
}

export const onRequestGet: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const csvUrl = `${url.origin}/data/stems.csv`;

  const res = await fetch(csvUrl);
  if (!res.ok) return new Response('CSV not found', { status: 404 });

  const text = await res.text();
  const rows = parseCSV(text);

  return csvResponse(rows.map(normalizeRow));
};
