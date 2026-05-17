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

export const CUSTOM_IMAGES: Record<string, string> = {
  "Before So Far Gone":                   "https://i.ibb.co/FbMLhG39/drake-throughout-the-years-2007-2024-v0-u4scurc0gu1d1.webp",
  "So Far Gone":                          "https://i.ibb.co/23MLhymR/Drake-So-Far-Gone-cover.png",
  "We Are Young Money":                   "https://i.ibb.co/Q7q6L50Z/Young-Money-We-Are-Young-Money.png",
  "Thank Me Later":                       "https://i.ibb.co/7xCrrG7L/Drake-Thank-Me-Later-cover.jpg",
  "It's Never Enough":                    "https://i.ibb.co/twCFkB4R/cd-ITSNEVERENOUGHfront.webp",
  "Take Care":                            "https://i.ibb.co/LdvpSkm6/Drake-Take-Care-cover.jpg",
  "Posthumous Aaliyah Project":           "https://i.ibb.co/BHC6S0z5/Enough-Said-cover-art.jpg",
  "Nothing Was The Same":                 "https://i.ibb.co/DDngN5ZN/NWTS.jpg",
  "If You're Reading This It's Too Late": "https://i.ibb.co/XZM3C3D5/if-youre-reading-this-its-too-late.jpg",
  "What A Time To Be Alive":              "https://i.ibb.co/sXd5zd7/WATTBA.jpg",
  "Wolves":                               "https://i.ibb.co/219R9QGq/wolves.jpg",
  "Views":                                "https://i.ibb.co/7tWvzVHN/Drake-Views-cover.jpg",
  "More Life":                            "https://i.ibb.co/jZZ8hPrL/Drake-More-Life-cover.jpg",
  "Scorpion [V1]":                        "https://i.ibb.co/Knx1J4c/scoripion-V1.jpg",
  "Scorpion [V2]":                        "https://i.ibb.co/pjRFZjHR/Scorpion-by-Drake.jpg",
  "What A Time To Be Alive 2":            "https://i.ibb.co/W4wLnHH9/WATTBA2.webp",
  "Certified Lover Boy [V1]":             "https://i.ibb.co/mmLBvYk/CLBV1.webp",
  "Certified Lover Boy [V2]":             "https://i.ibb.co/jqyfXDF/Drake-Certified-Lover-Boy.png",
  "Honestly, Nevermind":                  "https://i.ibb.co/PBPhRy5/Honestly-Nevermind-Drake.png",
  "Her Loss":                             "https://i.ibb.co/nq3Mt2TS/Drake-and-21-Savage-Her-Loss.png",
  "For All The Dogs":                     "https://i.ibb.co/991mxf4v/Drake-For-All-The-Dogs.png",
  "100 GIGS":                             "https://i.ibb.co/4Zsk4MmL/Drake-100-Gigs.png",
  "$ome $exy $ongs 4 U":                  "https://i.ibb.co/G33GRf3v/SSSFU.jpg",
  "ICEMAN [V1]":                          "https://i.ibb.co/6R3dhyc4/Iceman-V1.webp",
  "ICEMAN [V2]":                          "https://i.ibb.co/Fb33KRt5/Iceman-V2.jpg",
  "ICEMAN":                               "https://i.ibb.co/Fb33KRt5/Iceman-V2.jpg",
  "Scorpion":                             "https://i.ibb.co/pjRFZjHR/Scorpion-by-Drake.jpg",
};

// ORDER MATTERS — determines era sort order on the grid
export const ALBUM_RELEASE_DATES: Record<string, string> = {
  "Before So Far Gone":                   "??/??/????",
  "So Far Gone":                          "02/13/2009",
  "We Are Young Money":                   "12/21/2009",
  "Thank Me Later":                       "06/15/2010",
  "It's Never Enough":                    "??/??/????",
  "Take Care":                            "11/15/2011",
  "Posthumous Aaliyah Project":           "??/??/????",
  "Nothing Was The Same":                 "09/24/2013",
  "If You're Reading This It's Too Late": "02/13/2015",
  "What A Time To Be Alive":              "09/20/2015",
  "Wolves":                               "??/??/????",
  "Views":                                "04/29/2016",
  "More Life":                            "03/18/2017",
  "Scorpion [V1]":                        "??/??/????",
  "Scorpion [V2]":                        "06/29/2018",
  "What A Time To Be Alive 2":            "??/??/????",
  "Certified Lover Boy [V1]":             "??/??/????",
  "Certified Lover Boy [V2]":             "09/03/2021",
  "Honestly, Nevermind":                  "06/17/2022",
  "Her Loss":                             "11/04/2022",
  "For All The Dogs":                     "10/06/2023",
  "Scary Hours 3":                        "11/17/2023",
  "100 GIGS":                             "??/??/????",
  "$ome $exy $ongs 4 U":                  "02/14/2025",
  "ICEMAN [V1]":                          "??/??/????",
  "ICEMAN [V2]":                          "??/??/????",
  "Unknown":                              "??/??/????",
};

export const HIDDEN_ALBUMS: string[] = ["Unknown"];

export const ALBUM_DESCRIPTIONS: Record<string, string> = {};

export const CUSTOM_ALBUM_INFO: Record<string, string[]> = {};

export const ERA_MAPPINGS: Record<string, string> = {
  "Ongoing": "ICEMAN",
  "FATD": "For All The Dogs",
};

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
