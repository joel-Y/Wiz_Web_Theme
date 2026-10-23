import React from 'react';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { PageId } from './Navbar';

interface FinalCtaSectionProps {
  onNavigate: (page: PageId) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#1A1A2E] text-white relative overflow-hidden">
      {/* Subtle atmospheric glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0047AB]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E8630A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-[#E8630A] mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sécurisez et Automatisez dès Aujourd'hui</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">
          Prêt à confier votre propriété à une technologie qui travaille pour vous ?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-9 leading-relaxed">
          Rejoignez les propriétaires et gestionnaires exigeants en Côte d'Ivoire. Obtenez votre analyse de sécurité préliminaire gratuite en 2 minutes ou planifiez une visite avec nos ingénieurs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => onNavigate('diagnostic')}
            className="wiz-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-[#E8630A] hover:bg-[#d45806] rounded-2xl shadow-xl"
          >
            <span>Faire mon diagnostic gratuit</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate('appointment')}
            className="wiz-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-2xl"
          >
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Planifier un rendez-vous</span>
          </button>
        </div>
      </div>
    </section>
  );
};
