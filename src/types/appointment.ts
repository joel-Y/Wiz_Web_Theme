export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  reference: string;
  fullName: string;
  phone: string;
  email?: string;
  propertyType: string;
  commune: string;
  addressDetails?: string;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  assignedEngineer: string;
  createdAt: string;
  notes?: string;
  odooCalendarEventId?: number;
}

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    reference: 'WZ-RDV-2026-104',
    fullName: 'Kouassi Kouamé',
    phone: '+225 07 48 92 11 04',
    email: 'k.kouame@abidjan-properties.ci',
    propertyType: 'Villa / Maison privée',
    commune: 'Cocody (Riviera Golf)',
    addressDetails: 'Rue des Ambassades, Villa 14',
    date: '2026-10-24',
    timeSlot: '10:30 - 12:00',
    status: 'confirmed',
    assignedEngineer: 'Yao N. (Expert Sécurité IoT)',
    createdAt: '2026-10-22T09:15:00Z',
    notes: 'Audit pour 4 caméras périmétriques et serrure WizLock sur portail principal.',
    odooCalendarEventId: 482,
  },
  {
    id: 'apt-2',
    reference: 'WZ-RDV-2026-105',
    fullName: 'Aïcha Traoré',
    phone: '+225 05 77 34 88 20',
    email: 'aicha.traore@residences-luxe.ci',
    propertyType: 'Appartement / Location Airbnb',
    commune: 'Marcory (Zone 4)',
    addressDetails: 'Immeuble Le Palmier, Apt 3B',
    date: '2026-10-25',
    timeSlot: '14:00 - 15:30',
    status: 'pending',
    assignedEngineer: 'Diallo M. (Ingénieur Terrain)',
    createdAt: '2026-10-22T11:40:00Z',
    notes: 'Gestion de 3 meublés : besoin de codes temporaires automatisés et coupure clim.',
    odooCalendarEventId: 483,
  },
  {
    id: 'apt-3',
    reference: 'WZ-RDV-2026-106',
    fullName: 'David Bamba',
    phone: '+225 01 02 44 99 15',
    email: 'd.bamba@hotel-laguna.com',
    propertyType: 'Hôtel / Résidence hôtelière',
    commune: 'Plateau',
    addressDetails: 'Avenue Chardy, Résidence Laguna',
    date: '2026-10-26',
    timeSlot: '09:00 - 10:30',
    status: 'confirmed',
    assignedEngineer: 'Koffi E. (Responsable Projets B2B)',
    createdAt: '2026-10-22T14:10:00Z',
    notes: 'Démonstration multi-chambres (18 serrures RFID & contrôle centralisé d\'énergie).',
    odooCalendarEventId: 484,
  },
  {
    id: 'apt-4',
    reference: 'WZ-RDV-2026-107',
    fullName: 'Aminata Touré',
    phone: '+225 07 19 83 22 55',
    propertyType: 'Bureaux / Siège d\'entreprise',
    commune: 'Cocody (Deux Plateaux)',
    addressDetails: 'Boulevard Latrille, Bâtiment B',
    date: '2026-10-27',
    timeSlot: '15:30 - 17:00',
    status: 'completed',
    assignedEngineer: 'Diallo M. (Ingénieur Terrain)',
    createdAt: '2026-10-21T16:20:00Z',
    notes: 'Devis Pack Business validé. Installation planifiée la semaine prochaine.',
    odooCalendarEventId: 479,
  },
];
