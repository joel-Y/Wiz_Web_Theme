import React, { useState } from 'react';
import { KeyRound, ShieldAlert, Zap, Clock, Smartphone, Star, ArrowRight, Check } from 'lucide-react';
import { PageId } from './Navbar';

interface ResidencesAirbnbPageProps {
  onNavigate: (page: PageId) => void;
}

export const ResidencesAirbnbPage: React.FC<ResidencesAirbnbPageProps> = ({ onNavigate }) => {
  const [apartmentsCount, setApartmentsCount] = useState<number>(3);
  const [estimatedMonthlyHoursSaved, setEstimatedMonthlyHoursSaved] = useState<number>(18);
  const [estimatedCfaSaved, setEstimatedCfaSaved] = useState<number>(65000);

  const handleSliderChange = (count: number) => {
    setApartmentsCount(count);
    setEstimatedMonthlyHoursSaved(count * 6);
    setEstimatedCfaSaved(count * 22000);
  };

  return (
    <div className="py-12 sm:py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-xs font-bold text-[#0047AB]">
              <span>Hôtes Airbnb &amp; Propriétaires de Résidences</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A2E] tracking-tight leading-tight">
              Gérez votre propriété depuis n'importe où. <br />
              <span className="text-[#0047AB]">Sans remise de clés.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Ne perdez plus vos soirées à attendre les voyageurs retardés. WizSmith automatise les arrivées, coupe la climatisation lors des vacances locatives et sécurise votre bien 24h/24.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onNavigate('solutions')}
                className="px-6 py-4 rounded-2xl font-bold text-white bg-[#0047AB] hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Découvrir le Pack Élite (à partir de 40 000 CFA/mois)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('diagnostic')}
                className="px-6 py-4 rounded-2xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all text-center"
              >
                Calculer mon score de sécurité
              </button>
            </div>
          </div>

          {/* ROI Simulator Card */}
          <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-7 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">
              Simulateur d'économies &amp; gain de temps
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Ajustez le curseur selon le nombre de meublés ou résidences que vous gérez :
            </p>

            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span>Nombre de biens :</span>
                <span className="text-base text-[#0047AB] font-mono">{apartmentsCount} bien{apartmentsCount > 1 ? 's' : ''}</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={apartmentsCount}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0047AB]"
                aria-label="Nombre de logements gérés"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-1">Temps gagné / mois</span>
                <span className="text-2xl font-black text-[#0047AB] font-mono">
                  ~{estimatedMonthlyHoursSaved} h
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Zéro trajet pour les clés</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-1">Économie d'énergie</span>
                <span className="text-2xl font-black text-emerald-600 font-mono">
                  ~{new Intl.NumberFormat('fr-FR').format(estimatedCfaSaved)} CFA
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Coupure clim inoccupée</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-3 text-xs text-blue-900">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
              <span>Plus de 95% des hôtes équipés obtiennent le statut Superhôte grâce au check-in autonome sans friction.</span>
            </div>
          </div>
        </div>

        {/* Real-World Visual Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="group rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-white">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src="/src/assets/images/solution_airbnb_west_african_1792714518119.jpg"
                alt="Check-in voyageur autonome sans contact sur Airbnb à Abidjan"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E8630A] shadow-sm">
                  Arrivées 24/7 Autonomes
                </span>
                <h4 className="text-lg font-bold mt-2">
                  Zéro attente, zéro remise de clés physiques
                </h4>
                <p className="text-xs text-white/80 mt-1">
                  Le voyageur compose son code PIN temporaire et entre en toute autonomie.
                </p>
              </div>
            </div>
          </div>

          <div className="group rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-white">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src="/src/assets/images/solution_luxury_villa_1792700326830.jpg"
                alt="Résidence privée et villa de luxe sécurisée à Abidjan"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0047AB] shadow-sm">
                  Villas &amp; Résidences
                </span>
                <h4 className="text-lg font-bold mt-2">
                  Protection biométrique &amp; contrôle familial
                </h4>
                <p className="text-xs text-white/80 mt-1">
                  Accès par empreinte digitale, journal des visites et alertes immédiates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#0047AB] mb-5 shadow-xs">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">
                Codes PIN temporaires &amp; automatisés
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Chaque voyageur reçoit un code unique par SMS ou email. Ce code s'active à 15h le jour d'arrivée et expire automatiquement à 11h le jour du départ.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0047AB]">✓ Zéro double de clés possible</span>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 mb-5 shadow-xs">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">
                Gestion intelligente de la climatisation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Nos capteurs coupent automatiquement les climatiseurs laissés en marche après le départ des occupants ou lorsque les fenêtres restent ouvertes.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-600">✓ Jusqu'à 35% d'économies CIE</span>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-red-500 mb-5 shadow-xs">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">
                Détection d'intrusion en période vacante
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Quand l'appartement est inoccupé, les caméras IA s'arment automatiquement. Tout mouvement anormal déclenche une alerte smartphone avec capture photo.
              </p>
            </div>
            <span className="text-xs font-semibold text-red-600">✓ Vigilance 24h/24 sans fausse alerte</span>
          </div>
        </div>
      </div>
    </div>
  );
};
