/**
 * Tauri Store Hook
 *
 * Uses Tauri's store plugin for persistent settings in desktop app.
 * Falls back to localStorage when running in web mode.
 */

import { useState, useEffect } from 'react';
import { isTauri } from './useTauri';

export interface AppSettings {
  apiKey: string;
  model: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  apiKey: '',
  model: 'gemini-3.1-pro-preview',
};

const STORE_KEY = 'settings';

export function useTauriSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load settings on mount
  useEffect(() => {
    async function loadSettings() {
      if (!isTauri()) {
        // Fallback to localStorage for web
        try {
          const saved = localStorage.getItem('hymne_settings');
          if (saved) {
            setSettings(JSON.parse(saved) as AppSettings);
          }
        } catch (err) {
          console.error('Failed to load settings from localStorage:', err);
        }
        setIsLoaded(true);
        return;
      }

      // Load from Tauri store
      try {
        const { Store } = await import('@tauri-apps/plugin-store');
        const store = await Store.load('settings.json');
        const saved = await store.get<AppSettings>(STORE_KEY);
        if (saved) {
          setSettings(saved);
        }
      } catch (err) {
        console.error('Failed to load settings from Tauri store:', err);
        setError(err instanceof Error ? err.message : 'Failed to load settings');
      } finally {
        setIsLoaded(true);
      }
    }

    loadSettings();
  }, []);

  // Save settings when changed
  useEffect(() => {
    async function saveSettings() {
      if (!isLoaded) return;

      if (!isTauri()) {
        // Fallback to localStorage for web
        localStorage.setItem('hymne_settings', JSON.stringify(settings));
        return;
      }

      // Save to Tauri store
      try {
        const { Store } = await import('@tauri-apps/plugin-store');
        const store = await Store.load('settings.json');
        await store.set(STORE_KEY, settings);
        await store.save();
      } catch (err) {
        console.error('Failed to save settings to Tauri store:', err);
        setError(err instanceof Error ? err.message : 'Failed to save settings');
      }
    }

    saveSettings();
  }, [settings, isLoaded]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return {
    settings,
    setSettings: updateSettings,
    isLoading: !isLoaded,
    error,
    isTauri: isTauri(),
  };
}
