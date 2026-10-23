import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, Shield, ArrowRight, Sparkles, Check, Building2, Home, Hotel, Briefcase } from 'lucide-react';
import { PageId } from './Navbar';

interface AppointmentPageProps {
  onNavigate: (page: PageId) => void;
}

export const AppointmentPage: React.FC<AppointmentPageProps> = ({ onNavigate }) => {
  // Form State
  const [propertyType, setPropertyType] = useState('Villa / Maison privée');
  const [commune, setCommune] = useState('Cocody (Riviera, Angré, Deux Plateaux)');
  const [selectedDate, setSelectedDate] = useState('2026-10-25');
  const [selectedSlot, setSelectedSlot] = useState('10:30 - 12:00');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastCreatedRef, setLastCreatedRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const refNumber = `WZ-RDV-2026-${Math.floor(100 + Math.random() * 900)}`;
    setLastCreatedRef(refNumber);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setNotes('');
  };

  return (
    <div className="py-10 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0047AB] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Audit &amp; Diagnostic Sur Site à Abidjan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A2E] tracking-tight">
            Planifiez votre visite technique offerte
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Un ingénieur certifié WizSmith évalue sur place vos accès, votre réseau et vos opportunités d’automatisation domotique. 100% gratuit et sans engagement.
          </p>
        </div>

        {isSubmitted ? (
          /* Confirmation View for the Visitor */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle className="w-12 h-12" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              Demande enregistrée avec succès
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A2E] mb-3">
              Votre rendez-vous d'audit est réservé !
            </h2>

            <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
              Merci <strong className="text-slate-900">{fullName}</strong>. Votre créneau a été transmis à notre équipe technique. Un conseiller WizSmith prendra contact avec vous sur WhatsApp au <strong className="text-slate-900">{phone}</strong> pour préparer l’accès à votre bien le <strong className="text-slate-900">{selectedDate}</strong> entre <strong className="text-slate-900">{selectedSlot}</strong>.
            </p>

            {/* Confirmation Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Numéro de dossier :</span>
                <span className="font-mono font-bold text-[#0047AB] text-sm">{lastCreatedRef}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Localisation :</span>
                <span className="font-medium text-slate-800">{commune}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Type de bien :</span>
                <span className="font-medium text-slate-800">{propertyType}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-500">Statut :</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Pris en charge par l'équipe WizSmith
                </span>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Prendre un autre rendez-vous
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold text-white bg-[#0047AB] hover:bg-blue-700 shadow-md transition-colors"
              >
                Retourner à l'accueil
              </button>
            </div>
          </div>
        ) : (
          /* Booking Layout: Form + Value Proposition Column */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Booking Form Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0047AB] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1A1A2E]">
                    Formulaire de réservation de diagnostic
                  </h2>
                  <p className="text-xs text-slate-500">
                    Complétez vos coordonnées pour bloquer un créneau avec un technicien
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Space & Commune */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    1. Votre Bien &amp; Localisation
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs text-slate-500 mb-1">Type de propriété *</span>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                      >
                        <option>Villa / Maison privée</option>
                        <option>Appartement / Location Airbnb</option>
                        <option>Hôtel / Résidence hôtelière</option>
                        <option>Bureaux / Siège d'entreprise</option>
                        <option>Commerce / Restaurant</option>
                      </select>
                    </div>

                    <div>
                      <span className="block text-xs text-slate-500 mb-1">Commune à Abidjan *</span>
                      <select
                        value={commune}
                        onChange={(e) => setCommune(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                      >
                        <option>Cocody (Riviera, Angré, Deux Plateaux)</option>
                        <option>Marcory (Zone 4, Biétry)</option>
                        <option>Plateau</option>
                        <option>Bingerville</option>
                        <option>Yopougon</option>
                        <option>Autre commune / Hors Abidjan</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 2: Date & Slot */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    2. Date &amp; Créneau Souhaité
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs text-slate-500 mb-1">Date d'audit *</span>
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                      >
                      </input>
                    </div>

                    <div>
                      <span className="block text-xs text-slate-500 mb-1">Créneau horaire *</span>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                      >
                        <option>09:00 - 10:30 (Matin)</option>
                        <option>10:30 - 12:00 (Matin)</option>
                        <option>14:00 - 15:30 (Après-midi)</option>
                        <option>15:30 - 17:00 (Fin de journée)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 3: Contact Details */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    3. Vos Coordonnées
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs text-slate-500 mb-1">Nom et Prénom *</span>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="ex: Jean-Marc K."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                      />
                    </div>

                    <div>
                      <span className="block text-xs text-slate-500 mb-1">Téléphone WhatsApp *</span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="ex: +225 07 00 00 00 00"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 4: Optional Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    4. Précisions sur votre projet (Optionnel)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Villa 5 pièces, serrures connectées souhaitées sur porte principale et portillon..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                </div>

                {/* Submit Row */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Vos données restent strictement confidentielles.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-[#0047AB] hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Confirmer mon rendez-vous</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Reassurance Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: What happens during the audit */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#E8630A]" />
                  <span>Que comprend votre diagnostic offert ?</span>
                </h3>

                <ul className="space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      ✓
                    </div>
                    <span>
                      <strong className="text-slate-900">Relevé technique complet :</strong> analyse de vos portes, portails, alimentation électrique et réseau Wi-Fi/GSM.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      ✓
                    </div>
                    <span>
                      <strong className="text-slate-900">Démonstration d'équipements :</strong> présentation des serrures biométriques et caméras IA sur mallette de test.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      ✓
                    </div>
                    <span>
                      <strong className="text-slate-900">Chiffrage sous 24h :</strong> remise d'une proposition détaillée avec plan d'implantation et garantie matériel WizRenouv.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Contact Info */}
              <div className="bg-gradient-to-br from-[#1A1A2E] to-[#0047AB] text-white rounded-3xl p-6 sm:p-8 shadow-sm">
                <h4 className="text-base font-bold mb-2">Besoin d'un renseignement immédiat ?</h4>
                <p className="text-xs text-slate-200 mb-4 leading-relaxed">
                  Notre équipe commerciale et technique est joignable à Abidjan pour répondre à vos questions avant la visite.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Phone className="w-4 h-4 text-[#E8630A]" />
                    <span>WhatsApp : <strong>+225 07 48 92 11 04</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <MapPin className="w-4 h-4 text-[#E8630A]" />
                    <span>Bureau : Riviera Palmeraie, Cocody, Abidjan</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <Clock className="w-4 h-4 text-[#E8630A]" />
                    <span>Horaires : Lun – Sam (08h00 – 19h00)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
