import React from 'react';
import { Shield, Mail, MapPin, Globe, PhoneCall } from 'lucide-react';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenCookieSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCookieSettings }) => {
  return (
    <footer className="bg-[#1A1A2E] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0047AB] to-blue-900 flex items-center justify-center text-white">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Wiz<span className="text-[#E8630A]">Smith</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              WizSmith est la référence des technologies immobilières intelligentes en Côte d'Ivoire. Nous combinons intelligence artificielle proactive, serrures connectées et automatisation d'énergie pour assurer la sérénité des propriétaires et des entreprises.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
              <span className="text-emerald-400">●</span>
              <span>Infrastructure PropTech Cloud Active</span>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-white transition-colors">
                  Pack Business (25k)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-white transition-colors">
                  Pack Élite (40k)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-white transition-colors">
                  Pack Prestige (50k)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('residences-airbnb')} className="hover:text-white transition-colors">
                  Maisons &amp; Villas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('residences-airbnb')} className="hover:text-white transition-colors">
                  Airbnb Automatisés
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hotels-intelligents')} className="hover:text-white transition-colors">
                  Hôtels Intelligents
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Support */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Services &amp; Outils
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('diagnostic')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#E8630A]">⚡</span>
                  <span>Diagnostic IA de Sécurité</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">
                  Comment ça fonctionne
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('appointment')} className="hover:text-white transition-colors">
                  Prendre rendez-vous
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-white transition-colors">
                  WizFix (Maintenance &amp; Dépannage)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-white transition-colors">
                  WizRenouv (Garanties &amp; Renouvellements)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Implantation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Contact &amp; Siège
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a href="mailto:contact@wizsmith.com" className="hover:text-white">
                  contact@wizsmith.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                <a href="https://wizsmith.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  https://wizsmith.com/
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('appointment')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#0047AB]" />
                <span>Demander un rappel expert</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 WizSmith Technologies. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCookieSettings}
              className="hover:text-slate-300 transition-colors underline underline-offset-4"
            >
              Gestion des cookies
            </button>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Politique de confidentialité</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Conditions générales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
