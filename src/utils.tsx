import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { saveAs } from 'file-saver';
import { useSettings } from './SettingsContext';
import { getArtistName, CUSTOM_IMAGES, ALBUM_RELEASE_DATES, HIDDEN_ALBUMS, TAG_MAP, TAG_TOOLTIP_MAP } from './artist.config';
export { getArtistName, CUSTOM_IMAGES, ALBUM_RELEASE_DATES, HIDDEN_ALBUMS, TAG_MAP, TAG_TOOLTIP_MAP };

export const ALBUM_DESCRIPTIONS: Record<string, string> = {
  "Before So Far Gone": "In 2006 Drake released his debut mixtape \"Room for Improvement\" and performed his first concert as an opening act for Ice Cube. In 2009, Drake released his third mixtape, \"So Far Gone\", which gained mainstream success with singles like \"Best I Ever Had\" and \"Successful\". This led to a recording contract with Young Money Entertainment. Despite facing setbacks, Drake continued to pursue his passion for music and acting.",
  "Posthumous Aaliyah Project": "There was a Drake and Aaliyah collaboration project that was started in 2012, but was cancelled in 2014 by Drake & 40 due to backlash from Timbaland, Missy Elliot and Aaliyah's family not supporting the release of the posthumous album. The only songs known to be worked on for the project so far are \"Don't Let Me Fool Ya\" & \"Enough Said\".",
  "Wolves": "Wolves was meant to be a collabaration album between Kanye West & Drake. The project was first mentioned by Ye in an interview in 2015, and billboards would be spotted with the phrase \"Calabasas Is The New Abu Dhabi\" with the OVO and G.O.O.D. Music logos in mid-2016 which hinted the album was coming soon. Drake later even stated the album was finished and up to Kanye to release, but despite this multiple insiders have stated that Wolves was mainly just a session and nothing much came out of it. The cover used for this era is a recreation of the image used on the billboards.",
  "What A Time To Be Alive 2": "What A Time To Be Alive 2 was the sequel to Drake & Future's collaborative project. On April 5th 2019, Drake & Future released a video with Drake putting up two fingers while him and Future talk about working on something top secret (allegedly an album). This album was seemingly scrapped in 2020.",
  "Honestly, Nevermind": "Honestly, Nevermind is Drake's seventh studio album, surprise-released on June 17, 2022, just hours after being announced on Instagram. Rumors of the album began in March when Drake posted a studio photo. On release day, he also launched his SiriusXM radio show, TABLE FOR ONE, where he revealed the album took six to seven months to make. Influenced by dance, house, and R&B, the album is dedicated to late designer and DJ Virgil Abloh. Despite mixed reviews, Drake remained unfazed, telling fans they'll \"catch up\" eventually.",
  "Her Loss": "Her Loss is a collaborative album by Toronto rapper Drake and Atlanta rapper 21 Savage. The album was initially slated for release on October 28, 2022, but was pushed back one week to November 4, 2022, following Noah \"40\" Shebib's COVID-19 diagnosis. The album features a sole guest appearance from Travis Scott. It is the third part of what Drake described as \"a trilogy of albums\", following Certified Lover Boy (2021) and Honestly, Nevermind (2022).",
  "For All The Dogs": "For All The Dogs is Drake's eighth studio album. After many delays, Drake released For All The Dogs on October 6, 2023 after a 6 hour delay. Then one month and 10 days later, Drake announces \"Scary Hours 3\" which was releasing on November 17th, 2023. \"Scary Hours 3\" was released on November 17th, 2023 as a deluxe edition to For All The Dogs titled \"For All The Dogs Scary Hours Edition\".",
  "$ome $exy $ongs 4 U": "Some Sexy Songs 4 U (stylized as $ome $exy $ongs 4 U or abbreviated as $$$4U) is a collaborative album by Canadian musicians PARTYNEXTDOOR & Drake. The collaborative album was released on Valentine's Day, February 14, 2025. Drake announced the album and its release window when he appeared as a special guest at PARTYNEXTDOOR's performance in their hometown of Toronto, Canada, on August 2, 2024.",
  "ICEMAN [V1]": "Following the release of 100 GIGS, Drake began teasing his ninth studio album, hinting at the name ICEMAN through vague Instagram posts that included the X-Men character, F1 racer Kimi Raikkonen (AKA The Iceman) and a variety of ice sculptures. The ICEMAN title was confirmed in July 2025 as Drake officially started the rollout for the album with the single 'WHAT DID I MISS' and the beginning of an episodic series where Drake would drop singles, snippets and give clues and hints about the subject matter of the album. The cover for this era was used as a placeholder on DSPs for ICEMAN, similar to What Did I Miss?.",
  "ICEMAN [V2]": "On October 10th, 2025 (which was initially the release date for ICEMAN, although unannounced), Drake decided to rework the album, seemingly last minute. He continued teasing the album throughout early 2026 with cryptic posts and appearances, including iced-out courtside seats at Toronto Raptors games. On April 19th, 2026, an ice structure appeared in Toronto, with a bag containing a booklet with concept art from Ben Dorado for the album alongside the album's release date that was inside of the structure. A streamer named Kishka managed to access the bag by breaking off ice blocks and got asked to come outside of Drake's crib to officially release the booklet's contents and the album's release date on April 21st, 2026. Morgan Wallen, Future, Young Thug & Sexyy Red are allegedly on the album. The cover for this era is from icemancountdown.com page 63, which, although official, may not be the cover for the album as no cover has been confirmed as of yet.",
};


