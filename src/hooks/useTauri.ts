/**
 * Tauri Utilities Hook
 *
 * Provides utilities for detecting and interacting with Tauri runtime.
 */

import { useEffect, useState } from 'react';

// Extend Window interface for Tauri
declare global {
  interface Window {
    __TAURI__?: Record<string, unknown>;
  }
}

// Check if running in Tauri
export function isTauri(): boolean {
  return typeof window !== 'undefined' && window.__TAURI__ !== undefined;
}

// Check if running in Tauri development mode
export function isTauriDev(): boolean {
  return isTauri() && import.meta.env?.MODE === 'development';
}

/**
 * Hook to check if app is running in Tauri
 */
export function useTauri() {
  const [tauri, setTauri] = useState(false);
  const [platform, setPlatform] = useState<string | null>(null);

  useEffect(() => {
    setTauri(isTauri());

    // Get platform info if in Tauri
    if (isTauri()) {
      // Use navigator platform as fallback
      const navPlatform = navigator.platform.toLowerCase();
      if (navPlatform.includes('win')) setPlatform('windows');
      else if (navPlatform.includes('mac')) setPlatform('macos');
      else if (navPlatform.includes('linux')) setPlatform('linux');
      else setPlatform('unknown');
    }
  }, []);

  return {
    isTauri: tauri,
    isTauriDev: tauri && import.meta.env?.MODE === 'development',
    platform,
    isDesktop: tauri,
    isWeb: !tauri,
  };
}

/**
 * Get Tauri version
 */
export async function getTauriVersion(): Promise<string> {
  if (!isTauri()) {
    return 'web';
  }

  try {
    const { invoke } = await import('@tauri-apps/api/core');
    return invoke<string>('get_app_version');
  } catch {
    return 'unknown';
  }
}

/**
 * Log message to Tauri console
 */
export async function logToTauri(message: string): Promise<void> {
  if (!isTauri()) {
    console.log('[Tauri Log]', message);
    return;
  }

  try {
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('log_message', { message });
  } catch (error) {
    console.error('[Tauri Log Error]', error);
  }
}
