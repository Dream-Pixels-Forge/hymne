import { motion, AnimatePresence } from 'motion/react';
import { X, Key, Cpu, Save } from 'lucide-react';
import { AppSettings } from '../hooks/useSettings';
import { useState } from 'react';
import { AI_MODELS } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSave: (newSettings: AppSettings) => void;
}

export function SettingsModal({ isOpen, onClose, settings, onSave }: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
              <h2 className="text-lg font-serif text-white tracking-wide flex items-center gap-3">
                <Cpu className="w-5 h-5 text-pink-500" />
                Configuration Système
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* API Key */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
                  <Key className="w-3 h-3" />
                  Clé API Gemini (Optionnel)
                </label>
                <input
                  type="password"
                  value={localSettings.apiKey}
                  onChange={(e) => setLocalSettings({ ...localSettings, apiKey: e.target.value })}
                  placeholder="Laisser vide pour utiliser la clé par défaut"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-pink-500/50 focus:ring-0 outline-none transition-colors font-mono placeholder:text-white/20"
                  aria-label="Gemini API key"
                />
                <p className="text-[10px] text-white/30 font-sans">
                  Nécessaire pour l'utilisation en application Desktop (Tauri).
                </p>
              </div>

              {/* Model Selection */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
                  <Cpu className="w-3 h-3" />
                  Modèle d'Intelligence Artificielle
                </label>
                <select
                  value={localSettings.model}
                  onChange={(e) => setLocalSettings({ ...localSettings, model: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-pink-500/50 focus:ring-0 outline-none transition-colors appearance-none"
                  aria-label="Select AI model"
                >
                  <option value={AI_MODELS.PRO_MAX} className="bg-[#0a0a0a]">
                    Gemini 3.1 Pro (Créativité Maximale)
                  </option>
                  <option value={AI_MODELS.PRO} className="bg-[#0a0a0a]">
                    Gemini 3.0 Pro
                  </option>
                  <option value={AI_MODELS.FLASH} className="bg-[#0a0a0a]">
                    Gemini 3 Flash (Rapide)
                  </option>
                  <option value={AI_MODELS.FLASH_2_5} className="bg-[#0a0a0a]">
                    Gemini 2.5 Flash
                  </option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02] flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all"
              >
                <Save className="w-4 h-4" />
                Sauvegarder
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
