import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  Phone,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Search,
  Sparkles,
  FileText,
  Shield,
} from 'lucide-react';
import { PageId } from './Navbar';
import { MaintenanceTicket, WarrantyContract, INITIAL_TICKETS, INITIAL_WARRANTIES, TicketPriority } from '../types/support';

interface SupportPortalPageProps {
  onNavigate: (page: PageId) => void;
}

export const SupportPortalPage: React.FC<SupportPortalPageProps> = ({ onNavigate }) => {
  const [clientTab, setClientTab] = useState<'wizfix' | 'wizrenouv'>('wizfix');

  // Customer Form State (WizFix)
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [commune, setCommune] = useState('Cocody (Riviera, Angré, Deux Plateaux)');
  const [equipmentType, setEquipmentType] = useState('Serrure Connectée Biométrique');
  const [priority, setPriority] = useState<TicketPriority>('normal');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [lastTicketRef, setLastTicketRef] = useState('');

  // Customer Warranty Search State (WizRenouv)
  const [contractNumber, setContractNumber] = useState('');
  const [foundContract, setFoundContract] = useState<WarrantyContract | null>(null);
  const [warrantySearchPerformed, setWarrantySearchPerformed] = useState(false);
  const [renewalRequested, setRenewalRequested] = useState(false);

  const handleClientSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !ticketDescription) return;

    const ref = `WZ-FIX-2026-${Math.floor(100 + Math.random() * 900)}`;
    setLastTicketRef(ref);
    setTicketSubmitted(true);
  };

  const handleVerifyWarranty = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = contractNumber.trim().toUpperCase();
    const match = INITIAL_WARRANTIES.find(
      (w) =>
        w.contractNumber.toUpperCase().includes(cleanNum) ||
        w.imeiGateway.toUpperCase().includes(cleanNum)
    );
    setFoundContract(match || null);
    setWarrantySearchPerformed(true);
    setRenewalRequested(false);
  };

  return (
    <div className="py-10 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0047AB] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Assistance Technique &amp; SAV Abidjan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A2E] tracking-tight">
            Services WizFix &amp; WizRenouv
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Dépannage d'urgence sous 24h ouvrées, maintenance préventive et garantie de renouvellement matériel annuel pour toutes vos installations.
          </p>
        </div>

        {/* Client Tab Switcher */}
        <div className="flex bg-slate-200/80 p-1.5 rounded-2xl max-w-md mx-auto mb-10 text-xs font-bold">
          <button
            onClick={() => setClientTab('wizfix')}
            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              clientTab === 'wizfix'
                ? 'bg-white text-[#0047AB] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>WizFix (Dépannage 24h)</span>
          </button>
          <button
            onClick={() => setClientTab('wizrenouv')}
            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              clientTab === 'wizrenouv'
                ? 'bg-white text-[#E8630A] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>WizRenouv (Garanties)</span>
          </button>
        </div>

        {/* Tab 1: WizFix Customer Claim */}
        {clientTab === 'wizfix' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
              <div className="flex items-start gap-4 pb-6 border-b border-slate-100 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0047AB] flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1A1A2E]">
                    Signaler un incident technique (WizFix)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Nos techniciens d'astreinte interviennent sous 24h ouvrées sur tout Abidjan.
                  </p>
                </div>
              </div>

              {ticketSubmitted ? (
                <div className="p-8 rounded-3xl bg-emerald-50 text-emerald-900 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="font-black text-2xl text-emerald-950">Demande d'intervention enregistrée !</h3>
                  <p className="text-xs max-w-md mx-auto text-emerald-800 leading-relaxed">
                    Votre ticket <strong className="font-mono text-sm">{lastTicketRef}</strong> a bien été transmis à nos techniciens d'astreinte. Un coordinateur vous contactera sur WhatsApp au <strong className="font-semibold">{customerPhone}</strong> pour valider l'heure de passage.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => {
                        setTicketSubmitted(false);
                        setTicketDescription('');
                      }}
                      className="px-5 py-3 rounded-xl text-xs font-bold bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      Ouvrir une autre demande
                    </button>
                    <button
                      onClick={() => onNavigate('home')}
                      className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#0047AB] hover:bg-blue-700 transition-colors"
                    >
                      Retour à l'accueil
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleClientSubmitTicket} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Votre Nom &amp; Prénom *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="ex: Patrick Boni"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Téléphone WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+225 07..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Commune à Abidjan *</label>
                      <select
                        value={commune}
                        onChange={(e) => setCommune(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
                      >
                        <option>Cocody (Riviera, Angré, Deux Plateaux)</option>
                        <option>Marcory (Zone 4, Biétry)</option>
                        <option>Plateau</option>
                        <option>Bingerville</option>
                        <option>Yopougon</option>
                        <option>Autre commune</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Équipement concerné *</label>
                      <select
                        value={equipmentType}
                        onChange={(e) => setEquipmentType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
                      >
                        <option>Serrure Connectée Biométrique</option>
                        <option>Caméra de surveillance IA / NVR</option>
                        <option>Passerelle Zigbee / Contrôleur IoT</option>
                        <option>Capteur d'accès / Contacteur de porte</option>
                        <option>Module Coupure Climatisation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Niveau d'urgence *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['low', 'normal', 'urgent'] as TicketPriority[]).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriority(p)}
                          className={`py-2 rounded-xl font-bold uppercase text-[10px] tracking-wider border transition-all ${
                            priority === p
                              ? p === 'urgent'
                                ? 'bg-rose-600 text-white border-rose-600'
                                : 'bg-[#0047AB] text-white border-[#0047AB]'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {p === 'urgent' ? '🚨 Bloquant (24h)' : p === 'normal' ? 'Normal' : 'Mineur'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Description du problème *</label>
                    <textarea
                      required
                      rows={3}
                      value={ticketDescription}
                      onChange={(e) => setTicketDescription(e.target.value)}
                      placeholder="Décrivez l'anomalie constatée (ex: serrure ne répond plus à l'empreinte, voyant rouge clignotant...)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[11px] text-slate-400">
                      Garantie d'intervention 24h ouvrées sur les équipements sous contrat WizRenouv.
                    </span>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white bg-[#0047AB] hover:bg-blue-700 shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Transmettre la demande</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Reassurance */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Engagements de Service WizFix</span>
                </h3>
                <ul className="space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">✓</span>
                    <span><strong>Intervention sous 24h :</strong> déblocage d'accès prioritaire 7j/7 pour les hébergements Airbnb et hôtels.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">✓</span>
                    <span><strong>Stock pièces détachées local :</strong> serrures, batteries lithium et passerelles disponibles en stock à Abidjan.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">✓</span>
                    <span><strong>Techniciens certifiés :</strong> intervenants habilités formés aux protocoles de sécurité Zigbee et TTlock.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#1A1A2E] to-[#0047AB] text-white rounded-3xl p-6 sm:p-8">
                <h4 className="text-base font-bold mb-2">Urgence Absolue ?</h4>
                <p className="text-xs text-slate-200 mb-4">
                  Pour un client bloqué à la porte d'un logement Airbnb ou une serrure endommagée, appelez notre astreinte immédiate.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Phone className="w-4 h-4" />
                  <span>Astreinte 24h/7 : +225 07 48 92 11 04</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: WizRenouv Client Warranty Verification */
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#E8630A] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1A1A2E]">
                    Vérification de Garantie &amp; Remplacement (WizRenouv)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Saisissez votre numéro de contrat ou l'identifiant IMEI de votre passerelle
                  </p>
                </div>
              </div>

              <form onSubmit={handleVerifyWarranty} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={contractNumber}
                    onChange={(e) => setContractNumber(e.target.value)}
                    placeholder="Ex: WZ-CTR-2024-001 ou GW-CC-8821"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#E8630A] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#E8630A] hover:bg-[#d45806] shadow-sm flex items-center justify-center gap-2 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Vérifier la garantie</span>
                </button>
              </form>

              {/* Warranty Search Result */}
              {warrantySearchPerformed && (
                <div>
                  {foundContract ? (
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400">Contrat Actif</span>
                          <h4 className="font-bold text-[#1A1A2E] text-base">{foundContract.contractNumber}</h4>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Garantie Active • {foundContract.planName}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <span className="text-slate-400 block mb-0.5">Titulaire du contrat</span>
                          <strong className="text-slate-800">{foundContract.customerName}</strong>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <span className="text-slate-400 block mb-0.5">Commune &amp; Zone</span>
                          <strong className="text-slate-800">{foundContract.commune}</strong>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <span className="text-slate-400 block mb-0.5">Date d'installation</span>
                          <strong className="text-slate-800">{foundContract.installationDate}</strong>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-200">
                          <span className="text-slate-400 block mb-0.5">Éligibilité Remplacement</span>
                          <strong className="text-emerald-700">{foundContract.renewalEligibilityDate}</strong>
                        </div>
                      </div>

                      <div className="text-xs pt-1">
                        <span className="font-bold text-slate-700 block mb-1.5">Équipements couverts :</span>
                        <div className="flex flex-wrap gap-1.5">
                          {foundContract.equipmentList.map((eq, i) => (
                            <span key={i} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 text-[11px]">
                              ✓ {eq}
                            </span>
                          ))}
                        </div>
                      </div>

                      {renewalRequested ? (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs text-center font-medium">
                          ✓ Votre demande de remplacement préventif annuel a été enregistrée. Un technicien vous contactera pour planifier la livraison du kit neuf.
                        </div>
                      ) : (
                        <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <span className="text-xs text-slate-500">
                            Remplacement préventif annuel inclus dans les formules Business, Airbnb &amp; Prestige.
                          </span>
                          <button
                            onClick={() => setRenewalRequested(true)}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#E8630A] hover:bg-[#d45806] transition-colors"
                          >
                            Demander le remplacement matériel
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-center text-xs space-y-2">
                      <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
                      <strong className="block text-sm">Contrat non trouvé</strong>
                      <p>
                        Aucun contrat ne correspond à la référence "{contractNumber}". Veuillez vérifier le numéro mentionné sur votre facture ou contacter l'assistance au +225 07 48 92 11 04.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
