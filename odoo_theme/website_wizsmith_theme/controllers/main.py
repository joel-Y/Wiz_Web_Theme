# -*- coding: utf-8 -*-
# Part of WizSmith. See LICENSE file for full copyright and licensing details.

import logging
import re
from datetime import datetime, timedelta

import pytz
from markupsafe import Markup, escape

from odoo import fields, http
from odoo.http import request

_logger = logging.getLogger(__name__)

# Abidjan is on GMT all year (no DST); pytz keeps this correct if that ever changes.
LOCAL_TZ = pytz.timezone('Africa/Abidjan')

PHONE_RE = re.compile(r'^\+?[0-9][0-9 ().\-]{5,19}$')
EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')

SLOT_MAPPING = {
    '09:00 - 10:30': ((9, 0), (10, 30)),
    '10:30 - 12:00': ((10, 30), (12, 0)),
    '14:00 - 15:30': ((14, 0), (15, 30)),
    '15:30 - 17:00': ((15, 30), (17, 0)),
}
DEFAULT_SLOT = '10:30 - 12:00'

PROPERTY_LABELS = {
    'villa': 'Villa / Maison privée',
    'airbnb': 'Appartement / Location Airbnb',
    'hotel': 'Hôtel / Résidence hôtelière',
    'office': "Bureaux / Siège d'entreprise",
    'commerce': 'Commerce / Restaurant',
}
COMMUNE_LABELS = {
    'cocody': 'Cocody',
    'marcory': 'Marcory',
    'plateau': 'Plateau',
    'bingerville': 'Bingerville',
    'yopougon': 'Yopougon',
}
EQUIPMENT_LABELS = {
    'lock': 'Serrure WizLock',
    'camera': 'Caméra WizVision / Module IA',
    'gateway': 'Passerelle Wifi / Zigbee',
    'ac': 'Thermostat / relais clim',
}
PRIORITIES = {'normal': ('Standard', '1'), 'urgent': ('Urgent 24h', '3')}


def _clean(value, max_len):
    """Strip and truncate a free-text form value."""
    return (value or '').strip()[:max_len]


def _local_to_utc(naive_local):
    """Naive datetime in Abidjan time -> naive UTC datetime, as Odoo stores it."""
    return LOCAL_TZ.localize(naive_local).astimezone(pytz.utc).replace(tzinfo=None)


def _html_lines(lines):
    """Build an Html-field value from plain lines, escaping every visitor-supplied string."""
    return Markup('<br/>').join(escape(line) for line in lines)


