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
    // Skip stats rows: "N OG File(s)...", "N Full...", "N Total Links..."
    if (/^\d+\s+(OG\s+File|Full|Total Links)/.test(era)) return false;
    // Skip changelog entries (date in parens with 2 or 4 digit year)
    if (/\(\d{2}\/\d{2}\/\d{2,4}\)/.test(era)) return false;
    // Skip guideline / note rows by common leading words
    if (/^(Added|Changed|Deleted|Removed|Upgraded|Converted|Readded|Replaced|Shortened|Re-colored|Tracker\b|Update\b|Links\b|Follow\b|Check\s|No\s|Put\s|Make\s|Special\s|To\s|All\s|Ordering\s)/i.test(era)) return false;
    // Skip sentences (guidelines end with . or !)
    if (era.endsWith('.') || era.endsWith('!')) return false;
    // Skip long notes
    if (era.length > 80) return false;
    return true;
  });

  return csvResponse(filtered);
};
