/**
 * Application Constants
 *
 * Centralized constants for consistent values across the application.
 */

// AI Models
export const AI_MODELS = {
  PRO_MAX: 'gemini-3.1-pro-preview',
  PRO: 'gemini-3.0-pro-preview',
  FLASH: 'gemini-3-flash-preview',
  FLASH_2_5: 'gemini-2.5-flash',
} as const;

export type AIModel = keyof typeof AI_MODELS;

// Event Types
export const EVENT_TYPES = {
  BIRTHDAY: 'Anniversaire',
  WEDDING: 'Mariage',
  PROPOSAL: 'Demande en mariage',
  BIRTH: 'Naissance',
  BAPTISM: 'Baptême',
  VALENTINES: 'Saint-Valentin',
  PARENTS_DAY: 'Fête des parents',
  GRADUATION: 'Diplôme / Réussite',
} as const;

export type EventType = keyof typeof EVENT_TYPES;

// Languages
export const LANGUAGES = {
  FRENCH: 'Français',
  ENGLISH: 'Anglais',
  LINGALA: 'Lingala',
  SPANISH: 'Espagnol',
} as const;

export type Language = keyof typeof LANGUAGES;

// Musical Styles
export const MUSICAL_STYLES = {
  AFRO_DANCEHALL:
    'Afro-Dancehall, Modern Dancehall riddim, Afrobeat fusion, 105 BPM, Tropical club vibe, Heavy syncopated drum kit, Deep thumping sub-bass, Sharp rimshots, African percussion, Lush melodic pads, Polished Radio-ready production',
  ACOUSTIC:
    'Acoustic Folk, emotional acoustic guitar, warm intimate male vocals, gentle percussion, heartfelt atmosphere, storytelling style',
  AFROBEATS_RUMBA:
    'Modern Afrobeats, Rumba, melodic, warm vocals, Congolese rhythm, sweet electric guitar riffs',
  GOSPEL:
    'Contemporary Gospel, soulful piano, choir backing, emotional, powerful vocals, grand atmosphere',
  SYNTHPOP_80S: 'Synthpop, 80s nostalgia, upbeat, romantic, catchy disco bassline, glittery pads',
  PIANO_BALLAD: 'Piano Ballad, cinematic strings, emotional, slow tempo, professional grand piano',
} as const;

export type MusicalStyle = keyof typeof MUSICAL_STYLES;

// Local Storage Keys
export const STORAGE_KEYS = {
  SETTINGS: 'hymne_settings',
} as const;

// UI Constants
export const UI_CONSTANTS = {
  SPLASH_DURATION_MS: 6000,
  TYPEWRITER_SPEED_MS: 30,
  COPY_FEEDBACK_DURATION_MS: 2000,
} as const;

// API
export const API_CONFIG = {
  DEFAULT_MODEL: AI_MODELS.PRO_MAX,
  DEFAULT_API_KEY: '',
} as const;

// Form Defaults
export const FORM_DEFAULTS = {
  EVENT_TYPE: EVENT_TYPES.BIRTHDAY,
  LANGUAGE: LANGUAGES.FRENCH,
  STYLE: MUSICAL_STYLES.AFRO_DANCEHALL,
  SUBJECT: '',
} as const;

// History
export const HISTORY_CONFIG = {
  MAX_ITEMS: 50,
  STORAGE_KEY: 'hymne_history',
} as const;

// History Item Type
export interface HistoryItem {
  id: string;
  eventType: EventType;
  subject: string;
  style: MusicalStyle;
  language: Language;
  lyrics: string;
  createdAt: number; // timestamp
  model: string;
}
