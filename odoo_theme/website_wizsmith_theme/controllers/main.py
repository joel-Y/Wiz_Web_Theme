# -*- coding: utf-8 -*-
# Part of WizSmith. See LICENSE file for full copyright and licensing details.

from datetime import datetime, timedelta
import logging
from odoo import http, fields
from odoo.http import request

_logger = logging.getLogger(__name__)


class WizsmithAppointmentController(http.Controller):
    """
    Website Controller for WizSmith Appointments and Maintenance Claims.
    Directly synchronizes customer bookings from the public website into
    the native Odoo 18 Community Edition 'calendar.event' model.
    
    The backend site owner views and manages all appointments inside
    the standard Odoo 18 Community Calendar App:
    Backend Menu: Calendar > Meetings (action: calendar.action_calendar_event)
    """

    @http.route('/website/appointment/submit', type='http', auth='public', website=True, methods=['POST'], csrf=True)
    def submit_appointment(self, **post):
        """
        Receives appointment bookings from the public website (/page/appointment)
        and automatically creates an event in the native Odoo 18 calendar module.
        """
        customer_name = (post.get('customer_name') or '').strip()
        phone = (post.get('phone') or '').strip()
        email = (post.get('email') or '').strip()
        appointment_date = (post.get('appointment_date') or '').strip()
        time_slot = (post.get('time_slot') or '10:30 - 12:00').strip()
        property_type = (post.get('property_type') or 'villa').strip()
        commune = (post.get('commune') or 'cocody').strip()
        notes = (post.get('notes') or '').strip()

        if not customer_name or not phone:
            return request.redirect('/page/appointment?status=error&msg=missing_fields')

        # 1. Parse start and stop datetimes
        start_hour, start_min = 10, 30
        stop_hour, stop_min = 12, 0

        slot_mapping = {
            '09:00 - 10:30': ((9, 0), (10, 30)),
            '10:30 - 12:00': ((10, 30), (12, 0)),
            '14:00 - 15:30': ((14, 0), (15, 30)),
            '15:30 - 17:00': ((15, 30), (17, 0)),
        }

        for key, ((sh, sm), (eh, em)) in slot_mapping.items():
            if key in time_slot:
                start_hour, start_min = sh, sm
                stop_hour, stop_min = eh, em
                break

        try:
            if appointment_date:
                dt_base = datetime.strptime(appointment_date, '%Y-%m-%d')
            else:
                dt_base = datetime.now() + timedelta(days=2)
            
            start_dt = dt_base.replace(hour=start_hour, minute=start_min, second=0)
            stop_dt = dt_base.replace(hour=stop_hour, minute=stop_min, second=0)
        except Exception as e:
            _logger.warning("Error parsing appointment date '%s': %s", appointment_date, e)
            dt_base = datetime.now() + timedelta(days=2)
            start_dt = dt_base.replace(hour=10, minute=30, second=0)
            stop_dt = dt_base.replace(hour=12, minute=0, second=0)

        # 2. Find or create the customer partner (res.partner)
        partner = request.env['res.partner'].sudo().search([
            '|', ('phone', '=', phone), ('mobile', '=', phone)
        ], limit=1)

        if not partner and email:
            partner = request.env['res.partner'].sudo().search([
                ('email', '=', email)
            ], limit=1)

        if not partner:
            partner = request.env['res.partner'].sudo().create({
                'name': customer_name,
                'phone': phone,
                'email': email or False,
                'city': 'Abidjan',
                'street': f"Commune de {commune.capitalize()}",
                'comment': f"Contact créé depuis le site WizSmith (Demande d'audit {property_type}).",
            })

        # 3. Format property labels
        property_labels = {
            'villa': 'Villa / Maison privée',
            'airbnb': 'Appartement / Location Airbnb',
            'hotel': 'Hôtel / Résidence hôtelière',
            'office': 'Bureaux / Siège d\'entreprise',
            'commerce': 'Commerce / Restaurant',
        }
        prop_title = property_labels.get(property_type, property_type.capitalize())
        commune_title = commune.capitalize()

        # 4. Generate reference code
        ref_code = f"WZ-RDV-{fields.Date.today().year}-{partner.id or 100}"

        # 5. Build meeting description for Odoo backend user
        description_body = (
            f"=== AUDIT TECHNIQUE SUR SITE WIZSMITH ===\n"
            f"Référence Dossier : {ref_code}\n\n"
            f"Client : {customer_name}\n"
            f"Téléphone WhatsApp : {phone}\n"
            f"Email : {email or 'Non renseigné'}\n"
            f"Type de bien : {prop_title}\n"
            f"Localisation : Abidjan ({commune_title})\n"
            f"Créneau souhaité : {time_slot}\n"
            f"Notes du client : {notes or 'Aucune'}\n\n"
            f"--- SYNCHRONISATION ODOO 18 COMMUNITY ---\n"
            f"Cet événement a été synchronisé automatiquement depuis le site web.\n"
            f"Gérable dans l'application Calendrier (menu Calendrier > Réunions)."
        )

        # 6. Create the native Odoo 18 calendar.event
        event_vals = {
            'name': f"Audit WizSmith ({prop_title}) - {customer_name}",
            'partner_ids': [(4, partner.id)],
            'start': fields.Datetime.to_string(start_dt),
            'stop': fields.Datetime.to_string(stop_dt),
            'duration': 1.5,
            'location': f"Abidjan, {commune_title}",
            'description': description_body,
        }

        # Check if user_id can be assigned to current user or company manager
        if request.env.user and request.env.user.id != request.website.user_id.id:
            event_vals['user_id'] = request.env.user.id

        try:
            event = request.env['calendar.event'].sudo().create(event_vals)
            _logger.info("Successfully created Odoo calendar.event id=%s for client=%s", event.id, customer_name)
        except Exception as e:
            _logger.error("Failed to create Odoo calendar.event: %s", e)

        # 7. Redirect back to website with confirmation state
        return request.redirect(f'/page/appointment?status=success&ref={ref_code}')

    @http.route('/website/claim/submit', type='http', auth='public', website=True, methods=['POST'], csrf=True)
    def submit_maintenance_claim(self, **post):
        """
        Receives maintenance tickets (WizFix) from the public website (/page/claim)
        and logs them in Odoo for team follow-up.
        """
        customer_name = (post.get('customer_name') or '').strip()
        phone = (post.get('phone') or '').strip()
        equipment = (post.get('equipment') or '').strip()
        priority = (post.get('priority') or 'normal').strip()
        description = (post.get('description') or '').strip()

        if not customer_name or not phone:
            return request.redirect('/page/claim?status=error')

        # Find or create partner
        partner = request.env['res.partner'].sudo().search([
            '|', ('phone', '=', phone), ('mobile', '=', phone)
        ], limit=1)
        if not partner:
            partner = request.env['res.partner'].sudo().create({
                'name': customer_name,
                'phone': phone,
                'city': 'Abidjan',
            })

        ref_code = f"WZ-FIX-{fields.Date.today().year}-{partner.id or 101}"

        # If maintenance or helpdesk is installed, create ticket, otherwise create priority calendar event
        try:
            start_dt = datetime.now() + timedelta(hours=2)
            stop_dt = start_dt + timedelta(hours=1)
            event_vals = {
                'name': f"[WizFix SAV {priority.upper()}] {equipment} - {customer_name}",
                'partner_ids': [(4, partner.id)],
                'start': fields.Datetime.to_string(start_dt),
                'stop': fields.Datetime.to_string(stop_dt),
                'location': 'Abidjan (Intervention SAV WizFix)',
                'description': (
                    f"RÉFÉRENCE SAV : {ref_code}\n"
                    f"Priorité : {priority}\n"
                    f"Équipement : {equipment}\n"
                    f"Description panne : {description}\n"
                    f"Contact client : {customer_name} ({phone})"
                ),
            }
            request.env['calendar.event'].sudo().create(event_vals)
        except Exception as e:
            _logger.error("Failed to log maintenance event: %s", e)

        return request.redirect(f'/page/claim?status=success&ref={ref_code}')
