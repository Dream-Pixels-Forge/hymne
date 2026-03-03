import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

interface HistoryTriggerButtonProps {
  onClick: () => void;
  historyCount: number;
  isLoading: boolean;
}

export function HistoryTriggerButton({ onClick, historyCount, isLoading }: HistoryTriggerButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, rotate: 90 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ delay: 0.2 }}
      onClick={onClick}
      className="relative p-3 bg-white/5 border border-white/10 rounded-2xl text-white/50 hover:text-white hover:bg-white/10 hover:border-pink-500/50 transition-all shadow-lg backdrop-blur-sm"
      title="View history"
      aria-label="Open history panel"
      aria-expanded={false}
    >
      <Clock className="w-5 h-5" />
      {historyCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
          {historyCount > 99 ? '99+' : historyCount}
        </span>
      )}
      {isLoading && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse border-2 border-[#0a0a0a]" />
      )}
    </motion.button>
  );
}
