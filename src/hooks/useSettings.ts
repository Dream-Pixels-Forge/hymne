import { useState, useEffect } from 'react';
import { STORAGE_KEYS, API_CONFIG } from '../constants';

export interface AppSettings {
  apiKey: string;
  model: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  apiKey: API_CONFIG.DEFAULT_API_KEY,
  model: API_CONFIG.DEFAULT_MODEL,
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        return JSON.parse(saved) as AppSettings;
      }
    } catch (error) {
      console.error('Failed to parse saved settings:', error);
      // Clear invalid settings and use defaults
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  return { settings, setSettings };
}
