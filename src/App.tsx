/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ViewportMode, PageId } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemsSection } from './components/ProblemsSection';
import { WhySection } from './components/WhySection';
import { SolutionsSection } from './components/SolutionsSection';
import { AssessmentSection } from './components/AssessmentSection';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { ShuriAssistant } from './components/ShuriAssistant';
import { CookieBanner } from './components/CookieBanner';
import { OdooThemeInspector } from './components/OdooThemeInspector';
import { HowItWorksPage } from './components/HowItWorksPage';
import { ResidencesAirbnbPage } from './components/ResidencesAirbnbPage';
import { SmartHotelsPage } from './components/SmartHotelsPage';
import { AppointmentPage } from './components/AppointmentPage';
import { SupportPortalPage } from './components/SupportPortalPage';
import { Language } from './data/translations';
import { SEOHead } from './components/SEOHead';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [lang, setLang] = useState<Language>('fr');
  const [viewport, setViewport] = useState<ViewportMode>('full');
  const [themeInspectorOpen, setThemeInspectorOpen] = useState(false);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  // Sync RTL direction when Arabic is selected
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Scroll to top on page navigation
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAssessment = () => {
    if (currentPage === 'home') {
      const el = document.getElementById('assessment-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    handleNavigate('diagnostic');
  };

  const handleExploreSolutions = () => {
    if (currentPage === 'home') {
      const el = document.getElementById('pricing-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    handleNavigate('solutions');
  };

  // Viewport wrapper width classes
  const getViewportWidthClass = () => {
    switch (viewport) {
      case 'desktop':
        return 'max-w-[1440px] mx-auto shadow-2xl border-x border-slate-300';
      case 'tablet':
        return 'max-w-[768px] mx-auto shadow-2xl border-x border-slate-300';
      case 'mobile-lg':
        return 'max-w-[390px] mx-auto shadow-2xl border-x border-slate-300';
      case 'mobile-sm':
        return 'max-w-[320px] mx-auto shadow-2xl border-x border-slate-300';
      default:
        return 'w-full';
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] flex flex-col font-sans transition-all`}>
      {/* Outer frame when simulated viewport is active */}
      <div className={`flex-1 flex flex-col ${getViewportWidthClass()} bg-white relative transition-all`}>
        {/* Navigation Bar */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          lang={lang}
          onLanguageChange={setLang}
          viewport={viewport}
          onViewportChange={setViewport}
          themeInspectorOpen={themeInspectorOpen}
          onToggleThemeInspector={() => setThemeInspectorOpen(!themeInspectorOpen)}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <>
              {/* Section A & B: Hero */}
              <HeroSection
                lang={lang}
                onStartAssessment={handleStartAssessment}
                onExploreSolutions={handleExploreSolutions}
              />

              {/* Section C: Customer Problems */}
              <ProblemsSection onStartAssessment={handleStartAssessment} />

              {/* Section D: Why WizSmith */}
              <WhySection />

              {/* Section E: Customer-Specific Solutions */}
              <SolutionsSection onNavigate={handleNavigate} />

              {/* Section F: Property Security Assessment */}
              <AssessmentSection onNavigate={handleNavigate} />

              {/* Section G: Subscription Packages */}
              <PricingSection onNavigate={handleNavigate} />

              {/* Section H: Testimonials */}
              <TestimonialsSection />

              {/* Section I: Final CTA */}
              <FinalCtaSection onNavigate={handleNavigate} />
            </>
          )}

          {currentPage === 'how-it-works' && (
            <HowItWorksPage onNavigate={handleNavigate} />
          )}

          {currentPage === 'solutions' && (
            <div className="py-6">
              <PricingSection onNavigate={handleNavigate} />
              <SolutionsSection onNavigate={handleNavigate} />
            </div>
          )}

          {currentPage === 'residences-airbnb' && (
            <ResidencesAirbnbPage onNavigate={handleNavigate} />
          )}

          {currentPage === 'hotels-intelligents' && (
            <SmartHotelsPage onNavigate={handleNavigate} />
          )}

          {currentPage === 'diagnostic' && (
            <div className="py-6">
              <AssessmentSection onNavigate={handleNavigate} />
            </div>
          )}

          {currentPage === 'appointment' && (
            <AppointmentPage onNavigate={handleNavigate} />
          )}

          {currentPage === 'support' && (
            <SupportPortalPage onNavigate={handleNavigate} />
          )}
        </main>

        {/* Section J: Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenCookieSettings={() => setCookieModalOpen(true)}
        />

        {/* Shuri AI Assistant Floating Widget */}
        <ShuriAssistant />

        {/* Cookie Consent Banner & Modal */}
        <CookieBanner
          forceOpenModal={cookieModalOpen}
          onCloseModal={() => setCookieModalOpen(false)}
        />

        {/* WizSmith Web Theme Explorer & JSZip Exporter Modal */}
        <OdooThemeInspector
          isOpen={themeInspectorOpen}
          onClose={() => setThemeInspectorOpen(false)}
        />
      </div>
    </div>
  );
}
