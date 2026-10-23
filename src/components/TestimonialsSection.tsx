import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      author: 'Amadou K.',
      role: 'Propriétaire de 3 appartements Airbnb',
      location: 'Cocody Riviera, Abidjan',
      initials: 'AK',
      content:
        'Pour mes locations courte durée, WizSmith a éliminé le calvaire des arrivées tardives. Chaque voyageur reçoit son code PIN par SMS et entre en toute autonomie. Mon score Airbnb est passé à 4.95 étoiles.',
      rating: 5,
    },
    {
      author: 'Serge B.',
      role: 'Directeur Général, Cabinet Conseil',
      location: 'Zone 4, Marcory',
      initials: 'SB',
      content:
        'Le raccordement de l\'IA WizSmith à notre système de caméras existant a transformé notre sécurité. Nous ne recevons plus que les alertes critiques avec photo sur nos téléphones. C\'est fiable et réactif.',
      rating: 5,
    },
    {
      author: 'Marie-Esther D.',
      role: 'Gestionnaire de Résidence Hôtelière',
      location: 'Plateau & Biétry',
      initials: 'ME',
      content:
        'La régulation automatique de la climatisation nous a fait économiser plus de 32% sur notre facture CIE dès le premier mois. L\'investissement dans le Pack Prestige a été rentabilisé en un temps record.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047AB]">
            Retours d'Expérience Réels
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] tracking-tight mt-2">
            Ils font confiance à WizSmith
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Découvrez comment propriétaires et professionnels sécurisent leurs biens en Côte d'Ivoire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="wiz-card p-7 rounded-3xl bg-white border border-slate-200/90 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200 group-hover:text-[#0047AB] transition-colors" />
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0047AB] to-[#1A1A2E] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1A2E] leading-tight">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {item.role} · <span className="text-slate-400">{item.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
