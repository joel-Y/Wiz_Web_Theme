/**
 * WizSmith Property Security Assessment & Business Rules Engine
 * Pure logic decoupled from UI for deterministic testing and runtime calculations.
 */

export type PropertyType = 'residential' | 'airbnb' | 'hotel' | 'business';

export interface AssessmentInput {
  propertyType: PropertyType;
  surfaceM2: number;
  entryPointsCount: number;
  hasSmartLocks: boolean;
  cameraCount: number;
  hasAiDetection: boolean;
  hasStaffMonitoring: boolean;
  hasEnergyAutomation: boolean;
  hasRemoteControl: boolean;
}

export interface AssessmentResult {
  score: number; // 0 to 100
  riskLevel: 'faible' | 'modéré' | 'élevé' | 'critique';
  identifiedRisks: string[];
  recommendedEquipments: Array<{ name: string; priority: 'Haute' | 'Moyenne'; rationale: string }>;
  recommendedAutomations: string[];
  recommendedPlan: 'BUSINESS' | 'ÉLITE' | 'PRESTIGE';
  monthlyEstimateCFA: number;
}

export function calculatePropertySecurityScore(input: AssessmentInput): AssessmentResult {
  let score = 25; // baseline manual setup score
  const risks: string[] = [];
  const equipments: Array<{ name: string; priority: 'Haute' | 'Moyenne'; rationale: string }> = [];
  const automations: string[] = [];

  // 1. Physical Access & Lock Evaluation
  if (input.hasSmartLocks) {
    score += 20;
    automations.push("Génération automatique de codes temporaires sécurisés.");
  } else {
    risks.push("Clés physiques vulnérables aux doubles non autorisés et pertes.");
    equipments.push({
      name: "Serrure Intelligente WizLock Pro",
      priority: 'Haute',
      rationale: "Supprime les clés physiques et enregistre chaque passage avec horodatage."
    });
  }

  // 2. Camera & Visual Surveillance Evaluation
  if (input.cameraCount === 0) {
    risks.push("Absence de vision en temps réel en cas d'intrusion ou d'incident.");
    equipments.push({
      name: "Caméras Haute Définition Intelligentes WizVision",
      priority: 'Haute',
      rationale: "Couvre les zones stratégiques et points d'accès vulnérables."
    });
  } else if (input.cameraCount > 0 && !input.hasAiDetection) {
    score += 10;
    risks.push("Caméras passives nécessitant un visionnage manuel fastidieux.");
    equipments.push({
      name: "Module IA WizBridge pour caméras existantes",
      priority: 'Haute',
      rationale: "Transforme vos caméras actuelles en système proactif avec détection humaine/véhicule."
    });
  } else if (input.hasAiDetection) {
    score += 25;
    automations.push("Détection IA instantanée des silhouettes et alertes filtrées anti-fausse alarme.");
  }

  // 3. Remote Control & Centralization
  if (input.hasRemoteControl) {
    score += 15;
  } else {
    risks.push("Manque de visibilité et incapacité d'intervention lors de vos déplacements.");
  }

  // 4. Energy & Property automation
  if (input.hasEnergyAutomation) {
    score += 10;
    automations.push("Coupure automatique de la climatisation et des lumières lors des absences.");
  } else {
    if (input.propertyType === 'airbnb' || input.propertyType === 'hotel' || input.propertyType === 'business') {
      risks.push("Gaspillage énergétique important (climatiseurs en marche dans les espaces inoccupés).");
      equipments.push({
        name: "Thermostats & Relais d'Énergie Connectés",
        priority: 'Moyenne',
        rationale: "Économise jusqu'à 35% sur la facture électrique Sonabel/CIE."
      });
    }
  }

  // 5. Staff Accountability / Hospitality specific
  if (input.propertyType === 'hotel' || input.propertyType === 'business') {
    if (input.hasStaffMonitoring) {
      score += 5;
    } else {
      risks.push("Manque de traçabilité des heures d'arrivée et d'intervention des équipes.");
    }
  }

  // Clamp score
  score = Math.min(100, Math.max(10, score));

  // Determine risk level
  let riskLevel: 'faible' | 'modéré' | 'élevé' | 'critique';
  if (score >= 80) riskLevel = 'faible';
  else if (score >= 60) riskLevel = 'modéré';
  else if (score >= 40) riskLevel = 'élevé';
  else riskLevel = 'critique';

  // Determine plan recommendation based on domain and scale
  let recommendedPlan: 'BUSINESS' | 'ÉLITE' | 'PRESTIGE' = 'ÉLITE';
  let monthlyEstimateCFA = 40000;

  if (input.propertyType === 'business') {
    recommendedPlan = 'BUSINESS';
    monthlyEstimateCFA = 25000;
  } else if (input.propertyType === 'hotel' || (input.surfaceM2 > 350 && input.propertyType === 'residential')) {
    recommendedPlan = 'PRESTIGE';
    monthlyEstimateCFA = 50000;
  } else {
    recommendedPlan = 'ÉLITE';
    monthlyEstimateCFA = 40000;
  }

  return {
    score,
    riskLevel,
    identifiedRisks: risks.length > 0 ? risks : ["Faible vulnérabilité résiduelle aux coupures réseau."],
    recommendedEquipments: equipments,
    recommendedAutomations: automations,
    recommendedPlan,
    monthlyEstimateCFA,
  };
}

export function formatCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

export interface CookiePreferences {
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

export function sanitizeCookieConsent(raw: unknown): CookiePreferences {
  if (typeof raw !== 'object' || raw === null) {
    return { essential: true, analytics: false, marketing: false };
  }
  const obj = raw as Record<string, unknown>;
  return {
    essential: true,
    analytics: Boolean(obj.analytics),
    marketing: Boolean(obj.marketing),
  };
}
