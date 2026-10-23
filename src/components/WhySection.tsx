import React from 'react';
import { ShieldAlert, LayoutDashboard, Compass, Cpu, DollarSign, Smartphone } from 'lucide-react';

export const WhySection: React.FC = () => {
  const benefits = [
    {
      number: '01',
      icon: <ShieldAlert className="w-5 h-5 text-[#0047AB]" />,
      title: 'Sécurité réellement intelligente',
      description: 'L\'IA analyse les flux vidéo de vos caméras pour distinguer un humain d\'un chat ou d\'une rafale de vent. Finies les 50 fausses alertes par nuit.',
    },
    {
      number: '02',
      icon: <LayoutDashboard className="w-5 h-5 text-[#0047AB]" />,
      title: 'Plateforme centralisée',
      description: 'Plus besoin d\'ouvrir quatre applications différentes. Vos serrures, vos caméras et vos climatisations sont pilotées depuis une interface unique.',
    },
    {
      number: '03',
      icon: <Compass className="w-5 h-5 text-[#0047AB]" />,
      title: 'Pensé pour les usages réels',
      description: 'Conçu sur le terrain en Côte d\'Ivoire pour résister aux instabilités réseau et aux coupures de courant grâce à des batteries et mémoires locales.',
    },
    {
      number: '04',
      icon: <Cpu className="w-5 h-5 text-[#0047AB]" />,
      title: 'Automatisation complète',
      description: 'Verrouillage automatique après 22h, extinction de l\'éclairage en cas d\'inoccupation et génération instantanée de codes pour les livreurs.',
    },
    {
      number: '05',
      icon: <DollarSign className="w-5 h-5 text-[#0047AB]" />,
      title: 'Réduction des pertes et des coûts',
      description: 'Économisez jusqu\'à 35% sur votre facture d\'électricité et éliminez définitivement les frais récurrents de reproduction ou remplacement de serrures.',
    },
    {
      number: '06',
      icon: <Smartphone className="w-5 h-5 text-[#0047AB]" />,
      title: 'Toujours connecté, toujours en contrôle',
      description: 'Où que vous soyez dans le monde, vérifiez qui est entré, verrouillez à distance et recevez des notifications instantanées avec preuve photo.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047AB]">
            Avantages Technologiques
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] tracking-tight mt-2">
            Pourquoi WizSmith ?
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Une architecture éprouvée combinant intelligence artificielle locale, matériel haute durabilité et maîtrise totale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="wiz-card p-7 rounded-2xl bg-white border border-slate-200/90 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-[#0047AB] tracking-widest font-mono">
                    {item.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