export const FILTER_TOOLTIPS: Record<string, string> = {
  'Snippet': 'Less than a minute of the song is available.',
  'Partial': 'More than a minute of the song is available.',
  'Beat Only': 'Only the instrumental of the song is available.',
  'Tagged': 'Full song is available, but with added tags not from the song itself.',
  'Stem Bounce': 'Full song that has been exported by anyone else who was not the intended person.',
  'Full': 'The entire song is available, but not the original file.',
  'OG File': 'The original entire file of a song is available.',
  'Confirmed': 'The song is unavailable, but has been confirmed to exist by people who have worked with Kendrick.',
  'Rumored': 'The song is unavailable, but has been said to exist by reputable people within the leak community. Please take with a grain of salt.',
  'Conflicting Sources': "There have been reputable people who say the song does exist and reputable people who say the song doesn't exist. As it is not our place to say who's right or wrong, songs with conflicting sources will be marked as such.",

  'Not Available': 'Placeholder for unavailable songs.',
  'Recording': 'A non-digital copy is available. Usually live performances or someone playing the song.',
  'Low Quality': 'Anything lower than 128kbps (YouTube quality). Noticeably worse than High Quality or CD Quality.',
  'High Quality': 'Anything greater than or equal to 128kbps (YouTube quality) and less than 320kbps.',
  'CD Quality': 'Anything around 320kbps. Not a noticeable difference to Lossless quality.',
  'Lossless': 'Raw audio data, usually from leaked stems or sessions. Useful for audio editing, but not noticeably different to CD Quality.'
};

export const createSlug = (name: string) => encodeURIComponent(
  name
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
);

export function getSongSlug(song: any, allSongsInCollection: any[]): string {
  if (!song || !song.name) return 'NoName1';
  
  if (song.name.includes('???') || createSlug(song.name) === '') {
    let index = 1;
    const targetUrl = song.url || (song.urls && song.urls.length > 0 ? song.urls[0] : '');
    for (const s of allSongsInCollection) {
      if ((s.name && s.name.includes('???')) || createSlug(s.name) === '') {
        const sUrl = s.url || (s.urls && s.urls.length > 0 ? s.urls[0] : '');
        if (s.name === song.name && sUrl === targetUrl && s.description === song.description) {
          return `NoName${index}`;
        }
        index++;
      }
    }
    return `NoName1`;
  }
  return createSlug(song.name) || 'NoName1';
}

