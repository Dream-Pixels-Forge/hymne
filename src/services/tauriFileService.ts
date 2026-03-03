/**
 * Tauri File Service
 *
 * Provides file system operations for the desktop app.
 * Uses Tauri's dialog and fs plugins for native file operations.
 */

import { isTauri } from '../hooks/useTauri';

export interface FileSaveOptions {
  title?: string;
  defaultPath?: string;
  filters?: FileFilter[];
}

export interface FileFilter {
  name: string;
  extensions: string[];
}

export interface FileReadResult {
  path: string;
  content: string;
}

/**
 * Save text content to a file using native dialog
 */
export async function saveTextFile(
  content: string,
  options?: FileSaveOptions
): Promise<string | null> {
  const defaultOptions: FileSaveOptions = {
    title: 'Save File',
    defaultPath: 'hymne-lyrics.txt',
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  };

  const opts = { ...defaultOptions, ...options };

  if (!isTauri()) {
    // Fallback: Download in web browser
    return downloadFileWeb(content, opts.defaultPath || 'hymne-lyrics.txt');
  }

  try {
    const { save } = await import('@tauri-apps/plugin-dialog');
    const { writeTextFile } = await import('@tauri-apps/plugin-fs');

    const filePath = await save({
      ...(opts.title && { title: opts.title }),
      ...(opts.defaultPath && { defaultPath: opts.defaultPath }),
      ...(opts.filters && { filters: opts.filters }),
    });

    if (filePath) {
      await writeTextFile(filePath, content);
      return filePath;
    }

    return null;
  } catch (error) {
    console.error('Failed to save file:', error);
    throw new Error(
      `Failed to save file: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Read text content from a file using native dialog
 */
export async function readTextFile(): Promise<FileReadResult | null> {
  if (!isTauri()) {
    throw new Error('File reading is only available in the desktop app');
  }

  try {
    const { open } = await import('@tauri-apps/plugin-dialog');
    const { readTextFile } = await import('@tauri-apps/plugin-fs');

    const filePath = await open({
      title: 'Open File',
      multiple: false,
      filters: [
        { name: 'Text Files', extensions: ['txt'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    });

    if (filePath && typeof filePath === 'string') {
      const content = await readTextFile(filePath);
      return { path: filePath, content };
    }

    return null;
  } catch (error) {
    console.error('Failed to read file:', error);
    throw new Error(
      `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Save JSON data to a file
 */
export async function saveJsonFile<T>(data: T, filename: string): Promise<string | null> {
  const content = JSON.stringify(data, null, 2);
  return saveTextFile(content, {
    defaultPath: filename,
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
  });
}

/**
 * Web fallback for file download
 */
function downloadFileWeb(content: string, filename: string): string | null {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return filename;
}

/**
 * Open a URL in the default browser
 */
export async function openUrl(url: string): Promise<void> {
  if (!isTauri()) {
    window.open(url, '_blank');
    return;
  }

  try {
    const { open } = await import('@tauri-apps/plugin-shell');
    await open(url);
  } catch (error) {
    console.error('Failed to open URL:', error);
    window.open(url, '_blank');
  }
}

/**
 * Get the app data directory
 */
export async function getAppDataDir(): Promise<string> {
  if (!isTauri()) {
    return 'localStorage';
  }

  try {
    const { appDataDir } = await import('@tauri-apps/api/path');
    return await appDataDir();
  } catch (error) {
    console.error('Failed to get app data dir:', error);
    return 'unknown';
  }
}
