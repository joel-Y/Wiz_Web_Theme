export type Language = 'fr' | 'en' | 'es' | 'ar';

export interface Translations {
  nav: {
    home: string;
    howItWorks: string;
    solutions: string;
    residences: string;
    hotels: string;
    diagnostic: string;
    appointment: string;
    themeExplorer: string;
  };
  hero: {
    badge: string;
    titlePart1: string;
    titlePart2: string;
    titlePart3: string;
    titlePart4: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      home: 'Accueil',
      howItWorks: 'Comment ça fonctionne',
      solutions: 'Solutions & Packs',
      residences: 'Résidences & Airbnb',
      hotels: 'Hôtels intelligents',
      diagnostic: 'Diagnostic IA Gratuit',
      appointment: 'Rendez-vous',
      themeExplorer: 'Module Web',
    },
    hero: {
      badge: 'Sécurité · Automatisation · Intelligence',
      titlePart1: 'Votre propriété.',
      titlePart2: 'Plus intelligente.',
      titlePart3: 'Plus sûre.',
      titlePart4: 'Sous contrôle.',
      subtitle: 'WizSmith protège et automatise votre maison, votre Airbnb, votre hôtel ou votre entreprise grâce à l\'intelligence artificielle et aux appareils connectés.',
      primaryCta: 'Découvrir mon score de sécurité gratuit',
      secondaryCta: 'Explorer nos solutions',
      trust1: 'Compatible caméras existantes',
      trust2: 'Installation professionnelle certifiée',
      trust3: 'Support local Abidjan 7j/7',
    },
  },
  en: {
    nav: {
      home: 'Home',
      howItWorks: 'How it Works',
      solutions: 'Solutions & Packages',
      residences: 'Residences & Airbnb',
      hotels: 'Smart Hotels',
      diagnostic: 'Free AI Assessment',
      appointment: 'Book Appointment',
      themeExplorer: 'Web Module',
    },
    hero: {
      badge: 'Security · Automation · Intelligence',
      titlePart1: 'Your property.',
      titlePart2: 'Smarter.',
      titlePart3: 'Safer.',
      titlePart4: 'Under control.',
      subtitle: 'WizSmith protects and automates your home, Airbnb, hotel, or business using artificial intelligence and connected smart devices.',
      primaryCta: 'Discover my free security score',
      secondaryCta: 'Explore our solutions',
      trust1: 'Works with existing cameras',
      trust2: 'Certified professional installation',
      trust3: 'Local support 7 days a week',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      howItWorks: 'Cómo funciona',
      solutions: 'Soluciones y Paquetes',
      residences: 'Residencias y Airbnb',
      hotels: 'Hoteles inteligentes',
      diagnostic: 'Diagnóstico IA Gratis',
      appointment: 'Cita previa',
      themeExplorer: 'Módulo Web',
    },
    hero: {
      badge: 'Seguridad · Automatización · Inteligencia',
      titlePart1: 'Su propiedad.',
      titlePart2: 'Más inteligente.',
      titlePart3: 'Más segura.',
      titlePart4: 'Bajo control.',
      subtitle: 'WizSmith protege y automatiza su hogar, Airbnb, hotel o empresa gracias a la inteligencia artificial y dispositivos conectados.',
      primaryCta: 'Descubrir mi puntuación de seguridad gratis',
      secondaryCta: 'Explorar soluciones',
      trust1: 'Compatible con cámaras existentes',
      trust2: 'Instalación profesional certificada',
      trust3: 'Soporte local los 7 días',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      howItWorks: 'كيف يعمل',
      solutions: 'الحلول والباقات',
      residences: 'المنازل وعقارات Airbnb',
      hotels: 'الفنادق الذكية',
      diagnostic: 'تقييم الذكاء الاصطناعي مجاناً',
      appointment: 'حجز موعد',
      themeExplorer: 'وحدة الويب',
    },
    hero: {
      badge: 'الأمان · الأتمتة · الذكاء',
      titlePart1: 'عقارك.',
      titlePart2: 'أكثر ذكاءً.',
      titlePart3: 'أكثر أماناً.',
      titlePart4: 'تحت السيطرة الكاملة.',
      subtitle: 'يحمي WizSmith ويؤتمت منزلك أو شقق Airbnb أو فندقك أو شركتك بفضل الذكاء الاصطناعي والأجهزة المتصلة.',
      primaryCta: 'اكتشف درجة الأمان المجانية لعقارك',
      secondaryCta: 'استكشف حلولنا',
      trust1: 'متوافق مع الكاميرات الحالية',
      trust2: 'تركيب احترافي معتمد',
      trust3: 'دعم محلي على مدار 7 أيام',
    },
  },
};
