/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect } from 'react';
import { PageId } from './Navbar';

export interface SectionSEOMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  ogImage: string;
  ogImageAlt: string;
  ogType: string;
  category: string;
  structuredDataType: string;
}

export const CORE_SECTIONS_SEO: Record<PageId, SectionSEOMetadata> = {
  'home': {
    title: 'WizSmith | PropTech & Automatisation Immobilière',
    description: 'Sécurisez et automatisez vos propriétés en Côte d\'Ivoire : serrures connectées, vidéosurveillance IA et régulation énergétique pour résidences et hôtels.',
    keywords: 'PropTech Abidjan, domotique Côte d\'Ivoire, serrures connectées, caméras IA, économies d\'énergie CIE, contrôle d\'accès',
    canonicalPath: '/',
    ogImage: '/assets/og-wizsmith-main.png',
    ogImageAlt: 'WizSmith PropTech Immobilière & Sécurité Connectée',
    ogType: 'website',
    category: 'Accueil & Plateforme',
    structuredDataType: 'Organization, WebApplication'
  },
  'how-it-works': {
    title: 'Comment ça marche | Processus & Installation WizSmith',
    description: 'Découvrez la méthode WizSmith en 4 étapes : audit technique, installation de serrures intelligentes, automatisation logicielle et maintenance continue.',
    keywords: 'processus domotique, installation serrures intelligentes, audit technique Abidjan, automatisation immobilière, WizFix',
    canonicalPath: '/comment-ca-fonctionne',
    ogImage: '/assets/og-wizsmith-how-it-works.png',
    ogImageAlt: 'Processus et Méthodologie d\'Installation WizSmith',
    ogType: 'article',
    category: 'Méthodologie & Déploiement',
    structuredDataType: 'HowTo'
  },
  'solutions': {
    title: 'Packs & Solutions Immobilières | Tarifs WizSmith',
    description: 'Comparez nos packs Business, Élite et Prestige dès 29 900 FCFA/mois. Serrures connectées, caméras IA et gestion d\'énergie avec prix à partir de.',
    keywords: 'tarifs domotique, pack serrure connectée, WizSmith Business, WizSmith Élite, abonnement sécurité Côte d\'Ivoire',
    canonicalPath: '/packs',
    ogImage: '/assets/og-wizsmith-packs.png',
    ogImageAlt: 'Packs d\'Abonnement et Tarifs WizSmith « À partir de : »',
    ogType: 'product',
    category: 'Solutions & Abonnements',
    structuredDataType: 'Product, AggregateOffer'
  },
  'residences-airbnb': {
    title: 'Résidences & Airbnb | Gestion Intelligente WizSmith',
    description: 'Automatisez vos locations Airbnb à Abidjan : serrures biométriques, check-in autonome sans clé, coupure auto clim et surveillance IA respectueuse.',
    keywords: 'Airbnb Abidjan serrure connectée, check-in autonome sans clé, coupure clim Airbnb, gestion meublé distance',
    canonicalPath: '/residences-airbnb',
    ogImage: '/assets/og-wizsmith-airbnb.png',
    ogImageAlt: 'Gestion Intelligente et Self Check-in pour Airbnb & Résidences',
    ogType: 'service',
    category: 'Résidences & Airbnb',
    structuredDataType: 'Service'
  },
  'hotels-intelligents': {
    title: 'Hôtels Intelligents | Gestion Énergie & Accès WizSmith',
    description: 'Modernisez votre hôtel en Afrique de l\'Ouest : serrures RFID centralisées, extinction auto climatiseurs inoccupés et réduction massive de factures.',
    keywords: 'domotique hôtel Abidjan, serrures RFID hôtel, économie énergie climatisation hôtel, logiciel gestion hôtelière',
    canonicalPath: '/hotels-intelligents',
    ogImage: '/assets/og-wizsmith-hotels.png',
    ogImageAlt: 'Solutions Hôtelières Connectées WizSmith & Réduction Énergie',
    ogType: 'service',
    category: 'Hôtellerie & Grands Ensembles',
    structuredDataType: 'Service'
  },
  'appointment': {
    title: 'Prendre Rendez-vous | Consultation PropTech WizSmith',
    description: 'Planifiez un audit technique sur site à Abidjan ou une consultation visio avec nos ingénieurs en domotique et sécurité immobilière connectée.',
    keywords: 'rendez-vous domotique Abidjan, consultation sécurité immobilière, audit domotique gratuit, experts PropTech',
    canonicalPath: '/page/appointment',
    ogImage: '/assets/og-wizsmith-appointment.png',
    ogImageAlt: 'Prendre Rendez-vous avec les Ingénieurs WizSmith',
    ogType: 'website',
    category: 'Audit & Consultation',
    structuredDataType: 'ContactPage, Service'
  },
  'diagnostic': {
    title: 'Diagnostic & Simulateur Gratuit | IA WizSmith',
    description: 'Calculez vos économies d\'énergie et évaluez la sécurité de votre propriété en 2 minutes grâce au simulateur d\'intelligence immobilière WizSmith.',
    keywords: 'simulateur économie climatisation, diagnostic sécurité immobilière, évaluation domotique Abidjan, score propriété',
    canonicalPath: '/support-ia',
    ogImage: '/assets/og-wizsmith-diagnostic.png',
    ogImageAlt: 'Simulateur d\'Économies CIE et Diagnostic Immobilier WizSmith',
    ogType: 'website',
    category: 'Diagnostic & IA',
    structuredDataType: 'WebApplication'
  },
  'support': {
    title: 'Support & Maintenance WizFix | Service Client WizSmith',
    description: 'Portail de support technique WizFix et garanties matérielles WizRenouv. Assistance prioritaire 24/7 et techniciens d\'intervention à Abidjan.',
    keywords: 'support WizFix, maintenance serrure connectée, garantie matériel WizRenouv, dépannage domotique Abidjan',
    canonicalPath: '/support-ia',
    ogImage: '/assets/og-wizsmith-main.png',
    ogImageAlt: 'Portail Support & Maintenance WizSmith',
    ogType: 'website',
    category: 'Support & Maintenance',
    structuredDataType: 'ContactPage'
  }
};