export function buildArtistTag(songName: string, eraName: string | undefined): string {
  let primary: string;
  const dashIdx = songName.indexOf(' - ');
  if (dashIdx !== -1) {
    primary = songName.substring(0, dashIdx);
    Object.keys(TAG_MAP).forEach(emoji => { primary = primary.replaceAll(emoji, ''); });
    primary = primary.replace(/[️]/g, '').trim();
  } else {
    primary = getArtistName(eraName);
  }

  const featMatch = songName.match(/\(feat\.\s*([^)]+)\)/i);
  if (featMatch) {
    return `${primary} feat. ${featMatch[1].trim()}`;
  }
  return primary;
}

export function formatTextForNotification(text: string | undefined | null, tagsAsEmojis: boolean): string {
  if (!text) return '';
  let formattedText = text;
  const tags: string[] = [];

  Object.entries(TAG_MAP).forEach(([emoji, tag]) => {
    if (formattedText.includes(emoji)) {
      if (!tagsAsEmojis) {
        tags.push(`[${tag.toUpperCase()}]`);
      }
      formattedText = formattedText.split(emoji).join('').trim();
    }
  });

  formattedText = formattedText.replace(/[\uFE0F]/g, '').trim();

  if (tagsAsEmojis) {
    return text;
  }

  if (tags.length === 0) {
    return formattedText;
  }

  return `${formattedText} ${tags.join(' ')}`.trim();
}

export function formatTextWithTags(text: string | undefined | null) {
  if (!text) return null;

  let formattedText = text;
  const tags: { emoji: string, tag: string }[] = [];

  Object.entries(TAG_MAP).forEach(([emoji, tag]) => {
    if (formattedText.includes(emoji)) {
      tags.push({ emoji, tag });
      formattedText = formattedText.split(emoji).join('').trim();
    }
  });

  formattedText = formattedText.replace(/[\uFE0F]/g, '').trim();

  if (tags.length === 0) {
    return <>{formattedText}</>;
  }

  return <FormattedTextWithTags tags={tags} formattedText={formattedText} />;
}

