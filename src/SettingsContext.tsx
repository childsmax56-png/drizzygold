import React, { createContext, useContext, useState, useEffect } from 'react';

export type MiniLyricsAlignment = 'left' | 'center' | 'right';
export type GlobalFontSize = 'small' | 'medium' | 'large';
export type LoadingScreenId = 'none' | 'shuffle' | 'takecare' | 'thankmelater' | 'nwts' | 'clb' | 'honestlynevermind' | 'iyrtitl' | 'herloss' | 'morelife' | 'scorpion' | 'sofargone' | 'views';

export interface LoadingScreenOption {
  id: LoadingScreenId;
  label: string;
  type: 'none' | 'gif' | 'video';
  url?: string;
}

export const LOADING_SCREENS: LoadingScreenOption[] = [
  { id: 'none', label: 'None', type: 'none' },
  { id: 'shuffle', label: 'Shuffle', type: 'none' },
  { id: 'takecare', label: 'Take Care', type: 'gif', url: 'https://i.ibb.co/pBtLbGHy/IMG-4149.gif' },
  { id: 'thankmelater', label: 'Thank Me Later', type: 'gif', url: 'https://i.ibb.co/wXCBygN/IMG-4148.gif' },
  { id: 'nwts', label: 'Nothing Was the Same', type: 'gif', url: 'https://i.ibb.co/fGPG3QVC/IMG-4147.gif' },
  { id: 'clb', label: 'Certified Lover Boy', type: 'gif', url: 'https://i.ibb.co/j279Kz5/CLB.gif' },
  { id: 'honestlynevermind', label: 'Honestly Nevermind', type: 'gif', url: 'https://i.ibb.co/0p3H4Tmy/IMG-4218.gif' },
  { id: 'iyrtitl', label: "If You're Reading This It's Too Late", type: 'gif', url: 'https://i.ibb.co/T9vx1kR/IYRTITL.gif' },
  { id: 'herloss', label: 'Her Loss', type: 'gif', url: 'https://i.ibb.co/yn42p7cQ/her-loss.gif' },
  { id: 'morelife', label: 'More Life', type: 'gif', url: 'https://i.ibb.co/bcmf1WZ/more-life.gif' },
  { id: 'scorpion', label: 'Scorpion', type: 'gif', url: 'https://i.ibb.co/vCKB4xZ1/Scorpion.gif' },
  { id: 'sofargone', label: 'So Far Gone', type: 'gif', url: 'https://i.ibb.co/H5J3vbN/sfg.gif' },
  { id: 'views', label: 'Views', type: 'gif', url: 'https://i.ibb.co/SwmyNq2Y/views.gif' },
];

export interface AppSettings {
  loadingScreen: LoadingScreenId;
  miniLyricsAlignment: MiniLyricsAlignment;
  tagsAsEmojis: boolean;
  startVolume: number | null;
  saveListeningHistory: boolean;
  keyboardShortcuts: boolean;
  globalFontSize: GlobalFontSize;
  miniLyricsOpacity: number;
  showMiniPlayerArt: boolean;
  showMiniLyricsArt: boolean;
  showNextSongNotification: boolean;
  themeColor: string;
  syncedLyricsOnly: boolean;
  notificationWhenPlaying: boolean;
  startupShuffle: boolean;
  startupLoop: number;
  discordRPC: boolean;
  rememberSearch: boolean;
  fullScreenVolume: boolean;
  showRandomSongButton: boolean;
  lastfmShowVersion: boolean;
  lastfmShowTags: boolean;
  lastfmShowFeats: boolean;
  notOpenInNewTab: boolean;
  googleSheetsUrl: string;
  downloadAsOgFilename: boolean;
  embedMetadata: boolean;
  yzyGoldMode: boolean;
  dropdownNav: boolean;
  lastfmEraOverrides: Record<string, string>;
  videosMiniPlayer: boolean;
  aiErrorDetails: boolean;
}

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

export const defaultSettings: AppSettings = {
  loadingScreen: 'none',
  miniLyricsAlignment: 'left',
  tagsAsEmojis: false,
  startVolume: null,
  saveListeningHistory: false,
  keyboardShortcuts: true,
  globalFontSize: 'medium',
  miniLyricsOpacity: 100,
  showMiniPlayerArt: true,
  showMiniLyricsArt: true,
  showNextSongNotification: true,
  themeColor: '#FFD700',
  syncedLyricsOnly: false,
  notificationWhenPlaying: false,
  startupShuffle: false,
  startupLoop: 0,
  discordRPC: false,
  rememberSearch: false,
  fullScreenVolume: true,
  showRandomSongButton: true,
  lastfmShowVersion: true,
  lastfmShowTags: false,
  lastfmShowFeats: true,
  notOpenInNewTab: false,
  googleSheetsUrl: '',
  downloadAsOgFilename: false,
  embedMetadata: true,
  yzyGoldMode: false,
  dropdownNav: true,
  lastfmEraOverrides: {},
  videosMiniPlayer: true,
  aiErrorDetails: false,
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  resetSettings: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    let initialSettings = defaultSettings;
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      initialSettings = { ...initialSettings, globalFontSize: 'small' };
    }

    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('drizzygold_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (typeof window !== 'undefined' && window.innerWidth < 768 && !localStorage.getItem('mobile_font_migrated_v1_5_0')) {
             parsed.globalFontSize = 'small';
             localStorage.setItem('mobile_font_migrated_v1_5_0', 'true');
          }
          return { ...initialSettings, ...parsed };
        } catch (e) {
          console.error('Failed to parse settings', e);
        }
      } else if (typeof window !== 'undefined' && window.innerWidth < 768) {
        localStorage.setItem('mobile_font_migrated_v1_5_0', 'true');
      }
    }
    return initialSettings;
  });

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('drizzygold_settings', JSON.stringify(settings));
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