class WizsmithAppointmentController(http.Controller):
    """
    Website controller for WizSmith appointments, WizFix claims and WizRenouv
    warranty look-ups.

    Appointments are written to the native Odoo calendar (``calendar.event``),
    visible to staff under Calendar > Meetings.
    """

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------
    def _find_or_create_partner(self, name, phone, email=None, extra_vals=None):
        Partner = request.env['res.partner'].sudo()
        partner = Partner.search(['|', ('phone', '=', phone), ('mobile', '=', phone)], limit=1)
        if not partner and email:
            partner = Partner.search([('email', '=', email)], limit=1)
        if not partner:
            vals = {'name': name, 'phone': phone, 'email': email or False, 'city': 'Abidjan'}
            vals.update(extra_vals or {})
            partner = Partner.create(vals)
        return partner

    def _organizer_id(self):
        """Never make the anonymous website user the organizer of a meeting."""
        user = request.env.user
        if user and user.id != request.website.user_id.id:
            return user.id
        return False

    # ------------------------------------------------------------------
    # Legacy / marketing URLs referenced by menus and CTAs
    # ------------------------------------------------------------------
    @http.route('/packs', type='http', auth='public', website=True, sitemap=False)
    def packs(self, **kw):
        return request.redirect('/#packs', code=302)

    @http.route('/support-ia', type='http', auth='public', website=True, sitemap=False)
    def support_ia(self, **kw):
        # The free diagnostic is delivered through the on-site audit booking.
        return request.redirect('/page/appointment', code=302)

    # ------------------------------------------------------------------
    # Appointment booking
    # ------------------------------------------------------------------
    @http.route('/website/appointment/submit', type='http', auth='public', website=True,
                methods=['POST'], csrf=True)
    def submit_appointment(self, **post):
        customer_name = _clean(post.get('customer_name'), 128)
        phone = _clean(post.get('phone'), 20)
        email = _clean(post.get('email'), 128)
        notes = _clean(post.get('notes'), 1000)

        # Allow-list select values: anything unknown falls back to a safe default.
        property_type = post.get('property_type') if post.get('property_type') in PROPERTY_LABELS else 'villa'
        commune = post.get('commune') if post.get('commune') in COMMUNE_LABELS else 'cocody'
        time_slot = post.get('time_slot') if post.get('time_slot') in SLOT_MAPPING else DEFAULT_SLOT

        if not customer_name or not PHONE_RE.match(phone):
            return request.redirect('/page/appointment?status=error&msg=missing_fields')
        if email and not EMAIL_RE.match(email):
            email = ''

        try:
            day = datetime.strptime(_clean(post.get('appointment_date'), 10), '%Y-%m-%d').date()
        except ValueError:
            return request.redirect('/page/appointment?status=error&msg=invalid_date')
        today_local = datetime.now(LOCAL_TZ).date()
        if day <= today_local:
            return request.redirect('/page/appointment?status=error&msg=invalid_date')

        (sh, sm), (eh, em) = SLOT_MAPPING[time_slot]
        base = datetime(day.year, day.month, day.day)
        start_dt = _local_to_utc(base.replace(hour=sh, minute=sm))
        stop_dt = _local_to_utc(base.replace(hour=eh, minute=em))

        prop_title = PROPERTY_LABELS[property_type]
        commune_title = COMMUNE_LABELS[commune]

        try:
            partner = self._find_or_create_partner(
                customer_name, phone, email,
                extra_vals={
                    'street': 'Commune de %s' % commune_title,
                    'comment': "Contact créé depuis le site WizSmith (demande d'audit %s)." % prop_title,
                })
            event = request.env['calendar.event'].sudo().create({
                'name': 'Audit WizSmith (%s) - %s' % (prop_title, customer_name),
                'partner_ids': [(4, partner.id)],
                'start': start_dt,
                'stop': stop_dt,
                'duration': 1.5,
                'location': 'Abidjan, %s' % commune_title,
                'user_id': self._organizer_id(),
            })
            # The reference is derived from the event (unique per booking), not from the partner.
            ref_code = 'WZ-RDV-%s-%05d' % (today_local.year, event.id)
            event.write({
                'description': _html_lines([
                    '=== AUDIT TECHNIQUE SUR SITE WIZSMITH ===',
                    'Référence dossier : %s' % ref_code,
                    '',
                    'Client : %s' % customer_name,
                    'Téléphone WhatsApp : %s' % phone,
                    'Email : %s' % (email or 'Non renseigné'),
                    'Type de bien : %s' % prop_title,
                    'Localisation : Abidjan (%s)' % commune_title,
                    'Créneau souhaité : %s' % time_slot,
                    'Notes du client : %s' % (notes or 'Aucune'),
                ]),
            })
            _logger.info('Created calendar.event id=%s (%s)', event.id, ref_code)
        except Exception:
            _logger.exception('Failed to create appointment for website visitor')
            return request.redirect('/page/appointment?status=error&msg=server')

        return request.redirect('/page/appointment?status=success&ref=%s' % ref_code)

    # ------------------------------------------------------------------
    # WizFix maintenance claims
    # ------------------------------------------------------------------
    @http.route('/website/claim/submit', type='http', auth='public', website=True,
                methods=['POST'], csrf=True)
    def submit_maintenance_claim(self, **post):
        customer_name = _clean(post.get('customer_name'), 128)
        phone = _clean(post.get('phone'), 20)
        description = _clean(post.get('description'), 2000)
        equipment = post.get('equipment_type') if post.get('equipment_type') in EQUIPMENT_LABELS else 'lock'
        commune = post.get('commune') if post.get('commune') in COMMUNE_LABELS else 'cocody'
        priority = post.get('priority') if post.get('priority') in PRIORITIES else 'normal'

        if not customer_name or not PHONE_RE.match(phone) or not description:
            return request.redirect('/claim?status=error')

        equipment_title = EQUIPMENT_LABELS[equipment]
        commune_title = COMMUNE_LABELS[commune]
        priority_title, odoo_priority = PRIORITIES[priority]

        try:
            partner = self._find_or_create_partner(customer_name, phone)
            ref_code = None
            lines_tpl = [
                'Priorité : %s' % priority_title,
                'Équipement : %s' % equipment_title,
                'Localisation : Abidjan (%s)' % commune_title,
                'Description de la panne : %s' % description,
                'Contact client : %s (%s)' % (customer_name, phone),
            ]

            if 'maintenance.request' in request.env:
                # Optional integration: only used when the Maintenance app is installed.
                req = request.env['maintenance.request'].sudo().create({
                    'name': '[WizFix] %s - %s' % (equipment_title, customer_name),
                    'priority': odoo_priority,
                    'maintenance_type': 'corrective',
                    'description': _html_lines(lines_tpl),
                })
                ref_code = 'WZ-FIX-%s-%05d' % (datetime.now(LOCAL_TZ).year, req.id)
            else:
                start_dt = fields.Datetime.now() + timedelta(hours=2)
                event = request.env['calendar.event'].sudo().create({
                    'name': '[WizFix SAV %s] %s - %s' % (priority.upper(), equipment_title, customer_name),
                    'partner_ids': [(4, partner.id)],
                    'start': start_dt,
                    'stop': start_dt + timedelta(hours=1),
                    'location': 'Abidjan, %s (intervention SAV WizFix)' % commune_title,
                    'user_id': self._organizer_id(),
                })
                ref_code = 'WZ-FIX-%s-%05d' % (datetime.now(LOCAL_TZ).year, event.id)
                event.write({'description': _html_lines(['Référence SAV : %s' % ref_code] + lines_tpl)})
        except Exception:
            _logger.exception('Failed to log WizFix claim')
            return request.redirect('/claim?status=error')

        return request.redirect('/claim?status=success&ref=%s' % ref_code)

    # ------------------------------------------------------------------
    # WizRenouv warranty look-up
    # ------------------------------------------------------------------
    @http.route('/website/warranty/check', type='http', auth='public', website=True,
                methods=['GET'], sitemap=False)
    def check_warranty(self, serial='', **kw):
        serial = _clean(serial, 64)
        result = {'found': False}

        if len(serial) < 4:
            pass
        elif 'maintenance.equipment' not in request.env:
            result = {'found': False, 'unavailable': True}
        else:
            equipment = request.env['maintenance.equipment'].sudo().search(
                [('serial_no', '=', serial)], limit=1)
            if equipment:
                # Expose only what the visitor needs: never customer or internal data.
                result = {
                    'found': True,
                    'name': equipment.category_id.name or 'Équipement WizSmith',
                    'warranty_date': (
                        fields.Date.to_string(equipment.warranty_date)
                        if equipment.warranty_date else False),
                }

        return request.render('website_wizsmith_theme.wizsmith_page_warranty',
                              {'warranty_result': result})