interface SEOHeadProps {
  currentPage: PageId;
}

export function SEOHead({ currentPage }: SEOHeadProps) {
  const meta = CORE_SECTIONS_SEO[currentPage] || CORE_SECTIONS_SEO['home'];

  useEffect(() => {
    // 1. Update Title
    document.title = meta.title;

    // Helper to safely update meta tags
    const updateMetaTag = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('property=')) {
          const prop = selector.match(/property="([^"]+)"/)?.[1];
          if (prop) el.setAttribute('property', prop);
        } else if (selector.includes('name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // 2. Primary Meta
    updateMetaTag('meta[name="description"]', 'content', meta.description);
    updateMetaTag('meta[name="keywords"]', 'content', meta.keywords);

    // 3. OpenGraph Tags
    updateMetaTag('meta[property="og:title"]', 'content', meta.title);
    updateMetaTag('meta[property="og:description"]', 'content', meta.description);
    updateMetaTag('meta[property="og:url"]', 'content', `https://wizsmith.com${meta.canonicalPath}`);
    updateMetaTag('meta[property="og:type"]', 'content', meta.ogType);
    updateMetaTag('meta[property="og:image"]', 'content', `https://wizsmith.com${meta.ogImage}`);
    updateMetaTag('meta[property="og:image:secure_url"]', 'content', `https://wizsmith.com${meta.ogImage}`);
    updateMetaTag('meta[property="og:image:alt"]', 'content', meta.ogImageAlt);

    // 4. Twitter Cards
    updateMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    updateMetaTag('meta[name="twitter:description"]', 'content', meta.description);
    updateMetaTag('meta[name="twitter:image"]', 'content', `https://wizsmith.com${meta.ogImage}`);
    updateMetaTag('meta[name="twitter:image:alt"]', 'content', meta.ogImageAlt);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://wizsmith.com${meta.canonicalPath}`;
  }, [meta]);

  return null;
}
