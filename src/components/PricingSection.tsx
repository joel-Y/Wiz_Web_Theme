import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { PageId } from './Navbar';

interface PricingSectionProps {
  onNavigate: (page: PageId) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onNavigate }) => {
  const [annualBilling, setAnnualBilling] = useState(false);

  const packages = [
    {
      id: 'business',
      name: 'BUSINESS',
      audience: 'Bureaux, commerces, restaurants, écoles et PME',
      monthlyPrice: 25000,
      annualPrice: 22500, // 10% discount
      badge: 'Entreprises & Commerces',
      featured: false,
      ctaText: 'Choisir Business',
      features: [
        'Contrôle d\'accès des employés (Badges & Codes)',
        'Surveillance intelligente des locaux',
        'Alertes en temps réel sur smartphone',
        'Rapports d\'activité et journal de présence',
        'Contrôle à distance des ouvertures',
        'Installation professionnelle certifiée',
        'Support technique 6j/7',
      ],
      excluded: [
        'Check-in autonome Airbnb',
        'Régulation climatisation automatique',
        'Intégration Apple HomeKit',
      ],
    },
    {
      id: 'elite',
      name: 'ÉLITE',
      audience: 'Résidences privées, meublés et propriétés Airbnb',
      monthlyPrice: 40000,
      annualPrice: 36000,
      badge: 'Le plus populaire',
      featured: true,
      ctaText: 'Choisir Élite',
      features: [
        'Accès sans clé complet (Serrure WizLock)',
        'Codes invités temporaires et programmés',
        'Check-in autonome voyageurs Airbnb 24/7',
        'Gestion énergétique intelligente (Coupure clim)',
        'Détection d\'incidents et alertes intrusions',
        'Contrôle et audit à distance illimité',
        'Installation et paramétrage inclus',
        'Support technique prioritaire 7j/7',
      ],
      excluded: [
        'Intégration Apple HomeKit native',
        'Audit comportemental IA personnalisé',
      ],
    },
    {
      id: 'prestige',
      name: 'PRESTIGE',
      audience: 'Grandes villas, résidences hôtelières et propriétés premium',
      monthlyPrice: 50000,
      annualPrice: 45000,
      badge: 'Excellence & Luxe',
      featured: false,
      ctaText: 'Choisir Prestige',
      features: [
        'Toutes les fonctionnalités du pack ÉLITE',
        'Intégration Apple HomeKit & Google Home',
        'IA de pointe & analyse comportementale',
        'Rapports de sécurité détaillés mensuels',
        'Installation VIP & technicien dédié',
        'Maintenance continue WizFix & WizRenouv',
        'Garantie matérielle intégrale avec remplacement express',
        'Assistance 24h/24 et 7j/7',
      ],
      excluded: [],
    },
  ];

  return (
    <section id="pricing-section" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047AB]">
            Tarification Transparente
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] tracking-tight mt-2">
            Nos solutions WizSmith
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Choisissez le niveau d'automatisation et de sécurité adapté à votre propriété. Sans frais cachés.
          </p>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            * Tous les tarifs présentés sont à partir de, selon le nombre d'accès, d'ouvrants et d'équipements à connecter.
          </p>

          {/* Billing Interval Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !annualBilling
                  ? 'bg-white text-[#1A1A2E] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Facturation mensuelle
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                annualBilling
                  ? 'bg-[#0047AB] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Facturation annuelle</span>
              <span className="text-[10px] font-semibold bg-[#E8630A] text-white px-2 py-0.5 rounded-full">
                -10%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {packages.map((pkg) => {
            const price = annualBilling ? pkg.annualPrice : pkg.monthlyPrice;
            const formatted = new Intl.NumberFormat('fr-FR').format(price);

            return (
              <div
                key={pkg.id}
                className={`wiz-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between relative ${
                  pkg.featured
                    ? 'border-2 border-[#0047AB] bg-white shadow-xl lg:-translate-y-2'
                    : 'border border-slate-200/90 bg-slate-50/60'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#0047AB] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                      {pkg.name}
                    </span>
                    {!pkg.featured && (
                      <span className="text-[11px] font-semibold text-slate-400">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 mb-3">
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      À partir de :
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-black text-[#1A1A2E]">
                        {formatted}
                      </span>
                      <span className="text-sm font-semibold text-slate-500">
                        CFA / mois
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                    {pkg.audience}
                  </p>

                  <div className="my-6 border-t border-slate-200/80" />

                  {/* Feature Checklist */}
                  <ul className="space-y-3 text-xs text-slate-700">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                    {pkg.excluded.map((exc, eIdx) => (
                      <li key={`exc-${eIdx}`} className="flex items-start gap-2.5 text-slate-400">
                        <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold">✕</span>
                        </div>
                        <span className="leading-snug line-through">{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/80">
                  <button
                    onClick={() => onNavigate('appointment')}
                    className={`wiz-btn w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${
                      pkg.featured
                        ? 'bg-[#0047AB] hover:bg-blue-700 text-white shadow-md'
                        : 'bg-[#1A1A2E] hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Garantie matérielle &amp; maintenance incluses</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#1A1A2E]">
                Comparatif détaillé des fonctionnalités
              </h3>
              <p className="text-xs text-slate-600">
                Chaque abonnement comprend le matériel, l'installation par un technicien et le support.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <th className="py-3 pr-4">Fonctionnalité</th>
                  <th className="py-3 px-4 text-center">
                    <div>Business</div>
                    <div className="text-[10px] normal-case font-medium text-slate-500">À partir de 25 000 CFA/m</div>
                  </th>
                  <th className="py-3 px-4 text-center text-[#0047AB]">
                    <div>Élite</div>
                    <div className="text-[10px] normal-case font-medium text-[#0047AB]">À partir de 40 000 CFA/m</div>
                  </th>
                  <th className="py-3 pl-4 text-center text-[#E8630A]">
                    <div>Prestige</div>
                    <div className="text-[10px] normal-case font-medium text-[#E8630A]">À partir de 50 000 CFA/m</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 text-slate-700">
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-900">Serrure connectée sans clé (WizLock)</td>
                  <td className="py-3 px-4 text-center">Badge / Code</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">
                    <span className="inline-flex items-center gap-1 justify-center"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Clé &amp; PIN</span>
                  </td>
                  <td className="py-3 pl-4 text-center text-emerald-600 font-bold">
                    <span className="inline-flex items-center gap-1 justify-center"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Biométrie</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-900">Codes invités temporaires programmés</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">
                    <span className="inline-flex items-center gap-1 justify-center"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Illimités</span>
                  </td>
                  <td className="py-3 pl-4 text-center text-emerald-600 font-bold">
                    <span className="inline-flex items-center gap-1 justify-center"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Illimités</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-900">Compatibilité caméras existantes</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">
                    <span className="inline-flex items-center gap-1 justify-center"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Raccordement IA</span>
                  </td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">
                    <span className="inline-flex items-center gap-1 justify-center"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Raccordement IA</span>
                  </td>
                  <td className="py-3 pl-4 text-center text-emerald-600 font-bold">
                    <span className="inline-flex items-center gap-1 justify-center"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Caméras HD</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-900">Régulation d'énergie intelligente</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">
                    <span className="inline-flex items-center gap-1 justify-center"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Coupure auto</span>
                  </td>
                  <td className="py-3 pl-4 text-center text-emerald-600 font-bold">
                    <span className="inline-flex items-center gap-1 justify-center"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Scénarios complets</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-900">Écosystèmes domotiques (Apple/Google)</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 pl-4 text-center text-emerald-600 font-bold">
                    <span className="inline-flex items-center gap-1 justify-center"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> HomeKit &amp; Google</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-900">Maintenance continue (WizFix &amp; WizRenouv)</td>
                  <td className="py-3 px-4 text-center">Garantie standard</td>
                  <td className="py-3 px-4 text-center">Garantie prioritaire</td>
                  <td className="py-3 pl-4 text-center text-emerald-600 font-bold">
                    <span className="inline-flex items-center gap-1 justify-center"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Remplacement 24h</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
