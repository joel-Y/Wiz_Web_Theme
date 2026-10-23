import React, { useState, useEffect } from 'react';
import { Shield, Check, X, SlidersHorizontal } from 'lucide-react';
import { CookiePreferences, sanitizeCookieConsent } from '../utils/rules';

interface CookieBannerProps {
  forceOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  forceOpenModal = false,
  onCloseModal,
}) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    } else {
      const storedPrefs = localStorage.getItem('cookiePreferences');
      if (storedPrefs) {
        try {
          const parsed = sanitizeCookieConsent(JSON.parse(storedPrefs));
          setAnalyticsAllowed(parsed.analytics);
          setMarketingAllowed(parsed.marketing);
        } catch {
          // ignore parsing error
        }
      }
    }
  }, []);

  useEffect(() => {
    if (forceOpenModal) {
      setShowModal(true);
    }
  }, [forceOpenModal]);

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = { essential: true, analytics: true, marketing: true };
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    setShowModal(false);
    if (onCloseModal) onCloseModal();
  };

  const handleDeclineAll = () => {
    const prefs: CookiePreferences = { essential: true, analytics: false, marketing: false };
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
    setShowModal(false);
    if (onCloseModal) onCloseModal();
  };

  const handleSavePreferences = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
    };
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    localStorage.setItem('cookieConsent', 'customized');
    setShowBanner(false);
    setShowModal(false);
    if (onCloseModal) onCloseModal();
  };

  const closeModal = () => {
    setShowModal(false);
    if (onCloseModal) onCloseModal();
  };

  return (
    <>
      {/* Floating Bottom Cookie Banner */}
      {showBanner && !showModal && (
        <aside
          id="cookie-banner"
          aria-label="Consentement aux cookies"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-xl z-40 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0047AB] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Protection &amp; Respect de vos données
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                WizSmith utilise des cookies indispensables pour assurer la sécurité et le bon fonctionnement de votre espace, ainsi que des mesures d'audience pour améliorer votre expérience immobilière connectée.
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  id="btn-accept-cookies"
                  onClick={handleAcceptAll}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0047AB] hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Accepter tout
                </button>
                <button
                  type="button"
                  id="btn-decline-cookies"
                  onClick={handleDeclineAll}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Refuser
                </button>
                <button
                  type="button"
                  id="btn-customize-cookies"
                  onClick={() => setShowModal(true)}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Personnaliser</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowBanner(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
              aria-label="Masquer temporairement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* Cookie Customization Modal */}
      {showModal && (
        <div
          id="cookie-settings-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Préférences de cookies WizSmith
              </h3>
              <button onClick={closeModal} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Essential */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Cookies Essentiels</span>
                  <span className="text-slate-500 text-[11px]">Indispensables pour la sécurité, l'authentification et les sessions.</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Toujours actif
                </span>
              </div>

              {/* Analytics */}
              <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-colors">
                <div>
                  <span className="font-bold text-slate-900 block">Cookies Analytiques</span>
                  <span className="text-slate-500 text-[11px]">Mesures anonymisées d'audience pour améliorer l'expérience utilisateur.</span>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0047AB] focus:ring-0 accent-[#0047AB]"
                />
              </label>

              {/* Marketing */}
              <label className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-colors">
                <div>
                  <span className="font-bold text-slate-900 block">Cookies Marketing &amp; Ciblage</span>
                  <span className="text-slate-500 text-[11px]">Recommandations adaptées à vos besoins de propriétés immobilières.</span>
                </div>
                <input
                  type="checkbox"
                  checked={marketingAllowed}
                  onChange={(e) => setMarketingAllowed(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0047AB] focus:ring-0 accent-[#0047AB]"
                />
              </label>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={handleDeclineAll}
                className="px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
              >
                Tout refuser
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-xl font-bold text-white bg-[#0047AB] hover:bg-blue-700 shadow-xs"
              >
                Enregistrer mes choix
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
