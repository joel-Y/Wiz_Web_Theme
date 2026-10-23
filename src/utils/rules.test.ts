import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePropertySecurityScore, formatCFA, sanitizeCookieConsent } from './rules';

test('calculates correct score for unequipped manual residential property', () => {
  const result = calculatePropertySecurityScore({
    propertyType: 'residential',
    surfaceM2: 120,
    entryPointsCount: 4,
    hasSmartLocks: false,
    cameraCount: 0,
    hasAiDetection: false,
    hasStaffMonitoring: false,
    hasEnergyAutomation: false,
    hasRemoteControl: false,
  });

  assert.equal(result.score, 25);
  assert.equal(result.riskLevel, 'critique');
  assert.ok(result.identifiedRisks.length >= 2);
  assert.equal(result.recommendedPlan, 'ÉLITE');
  assert.equal(result.monthlyEstimateCFA, 40000);
});

test('calculates high score for fully automated smart hotel with AI cameras', () => {
  const result = calculatePropertySecurityScore({
    propertyType: 'hotel',
    surfaceM2: 800,
    entryPointsCount: 12,
    hasSmartLocks: true,
    cameraCount: 16,
    hasAiDetection: true,
    hasStaffMonitoring: true,
    hasEnergyAutomation: true,
    hasRemoteControl: true,
  });

  assert.equal(result.score, 100);
  assert.equal(result.riskLevel, 'faible');
  assert.equal(result.recommendedPlan, 'PRESTIGE');
  assert.equal(result.monthlyEstimateCFA, 50000);
  assert.ok(result.recommendedAutomations.length >= 2);
});

test('recommends BUSINESS package for commercial property', () => {
  const result = calculatePropertySecurityScore({
    propertyType: 'business',
    surfaceM2: 250,
    entryPointsCount: 3,
    hasSmartLocks: true,
    cameraCount: 4,
    hasAiDetection: false,
    hasStaffMonitoring: false,
    hasEnergyAutomation: false,
    hasRemoteControl: true,
  });

  assert.equal(result.recommendedPlan, 'BUSINESS');
  assert.equal(result.monthlyEstimateCFA, 25000);
});

test('formatCFA formats amounts correctly', () => {
  assert.equal(formatCFA(25000), '25\u202f000 FCFA');
  assert.equal(formatCFA(40000), '40\u202f000 FCFA');
});

test('sanitizeCookieConsent enforces essential cookies and handles missing values', () => {
  const res = sanitizeCookieConsent(null);
  assert.equal(res.essential, true);
  assert.equal(res.analytics, false);
  assert.equal(res.marketing, false);

  const custom = sanitizeCookieConsent({ analytics: true, marketing: false, other: 123 });
  assert.equal(custom.essential, true);
  assert.equal(custom.analytics, true);
  assert.equal(custom.marketing, false);
});

test('translations contain zero user-facing references to odoo', async () => {
  const { translations } = await import('../data/translations');
  const serialized = JSON.stringify(translations).toLowerCase();
  assert.equal(serialized.includes('odoo'), false, 'Translations must not contain any reference to Odoo');
});

test('initial appointments have valid references and calendar event mappings', async () => {
  const { INITIAL_APPOINTMENTS } = await import('../types/appointment');
  assert.ok(INITIAL_APPOINTMENTS.length >= 3);
  for (const apt of INITIAL_APPOINTMENTS) {
    assert.ok(apt.reference.startsWith('WZ-RDV-'));
    assert.ok(apt.fullName.length > 0);
    assert.ok(apt.phone.length > 0);
    assert.ok(apt.odooCalendarEventId && apt.odooCalendarEventId > 0);
    assert.ok(['pending', 'confirmed', 'completed', 'cancelled'].includes(apt.status));
  }
});

test('initial WizFix tickets and WizRenouv warranties are valid and mapped to Odoo IDs', async () => {
  const { INITIAL_TICKETS, INITIAL_WARRANTIES } = await import('../types/support');
  assert.ok(INITIAL_TICKETS.length >= 3);
  for (const ticket of INITIAL_TICKETS) {
    assert.ok(ticket.reference.startsWith('WZ-FIX-'));
    assert.ok(ticket.customerName.length > 0);
    assert.ok(ticket.equipment.length > 0);
    assert.ok(ticket.odooMaintenanceId && ticket.odooMaintenanceId > 0);
  }

  assert.ok(INITIAL_WARRANTIES.length >= 3);
  for (const w of INITIAL_WARRANTIES) {
    assert.ok(w.contractNumber.startsWith('WZ-'));
    assert.ok(w.equipmentList.length > 0);
    assert.ok(w.odooEquipmentId && w.odooEquipmentId > 0);
  }
});
