import { parseCSV, csvResponse } from './_csvParser';

function parseSongName(raw: string): { name: string; extra: string | undefined } {
  const newline = raw.indexOf('\n');
  if (newline === -1) return { name: raw.trim(), extra: undefined };
  const name = raw.substring(0, newline).trim();
  const extra = raw.substring(newline).trim().replace(/^\n+/, '') || undefined;
  return { name, extra };
}

// Normalize alternate spellings in the Kendrick CSV to canonical era names.
const ERA_NAME_MAP: Record<string, string> = {
  'good kid, m.A.A.d city': 'good kid, m.A.A.d city',
  'Good Kid, M.A.A.D City': 'good kid, m.A.A.d city',
  'GKMC': 'good kid, m.A.A.d city',
  'To Pimp A Butterfly': 'To Pimp A Butterfly',
  'TPAB': 'To Pimp A Butterfly',
  'untitled unmastered.': 'untitled unmastered.',
  'Untitled Unmastered': 'untitled unmastered.',
  'Mr. Morale & The Big Steppers': 'Mr. Morale & The Big Steppers',
  'Mr Morale': 'Mr. Morale & The Big Steppers',
};

function mapEraName(name: string): string {
  return ERA_NAME_MAP[name] ?? name;
}

export const onRequestGet: PagesFunction = async (context) => {
  try {
    const url = new URL(context.request.url);
    const csvUrl = `${url.origin}/data/unreleased.csv`;

    const res = await fetch(csvUrl);
    if (!res.ok) return new Response('CSV not found', { status: 404 });

    const text = await res.text();
    const rows = parseCSV(text);

    // Kendrick's CSV uses "Name\n(Check out the Tracker website!)" as the Name column header.
    // Find the actual key dynamically so it works regardless of exact header text.
    const NAME_KEY = rows.length > 0
      ? Object.keys(rows[0]).find(k => k.startsWith('Name')) ?? 'Name'
      : 'Name';

    const NOTES_KEY = rows.length > 0
      ? Object.keys(rows[0]).find(k => k.startsWith('Notes')) ?? 'Notes'
      : 'Notes';

    const eras: Record<string, any> = {};

    // First pass: collect real era names from header rows (mapped to final names).
    // Header rows have newlines in the Era field (file counts). Stats rows also have newlines
    // but their Name field starts with a digit — skip those.
    const validEraNames = new Set<string>(); // raw CSV names
    for (const row of rows) {
      const eraField = row['Era'] ?? '';
      if (!eraField.includes('\n')) continue;
      const { name: eraName } = parseSongName(row[NAME_KEY] ?? '');
      if (eraName && !/^\d+\s/.test(eraName)) validEraNames.add(eraName);
    }

    // Second pass: build eras and songs, ignoring anything outside known eras.
    for (const row of rows) {
      const eraField = row['Era'] ?? '';
      const nameField = row[NAME_KEY] ?? '';

      if (eraField.includes('\n')) {
        // Era header row
        const { name: rawName, extra } = parseSongName(nameField);
        if (!rawName || !validEraNames.has(rawName)) continue;
        const eraName = mapEraName(rawName);

        eras[eraName] = {
          name: eraName,
          extra: extra ?? undefined,
          timeline: row[NOTES_KEY]?.trim() || undefined,
          fileInfo: eraField.split('\n').map((l: string) => l.trim()).filter(Boolean),
          data: { 'Unreleased Tracks': [] },
        };
      } else if (eraField && validEraNames.has(eraField.trim())) {
        // Regular song row — only if it belongs to a known era
        const eraName = mapEraName(eraField.trim());
        if (!eras[eraName]) {
          eras[eraName] = { name: eraName, data: { 'Unreleased Tracks': [] } };
        }

        const { name, extra } = parseSongName(nameField);
        const links = (row['Link(s)'] ?? '').split('\n').map((l: string) => l.trim()).filter(Boolean);

        eras[eraName].data['Unreleased Tracks'].push({
          name,
          extra: extra ?? undefined,
          description: row[NOTES_KEY] ?? '',
          track_length: row['Track Length'] ?? '',
          file_date: row['File Date'] ?? '',
          leak_date: row['Leak Date'] ?? '',
          available_length: row['Available Length'] ?? '',
          quality: row['Quality'] ?? '',
          url: links[0] ?? '',
          urls: links,
        });
      }
    }

    const ERA_ORDER = [
      'Training Day',
      "No Sleep 'Til NYC",
      'C4',
      'The Kendrick Lamar EP',
      'Overly Dedicated',
      'Collaboration with J. Cole',
      'Section.80',
      'good kid, m.A.A.d city',
      'Tu Pimp A Caterpillar [V1]',
      'To Pimp A Butterfly [V2]',
      'untitled unmastered.',
      'DAMN.',
      'Black Panther: The Album',
      'Look Woman',
      'Everybody Sensitive [V1]',
      'Mr. Morale [V2]',
      'Mr. Morale [V3]',
      'GNX',
      'Rap Album',
      'Compton Cowboys',
    ];

    const orderedEras: Record<string, any> = {};
    for (const name of ERA_ORDER) {
      if (eras[name]) orderedEras[name] = eras[name];
    }
    // Append any eras from the CSV not in the order list
    for (const name of Object.keys(eras)) {
      if (!orderedEras[name]) orderedEras[name] = eras[name];
    }

    const trackerData = {
      name: 'KDOT Gold',
      tabs: ['eras'],
      current_tab: 'eras',
      eras: orderedEras,
    };

    return csvResponse(trackerData);
  } catch (err) {
    return new Response('Failed to build tracker data', { status: 500 });
  }
};
