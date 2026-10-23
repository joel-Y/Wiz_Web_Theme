import React from 'react';
import { Home, Key, Hotel, Building2, ArrowRight } from 'lucide-react';
import { PageId } from './Navbar';

interface SolutionsSectionProps {
  onNavigate: (page: PageId) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onNavigate }) => {
  const solutions = [
    {
      id: 'residences-airbnb' as PageId,
      image: '/src/assets/images/solution_luxury_villa_1792700326830.jpg',
      imageAlt: 'Villa moderne haut de gamme sécurisée avec serrure intelligente',
      badge: 'Résidentiel',
      title: 'Maisons & Villas Intelligentes',
      description: 'Protégez votre famille et votre patrimoine. Serrures connectées avec empreintes digitales, alertes périmétriques en temps réel et régulation d\'énergie.',
      features: ['Contrôle d\'accès sans clé', 'Détection IA anti-intrusion', 'Automatisations confort & clim'],
      cta: 'Explorer Résidences',
    },
    {
      id: 'residences-airbnb' as PageId,
      image: '/src/assets/images/solution_airbnb_west_african_1792714518119.jpg',
      imageAlt: 'Arrivée voyageur autonome avec serrure connectée WizLock',
      badge: 'Location courte durée',
      title: 'Airbnb & Appartements Meublés',
      description: 'Finies les remises de clés physiques. Codes temporaires générés automatiquement pour chaque voyageur, check-in autonome 24h/24 et économies d\'énergie.',
      features: ['Check-in 100% autonome', 'Codes PIN à durée limitée', 'Coupure clim dès le check-out'],
      cta: 'Découvrir Airbnb',
    },
    {
      id: 'hotels-intelligents' as PageId,
      image: '/src/assets/images/solution_boutique_hotel_1792700327955.jpg',
      imageAlt: 'Couloir hôtel de prestige et accès chambre connecté',
      badge: 'Hospitality',
      title: 'Hôtels & Résidences Connectés',
      description: 'Modernisez l\'expérience de vos clients tout en réduisant vos coûts d\'exploitation. Supervision centrale de toutes vos chambres et suivi du personnel de ménage.',
      features: ['Gestion centralisée multi-chambres', 'Économie jusqu\'à 35% d\'électricité', 'Traçabilité du personnel'],
      cta: 'Voir Hôtels Intelligents',
    },
    {
      id: 'solutions' as PageId,
      image: '/src/assets/images/solution_business_west_african_1792714518592.jpg',
      imageAlt: 'Contrôle d\'accès biométrique par badge pour cadre d\'entreprise ouest-africaine',
      badge: 'Bureaux & PME',
      title: 'Entreprises & Commerces Sécurisés',
      description: 'Maîtrisez les entrées et sorties de vos collaborateurs, protégez vos stocks et vos bureaux après la fermeture grâce à un journal d\'audit infalsifiable.',
      features: ['Badges & biométrie employés', 'Horodatage des passages', 'Rapports d\'activité hebdomadaires'],
      cta: 'Découvrir Pack Business',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0047AB]">
            Solutions Métiers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] tracking-tight mt-2">
            Une seule plateforme. Tous vos espaces.
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Que vous gériez une villa familiale, des appartements Airbnb, un hôtel ou un siège social, WizSmith adapte son architecture à vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {solutions.map((item, idx) => (
            <div
              key={idx}
              className="wiz-card rounded-3xl border border-slate-200/90 bg-white flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* Visual Header Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-slate-800 shadow-sm backdrop-blur-sm">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5 font-medium">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => onNavigate(item.id)}
                  className="wiz-btn w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-sm"
                >
                  <span>{item.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0047AB]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
