import React, { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface ConfigFormProps {
  onSubmit: (data: any) => void;
  isGenerating: boolean;
}

export function ConfigForm({ onSubmit, isGenerating }: ConfigFormProps) {
  const [formData, setFormData] = useState({
    eventType: 'Anniversaire',
    subject: '',
    style:
      'Afro-Dancehall, Modern Dancehall riddim, Afrobeat fusion, 105 BPM, Tropical club vibe, Heavy syncopated drum kit, Deep thumping sub-bass, Sharp rimshots, African percussion, Lush melodic pads, Polished Radio-ready production',
    language: 'Français',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject.trim()) return;
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8"
      role="form"
      aria-label="Lyrics generation form"
    >
      <div className="space-y-6">
        {/* Event Type */}
        <div className="space-y-2">
          <label
            htmlFor="event-type"
            className="text-[10px] font-mono uppercase tracking-widest text-white/50"
          >
            01. Événement
          </label>
          <select
            id="event-type"
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:border-pink-500/50 focus:ring-0 outline-none transition-colors appearance-none"
            aria-label="Select event type"
          >
            <option value="Anniversaire" className="bg-[#0a0a0a]">
              Anniversaire
            </option>
            <option value="Mariage" className="bg-[#0a0a0a]">
              Mariage
            </option>
            <option value="Demande en mariage" className="bg-[#0a0a0a]">
              Demande en mariage
            </option>
            <option value="Naissance" className="bg-[#0a0a0a]">
              Naissance / Baptême
            </option>
            <option value="Saint-Valentin" className="bg-[#0a0a0a]">
              Saint-Valentin / Amour
            </option>
            <option value="Fête des parents" className="bg-[#0a0a0a]">
              Fête des Pères / Mères
            </option>
            <option value="Diplôme / Réussite" className="bg-[#0a0a0a]">
              Diplôme / Succès
            </option>
          </select>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-[10px] font-mono uppercase tracking-widest text-white/50"
          >
            02. L'Histoire
          </label>
          <textarea
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Prénoms, anecdotes, lieux, émotions..."
            className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-sm text-white focus:border-pink-500/50 focus:ring-0 outline-none transition-colors resize-none h-32 placeholder:text-white/20"
            required
            aria-label="Enter your story details"
          />
        </div>

        {/* Style */}
        <div className="space-y-2">
          <label
            htmlFor="style"
            className="text-[10px] font-mono uppercase tracking-widest text-white/50"
          >
            03. Direction Artistique
          </label>
          <select
            id="style"
            value={formData.style}
            onChange={(e) => setFormData({ ...formData, style: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:border-pink-500/50 focus:ring-0 outline-none transition-colors appearance-none"
            aria-label="Select musical style"
          >
            <option
              value="Afro-Dancehall, Modern Dancehall riddim, Afrobeat fusion, 105 BPM, Tropical club vibe, Heavy syncopated drum kit, Deep thumping sub-bass, Sharp rimshots, African percussion, Lush melodic pads, Polished Radio-ready production"
              className="bg-[#0a0a0a]"
            >
              Afro-Dancehall Fusion
            </option>
            <option
              value="Acoustic Folk, emotional acoustic guitar, warm intimate male vocals, gentle percussion, heartfelt atmosphere, storytelling style"
              className="bg-[#0a0a0a]"
            >
              Acoustique Intime
            </option>
            <option
              value="Modern Afrobeats, Rumba, melodic, warm vocals, Congolese rhythm, sweet electric guitar riffs"
              className="bg-[#0a0a0a]"
            >
              Afrobeats / Rumba Love
            </option>
            <option
              value="Contemporary Gospel, soulful piano, choir backing, emotional, powerful vocals, grand atmosphere"
              className="bg-[#0a0a0a]"
            >
              Gospel Soul
            </option>
            <option
              value="Synthpop, 80s nostalgia, upbeat, romantic, catchy disco bassline, glittery pads"
              className="bg-[#0a0a0a]"
            >
              Pop Années 80
            </option>
            <option
              value="Piano Ballad, cinematic strings, emotional, slow tempo, professional grand piano"
              className="bg-[#0a0a0a]"
            >
              Ballade Cinématique
            </option>
          </select>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <label
            htmlFor="language"
            className="text-[10px] font-mono uppercase tracking-widest text-white/50"
          >
            04. Langue
          </label>
          <select
            id="language"
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:border-pink-500/50 focus:ring-0 outline-none transition-colors appearance-none"
            aria-label="Select language"
          >
            <option value="Français" className="bg-[#0a0a0a]">
              Français
            </option>
            <option value="Anglais" className="bg-[#0a0a0a]">
              Anglais
            </option>
            <option value="Lingala" className="bg-[#0a0a0a]">
              Lingala
            </option>
            <option value="Espagnol" className="bg-[#0a0a0a]">
              Espagnol
            </option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isGenerating || !formData.subject.trim()}
        className="group relative w-full flex items-center justify-center gap-3 bg-white text-black px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isGenerating ? 'Generating lyrics' : 'Generate lyrics'}
        aria-busy={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Création en cours...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Générer l'Hymne
          </>
        )}
      </button>
    </form>
  );
}
