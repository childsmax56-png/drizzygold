// ============================================================
//  ARTIST CONFIG — Drake / DRIZZYGOLD
// ============================================================

export const SITE_NAME = "DRIZZYGOLD";
export const SITE_DESCRIPTION = "The Best Drake Tracker In The World!";
export const SITE_URL = "https://drizzygold.pages.dev/";
export const OG_IMAGE_URL = "";

export function getArtistName(eraName?: string): string {
  return "Drake";
}

export const CUSTOM_IMAGES: Record<string, string> = {};

// Drake discography in chronological order
// ORDER MATTERS — determines era sort order on the grid
export const ALBUM_RELEASE_DATES: Record<string, string> = {
  "Before So Far Gone": "??/??/????",
  "So Far Gone": "02/13/2009",
  "We Are Young Money": "12/21/2009",
  "Thank Me Later": "06/15/2010",
  "Take Care": "11/15/2011",
  "It's Never Enough": "??/??/????",
  "Nothing Was The Same": "09/24/2013",
  "If You're Reading This It's Too Late": "02/13/2015",
  "What A Time To Be Alive": "09/20/2015",
  "What A Time To Be Alive 2": "??/??/????",
  "Views": "04/29/2016",
  "More Life": "03/18/2017",
  "Scorpion [V1]": "??/??/????",
  "Scorpion [V2]": "06/29/2018",
  "Certified Lover Boy [V1]": "??/??/????",
  "Certified Lover Boy [V2]": "09/03/2021",
  "Honestly, Nevermind": "06/17/2022",
  "Her Loss": "11/04/2022",
  "For All The Dogs": "10/06/2023",
  "Scary Hours 3": "11/17/2023",
  "100 GIGS": "??/??/????",
  "$ome $exy $ongs 4 U": "02/14/2025",
  "ICEMAN [V1]": "??/??/????",
  "ICEMAN [V2]": "??/??/????",
  "Wolves": "??/??/????",
  "Posthumous Aaliyah Project": "??/??/????",
  "Unknown": "??/??/????",
};

export const HIDDEN_ALBUMS: string[] = [];

export const ALBUM_DESCRIPTIONS: Record<string, string> = {};

export const CUSTOM_ALBUM_INFO: Record<string, string[]> = {};

export const ERA_MAPPINGS: Record<string, string> = {};

export const TAG_MAP: Record<string, string> = {
  "⭐": "Best Of",
  "🏆": "Grails",
  "🥇": "Wanted",
  "🏅": "Wanted",
  "✨": "Special",
  "💛": "By DRIZZYGOLD",
  "🗑️": "Worst Of",
  "🗑": "Worst Of",
  "🚮": "Unwanted",
  "🤖": "AI",
  "⁉️": "Lost Media",
  "⁉": "Lost Media",
  "❓": "Unknown",
};

export const CHATBOT_NAME = "DrizzBot";
export const CHATBOT_SUBTITLE = "Ask anything about Drake's music";
export const CHATBOT_AVATAR_URL = "";

export const TAG_TOOLTIP_MAP: Record<string, string> = {
  "Best Of":   "Some of the best leaks hosted on the tracker.",
  "Grails":    "The most wanted songs that have not yet leaked in full.",
  "Wanted":    "Songs that are wanted, but not as wanted as Grails.",
  "Special":   "Special songs worth highlighting but not Best Of level.",
  "Worst Of":  "Some of the worst leaks on the tracker.",
  "Unwanted":  "Songs we don't want to see leak in full.",
  "AI":        "Track contains AI vocals.",
  "Lost Media":"Currently lost, or no link to the media is known.",
  "By DRIZZYGOLD": "Leaks & songs added by the owner of the site.",
};
