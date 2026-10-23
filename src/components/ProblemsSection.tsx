import React from 'react';
import { KeyRound, AlertTriangle, Clock, Users, ZapOff, EyeOff, ArrowRight } from 'lucide-react';

interface ProblemsSectionProps {
  onStartAssessment: () => void;
}

export const ProblemsSection: React.FC<ProblemsSectionProps> = ({ onStartAssessment }) => {
  const problems = [
    {
      icon: <KeyRound className="w-6 h-6 text-[#E8630A]" />,
      title: "Clés perdues & accès non contrôlés",
      description: "Des doubles de clés circulent sans contrôle. À chaque départ de locataire ou d'employé, vous êtes contraint de remplacer le barillet dans l'urgence.",
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: "Incidents de sécurité constatés trop tard",
      description: "Vos caméras actuelles enregistrent passivement. Vous ne découvrez une effraction ou un vol qu'après coup, sans avoir reçu d'alerte proactive instantanée.",
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-500" />,
      title: "Check-ins Airbnb contraignants",
      description: "Attentes nocturnes pour les vols retardés à Abidjan, déplacements coûteux pour une simple remise de clés et stress constant lié aux avis négatifs.",
    },
    {
      icon: <Users className="w-6 h-6 text-[#0047AB]" />,
      title: "Supervision du personnel complexe",
      description: "Aucun moyen objectif de certifier les heures réelles de ménage, de gardiennage ou de passage des prestataires techniques sur vos propriétés.",
    },
    {
      icon: <ZapOff className="w-6 h-6 text-amber-600" />,
      title: "Gaspillage d'énergie massif",
      description: "Climatiseurs laissés allumés à 18°C dans des pièces inoccupées toute la journée. Vos factures CIE explosent inutilement chaque mois.",
    },
    {
      icon: <EyeOff className="w-6 h-6 text-slate-700" />,
      title: "Manque total de visibilité en déplacement",
      description: "Dès que vous voyagez hors de la ville ou à l'étranger, vous perdez le contact visuel et opérationnel avec vos biens les plus précieux.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] tracking-tight">
            Vous gérez encore votre propriété manuellement ?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Pendant que vous gérez les problèmes, votre propriété devrait travailler pour vous.
          </p>
        </div>

        {/* 6 Responsive Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((item, idx) => (
            <div
              key={idx}
              className="wiz-card p-6 sm:p-7 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-2.5">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Solution Callout Banner */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#1A1A2E] via-[#0047AB] to-[#1A1A2E] text-white p-8 sm:p-10 text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            WizSmith automatise tout ça !
          </h3>
          <p className="text-slate-200 text-base max-w-2xl mx-auto mb-6">
            Passez à la gestion autonome : serrures connectées, alertes IA sur votre smartphone et économies d'énergie automatiques.
          </p>
          <button
            onClick={onStartAssessment}
            className="wiz-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#1A1A2E] bg-white hover:bg-slate-100 shadow-md"
          >
            <span>Faire mon diagnostic gratuit</span>
            <ArrowRight className="w-4 h-4 text-[#E8630A]" />
          </button>
        </div>
      </div>
    </section>
  );
};
