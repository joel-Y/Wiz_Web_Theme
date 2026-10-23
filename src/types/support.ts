export type TicketPriority = 'low' | 'normal' | 'urgent' | 'critical';
export type TicketStatus = 'new' | 'assigned' | 'in_progress' | 'resolved' | 'closed';

export interface MaintenanceTicket {
  id: string;
  reference: string;
  customerName: string;
  phone: string;
  email?: string;
  commune: string;
  addressDetails?: string;
  equipment: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTechnician: string;
  createdAt: string;
  interventionDate?: string;
  technicianNotes?: string;
  odooMaintenanceId?: number;
}

export interface WarrantyContract {
  id: string;
  contractNumber: string;
  customerName: string;
  phone: string;
  propertyType: string;
  commune: string;
  planName: 'BUSINESS' | 'ÉLITE' | 'PRESTIGE';
  equipmentList: string[];
  installationDate: string;
  renewalEligibilityDate: string;
  expiryDate: string;
  status: 'active' | 'renewal_due' | 'expired';
  imeiGateway: string;
  odooEquipmentId?: number;
}

export const INITIAL_TICKETS: MaintenanceTicket[] = [
  {
    id: 'fix-1',
    reference: 'WZ-FIX-2026-088',
    customerName: 'Marc-André Koffi',
    phone: '+225 07 49 11 20 33',
    commune: 'Cocody (Riviera Golf)',
    addressDetails: 'Villa 12, Rue des Bambous',
    equipment: 'Serrure WizLock Pro (Porte Principale)',
    description: 'Batterie faible (alerte 15%) et voyant orange clignotant après coupure de courant.',
    priority: 'urgent',
    status: 'assigned',
    assignedTechnician: 'Kouamé A. (Technicien Domotique)',
    createdAt: '2026-10-22T08:30:00Z',
    interventionDate: '2026-10-23',
    technicianNotes: 'Passage planifié avec kit de remplacement piles lithium longue durée et recalibration pêne.',
    odooMaintenanceId: 1042,
  },
  {
    id: 'fix-2',
    reference: 'WZ-FIX-2026-089',
    customerName: 'Estelle Bamba (Résidence Laguna)',
    phone: '+225 05 60 77 44 19',
    commune: 'Marcory (Zone 4)',
    addressDetails: 'Immeuble Le Balisier, Apt 4C',
    equipment: 'Passerelle Wifi/Zigbee & Relais Climatisation',
    description: 'Relais clim non synchronisé suite au check-out du voyageur. Nécessite reset réseau.',
    priority: 'normal',
    status: 'new',
    assignedTechnician: 'Diallo M. (Ingénieur Terrain)',
    createdAt: '2026-10-22T11:15:00Z',
    interventionDate: '2026-10-23',
    technicianNotes: 'Tentative de reconnexion à distance échouée, déplacement nécessaire.',
    odooMaintenanceId: 1043,
  },
  {
    id: 'fix-3',
    reference: 'WZ-FIX-2026-090',
    customerName: 'Siège AfricInvest (Directeur Technique)',
    phone: '+225 01 22 33 88 50',
    commune: 'Plateau',
    addressDetails: 'Immeuble Alpha 2000, 7e étage',
    equipment: 'Module Caméra IA WizBridge (Accès Parking)',
    description: 'Lenteur de détection nocturne des plaques. Vérification de la bande passante locale.',
    priority: 'normal',
    status: 'resolved',
    assignedTechnician: 'Yao N. (Expert Sécurité IoT)',
    createdAt: '2026-10-21T14:00:00Z',
    interventionDate: '2026-10-22',
    technicianNotes: 'Mise à jour du firmware caméra et réorientation du faisceau infrarouge effectuée avec succès.',
    odooMaintenanceId: 1039,
  },
];

export const INITIAL_WARRANTIES: WarrantyContract[] = [
  {
    id: 'war-1',
    contractNumber: 'WZ-2024-ABJ-891',
    customerName: 'Kouassi Kouamé',
    phone: '+225 07 48 92 11 04',
    propertyType: 'Villa / Maison privée',
    commune: 'Cocody (Riviera Golf)',
    planName: 'ÉLITE',
    equipmentList: ['Serrure WizLock Pro Biométrique', '3 Caméras WizVision IA', '1 Passerelle Zigbee Secure'],
    installationDate: '2024-11-15',
    renewalEligibilityDate: '2025-11-15',
    expiryDate: '2026-11-15',
    status: 'active',
    imeiGateway: 'GW-WZ-884920-CI',
    odooEquipmentId: 201,
  },
  {
    id: 'war-2',
    contractNumber: 'WZ-2025-ABJ-104',
    customerName: 'Aïcha Traoré',
    phone: '+225 05 77 34 88 20',
    propertyType: 'Appartement / Location Airbnb',
    commune: 'Marcory (Zone 4)',
    planName: 'ÉLITE',
    equipmentList: ['Serrure WizLock Keypad', '2 Capteurs Présence Climatisation', 'Passerelle Cloud'],
    installationDate: '2025-04-10',
    renewalEligibilityDate: '2026-04-10',
    expiryDate: '2027-04-10',
    status: 'renewal_due',
    imeiGateway: 'GW-WZ-771922-CI',
    odooEquipmentId: 202,
  },
  {
    id: 'war-3',
    contractNumber: 'WZ-2023-ABJ-640',
    customerName: 'David Bamba',
    phone: '+225 01 02 44 99 15',
    propertyType: 'Hôtel / Résidence hôtelière',
    commune: 'Plateau',
    planName: 'PRESTIGE',
    equipmentList: ['18 Serrures RFID Hôtel WizCard', 'Système Centralisé Énergie', 'Passerelle Haute Disponibilité'],
    installationDate: '2023-09-01',
    renewalEligibilityDate: '2024-09-01',
    expiryDate: '2026-09-01',
    status: 'active',
    imeiGateway: 'GW-WZ-660144-CI',
    odooEquipmentId: 203,
  },
];