function TagComponent({ t, tagsAsEmojis }: { t: { emoji: string, tag: string }, tagsAsEmojis: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const tooltipText = TAG_TOOLTIP_MAP[t.tag];

  const updateRect = () => {
    if (tagRef.current) {
      setRect(tagRef.current.getBoundingClientRect());
    }
  };

  useEffect(() => {
    if (isHovered) {
      updateRect();
      window.addEventListener('scroll', updateRect, true);
      window.addEventListener('resize', updateRect);
      return () => {
        window.removeEventListener('scroll', updateRect, true);
        window.removeEventListener('resize', updateRect);
      };
    }
  }, [isHovered]);

  useEffect(() => {
    if (isHovered) {
      const handleDocClick = (e: MouseEvent) => {
        if (tagRef.current && !tagRef.current.contains(e.target as Node)) {
          setIsHovered(false);
        }
      };
      const timer = setTimeout(() => {
        document.addEventListener('click', handleDocClick);
        document.addEventListener('touchstart', handleDocClick);
      }, 10);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleDocClick);
        document.removeEventListener('touchstart', handleDocClick);
      };
    }
  }, [isHovered]);

  return (
    <div 
      ref={tagRef}
      className="relative flex items-center shrink-0 cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        setIsHovered(!isHovered);
      }}
    >
      {tagsAsEmojis ? (
        <span className="shrink-0 flex items-center justify-center text-sm">{t.emoji}</span>
      ) : (
        <span className="shrink-0 flex items-center gap-1 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-white/10 bg-[var(--theme-color)]/10 text-[var(--theme-color)] font-bold">
          {t.tag}
        </span>
      )}

      {tooltipText && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isHovered && rect && (
            <motion.div
              initial={{ opacity: 0, x: "-50%", y: "calc(-100% + 5px)", filter: 'blur(4px)', scale: 0.95 }}
              animate={{ opacity: 1, x: "-50%", y: "-100%", filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, x: "-50%", y: "calc(-100% + 5px)", filter: 'blur(4px)', scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                position: 'fixed',
                left: rect.left + rect.width / 2,
                top: rect.top - 8,
                zIndex: 99999,
                transformOrigin: 'bottom center'
              }}
              className="w-48 sm:w-64 p-3 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl pointer-events-none"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-base flex items-center justify-center text-[var(--theme-color)]">{t.emoji}</span>
                  <span className="font-bold text-white text-xs">{t.tag}</span>
                </div>
                <p className="text-white/70 text-[11px] leading-snug whitespace-normal line-clamp-3">
                  {tooltipText}
                </p>
              </div>
              <div className="absolute top-full left-1/2 -ml-1.5 -mt-[1px] border-solid border-t-neutral-900 border-x-transparent border-b-transparent border-[6px]" />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

function FormattedTextWithTags({ tags, formattedText }: { tags: { emoji: string, tag: string }[], formattedText: string }) {
  const { settings } = useSettings();
  
  return (
    <div className="flex items-center gap-1.5 truncate">
      <span className="truncate">{formattedText}</span>
      {tags.map((t, i) => (
        <TagComponent key={i} t={t} tagsAsEmojis={settings.tagsAsEmojis} />
      ))}
    </div>
  );
}

export function getCleanSongNameWithTags(text: string | undefined | null): string {
  if (!text) return '';
  let formattedText = text;
  const tags: string[] = [];

  Object.entries(TAG_MAP).forEach(([emoji, tag]) => {
    if (formattedText.includes(emoji)) {
      tags.push(tag);
      formattedText = formattedText.split(emoji).join('').trim();
    }
  });

  formattedText = formattedText.replace(/[\uFE0F]/g, '').trim();

  if (tags.length > 0) {
    return `${formattedText} [${tags.join(', ')}]`;
  }
  return formattedText;
}

export interface SongMeta {
  title?: string;
  artist?: string;
  album?: string;
  year?: string;
  artworkUrl?: string;
}

export async function detectAudioExt(blob: Blob): Promise<'.mp3' | '.wav' | '.flac' | '.aiff' | '.zip'> {
  const header = await blob.slice(0, 4).arrayBuffer();
  const bytes = new Uint8Array(header);
  // RIFF....WAVE
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) return '.wav';
  // fLaC
  if (bytes[0] === 0x66 && bytes[1] === 0x4C && bytes[2] === 0x61 && bytes[3] === 0x43) return '.flac';
  // FORM....AIFF or AIFC
  if (bytes[0] === 0x46 && bytes[1] === 0x4F && bytes[2] === 0x52 && bytes[3] === 0x4D) return '.aiff';
  // PK (ZIP)
  if (bytes[0] === 0x50 && bytes[1] === 0x4B) return '.zip';
  return '.mp3';
}

function isImageBuffer(buf: ArrayBuffer): boolean {
  const b = new Uint8Array(buf, 0, 12);
  // JPEG: FF D8
  if (b[0] === 0xFF && b[1] === 0xD8) return true;
  // PNG: 89 50 4E 47
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47) return true;
  // GIF: 47 49 46
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return true;
  // WebP: 52 49 46 46 .... 57 45 42 50
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return true;
  return false;
}

async function fetchArtworkBuffer(artworkUrl: string): Promise<ArrayBuffer | null> {
  const proxies = [
    artworkUrl,
    `https://corsproxy.io/?${encodeURIComponent(artworkUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(artworkUrl)}`,
  ];
  for (const url of proxies) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const buf = await res.arrayBuffer();
        if (isImageBuffer(buf)) return buf;
      }
    } catch {
      // try next proxy
    }
  }
  return null;
}

// Minimal ID3v2.3 writer using Latin-1 encoding so Windows Explorer can edit the Details tab.
// browser-id3-writer writes UTF-16 text frames (encoding 0x01) which Windows can read but not edit.
function latin1Bytes(text: string): Uint8Array {
  return new Uint8Array(Array.from(text).map(c => { const n = c.charCodeAt(0); return n <= 0xFF ? n : 63; }));
}

function id3TextFrame(id: string, text: string): Uint8Array {
  const textBytes = latin1Bytes(text);
  const content = new Uint8Array(1 + textBytes.length); // encoding byte + text
  content[0] = 0x00; // Latin-1
  content.set(textBytes, 1);
  return id3Frame(id, content);
}

