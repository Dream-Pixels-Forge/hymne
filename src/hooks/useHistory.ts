/**
 * History Hook
 *
 * Manages generation history with persistence via localStorage (web) or Tauri store (desktop).
 */

import { useState, useEffect, useCallback } from 'react';
import { isTauri } from './useTauri';
import { HistoryItem, HISTORY_CONFIG } from '../constants';

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
    async function loadHistory() {
      if (!isTauri()) {
        // Fallback to localStorage for web
        try {
          const saved = localStorage.getItem(HISTORY_CONFIG.STORAGE_KEY);
          if (saved) {
            setHistory(JSON.parse(saved) as HistoryItem[]);
          }
        } catch (err) {
          console.error('Failed to load history from localStorage:', err);
          setError(err instanceof Error ? err.message : 'Failed to load history');
        }
        setIsLoading(false);
        return;
      }

      // Load from Tauri store
      try {
        const { Store } = await import('@tauri-apps/plugin-store');
        const store = await Store.load('history.json');
        const saved = await store.get<HistoryItem[]>(HISTORY_CONFIG.STORAGE_KEY);
        if (saved) {
          setHistory(saved);
        }
      } catch (err) {
        console.error('Failed to load history from Tauri store:', err);
        setError(err instanceof Error ? err.message : 'Failed to load history');
      } finally {
        setIsLoading(false);
      }
    }

    loadHistory();
  }, []);

  // Save history when changed
  useEffect(() => {
    async function saveHistory() {
      if (!isTauri()) {
        // Fallback to localStorage for web
        localStorage.setItem(HISTORY_CONFIG.STORAGE_KEY, JSON.stringify(history));
        return;
      }

      // Save to Tauri store
      try {
        const { Store } = await import('@tauri-apps/plugin-store');
        const store = await Store.load('history.json');
        await store.set(HISTORY_CONFIG.STORAGE_KEY, history);
        await store.save();
      } catch (err) {
        console.error('Failed to save history to Tauri store:', err);
        setError(err instanceof Error ? err.message : 'Failed to save history');
      }
    }

    saveHistory();
  }, [history]);

  // Add a new history item
  const addItem = useCallback((item: Omit<HistoryItem, 'id' | 'createdAt'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev];
      // Limit to max items
      if (updated.length > HISTORY_CONFIG.MAX_ITEMS) {
        return updated.slice(0, HISTORY_CONFIG.MAX_ITEMS);
      }
      return updated;
    });

    return newItem;
  }, []);

  // Remove a history item
  const removeItem = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // Get a specific history item
  const getItem = useCallback((id: string): HistoryItem | undefined => {
    return history.find((item) => item.id === id);
  }, [history]);

  return {
    history,
    isLoading,
    error,
    addItem,
    removeItem,
    clearHistory,
    getItem,
    count: history.length,
  };
}
