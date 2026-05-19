import { parseCSV, csvResponse } from './_csvParser';

function parseSongName(raw: string): { name: string; extra: string | undefined } {
  const newline = raw.indexOf('\n');
  if (newline === -1) return { name: raw.trim(), extra: undefined };
  const name = raw.substring(0, newline).trim();
  const extra = raw.substring(newline).trim().replace(/^\n+/, '') || undefined;
  return { name, extra };
}

function isJunkEra(era: string): boolean {
  if (!era) return true;
  if (/^\d+\s+(OG\s+File|Full|Total Links)/.test(era)) return true;
  if (/\(\d{2}\/\d{2}\/\d{2,4}\)/.test(era)) return true;
  if (/^(Added|Changed|Deleted|Removed|Upgraded|Converted|Readded|Replaced|Shortened|Re-colored|Tracker\b|Update\b|Links\b|Follow\b|Check\s|No\s|Put\s|Make\s|Special\s|To\s|All\s|Ordering\s)/i.test(era)) return true;
  if (era.endsWith('.') || era.endsWith('!')) return true;
  if (era.length > 80) return true;
  return false;
}

export const onRequestGet: PagesFunction = async (context) => {
  try {
    const url = new URL(context.request.url);
    const csvUrl = `${url.origin}/data/unreleased.csv`;

    const res = await fetch(csvUrl);
    if (!res.ok) return new Response('CSV not found', { status: 404 });

    const text = await res.text();
    const rows = parseCSV(text);

    const eras: Record<string, any> = {};

    // Index header rows by era name so we can attach stats later
    const headerRowByEra: Record<string, string> = {};
    for (const row of rows) {
      const eraField = row['Era'] ?? '';
      if (!eraField.includes('\n')) continue;
      const { name: eraName } = parseSongName(row['Name'] ?? '');
      if (eraName && !isJunkEra(eraName)) {
        headerRowByEra[eraName] = eraField;
        // Also capture timeline from this row
        if (!eras[eraName]) {
          eras[eraName] = {
            name: eraName,
            extra: undefined,
            description: (row['Leak Date'] ?? '').trim() || undefined,
            timeline: (row['Notes'] ?? '').trim() || undefined,
            fileInfo: eraField.split('\n').map((l: string) => l.trim()).filter(Boolean),
            data: { 'Unreleased Tracks': [] },
          };
          const { extra } = parseSongName(row['Name'] ?? '');
          eras[eraName].extra = extra ?? undefined;
        }
      }
    }

    // Process all song rows
    for (const row of rows) {
      const eraField = (row['Era'] ?? '').trim();
      const nameField = row['Name'] ?? '';

      // Skip header rows and junk
      if (eraField.includes('\n')) continue;
      if (isJunkEra(eraField)) continue;

      if (!eras[eraField]) {
        eras[eraField] = { name: eraField, data: { 'Unreleased Tracks': [] } };
      }

      const { name, extra } = parseSongName(nameField);
      if (!name) continue;

      const links = (row['Link(s)'] ?? '').split('\n').map((l: string) => l.trim()).filter(Boolean);

      eras[eraField].data['Unreleased Tracks'].push({
        name,
        extra: extra ?? undefined,
        description: row['Notes'] ?? '',
        track_length: row['Track Length'] ?? '',
        file_date: row['File Date'] ?? '',
        leak_date: row['Leak Date'] ?? '',
        available_length: row['Available Length'] ?? '',
        quality: row['Quality'] ?? '',
        url: links[0] ?? '',
        urls: links,
      });
    }

    const trackerData = {
      name: 'DRIZZYGOLD',
      tabs: ['eras'],
      current_tab: 'eras',
      eras,
    };

    return csvResponse(trackerData);
  } catch (err) {
    return new Response('Failed to build tracker data', { status: 500 });
  }
};
