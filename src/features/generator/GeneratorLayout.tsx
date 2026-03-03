import { motion } from 'motion/react';
import { ConfigForm } from './components/ConfigForm';
import { ResultDisplay } from './components/ResultDisplay';
import { useState } from 'react';
import { generateLyrics } from '../../services/geminiService';
import { Settings } from 'lucide-react';
import { SettingsModal } from '../../components/SettingsModal';
import { useTauriSettings } from '../../hooks/useTauriSettings';
import { useTauri } from '../../hooks/useTauri';
import { useHistory } from '../../hooks/useHistory';
import { HistoryPanel } from '../../components/HistoryPanel';
import { HistoryItemModal } from '../../components/HistoryItemModal';
import { HistoryTriggerButton } from '../../components/HistoryTriggerButton';
import { HistoryItem } from '../../constants';

export function GeneratorLayout() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ style: string; lyrics: string } | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null);
  const { settings, setSettings, isLoading } = useTauriSettings();
  const { isTauri, platform } = useTauri();
  const {
    history,
    isLoading: isHistoryLoading,
    addItem,
    removeItem,
    clearHistory,
  } = useHistory();

  const handleGenerate = async (data: any) => {
    setIsGenerating(true);
    setResult(null);
    try {
      const lyrics = await generateLyrics(
        data.eventType,
        data.subject,
        data.style,
        data.language,
        settings.apiKey,
        settings.model
      );
      const resultData = { style: data.style, lyrics };
      setResult(resultData);

      // Add to history
      addItem({
        eventType: data.eventType,
        subject: data.subject,
        style: data.style,
        language: data.language,
        lyrics,
        model: settings.model,
      });
    } catch (error: any) {
      alert(error.message || 'Une erreur est survenue lors de la création.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setSelectedHistoryItem(item);
  };

  const handleCloseHistoryModal = () => {
    setSelectedHistoryItem(null);
  };

  const handleDeleteHistoryItem = () => {
    if (selectedHistoryItem) {
      removeItem(selectedHistoryItem.id);
      setSelectedHistoryItem(null);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white text-black px-4 py-2 rounded-lg font-bold"
      >
        Skip to main content
      </a>

      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-900/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-12 h-screen flex flex-col">
        <header className="mb-8 flex items-center justify-between shrink-0" data-tauri-drag-region>
          <div className="flex items-center gap-6 pointer-events-none">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              src="/logo.svg"
              alt="L'Hymne Logo"
              className="w-16 h-16 md:w-20 md:h-20 rounded-3xl shadow-[0_0_30px_rgba(236,72,153,0.2)]"
            />
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-serif text-white tracking-wide"
              >
                L'Hymne
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs font-sans uppercase tracking-[0.3em] text-white/50 mt-2"
              >
                Studio de création lyrique
                {isTauri && (
                  <span className="ml-2 px-2 py-0.5 bg-pink-500/20 text-pink-400 text-[8px] rounded-full border border-pink-500/30">
                    DESKTOP
                  </span>
                )}
                {platform && (
                  <span className="ml-1 px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[8px] rounded-full border border-purple-500/30 uppercase">
                    {platform}
                  </span>
                )}
              </motion.p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <HistoryTriggerButton
              onClick={() => setIsHistoryOpen(true)}
              historyCount={history.length}
              isLoading={isHistoryLoading}
            />
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsSettingsOpen(true)}
              className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white/50 hover:text-white hover:bg-white/10 hover:border-pink-500/50 transition-all shadow-lg backdrop-blur-sm"
              title="Configuration (Tauri Ready)"
              aria-label="Open settings"
              aria-expanded={isSettingsOpen}
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </header>

        {isLoading ? (
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/50 text-sm">Loading settings...</p>
            </div>
          </div>
        ) : (
          <main
            id="main-content"
            className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 min-h-0 pb-8"
          >
            <motion.div
              className="lg:col-span-4 h-full overflow-y-auto custom-scrollbar pr-2 pb-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ConfigForm onSubmit={handleGenerate} isGenerating={isGenerating} />
            </motion.div>

            <motion.div
              className="lg:col-span-8 h-full min-h-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              aria-live="polite"
              aria-atomic="true"
            >
              <ResultDisplay isGenerating={isGenerating} result={result} />
            </motion.div>
          </main>
        )}
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={setSettings}
      />

      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectItem={handleSelectHistoryItem}
        onDeleteItem={removeItem}
        onClearHistory={clearHistory}
        isLoading={isHistoryLoading}
      />

      <HistoryItemModal
        item={selectedHistoryItem}
        isOpen={!!selectedHistoryItem}
        onClose={handleCloseHistoryModal}
        onDelete={handleDeleteHistoryItem}
      />
    </div>
  );
}
