import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertOctagon, Cpu, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { calculatePropertySecurityScore, formatCFA, PropertyType, AssessmentInput } from '../utils/rules';
import { PageId } from './Navbar';

interface AssessmentSectionProps {
  onNavigate: (page: PageId) => void;
}

export const AssessmentSection: React.FC<AssessmentSectionProps> = ({ onNavigate }) => {
  const [propertyType, setPropertyType] = useState<PropertyType>('residential');
  const [surfaceM2, setSurfaceM2] = useState<number>(160);
  const [entryPointsCount, setEntryPointsCount] = useState<number>(3);
  const [hasSmartLocks, setHasSmartLocks] = useState<boolean>(false);
  const [cameraCount, setCameraCount] = useState<number>(2);
  const [hasAiDetection, setHasAiDetection] = useState<boolean>(false);
  const [hasEnergyAutomation, setHasEnergyAutomation] = useState<boolean>(false);
  const [hasStaffMonitoring, setHasStaffMonitoring] = useState<boolean>(false);
  const [hasRemoteControl, setHasRemoteControl] = useState<boolean>(false);

  // Compute live real-time score
  const inputData: AssessmentInput = {
    propertyType,
    surfaceM2,
    entryPointsCount,
    hasSmartLocks,
    cameraCount,
    hasAiDetection,
    hasStaffMonitoring,
    hasEnergyAutomation,
    hasRemoteControl,
  };

  const assessment = calculatePropertySecurityScore(inputData);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-400';
    if (score >= 60) return 'text-blue-400 border-blue-400';
    if (score >= 40) return 'text-amber-400 border-amber-400';
    return 'text-red-400 border-red-400';
  };

  return (
    <section id="assessment-section" className="py-16 sm:py-24 bg-[#1A1A2E] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-[#E8630A] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Diagnostic Gratuit &amp; Algorithme WizSmith</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Votre propriété analysée par notre IA
          </h2>
          <p className="mt-3 text-lg text-slate-300">
            Évaluez objectivement la sécurité et le niveau d'automatisation de vos espaces en moins de 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Form Controls */}
          <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Type d'espace immobilier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'residential', label: 'Villa / Maison' },
                  { id: 'airbnb', label: 'Airbnb / Meublé' },
                  { id: 'hotel', label: 'Hôtel / Résidence' },
                  { id: 'business', label: 'Bureaux / PME' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPropertyType(type.id as PropertyType)}
                    className={`wiz-btn p-3 rounded-xl text-xs font-bold border text-center ${
                      propertyType === type.id
                        ? 'bg-[#0047AB] border-[#0047AB] text-white shadow-sm'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Surface & Entry Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Surface approximative ({surfaceM2} m²)
                </label>
                <input
                  type="range"
                  min="40"
                  max="1200"
                  step="20"
                  value={surfaceM2}
                  onChange={(e) => setSurfaceM2(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#E8630A]"
                  aria-label="Surface en m²"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Nombre d'accès (Portes &amp; Portails : {entryPointsCount})
                </label>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={entryPointsCount}
                  onChange={(e) => setEntryPointsCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0047AB]"
                  aria-label="Nombre d'accès"
                />
              </div>
            </div>

            {/* Existing Equipment Checkboxes */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                2. Vos équipements actuels
              </label>
              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/70 cursor-pointer hover:bg-slate-800/80 transition-colors">
                  <div className="text-xs">
                    <span className="font-semibold text-white block">Serrure connectée sans clé (Digicode / Empreinte)</span>
                    <span className="text-slate-400">Vos portes s'ouvrent sans clé métallique physique</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasSmartLocks}
                    onChange={(e) => setHasSmartLocks(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-600 text-[#0047AB] focus:ring-0 accent-[#0047AB]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/70 cursor-pointer hover:bg-slate-800/80 transition-colors">
                  <div className="text-xs">
                    <span className="font-semibold text-white block">Caméras avec détection IA (Humains / Véhicules)</span>
                    <span className="text-slate-400">Vos caméras filtrent les fausses alertes d'animaux ou météo</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasAiDetection}
                    onChange={(e) => setHasAiDetection(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-600 text-[#0047AB] focus:ring-0 accent-[#0047AB]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/70 cursor-pointer hover:bg-slate-800/80 transition-colors">
                  <div className="text-xs">
                    <span className="font-semibold text-white block">Contrôle à distance depuis smartphone</span>
                    <span className="text-slate-400">Vous pouvez ouvrir ou surveiller en déplacement 4G/Wifi</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasRemoteControl}
                    onChange={(e) => setHasRemoteControl(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-600 text-[#0047AB] focus:ring-0 accent-[#0047AB]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/70 cursor-pointer hover:bg-slate-800/80 transition-colors">
                  <div className="text-xs">
                    <span className="font-semibold text-white block">Régulation automatique de la climatisation</span>
                    <span className="text-slate-400">Coupure intelligente de l'énergie en cas d'inoccupation</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasEnergyAutomation}
                    onChange={(e) => setHasEnergyAutomation(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-600 text-[#0047AB] focus:ring-0 accent-[#0047AB]"
                  />
                </label>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  setHasSmartLocks(false);
                  setHasAiDetection(false);
                  setHasEnergyAutomation(false);
                  setHasRemoteControl(false);
                }}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 ml-auto"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Réinitialiser les réponses</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Real-time AI Report Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Rapport IA WizSmith
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  Calcul instantané
                </span>
              </div>

              {/* Score Gauge */}
              <div className="my-6 text-center">
                <div className="inline-flex items-center justify-center relative">
                  <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center bg-slate-900/80 ${getScoreColor(assessment.score)}`}>
                    <div className="text-center">
                      <span className="text-4xl font-black text-white font-mono">
                        {assessment.score}
                      </span>
                      <span className="text-xs text-slate-400 block -mt-1">/ 100</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <span className={`text-sm font-bold uppercase tracking-wider ${
                    assessment.riskLevel === 'faible' ? 'text-emerald-400' :
                    assessment.riskLevel === 'modéré' ? 'text-blue-400' :
                    assessment.riskLevel === 'élevé' ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    Niveau de risque : {assessment.riskLevel}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    Évaluation selon les normes de sécurisation de propriété WizSmith
                  </p>
                </div>
              </div>

              {/* Identified Risks */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Vulnérabilités identifiées</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {assessment.identifiedRisks.map((risk, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2 bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Equipment */}
              {assessment.recommendedEquipments.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#0047AB]" />
                    <span>Équipements recommandés</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {assessment.recommendedEquipments.slice(0, 2).map((eq, eIdx) => (
                      <li key={eIdx} className="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50 flex justify-between items-center">
                        <div>
                          <strong className="text-white block">{eq.name}</strong>
                          <span className="text-slate-400 text-[11px]">{eq.rationale}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-[#E8630A]/20 text-[#E8630A]">
                          {eq.priority}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Package Recommendation */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 to-slate-900 border border-blue-900/60 mb-6">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-blue-300 font-semibold">Formule recommandée</span>
                  <span className="text-white font-mono font-bold text-sm">
                    À partir de : {formatCFA(assessment.monthlyEstimateCFA)}/mois
                  </span>
                </div>
                <div className="text-base font-extrabold text-white">
                  Pack {assessment.recommendedPlan}
                </div>
                <p className="text-[11px] text-blue-200/80 mt-1">
                  Installation, matériel certifié et garantie maintenance WizRenouv inclus.
                </p>
              </div>
            </div>

            {/* Direct Action CTA */}
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('appointment')}
                className="wiz-btn w-full py-3.5 px-4 rounded-xl font-bold text-white bg-[#E8630A] hover:bg-[#d45806] shadow-md flex items-center justify-center gap-2"
              >
                <span>Planifier l'installation avec un expert</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-slate-500">
                *Analyse préliminaire basée sur vos déclarations, non contractuelle avant audit physique sur site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
