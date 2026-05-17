import { parseCSV } from './_csvParser';

interface TracklistAlbum {
  era: string;
  name: string;
  date: string;
  quality: string;
  source: string;
  links: string[];
  tracks: { num: string; name: string }[];
}

function parseTracks(description: string): { num: string; name: string }[] {
  const tracks: { num: string; name: string }[] = [];
  for (const line of description.split('\n')) {
    const m = line.trim().match(/^(\d+|#\?): (.+)/);
    if (m) tracks.push({ num: m[1], name: m[2].trim() });
  }
  return tracks;
}

function parseLinks(raw: string): string[] {
  return raw.split('\n').map(l => l.trim()).filter(Boolean);
}

export const onRequestGet: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const csvUrl = `${url.origin}/data/tracklists.csv`;

  const res = await fetch(csvUrl);
  if (!res.ok) return new Response('CSV not found', { status: 404 });

  const text = await res.text();
  const rows = parseCSV(text);

  const NAME_KEY = Object.keys(rows[0] ?? {}).find(k => k.startsWith('Name')) ?? 'Name';
  const DESC_KEY = Object.keys(rows[0] ?? {}).find(k => k.startsWith('Description')) ?? 'Description';

  const albums: TracklistAlbum[] = [];
  for (const row of rows) {
    const era = (row['Era'] ?? '').trim();
    const name = (row[NAME_KEY] ?? '').trim();
    if (!era || !name) continue;

    albums.push({
      era,
      name,
      date: (row['Date'] ?? '').trim(),
      quality: (row['Quality'] ?? '').trim(),
      source: (row['Source'] ?? '').trim(),
      links: parseLinks(row['Link(s)'] ?? ''),
      tracks: parseTracks(row[DESC_KEY] ?? ''),
    });
  }

  return new Response(JSON.stringify(albums), {
    headers: { 'Content-Type': 'application/json' },
  });
};
