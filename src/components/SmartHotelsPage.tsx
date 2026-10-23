import React from 'react';
import { Hotel, Key, Users, Zap, CheckCircle2, ArrowRight, Shield, BarChart3 } from 'lucide-react';
import { PageId } from './Navbar';

interface SmartHotelsPageProps {
  onNavigate: (page: PageId) => void;
}

export const SmartHotelsPage: React.FC<SmartHotelsPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E8630A]">
            Hôtellerie &amp; Résidences de Prestige
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A2E] tracking-tight mt-2">
            L'hôtel du futur commence aujourd'hui.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Offrez une expérience d'accueil VIP et autonome à vos résidents tout en réduisant de 30% les coûts énergétiques de votre établissement.
          </p>
        </div>

        {/* Visual Hotel Showcase */}
        <div className="mb-16 relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden">
            <img
              src="/src/assets/images/solution_boutique_hotel_1792700327955.jpg"
              alt="Hôtel boutique de prestige avec accès de chambre connecté"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 flex items-center p-6 sm:p-12">
              <div className="max-w-md text-white space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/90 text-white shadow-sm inline-block">
                  Live Hospitality OS
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
                  Chambres connectées, clients conquis, coûts maîtrisés.
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed hidden sm:block">
                  Contrôlez l'état de chaque porte, la température et le passage des équipes en direct depuis votre tableau de bord.
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs font-mono">
                  <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                    🟢 Suite 312 · Prête
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                    ⚡ Climatisation: -32%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0047AB] flex items-center justify-center mb-6">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">
              Expérience Client Fluide &amp; Sans Clé
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Vos clients accèdent à leur chambre par digicode sécurisé, carte RFID ou smartphone, sans faire la queue au desk d'accueil après un vol éprouvant.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Clé mobile cryptée</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Fin des pertes de cartes magnétiques</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#E8630A] flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">
              Traçabilité &amp; Gestion des Équipes
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Suivez en direct le passage du personnel d'étage et de ménage dans chaque chambre avec horodatage strict et statut d'occupation en temps réel.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Badges nominatifs sécurisés</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Statut "Chambre prête" instantané</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">
              Supervision Énergétique Chambre par Chambre
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Dès qu'une chambre est libérée ou que le client quitte les lieux, les climatiseurs passent en mode éco ou s'éteignent automatiquement.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> -30% sur la facture énergétique globale</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Rallumage prédictif avant l'arrivée</li>
            </ul>
          </div>
        </div>

        {/* Hospitality Banner CTA */}
        <div className="bg-[#1A1A2E] text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Une seule plateforme pour tout votre hôtel
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm mb-6">
            Découvrez nos tarifs pour complexes hôteliers et résidences (à partir de 50 000 FCFA/mois en Pack Prestige ou formule multi-chambres sur mesure).
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('appointment')}
              className="px-6 py-3.5 rounded-xl font-bold text-white bg-[#0047AB] hover:bg-blue-700 shadow-md transition-colors"
            >
              Planifier une démonstration technique
            </button>
            <button
              onClick={() => onNavigate('solutions')}
              className="px-6 py-3.5 rounded-xl font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              Voir le Pack Prestige
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