function id3ApicFrame(imageData: ArrayBuffer, mimeType: string): Uint8Array {
  const mimeBytes = latin1Bytes(mimeType);
  // encoding(1) + mime + null(1) + picType(1) + description null(1) + imageData
  const content = new Uint8Array(1 + mimeBytes.length + 1 + 1 + 1 + imageData.byteLength);
  let i = 0;
  content[i++] = 0x00; // Latin-1
  content.set(mimeBytes, i); i += mimeBytes.length;
  content[i++] = 0x00; // null terminator for MIME
  content[i++] = 0x03; // picture type: Cover front
  content[i++] = 0x00; // empty description (null terminator)
  content.set(new Uint8Array(imageData), i);
  return id3Frame('APIC', content);
}

function id3Frame(id: string, content: Uint8Array): Uint8Array {
  const frame = new Uint8Array(10 + content.length);
  const view = new DataView(frame.buffer);
  for (let i = 0; i < 4; i++) frame[i] = id.charCodeAt(i);
  view.setUint32(4, content.length, false);
  // bytes 8-9 are flags, left as 0x00 0x00
  frame.set(content, 10);
  return frame;
}

function stripID3v2(buffer: ArrayBuffer): ArrayBuffer {
  const b = new Uint8Array(buffer);
  if (b[0] === 0x49 && b[1] === 0x44 && b[2] === 0x33 && b[3] >= 2 && b[3] <= 4) {
    const size = ((b[6] & 0x7F) << 21) | ((b[7] & 0x7F) << 14) | ((b[8] & 0x7F) << 7) | (b[9] & 0x7F);
    return buffer.slice(10 + size);
  }
  return buffer;
}

function detectMime(buf: ArrayBuffer): string {
  const b = new Uint8Array(buf, 0, 4);
  if (b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF) return 'image/jpeg';
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47) return 'image/png';
  return 'image/jpeg';
}

export async function embedID3Tags(blob: Blob, meta: SongMeta, cleanTitle: string): Promise<Blob> {
  const audioBuffer = await blob.arrayBuffer();
  const audio = stripID3v2(audioBuffer);

  const frames: Uint8Array[] = [];
  const title = meta.title || cleanTitle;
  if (title) frames.push(id3TextFrame('TIT2', title));
  if (meta.artist) frames.push(id3TextFrame('TPE1', meta.artist));
  if (meta.album) frames.push(id3TextFrame('TALB', meta.album));
  if (meta.year) {
    const y = parseInt(meta.year, 10);
    if (!isNaN(y)) frames.push(id3TextFrame('TYER', String(y)));
  }

  if (meta.artworkUrl) {
    const artBuffer = await fetchArtworkBuffer(meta.artworkUrl);
    if (artBuffer) {
      frames.push(id3ApicFrame(artBuffer, detectMime(artBuffer)));
    }
  }

  const framesSize = frames.reduce((s, f) => s + f.length, 0);
  const tag = new Uint8Array(10 + framesSize);
  const view = new DataView(tag.buffer);
  tag[0] = 0x49; tag[1] = 0x44; tag[2] = 0x33; // "ID3"
  tag[3] = 0x03; tag[4] = 0x00; // version 2.3.0
  tag[5] = 0x00; // no flags
  // synchsafe tag body size
  view.setUint8(6, (framesSize >> 21) & 0x7F);
  view.setUint8(7, (framesSize >> 14) & 0x7F);
  view.setUint8(8, (framesSize >> 7) & 0x7F);
  view.setUint8(9, framesSize & 0x7F);
  let offset = 10;
  for (const f of frames) { tag.set(f, offset); offset += f.length; }

  const out = new Uint8Array(tag.length + audio.byteLength);
  out.set(tag, 0);
  out.set(new Uint8Array(audio), tag.length);
  return new Blob([out], { type: 'audio/mpeg' });
}

