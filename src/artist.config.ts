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
  "Scary Hours 3":                        "https://i.ibb.co/m5xCZN1W/attachment-drake-scary-hours-3-cover.jpg",
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

export const ALBUM_DESCRIPTIONS: Record<string, string> = {
  "Before So Far Gone": "In 2006 Drake released his debut mixtape \"Room for Improvement\" and performed his first concert as an opening act for Ice Cube. In 2009, Drake released his third mixtape, \"So Far Gone\", which gained mainstream success with singles like \"Best I Ever Had\" and \"Successful\". This led to a recording contract with Young Money Entertainment. Despite facing setbacks, Drake continued to pursue his passion for music and acting.",
  "Posthumous Aaliyah Project": "There was a Drake and Aaliyah collaboration project that was started in 2012, but was cancelled in 2014 by Drake & 40 due to backlash from Timbaland, Missy Elliot and Aaliyah's family not supporting the release of the posthumous album. The only songs known to be worked on for the project so far are \"Don't Let Me Fool Ya\" & \"Enough Said\".",
  "Wolves": "Wolves was meant to be a collabaration album between Kanye West & Drake. The project was first mentioned by Ye in an interview in 2015, and billboards would be spotted with the phrase \"Calabasas Is The New Abu Dhabi\" with the OVO and G.O.O.D. Music logos in mid-2016 which hinted the album was coming soon. Drake later even stated the album was finished and up to Kanye to release, but despite this multiple insiders have stated that Wolves was mainly just a session and nothing much came out of it. The cover used for this era is a recreation of the image used on the billboards.",
  "What A Time To Be Alive 2": "What A Time To Be Alive 2 was the sequel to Drake & Future's collaborative project. On April 5th 2019, Drake & Future released a video with Drake putting up two fingers while him and Future talk about working on something top secret (allegedly an album). This album was seemingly scrapped in 2020.",
  "Honestly, Nevermind": "Honestly, Nevermind is Drake's seventh studio album, surprise-released on June 17, 2022, just hours after being announced on Instagram. Rumors of the album began in March when Drake posted a studio photo. On release day, he also launched his SiriusXM radio show, TABLE FOR ONE, where he revealed the album took six to seven months to make. Influenced by dance, house, and R&B, the album is dedicated to late designer and DJ Virgil Abloh. Despite mixed reviews, Drake remained unfazed, telling fans they'll \"catch up\" eventually.",
  "Her Loss": "Her Loss is a collaborative album by Toronto rapper Drake and Atlanta rapper 21 Savage. The album was initially slated for release on October 28, 2022, but was pushed back one week to November 4, 2022, following Noah \"40\" Shebib's COVID-19 diagnosis. The album features a sole guest appearance from Travis Scott. It is the third part of what Drake described as \"a trilogy of albums\", following Certified Lover Boy (2021) and Honestly, Nevermind (2022).",
  "For All The Dogs": "For All The Dogs is Drake's eighth studio album. After many delays, Drake released For All The Dogs on October 6, 2023 after a 6 hour delay. Then one month and 10 days later, Drake announces \"Scary Hours 3\" which was releasing on November 17th, 2023. \"Scary Hours 3\" was released on November 17th, 2023 as a deluxe edition to For All The Dogs titled \"For All The Dogs Scary Hours Edition\".",
  "$ome $exy $ongs 4 U": "Some Sexy Songs 4 U (stylized as $ome $exy $ongs 4 U or abbreviated as $$$4U) is a collaborative album by Canadian musicians PARTYNEXTDOOR & Drake. The collaborative album was released on Valentine's Day, February 14, 2025. Drake announced the album and its release window when he appeared as a special guest at PARTYNEXTDOOR's performance in their hometown of Toronto, Canada, on August 2, 2024.",
  "ICEMAN [V1]": "Following the release of 100 GIGS, Drake began teasing his ninth studio album, hinting at the name ICEMAN through vague Instagram posts that included the X-Men character, F1 racer Kimi Raikkonen (AKA The Iceman) and a variety of ice sculptures. The ICEMAN title was confirmed in July 2025 as Drake officially started the rollout for the album with the single 'WHAT DID I MISS' and  the beginning of an episodic series where Drake would drop singles, snippets and give clues and hints about the subject matter of the album. The cover for this era was used as a placeholder on DSPs for ICEMAN, similar to What Did I Miss?.",
  "ICEMAN [V2]": "On October 10th, 2025 (which was initially the release date for ICEMAN, although unannounced), Drake decided to rework the album, seemingly last minute. He continued teasing the album throughout early 2026 with cryptic posts and appearances, including iced-out courtside seats at Toronto Raptors games. On April 19th, 2026, an ice structure appeared in Toronto, with a bag containing a booklet with concept art from Ben Dorado for the album alongside the album's release date that was inside of the structure. A streamer named Kishka managed to access the bag by breaking off ice blocks and got asked to come outside of Drake's crib to officially release the booklet's contents and the album's release date on April 21st, 2026. Morgan Wallen, Future, Young Thug & Sexyy Red are allegedly on the album. The cover for this era is from icemancountdown.com page 63, which, although official, may not be the cover for the album as no cover has been confirmed as of yet.",
};

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
