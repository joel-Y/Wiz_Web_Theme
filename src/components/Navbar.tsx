import React, { useState } from 'react';
import { Shield, Menu, X, Globe, Smartphone, Monitor, Tablet, Code2, Calendar } from 'lucide-react';
import { Language, translations } from '../data/translations';

export type ViewportMode = 'full' | 'desktop' | 'tablet' | 'mobile-lg' | 'mobile-sm';
export type PageId = 'home' | 'how-it-works' | 'solutions' | 'residences-airbnb' | 'hotels-intelligents' | 'diagnostic' | 'appointment' | 'support';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  viewport: ViewportMode;
  onViewportChange: (vp: ViewportMode) => void;
  themeInspectorOpen: boolean;
  onToggleThemeInspector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  lang,
  onLanguageChange,
  viewport,
  onViewportChange,
  themeInspectorOpen,
  onToggleThemeInspector,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Utility Ribbon for Staging & Theme Tools */}
      <div className="bg-[#1A1A2E] text-white text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">WizSmith Property OS</span>
            <span className="hidden sm:inline text-slate-400">· PropTech Cloud OS Actif</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Viewport Simulation Controls */}
            <div className="hidden md:flex items-center gap-1 bg-slate-800/80 rounded-md p-0.5 border border-slate-700">
              <button
                onClick={() => onViewportChange('full')}
                title="Plein écran responsive"
                className={`p-1 rounded text-xs transition-colors ${viewport === 'full' ? 'bg-[#0047AB] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Auto
              </button>
              <button
                onClick={() => onViewportChange('desktop')}
                title="Desktop (1440px)"
                className={`p-1 rounded text-xs flex items-center gap-1 ${viewport === 'desktop' ? 'bg-[#0047AB] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>1440</span>
              </button>
              <button
                onClick={() => onViewportChange('tablet')}
                title="Tablet (768px)"
                className={`p-1 rounded text-xs flex items-center gap-1 ${viewport === 'tablet' ? 'bg-[#0047AB] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>768</span>
              </button>
              <button
                onClick={() => onViewportChange('mobile-lg')}
                title="Mobile (390px iPhone)"
                className={`p-1 rounded text-xs flex items-center gap-1 ${viewport === 'mobile-lg' ? 'bg-[#0047AB] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>390</span>
              </button>
              <button
                onClick={() => onViewportChange('mobile-sm')}
                title="Mobile Étroit (320px)"
                className={`p-1 rounded text-xs flex items-center gap-1 ${viewport === 'mobile-sm' ? 'bg-[#0047AB] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <span>320</span>
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={lang}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-white text-xs border border-slate-700 rounded px-1.5 py-0.5 focus:outline-none focus:border-[#0047AB]"
                aria-label="Sélectionner la langue"
              >
                <option value="fr" className="bg-slate-900 text-white">Français (FR)</option>
                <option value="en" className="bg-slate-900 text-white">English (EN)</option>
                <option value="es" className="bg-slate-900 text-white">Español (ES)</option>
                <option value="ar" className="bg-slate-900 text-white">العربية (AR RTL)</option>
              </select>
            </div>



            {/* Theme Inspector Button */}
            <button
              onClick={onToggleThemeInspector}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                themeInspectorOpen
                  ? 'bg-[#E8630A] text-white shadow-sm'
                  : 'bg-[#0047AB] text-white hover:bg-blue-700'
              }`}
              title="Inspecter l'architecture et télécharger le module ZIP"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{t.themeExplorer} (.zip)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left focus:outline-none"
            aria-label="WizSmith Accueil"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0047AB] to-[#1A1A2E] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#0047AB]">
                Wiz<span className="text-[#E8630A]">Smith</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                Property Tech
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Menu principal">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'text-[#0047AB] bg-blue-50/60'
                  : 'text-slate-700 hover:text-[#0047AB] hover:bg-slate-50'
              }`}
            >
              {t.home}
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentPage === 'how-it-works'
                  ? 'text-[#0047AB] bg-blue-50/60'
                  : 'text-slate-700 hover:text-[#0047AB] hover:bg-slate-50'
              }`}
            >
              {t.howItWorks}
            </button>
            <button
              onClick={() => handleNavClick('solutions')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentPage === 'solutions'
                  ? 'text-[#0047AB] bg-blue-50/60'
                  : 'text-slate-700 hover:text-[#0047AB] hover:bg-slate-50'
              }`}
            >
              {t.solutions}
            </button>
            <button
              onClick={() => handleNavClick('residences-airbnb')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentPage === 'residences-airbnb'
                  ? 'text-[#0047AB] bg-blue-50/60'
                  : 'text-slate-700 hover:text-[#0047AB] hover:bg-slate-50'
              }`}
            >
              {t.residences}
            </button>
            <button
              onClick={() => handleNavClick('hotels-intelligents')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentPage === 'hotels-intelligents'
                  ? 'text-[#0047AB] bg-blue-50/60'
                  : 'text-slate-700 hover:text-[#0047AB] hover:bg-slate-50'
              }`}
            >
              {t.hotels}
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('appointment')}
              className="wiz-btn hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#0047AB] rounded-lg"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>{t.appointment}</span>
            </button>

            <button
              onClick={() => handleNavClick('diagnostic')}
              className="wiz-btn inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white bg-[#E8630A] hover:bg-[#d45806] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E8630A] focus:ring-offset-2"
            >
              {t.diagnostic}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('diagnostic')}
              className="inline-flex sm:hidden items-center justify-center px-3 py-1.5 text-xs font-bold text-white bg-[#E8630A] rounded-lg shadow-xs"
            >
              Diagnostic
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-[#0047AB] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
              aria-expanded={mobileMenuOpen}
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1.5">
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center px-4 py-3 text-base font-semibold rounded-xl text-left ${
                currentPage === 'home' ? 'text-[#0047AB] bg-blue-50' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              {t.home}
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`flex items-center px-4 py-3 text-base font-semibold rounded-xl text-left ${
                currentPage === 'how-it-works' ? 'text-[#0047AB] bg-blue-50' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              {t.howItWorks}
            </button>
            <button
              onClick={() => handleNavClick('solutions')}
              className={`flex items-center px-4 py-3 text-base font-semibold rounded-xl text-left ${
                currentPage === 'solutions' ? 'text-[#0047AB] bg-blue-50' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              {t.solutions}
            </button>
            <button
              onClick={() => handleNavClick('residences-airbnb')}
              className={`flex items-center px-4 py-3 text-base font-semibold rounded-xl text-left ${
                currentPage === 'residences-airbnb' ? 'text-[#0047AB] bg-blue-50' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              {t.residences}
            </button>
            <button
              onClick={() => handleNavClick('hotels-intelligents')}
              className={`flex items-center px-4 py-3 text-base font-semibold rounded-xl text-left ${
                currentPage === 'hotels-intelligents' ? 'text-[#0047AB] bg-blue-50' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              {t.hotels}
            </button>
            <button
              onClick={() => handleNavClick('appointment')}
              className={`flex items-center px-4 py-3 text-base font-semibold rounded-xl text-left ${
                currentPage === 'appointment' ? 'text-[#0047AB] bg-blue-50' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              {t.appointment}
            </button>
            <button
              onClick={() => handleNavClick('support')}
              className={`flex items-center px-4 py-3 text-base font-semibold rounded-xl text-left ${
                currentPage === 'support' ? 'text-[#0047AB] bg-blue-50' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Services WizFix &amp; WizRenouv
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('diagnostic')}
              className="w-full py-3 px-4 rounded-xl font-bold text-center text-white bg-[#E8630A] shadow-md hover:bg-[#d45806]"
            >
              {t.diagnostic}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleThemeInspector();
              }}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-center text-slate-700 bg-slate-100 hover:bg-slate-200 text-sm flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4 text-[#0047AB]" />
              <span>{t.themeExplorer}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