function openFallback(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function isInAppBrowser(): boolean {
  const ua = navigator.userAgent;
  // Google app (GSA), Facebook, Instagram, and similar WebViews don't support saveAs
  return /GSA\/|FBAN|FBAV|Instagram\//.test(ua);
}

function parseOgFilename(description: string | undefined): string | null {
  if (!description) return null;
  const match = description.match(/^OG Filename:\s*(.+)$/im);
  if (!match) return null;
  const raw = match[1].trim().replace(/^["']|["']$/g, '');
  // Strip known audio extensions so extension logic below can normalize them
  return raw.replace(/\.(mp3|wav|flac|aif|aiff|m4a|ogg)$/i, '');
}

export async function resolveUrl(url: string): Promise<{ fetchUrl: string; isImage: boolean; imageExt?: string }> {
  if (url.includes('temp.imgur.gg/f/')) {
    const id = url.split('/f/')[1];
    if (id) {
      const res = await fetch(`https://temp.imgur.gg/api/file/${id}`).catch(() => null);
      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.cdnUrl) return { fetchUrl: data.cdnUrl, isImage: false };
      }
    }
    return { fetchUrl: url, isImage: false };
  }
  if (url.includes('pillows.su/f/')) {
    const hash = url.split('/f/')[1]?.split('/')[0]?.split('?')[0];
    return { fetchUrl: hash ? `https://api.pillows.su/api/get/${hash}` : url, isImage: false };
  }
  if (url.includes('ibb.co')) {
    const apiRes = await fetch(`https://imgbb-file-get-api.vercel.app/api?url=${url}`).catch(() => null);
    if (apiRes && apiRes.ok) {
      const apiData = await apiRes.json().catch(() => null);
      if (apiData?.direct_link) return { fetchUrl: apiData.direct_link, isImage: true };
    }
    return { fetchUrl: url, isImage: true };
  }
  if (url.match(/\.(png|jpg|jpeg)$/i) || url.startsWith('https://i.scdn.co/')) {
    const match = url.match(/\.(png|jpg|jpeg)$/i);
    return { fetchUrl: url, isImage: true, imageExt: match ? match[0] : '.png' };
  }
  return { fetchUrl: url, isImage: false };
}

async function compressImageBlob(blob: Blob, maxDim = 2048, quality = 0.85): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    const objUrl = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(objUrl);
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) { height = Math.round(height * maxDim / width); width = maxDim; }
        else { width = Math.round(width * maxDim / height); height = maxDim; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
      canvas.toBlob(out => resolve(out ?? blob), 'image/jpeg', quality);
    };
    img.onerror = () => { URL.revokeObjectURL(objUrl); resolve(blob); };
    img.src = objUrl;
  });
}

