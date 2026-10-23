import React from 'react';
import { ClipboardCheck, Wrench, Cpu, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageId } from './Navbar';

interface HowItWorksPageProps {
  onNavigate: (page: PageId) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      icon: <ClipboardCheck className="w-6 h-6 text-[#0047AB]" />,
      title: 'Audit & Diagnostic Technique',
      subtitle: 'En ligne ou sur site à Abidjan',
      description: 'Nous évaluons vos points d\'accès, vos caméras existantes et vos besoins spécifiques (famille, voyageurs Airbnb, équipes de bureau). Un plan d\'implantation sur mesure est établi sans engagement.',
      deliverables: ['Inventaire des ouvrants et serrures', 'Cartographie des zones aveugles', 'Devis transparent en FCFA'],
    },
    {
      num: '02',
      icon: <Wrench className="w-6 h-6 text-[#E8630A]" />,
      title: 'Installation Professionnelle Certifiée',
      subtitle: 'En moins d\'une demi-journée',
      description: 'Nos techniciens certifiés installent les serrures WizLock Pro et raccordent le boîtier IA WizBridge à vos caméras existantes sans perçage destructif. Tout le matériel est testé avec batteries de secours.',
      deliverables: ['Pose de serrures haute sécurité', 'Raccordement IA des caméras', 'Configuration de la passerelle locale'],
    },
    {
      num: '03',
      icon: <Cpu className="w-6 h-6 text-[#0047AB]" />,
      title: 'Paramétrage & Automatisations',
      subtitle: 'Adapté à votre mode de vie',
      description: 'Synchronisation avec votre calendrier Airbnb/Booking, paramétrage des alertes anti-intrusion et programmation de l\'extinction automatique des climatiseurs en cas d\'inoccupation.',
      deliverables: ['Codes PIN invités automatiques', 'Détection IA silhouettes humaines', 'Scénarios éco d\'électricité (-35%)'],
    },
    {
      num: '04',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Tranquillité Totale 24h/24 & Support',
      subtitle: 'Assistance locale continue',
      description: 'Vous pilotez l\'ensemble de votre propriété depuis votre smartphone. Nos services WizFix et WizRenouv garantissent l\'entretien préventif et le remplacement immédiat du matériel.',
      deliverables: ['Accès distant chiffré illimité', 'Support téléphonique 7j/7', 'Remplacement express en 24h'],
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047AB]">
            Déploiement Clé en Main
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A2E] tracking-tight mt-2">
            Comment fonctionne WizSmith ?
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            De votre premier diagnostic gratuit à l'automatisation complète de votre bien : 4 étapes transparentes et garanties.
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-black text-[#0047AB] font-mono">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50/80 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">
                  {step.title}
                </h3>
                <span className="text-xs font-semibold text-[#E8630A] block mb-3">
                  {step.subtitle}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {step.description}
                </p>

                <div className="border-t border-slate-100 pt-4 space-y-2">
                  {step.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="bg-[#1A1A2E] text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Vous avez déjà des caméras installées ?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm mb-6">
            Inutile de racheter du matériel neuf. Le module WizBridge se branche directement sur votre enregistreur ou routeur existant pour ajouter la détection IA et les alertes smartphone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('diagnostic')}
              className="px-6 py-3.5 rounded-xl font-bold text-white bg-[#E8630A] hover:bg-[#d45806] shadow-md transition-colors"
            >
              Évaluer la compatibilité de mes caméras
            </button>
            <button
              onClick={() => onNavigate('appointment')}
              className="px-6 py-3.5 rounded-xl font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              Réserver un audit sur site à Abidjan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
