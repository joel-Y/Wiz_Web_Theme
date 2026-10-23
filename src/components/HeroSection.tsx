import React, { useState } from 'react';
import { ArrowRight, KeyRound, Eye, Zap, ShieldCheck, Check, Sparkles, Building2, Home, Key, Hotel } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface HeroSectionProps {
  lang: Language;
  onStartAssessment: () => void;
  onExploreSolutions: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onStartAssessment,
  onExploreSolutions,
}) => {
  const t = translations[lang].hero;
  const [activeSpace, setActiveSpace] = useState<'residential' | 'airbnb' | 'hotel' | 'business'>('airbnb');

  const spacesData = {
    airbnb: {
      title: 'Airbnb & Appartements Meublés',
      badge: 'Location Courte Durée',
      metric: '18h gagnées / mois',
      metricSub: 'Check-in 100% autonome sans déplacement',
      items: [
        { icon: <KeyRound className="w-4 h-4 text-[#0047AB]" />, label: 'Codes PIN temporaires envoyés automatiquement par voyageur' },
        { icon: <Zap className="w-4 h-4 text-[#E8630A]" />, label: 'Coupure auto de la climatisation dès le check-out (-35% CIE)' },
        { icon: <Eye className="w-4 h-4 text-emerald-600" />, label: 'Alertes intrusions et mouvements anormaux en période vacante' },
      ],
      tag: 'Recommandé pour les hôtes à Cocody, Marcory, Plateau',
    },
    residential: {
      title: 'Maisons & Villas Privées',
      badge: 'Résidentiel Haut de Gamme',
      metric: '0 clé physique',
      metricSub: 'Empreintes, codes sécurisés et contrôle smartphone',
      items: [
        { icon: <KeyRound className="w-4 h-4 text-[#0047AB]" />, label: 'Serrures WizLock Pro inviolables à reconnaissance biométrique' },
        { icon: <Eye className="w-4 h-4 text-emerald-600" />, label: 'Détection IA des silhouettes humaines sur caméras existantes' },
        { icon: <Zap className="w-4 h-4 text-[#E8630A]" />, label: 'Scénarios de verrouillage nocturne et éclairage connecté' },
      ],
      tag: 'Protection périmétrique familiale complète',
    },
    hotel: {
      title: 'Hôtels & Résidences Hôtelières',
      badge: 'Hospitality Connectée',
      metric: '-32% d\'électricité',
      metricSub: 'Supervision centralisée chambre par chambre',
      items: [
        { icon: <Hotel className="w-4 h-4 text-[#0047AB]" />, label: 'Accès sans contact aux chambres sans attente à la réception' },
        { icon: <Zap className="w-4 h-4 text-[#E8630A]" />, label: 'Régulation thermique intelligente selon l\'occupation réelle' },
        { icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />, label: 'Traçabilité du passage du personnel de ménage et maintenance' },
      ],
      tag: 'Expérience client VIP & rentabilité d\'exploitation',
    },
    business: {
      title: 'Bureaux, Commerces & PME',
      badge: 'Sécurité Entreprise',
      metric: 'Audit 100% fiable',
      metricSub: 'Journal infalsifiable des entrées et sorties collaborateurs',
      items: [
        { icon: <Building2 className="w-4 h-4 text-[#0047AB]" />, label: 'Contrôle d\'accès par badges RFID et codes horaires stricts' },
        { icon: <Eye className="w-4 h-4 text-emerald-600" />, label: 'Vigilance nocturne avec transmission photo instantanée' },
        { icon: <ShieldCheck className="w-4 h-4 text-[#0047AB]" />, label: 'Rapports hebdomadaires de présence et protection des stocks' },
      ],
      tag: 'Sérénité pour dirigeants et gestionnaires de sites',
    },
  };

  const spaceImages: Record<string, { src: string; alt: string }> = {
    airbnb: {
      src: '/src/assets/images/solution_airbnb_west_african_1792714518119.jpg',
      alt: 'Arrivée autonome Airbnb sans contact avec serrure connectée WizLock',
    },
    residential: {
      src: '/src/assets/images/solution_luxury_villa_1792700326830.jpg',
      alt: 'Entrée sécurisée villa de luxe avec serrure biométrique intelligente',
    },
    hotel: {
      src: '/src/assets/images/solution_boutique_hotel_1792700327955.jpg',
      alt: 'Chambre hôtel connecté avec accès RFID et régulation thermique',
    },
    business: {
      src: '/src/assets/images/solution_business_west_african_1792714518592.jpg',
      alt: 'Contrôle d\'accès biométrique pour bureaux et entreprises',
    },
  };

  const currentSpace = spacesData[activeSpace];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-slate-100/70 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-6 space-y-6 animate-fade-in-up">
            {/* Introductory Brand Statement */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#E8630A]" />
              <span className="text-xs font-semibold text-slate-700 tracking-wide">
                {t.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A2E] tracking-tight leading-[1.12]">
              {t.titlePart1} <br />
              <span className="text-[#0047AB]">{t.titlePart2}</span> {t.titlePart3} <br />
              <span className="text-[#E8630A]">{t.titlePart4}</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              {t.subtitle}
            </p>

            {/* Conversion CTA Group with purposeful click feedback */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <button
                onClick={onStartAssessment}
                className="wiz-btn inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-bold text-white bg-[#E8630A] hover:bg-[#d45806] rounded-2xl shadow-md hover:shadow-lg focus:ring-4 focus:ring-orange-200"
              >
                <span>{t.primaryCta}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreSolutions}
                className="wiz-btn inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-[#1A1A2E] bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 rounded-2xl"
              >
                {t.secondaryCta}
              </button>
            </div>

            {/* Trust Signals */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.trust1}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.trust2}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.trust3}</span>
              </div>
            </div>

            {/* Verified Villa Deployment Ribbon */}
            <div className="pt-2">
              <div className="p-3 bg-white/95 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                <img
                  src="/src/assets/images/hero_smart_property_1792700326771.jpg"
                  alt="Villa moderne connectée à Abidjan"
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                />
                <div className="text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Déploiements certifiés en Côte d'Ivoire</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Cocody, Riviera Golf, Marcory, Plateau · +40 propriétés déjà automatisées
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Premium Smart Property Showcase Card (Replaces OS live control) */}
          <div className="lg:col-span-6 animate-fade-in-up delay-100">
            <div className="wiz-card bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
              {/* Top Navigation Tabs */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Applications Spécifiques
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0047AB]">
                  Solutions Clé en Main
                </span>
              </div>

              {/* Segmented Switcher Controls */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100/90 rounded-2xl mb-5">
                {[
                  { id: 'airbnb', label: 'Airbnb', icon: <Key className="w-3.5 h-3.5" /> },
                  { id: 'residential', label: 'Maison', icon: <Home className="w-3.5 h-3.5" /> },
                  { id: 'hotel', label: 'Hôtel', icon: <Hotel className="w-3.5 h-3.5" /> },
                  { id: 'business', label: 'Entreprise', icon: <Building2 className="w-3.5 h-3.5" /> },
                ].map((tab) => {
                  const isActive = activeSpace === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveSpace(tab.id as any)}
                      className={`wiz-btn py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-white text-[#0047AB] shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Space Content */}
              <div className="space-y-4">
                {/* Photo showcase for active space */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9] shadow-inner bg-slate-900 group">
                  <img
                    src={spaceImages[activeSpace].src}
                    alt={spaceImages[activeSpace].alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1.5 font-semibold bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{currentSpace.badge}</span>
                    </div>
                    <span className="font-mono text-[11px] bg-[#0047AB]/90 backdrop-blur-md px-2 py-0.5 rounded-md font-bold">
                      {currentSpace.metric}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#E8630A] uppercase tracking-wider">
                      {currentSpace.badge}
                    </span>
                    <h3 className="text-xl font-bold text-[#1A1A2E] mt-0.5">
                      {currentSpace.title}
                    </h3>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 p-3 rounded-2xl border border-blue-100 text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-[#0047AB] font-mono block leading-none">
                      {currentSpace.metric}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Gain mesuré
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0047AB] shrink-0" />
                  <span>{currentSpace.metricSub}</span>
                </div>

                {/* Checklist of key capabilities */}
                <div className="space-y-2.5 pt-1">
                  {currentSpace.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="wiz-card p-3 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 flex items-center gap-3 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium text-slate-700">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Tag & Action */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 text-center sm:text-left">
                    📍 {currentSpace.tag}
                  </span>
                  <button
                    onClick={onStartAssessment}
                    className="wiz-btn text-xs font-bold text-[#0047AB] hover:text-blue-800 flex items-center gap-1 group"
                  >
                    <span>Calculer pour mon bien</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
