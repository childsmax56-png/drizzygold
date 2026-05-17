import React, { createContext, useContext, useState, useEffect } from 'react';

export type MiniLyricsAlignment = 'left' | 'center' | 'right';
export type GlobalFontSize = 'small' | 'medium' | 'large';
export type LoadingScreenId = 'none';

export interface LoadingScreenOption {
  id: LoadingScreenId;
  label: string;
  type: 'none' | 'gif' | 'video';
  url?: string;
}

export const LOADING_SCREENS: LoadingScreenOption[] = [
  { id: 'none', label: 'None', type: 'none' },
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
      const saved = localStorage.getItem('kdotgold_settings');
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
      localStorage.setItem('kdotgold_settings', JSON.stringify(settings));
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
