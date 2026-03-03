import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Trash2, FileText, Music, Languages, Sparkles } from 'lucide-react';
import { HistoryItem, EVENT_TYPES, LANGUAGES } from '../constants';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearHistory: () => void;
  isLoading: boolean;
}

export function HistoryPanel({
  isOpen,
  onClose,
  history,
  onSelectItem,
  onDeleteItem,
  onClearHistory,
  isLoading,
}: HistoryPanelProps) {
  // Format date for display
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Hier';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('fr-FR', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 shadow-2xl flex flex-col"
            role="dialog"
            aria-label="History panel"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02] shrink-0">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-pink-500" />
                <h2 className="text-lg font-serif text-white tracking-wide">Historique</h2>
                <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 text-xs rounded-full border border-pink-500/30">
                  {history.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={onClearHistory}
                    className="p-2 text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Clear all history"
                    aria-label="Clear all history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close history panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-white/50 text-sm">Chargement de l&apos;historique...</p>
                  </div>
                </div>
              ) : history.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/50 text-sm mb-1">Aucun historique</p>
                    <p className="text-white/30 text-xs">Vos générations apparaîtront ici</p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-3" role="list">
                  {history.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-white/[0.02] border border-white/10 rounded-xl p-4 hover:bg-white/[0.05] hover:border-pink-500/30 transition-all cursor-pointer"
                      onClick={() => onSelectItem(item)}
                      role="listitem"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectItem(item);
                        }
                      }}
                      aria-label={`View ${getEventTypeLabel(item.eventType)} generation from ${formatDate(item.createdAt)}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-pink-500 shrink-0" />
                            <span className="text-xs font-mono uppercase tracking-widest text-pink-400">
                              {getEventTypeLabel(item.eventType)}
                            </span>
                            <span className="text-[10px] text-white/30">•</span>
                            <span className="text-[10px] text-white/40">{formatDate(item.createdAt)}</span>
                          </div>
                          <p className="text-sm text-white font-medium truncate mb-2">
                            {item.subject || 'Sans titre'}
                          </p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="flex items-center gap-1 text-[10px] text-white/50 bg-white/5 px-2 py-1 rounded-md">
                              <Music className="w-2.5 h-2.5" />
                              {getStyleShortName(item.style)}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-white/50 bg-white/5 px-2 py-1 rounded-md">
                              <Languages className="w-2.5 h-2.5" />
                              {getLanguageLabel(item.language)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteItem(item.id);
                          }}
                          className="p-1.5 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Delete this item"
                          tabIndex={-1}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
