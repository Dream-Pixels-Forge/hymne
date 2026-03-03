import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Copy,
  Download,
  Trash2,
  Music,
  Languages,
  Sparkles,
  FileText,
  Check,
  Calendar,
  Cpu,
} from 'lucide-react';
import { HistoryItem, EVENT_TYPES, LANGUAGES } from '../constants';
import { useState } from 'react';

interface HistoryItemModalProps {
  item: HistoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function HistoryItemModal({ item, isOpen, onClose, onDelete }: HistoryItemModalProps) {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  // Format full date
  const formatFullDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get event type label
  const getEventTypeLabel = (eventType: string): string => {
    const key = eventType as keyof typeof EVENT_TYPES;
    return EVENT_TYPES[key] || eventType;
  };

  // Get style short name
  const getStyleShortName = (style: string): string => {
    const names: Record<string, string> = {
      AFRO_DANCEHALL: 'Afro-Dancehall',
      ACOUSTIC: 'Acoustique',
      AFROBEATS_RUMBA: 'Afrobeats',
      GOSPEL: 'Gospel',
      SYNTHPOP_80S: 'Synthpop 80s',
      PIANO_BALLAD: 'Ballade Piano',
    };
    return names[style] || style;
  };

  // Get language label
  const getLanguageLabel = (language: string): string => {
    const key = language as keyof typeof LANGUAGES;
    return LANGUAGES[key] || language;
  };

  // Copy lyrics to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.lyrics);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Download as text file
  const handleDownload = () => {
    const blob = new Blob([item.lyrics], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hymne-${item.eventType.toLowerCase()}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            role="dialog"
            aria-label="History item details"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02] shrink-0">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <h2 className="text-lg font-serif text-white tracking-wide">
                  {getEventTypeLabel(item.eventType)}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onDelete}
                  className="p-2 text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete this item"
                  aria-label="Delete this item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
                    <Calendar className="w-3 h-3" />
                    Date de création
                  </label>
                  <p className="text-sm text-white">{formatFullDate(item.createdAt)}</p>
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
                    <Cpu className="w-3 h-3" />
                    Modèle IA
                  </label>
                  <p className="text-sm text-white">{item.model}</p>
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
                    <Music className="w-3 h-3" />
                    Style musical
                  </label>
                  <p className="text-sm text-white">{getStyleShortName(item.style)}</p>
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
                    <Languages className="w-3 h-3" />
                    Langue
                  </label>
                  <p className="text-sm text-white">{getLanguageLabel(item.language)}</p>
                </div>
              </div>

              {/* Subject */}
              {item.subject && (
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    <FileText className="w-3 h-3" />
                    Sujet / Thème
                  </label>
                  <p className="text-white">{item.subject}</p>
                </div>
              )}

              {/* Lyrics */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50 mb-3">
                  <Music className="w-3 h-3" />
                  Paroles
                </label>
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                  <pre className="text-sm text-white/90 whitespace-pre-wrap font-serif leading-relaxed">
                    {item.lyrics}
                  </pre>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02] flex justify-end gap-3 shrink-0">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-pink-500/50 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copié!' : 'Copier'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all"
              >
                <Download className="w-4 h-4" />
                Télécharger
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
