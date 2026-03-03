/// <reference types="vite/client" />

// Tauri types
interface ImportMetaEnv {
  readonly TAURI_PLATFORM?: string;
  readonly TAURI_ARCH?: string;
  readonly TAURI_FAMILY?: string;
  readonly TAURI_DEBUG?: string;
  readonly VITE_DEBUG_BUILD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
