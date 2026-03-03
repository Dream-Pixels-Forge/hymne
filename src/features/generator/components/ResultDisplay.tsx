import { motion, AnimatePresence } from 'motion/react';
import { Copy, Music } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ResultDisplayProps {
  isGenerating: boolean;
  result: { style: string; lyrics: string } | null;
}

export function ResultDisplay({ isGenerating, result }: ResultDisplayProps) {
  return (
    <div className="h-full w-full relative border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 flex flex-col">
      <AnimatePresence mode="wait">
        {!isGenerating && !result && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white/30"
          >
            <Music className="w-12 h-12 mb-4 opacity-50" strokeWidth={1} />
            <p className="text-xs font-mono uppercase tracking-widest">En attente d'inspiration</p>
          </motion.div>
        )}

        {isGenerating && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border border-pink-500/30 rounded-full animate-ping" />
              <div
                className="absolute inset-2 border border-purple-500/40 rounded-full animate-spin"
                style={{ animationDuration: '3s' }}
              />
              <Music className="w-6 h-6 text-pink-400 animate-pulse" />
            </div>
            <p className="mt-8 text-xs font-mono uppercase tracking-widest text-pink-400/80 animate-pulse">
              Composition en cours...
            </p>
          </motion.div>
        )}

        {result && !isGenerating && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex flex-col min-h-0"
          >
            <div className="mb-8 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                  Style Musical (Prompt Suno)
                </h3>
                <CopyButton text={result.style} />
              </div>
              <div className="p-4 bg-black/40 border border-white/5 text-xs font-mono text-pink-300/80 leading-relaxed max-h-32 overflow-y-auto custom-scrollbar">
                {result.style}
              </div>
            </div>

            <div className="flex-grow flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                  Paroles
                </h3>
                <CopyButton text={result.lyrics} />
              </div>
              <div className="flex-grow p-6 bg-black/40 border border-white/5 overflow-y-auto custom-scrollbar">
                <TypewriterText text={result.lyrics} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors"
    >
      {copied ? (
        <span className="text-pink-400">Copié !</span>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          Copier
        </>
      )}
    </button>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 15); // Speed of typing

    return () => clearInterval(interval);
  }, [text]);

  return (
    <pre className="font-serif text-lg md:text-xl text-white/90 whitespace-pre-wrap leading-relaxed">
      {displayedText}
      <span className="inline-block w-1 h-5 ml-1 bg-pink-500 animate-pulse align-middle" />
    </pre>
  );
}
