import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

function Typewriter({
  text,
  speed = 30,
  delay = 0,
  className,
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return <div className={className}>{displayed}</div>;
}

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 6000); // 6 seconds for maximum immersion
    return () => clearTimeout(timer);
  }, [onComplete]);

  const hexGrid = Array(15)
    .fill(
      '0x48 0x79 0x6D 0x6E 0x65 0x20 0x41 0x49 0x20 0x47 0x65 0x6E 0x65 0x72 0x61 0x74 0x69 0x6F 0x6E 0x20 0x53 0x74 0x75 0x64 0x69 0x6F '
    )
    .join('\n');

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: 'easeInOut' } }}
    >
      {/* LAYER 1: The Soul (Deepest, Huge, Blurred) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] blur-[12px] pointer-events-none">
        <Typewriter
          text="RÉSONANCE"
          className="text-[25vw] font-black font-sans leading-none tracking-tighter text-white"
          speed={150}
          delay={200}
        />
      </div>

      {/* LAYER 2: The Machine (Dense Hex Grid) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden p-4 flex items-center justify-center">
        <Typewriter
          text={hexGrid}
          className="text-[10px] font-mono text-white leading-relaxed break-all text-center"
          speed={2}
          delay={0}
        />
      </div>

      {/* LAYER 3: The Interface (HUD elements, Monospace) */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 opacity-40 pointer-events-none">
        <Typewriter
          text={`> INITIALIZING STUDIO...\n> LOADING NEURAL WEIGHTS\n> CALIBRATING EMOTIONAL ENGINE\n> PARSING MEMORIES\n> STATUS: READY`}
          className="text-[10px] md:text-xs font-mono text-pink-500/80 whitespace-pre-wrap leading-loose tracking-widest"
          speed={15}
          delay={500}
        />
      </div>
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 opacity-40 pointer-events-none text-right">
        <Typewriter
          text={`[SYS.AUDIO.OUT] // OK\n[VOCAL.SYNTH] // ONLINE\n[HARMONY.GEN] // SYNCED\n[BPM.SYNC] // 105`}
          className="text-[10px] md:text-xs font-mono text-purple-500/80 whitespace-pre-wrap leading-loose tracking-widest"
          speed={15}
          delay={1500}
        />
      </div>

      {/* LAYER 4: The Structure (Musical Tags, Scattered) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none hidden md:block">
        <Typewriter
          text="[INTRO - PIANO CRESCENDO]"
          className="absolute top-[20%] left-[15%] text-[10px] font-mono tracking-[0.4em] text-white"
          delay={1000}
          speed={30}
        />
        <Typewriter
          text="[VERSE 1 - INTIMATE]"
          className="absolute top-[40%] right-[10%] text-[10px] font-mono tracking-[0.4em] text-white"
          delay={2200}
          speed={30}
        />
        <Typewriter
          text="[CHORUS - ANTHEMIC]"
          className="absolute bottom-[30%] left-[20%] text-[10px] font-mono tracking-[0.4em] text-white"
          delay={3400}
          speed={30}
        />
        <Typewriter
          text="[OUTRO - FADE TO SILENCE]"
          className="absolute bottom-[15%] right-[20%] text-[10px] font-mono tracking-[0.4em] text-white"
          delay={4600}
          speed={30}
        />
      </div>

      {/* LAYER 5: The Poetry (Elegant Serif, Floating) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-50 pointer-events-none">
        <Typewriter
          text="Chaque note raconte une histoire..."
          className="absolute top-[28%] text-lg md:text-2xl font-serif italic text-white/60"
          speed={40}
          delay={2500}
        />
        <Typewriter
          text="Gravé dans le temps."
          className="absolute bottom-[28%] text-lg md:text-2xl font-serif italic text-white/60"
          speed={50}
          delay={3800}
        />
      </div>

      {/* FOREGROUND: Main Title */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.5, ease: 'easeOut', delay: 1.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="absolute inset-0 bg-pink-500/10 blur-[100px] rounded-full" />
        <img
          src="/logo.svg"
          alt="L'Hymne Logo"
          className="w-24 h-24 md:w-32 md:h-32 mb-8 rounded-[2rem] shadow-[0_0_50px_rgba(236,72,153,0.3)]"
        />
        <h1 className="relative text-5xl md:text-8xl font-serif text-white tracking-widest text-center drop-shadow-2xl">
          L'HYMNE
          <span className="block text-xs md:text-sm font-sans tracking-[0.8em] text-pink-400/90 mt-6 uppercase">
            Créateur de Souvenirs
          </span>
        </h1>
      </motion.div>
    </motion.div>
  );
}