export async function handleDownloadFile(url: string, suggestedName: string, tagsAsEmojis: boolean, meta?: SongMeta, description?: string) {
  if (!url) return;
  try {
    let finalUrl = url;
    const ogName = parseOgFilename(description);
    let fileName = ogName ?? suggestedName;
    if (!tagsAsEmojis && !ogName) {
      fileName = formatTextForNotification(suggestedName, false);
    }

    let isImage = false;
    let ext = '.mp3';

    if (url.includes('temp.imgur.gg/f/')) {
        const id = url.split('/f/')[1];
        if (id) {
            const res = await fetch(`https://temp.imgur.gg/api/file/${id}`).catch(() => null);
            if (res && res.ok) {
                const data = await res.json().catch(() => null);
                if (data?.cdnUrl) finalUrl = data.cdnUrl;
            }
        }
    } else if (url.includes('pillows.su/f/')) {
        const hash = url.split('/f/')[1]?.split('/')[0]?.split('?')[0];
        if (hash) {
            finalUrl = `https://api.pillows.su/api/get/${hash}`;
        }
    } else if (url.includes('ibb.co')) {
       isImage = true;
       ext = '';
       const apiRes = await fetch(`https://imgbb-file-get-api.vercel.app/api?url=${url}`).catch(() => null);
       if (apiRes && apiRes.ok) {
           const apiData = await apiRes.json().catch(() => null);
           if (apiData && apiData.direct_link) {
               finalUrl = apiData.direct_link;
           }
       }
    } else if (url.match(/\.(png|jpg|jpeg)$/i) || url.startsWith('https://i.scdn.co/')) {
        isImage = true;
        const match = url.match(/\.(png|jpg|jpeg)$/i);
        ext = match ? match[0] : '.png';
    } 

    if (!fileName.endsWith('.mp3') && !isImage) {
        fileName += ext;
    } else if (isImage && !fileName.match(/\.(png|jpg|jpeg)$/i)) {
        fileName += ext;
    }

    // In-app browsers (Google app, Facebook, Instagram) don't support saveAs via
    // the download attribute. Navigate directly to the download URL so the OS
    // download manager or system browser can handle it. Use the /api/download/
    // path (which includes the filename) so the server sends Content-Disposition:
    // attachment, triggering a real download instead of inline playback.
    if (isInAppBrowser()) {
      let directUrl = finalUrl;
      if (url.includes('pillows.su/f/')) {
        const pathPart = url.split('/f/')[1];
        if (pathPart) directUrl = `https://api.pillows.su/api/download/${pathPart}`;
      }
      window.location.href = directUrl;
      return;
    }

    let blob: Blob;
    try {
      const getWithTimeout = async (requestUrl: string, timeoutMs: number) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        try {
          const res = await fetch(requestUrl, { signal: controller.signal });
          clearTimeout(timeoutId);
          return res;
        } catch (err) {
          clearTimeout(timeoutId);
          return null;
        }
      };

      let response = await getWithTimeout(finalUrl, 3000);

      if (!response || !response.ok) {
        if (isImage) {
          const proxies = [
            `https://corsproxy.io/?${encodeURIComponent(finalUrl)}`,
            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(finalUrl)}`,
            `https://api.allorigins.win/raw?url=${encodeURIComponent(finalUrl)}`
          ];

          for (const proxy of proxies) {
            response = await getWithTimeout(proxy, 4000);
            if (response && response.ok) break;
          }

          if (!response || !response.ok) {
             throw new Error("All proxies failed");
          }
        } else {
          throw new Error("Network error");
        }
      }

      // For pillows.su, detect image vs audio from Content-Type since the URL alone doesn't distinguish them
      if (url.includes('pillows.su/f/') && response) {
        const ct = response.headers.get('content-type') ?? '';
        if (ct.startsWith('image/')) {
          isImage = true;
          // Strip any .mp3 suffix that was pre-assigned, then use image extension
          fileName = fileName.replace(/\.mp3$/i, '');
        }
      }

      blob = await response.blob();
      if (isImage) {
        blob = await compressImageBlob(blob);
        fileName = fileName.replace(/\.(png|jpeg|jpg)$/i, '') + '.jpg';
      } else {
        const actualExt = await detectAudioExt(blob);
        if (actualExt !== '.mp3' && fileName.endsWith('.mp3')) {
          fileName = fileName.slice(0, -4) + actualExt;
        }

        if (meta && actualExt === '.mp3') {
          const cleanTitle = meta.title || formatTextForNotification(suggestedName, false);
          try {
            blob = await embedID3Tags(blob, meta, cleanTitle);
          } catch (e) {
            console.warn('ID3 tagging failed, saving without tags:', e);
          }
        }
      }
    } catch (e) {
      console.error('Download failed:', e);
      openFallback(url);
      return;
    }

    saveAs(blob, fileName);
  } catch (e) {
    console.error('Download failed:', e);
    openFallback(url);
  }
}

export function isSongNotAvailable(song: any, rawUrl: string): boolean {
  if (song.quality?.toLowerCase() === 'not available') return true;
  if (!rawUrl) return false;
  const lowerUrl = rawUrl.toLowerCase().trim();
  return lowerUrl.includes('link needed') || lowerUrl.includes('link%20needed') || lowerUrl.includes('source needed') || lowerUrl.includes('source%20needed') || lowerUrl === 'n/a';
}

export function parseDurationToSeconds(duration: string | undefined): number {
  if (!duration) return 0;

  if (!duration.includes(':')) {
    const num = Number(duration);
    return isNaN(num) ? 0 : num;
  }

  const parts = duration.split(':').map(Number);
  if (parts.length === 2) {
    return (parts[0] || 0) * 60 + (parts[1] || 0);
  } else if (parts.length === 3) {
    return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
  }
  return 0;
}

export function matchesFilters(song: any, searchQuery: string, filters: any): boolean {
  const lowerQuery = searchQuery.toLowerCase();
  const searchMatch = !searchQuery ||
    song.name.toLowerCase().includes(lowerQuery) ||
    (song.extra && song.extra.toLowerCase().includes(lowerQuery)) ||
    (song.description && song.description.toLowerCase().includes(lowerQuery));

  if (!searchMatch) return false;

  if (filters.tags && filters.tags.length > 0) {
    const hasAllTags = filters.tags.every((tagEmoji: string) => {
      return (song.name && song.name.includes(tagEmoji)) ||
        (song.extra && song.extra.includes(tagEmoji)) ||
        (song.fakesType && song.fakesType.toLowerCase().includes(tagEmoji.toLowerCase()));
    });

    if (!hasAllTags) {
      return false;
    }
  }

  if (filters.excludedTags && filters.excludedTags.length > 0) {
    const hasExcludedTag = filters.excludedTags.some((tagEmoji: string) => {
      return (song.name && song.name.includes(tagEmoji)) ||
        (song.extra && song.extra.includes(tagEmoji)) ||
        (song.fakesType && song.fakesType.toLowerCase().includes(tagEmoji.toLowerCase()));
    });
    if (hasExcludedTag) {
      return false;
    }
  }

  if (filters.qualities && filters.qualities.length > 0) {
    const hasAnyQuality = filters.qualities.some((quality: string) => {
      return (song.quality && song.quality.toLowerCase().includes(quality.toLowerCase())) ||
             (song.fakesLength && song.fakesLength.toLowerCase().includes(quality.toLowerCase()));
    });
    if (!hasAnyQuality) {
      return false;
    }
  }

  if (filters.excludedQualities && filters.excludedQualities.length > 0) {
    const hasExcludedQuality = filters.excludedQualities.some((quality: string) => {
      return (song.quality && song.quality.toLowerCase().includes(quality.toLowerCase())) ||
             (song.fakesLength && song.fakesLength.toLowerCase().includes(quality.toLowerCase()));
    });
    if (hasExcludedQuality) {
      return false;
    }
  }

  if (filters.availableLengths && filters.availableLengths.length > 0) {
    const hasAnyLength = filters.availableLengths.some((len: string) => {
      return song.available_length && song.available_length.toLowerCase().includes(len.toLowerCase());
    });
    if (!hasAnyLength) {
      return false;
    }
  }

  if (filters.excludedAvailableLengths && filters.excludedAvailableLengths.length > 0) {
    const hasExcludedLength = filters.excludedAvailableLengths.some((len: string) => {
      return song.available_length && song.available_length.toLowerCase().includes(len.toLowerCase());
    });
    if (hasExcludedLength) {
      return false;
    }
  }

  if (filters.durationValue && filters.durationValue.trim() !== '') {
    const songSeconds = parseDurationToSeconds(song.track_length);
    if (!songSeconds) return false;

    let targetSeconds = 0;
    if (!filters.durationValue.includes(':')) {
      const raw = Number(filters.durationValue);
      targetSeconds = !isNaN(raw) ? raw * 60 : 0;
    } else {
      targetSeconds = parseDurationToSeconds(filters.durationValue);
    }

    if (filters.durationOp === '>') {
      if (songSeconds <= targetSeconds) return false;
    } else if (filters.durationOp === '<') {
      if (songSeconds >= targetSeconds) return false;
    } else if (filters.durationOp === '=') {
      if (songSeconds !== targetSeconds) return false;
    }
  }

  if (filters.playableOnly) {
    const rawUrl = song.url || (song.urls && song.urls.length > 0 ? song.urls[0] : '');
    const isNotAvailable = song.quality?.toLowerCase() === 'not available';
    if (!rawUrl || !rawUrl.includes('pillows.su/f/') || isNotAvailable) {
      return false;
    }
  }

  if (filters.albums && filters.albums.length > 0) {
    const hasAnyAlbum = filters.albums.some((album: string) => {
      const songAlbum = song.extra2 || song.realEra?.name || song.extra;
      return songAlbum && songAlbum.toLowerCase() === album.toLowerCase();
    });
    if (!hasAnyAlbum) {
      return false;
    }
  }


  return true;
}
