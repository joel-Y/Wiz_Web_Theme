export interface OdooFile {
  path: string;
  name: string;
  language: 'python' | 'xml' | 'scss' | 'javascript' | 'markdown';
  category: 'Manifest & Init' | 'Controllers & Backend' | 'Views & Templates' | 'Stylesheets (SCSS)' | 'JavaScript (Widgets)' | 'Data & Menus' | 'Documentation';
  content: string;
}

export const odooModuleFiles: OdooFile[] = [
  {
    path: '__manifest__.py',
    name: '__manifest__.py',
    language: 'python',
    category: 'Manifest & Init',
    content: `# -*- coding: utf-8 -*-
{
    'name': 'WizSmith Theme - Smart Property Tech',
    'summary': 'Thème Web haut de gamme pour WizSmith : Sécurité, Automatisation & IA Immobilière',
    'description': """
WizSmith Web Platform Theme
===========================
Thème professionnel sur-mesure pour la plateforme technologique WizSmith (Côte d'Ivoire & Afrique de l'Ouest).
Conçu selon les standards stricts du framework WizSmith Web.
    """,
    'category': 'Theme/Corporate',
    'version': '18.0.1.0.0',
    'author': 'WizSmith Engineering',
    'website': 'https://wizsmith.com',
    'license': 'LGPL-3',
    'depends': [
        'website',
        'calendar',
    ],
    'data': [
        'data/website_menu_data.xml',
        'views/theme_templates.xml',
        'views/snippets.xml',
        'views/pages.xml',
    ],
    'assets': {
        'web._assets_primary_variables': [
            'website_wizsmith_theme/static/src/scss/primary_variables.scss',
        ],
        'web.assets_frontend': [
            'website_wizsmith_theme/static/src/scss/theme.scss',
            'website_wizsmith_theme/static/src/scss/snippets.scss',
            'website_wizsmith_theme/static/src/js/shuri_chat.js',
            'website_wizsmith_theme/static/src/js/cookie_consent.js',
            'website_wizsmith_theme/static/src/js/property_assessment.js',
            'website_wizsmith_theme/static/src/js/theme.js',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': False,
}
`,
  },
  {
    path: '__init__.py',
    name: '__init__.py',
    language: 'python',
    category: 'Manifest & Init',
    content: `# -*- coding: utf-8 -*-
# Part of WizSmith. See LICENSE file for full copyright and licensing details.

from . import controllers
`,
  },
  {
    path: 'controllers/__init__.py',
    name: '__init__.py',
    language: 'python',
    category: 'Controllers & Backend',
    content: `# -*- coding: utf-8 -*-
# Part of WizSmith. See LICENSE file for full copyright and licensing details.

from . import main
`,
  },
  {
    path: 'controllers/main.py',
    name: 'main.py',
    language: 'python',
    category: 'Controllers & Backend',
    content: `# -*- coding: utf-8 -*-
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
        customer_name = (post.get('customer_name') or '').strip()
        phone = (post.get('phone') or '').strip()
        email = (post.get('email') or '').strip()
        appointment_date = (post.get('appointment_date') or '').strip()
        time_slot = (post.get('time_slot') or '10:30 - 12:00').strip()
        property_type = (post.get('property_type') or 'villa').strip()
        commune = (post.get('commune') or 'cocody').strip()
        notes = (post.get('notes') or '').strip()

        if not customer_name or not phone:
            return request.redirect('/page/appointment?status=error')

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
            dt_base = datetime.strptime(appointment_date, '%Y-%m-%d') if appointment_date else datetime.now() + timedelta(days=2)
            start_dt = dt_base.replace(hour=start_hour, minute=start_min, second=0)
            stop_dt = dt_base.replace(hour=stop_hour, minute=stop_min, second=0)
        except Exception:
            dt_base = datetime.now() + timedelta(days=2)
            start_dt = dt_base.replace(hour=10, minute=30, second=0)
            stop_dt = dt_base.replace(hour=12, minute=0, second=0)

        # 2. Find or create the customer partner (res.partner)
        partner = request.env['res.partner'].sudo().search([
            '|', ('phone', '=', phone), ('mobile', '=', phone)
        ], limit=1)
        if not partner and email:
            partner = request.env['res.partner'].sudo().search([('email', '=', email)], limit=1)
        if not partner:
            partner = request.env['res.partner'].sudo().create({
                'name': customer_name,
                'phone': phone,
                'email': email or False,
                'city': 'Abidjan',
                'street': f"Commune de {commune.capitalize()}",
            })

        ref_code = f"WZ-RDV-{fields.Date.today().year}-{partner.id or 100}"
        prop_label = property_type.capitalize()
        commune_label = commune.capitalize()

        # 3. Create native Odoo 18 calendar.event
        event_vals = {
            'name': f"Audit WizSmith ({prop_label}) - {customer_name}",
            'partner_ids': [(4, partner.id)],
            'start': fields.Datetime.to_string(start_dt),
            'stop': fields.Datetime.to_string(stop_dt),
            'duration': 1.5,
            'location': f"Abidjan, {commune_label}",
            'description': (
                f"=== AUDIT TECHNIQUE SUR SITE WIZSMITH ===\\n"
                f"Référence Dossier : {ref_code}\\n"
                f"Client : {customer_name}\\n"
                f"Téléphone WhatsApp : {phone}\\n"
                f"Email : {email or 'Non renseigné'}\\n"
                f"Type de bien : {prop_label}\\n"
                f"Commune : {commune_label}\\n"
                f"Créneau : {time_slot}\\n"
                f"Notes : {notes or 'Aucune'}\\n\\n"
                f"Synchronisé dans l'application Calendrier d'Odoo 18 (Menu: Calendrier > Réunions)."
            ),
        }
        try:
            request.env['calendar.event'].sudo().create(event_vals)
        except Exception as e:
            _logger.error("Failed to create Odoo calendar.event: %s", e)

        return request.redirect(f'/page/appointment?status=success&ref={ref_code}')
`,
  },
  {
    path: 'views/theme_templates.xml',
    name: 'theme_templates.xml',
    language: 'xml',
    category: 'Views & Templates',
    content: `<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <!-- Inherit website.layout for Meta, Shuri Assistant and Cookie Banner -->
    <template id="wizsmith_layout_inherit" inherit_id="website.layout" name="WizSmith Layout Extension">
        <xpath expr="//head" position="inside">
            <meta name="theme-color" content="#0047AB"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
        </xpath>

        <xpath expr="//div[@id='wrapwrap']" position="inside">
            <!-- Shuri Assistant Launcher & Frame -->
            <div id="wizsmith-shuri-widget" class="position-fixed bottom-0 end-0 p-3" style="z-index: 1040;">
                <button id="shuri-launcher" class="btn btn-primary rounded-circle shadow-lg"
                        style="width: 58px; height: 58px; background: linear-gradient(135deg, #0047AB 0%, #1A1A2E 100%);"
                        aria-label="Ouvrir l'assistant Shuri">⚡</button>
                <div id="shuri-frame" class="position-fixed shadow-2xl rounded-4 overflow-hidden"
                     style="display: none; bottom: 84px; right: 20px; width: 380px; max-width: calc(100vw - 32px); height: 580px; background: #fff; z-index: 1050;">
                    <iframe src="https://shuri-chat.vercel.app/" allow="microphone; camera" style="width: 100%; height: 100%; border: none;"></iframe>
                </div>
            </div>

            <!-- Cookie Banner -->
            <div id="cookie-banner" class="position-fixed bottom-0 start-50 translate-middle-x p-4 shadow-xl"
                 style="display: none; z-index: 1030; width: 92%; max-width: 520px; margin-bottom: 20px; background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(12px); border-radius: 16px;">
                <p class="small text-muted mb-3">WizSmith respecte votre vie privée et vos données.</p>
                <button id="btn-accept-cookies" class="btn btn-sm btn-primary">Accepter tout</button>
                <button id="btn-decline-cookies" class="btn btn-sm btn-outline-secondary">Refuser</button>
            </div>
        </xpath>
    </template>
</odoo>
`,
  },
  {
    path: 'views/snippets.xml',
    name: 'snippets.xml',
    language: 'xml',
    category: 'Views & Templates',
    content: `<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <!-- Snippet: Hero -->
    <template id="s_wizsmith_hero" name="WizSmith Hero Section">
        <!-- Hero Section with Headline, CTAs, and Smart Property Showcase -->
    </template>

    <!-- Snippet: Customer Problems -->
    <template id="s_wizsmith_problems" name="WizSmith Problems Section">
        <!-- 6 Responsive problem cards -->
    </template>

    <!-- Snippet: Why WizSmith -->
    <template id="s_wizsmith_why" name="WizSmith Benefits Section">
        <!-- 6 Reusable value cards -->
    </template>

    <!-- Snippet: Solutions by Space -->
    <template id="s_wizsmith_solutions" name="WizSmith Solutions by Space">
        <!-- Residential, Airbnb, Hotels, Business -->
    </template>

    <!-- Snippet: Pricing Packages -->
    <template id="s_wizsmith_pricing" name="WizSmith Subscription Packages">
        <!-- BUSINESS (25k), ÉLITE (40k), PRESTIGE (50k) -->
    </template>

    <!-- Register Snippets in Odoo 18 Building Blocks Drawer -->
    <template id="wizsmith_snippets_registration" inherit_id="website.snippets" name="WizSmith Snippets Registration">
        <xpath expr="//div[@id='snippet_structure']" position="inside">
            <t t-snippet="website_wizsmith_theme.s_wizsmith_hero" string="WizSmith Hero" t-thumbnail="/website_wizsmith_theme/static/description/icon.png"/>
            <t t-snippet="website_wizsmith_theme.s_wizsmith_problems" string="WizSmith Problèmes" t-thumbnail="/website_wizsmith_theme/static/description/icon.png"/>
            <t t-snippet="website_wizsmith_theme.s_wizsmith_why" string="WizSmith Avantages" t-thumbnail="/website_wizsmith_theme/static/description/icon.png"/>
            <t t-snippet="website_wizsmith_theme.s_wizsmith_solutions" string="WizSmith Solutions" t-thumbnail="/website_wizsmith_theme/static/description/icon.png"/>
            <t t-snippet="website_wizsmith_theme.s_wizsmith_pricing" string="WizSmith Abonnements" t-thumbnail="/website_wizsmith_theme/static/description/icon.png"/>
        </xpath>
    </template>
</odoo>
`,
  },
  {
    path: 'views/pages.xml',
    name: 'pages.xml',
    language: 'xml',
    category: 'Views & Templates',
    content: `<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <!-- Homepage -->
    <template id="wizsmith_homepage" name="WizSmith Homepage" page="True">
        <t t-call="website.layout">
            <div id="wrap" class="oe_structure oe_empty">
                <t t-call="website_wizsmith_theme.s_wizsmith_hero"/>
                <t t-call="website_wizsmith_theme.s_wizsmith_problems"/>
                <t t-call="website_wizsmith_theme.s_wizsmith_why"/>
                <t t-call="website_wizsmith_theme.s_wizsmith_solutions"/>
                <t t-call="website_wizsmith_theme.s_wizsmith_pricing"/>
                <t t-call="website_wizsmith_theme.s_wizsmith_testimonials"/>
                <t t-call="website_wizsmith_theme.s_wizsmith_cta"/>
            </div>
        </t>
    </template>
</odoo>
`,
  },
  {
    path: 'static/src/scss/primary_variables.scss',
    name: 'primary_variables.scss',
    language: 'scss',
    category: 'Stylesheets (SCSS)',
    content: `$primary: #0047AB;
$dark: #1A1A2E;
$warning: #E8630A;
$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

$o-theme-color-palette: (
    'primary': #0047AB,
    'secondary': #475569,
    'dark': #1A1A2E,
    'light': #F8FAFC,
    'warning': #E8630A,
    'success': #10B981,
);
`,
  },
  {
    path: 'static/src/scss/theme.scss',
    name: 'theme.scss',
    language: 'scss',
    category: 'Stylesheets (SCSS)',
    content: `body {
    font-family: 'Inter', sans-serif;
    color: #1E293B;
    background-color: #F8FAFC;
}

.navbar {
    .nav-link {
        font-weight: 500;
        color: #1E293B !important;
        &:hover {
            color: #0047AB !important;
        }
    }
}

.btn:active {
    transform: scale(0.985);
}

@media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
        transform: none !important;
    }
}
`,
  },
  {
    path: 'static/src/js/shuri_chat.js',
    name: 'shuri_chat.js',
    language: 'javascript',
    category: 'JavaScript (Widgets)',
    content: `/** @odoo-module **/
import publicWidget from "@web/legacy/js/public/public_widget";

export const ShuriChatWidget = publicWidget.Widget.extend({
    selector: '#wizsmith-shuri-widget',
    events: {
        'click #shuri-launcher': '_onToggleChat',
        'click #shuri-close': '_onCloseChat',
    },
    start() {
        this._super(...arguments);
        this.frame = this.el.querySelector('#shuri-frame');
    },
    _onToggleChat(ev) {
        if (ev) ev.preventDefault();
        if (!this.frame) return;
        const isVisible = this.frame.style.display === 'block';
        this.frame.style.display = isVisible ? 'none' : 'block';
    },
    _onCloseChat(ev) {
        if (ev) ev.preventDefault();
        if (this.frame) this.frame.style.display = 'none';
    },
});

publicWidget.registry.ShuriChatWidget = ShuriChatWidget;
export default ShuriChatWidget;
`,
  },
  {
    path: 'static/src/js/cookie_consent.js',
    name: 'cookie_consent.js',
    language: 'javascript',
    category: 'JavaScript (Widgets)',
    content: `/** @odoo-module **/
import publicWidget from "@web/legacy/js/public/public_widget";

export const CookieConsentWidget = publicWidget.Widget.extend({
    selector: '#wrapwrap',
    events: {
        'click #btn-accept-cookies': '_onAcceptAll',
        'click #btn-decline-cookies': '_onDeclineAll',
    },
    start() {
        this._super(...arguments);
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            const banner = this.el.querySelector('#cookie-banner');
            if (banner) banner.style.display = 'block';
        }
    },
    _onAcceptAll() {
        localStorage.setItem('cookieConsent', 'accepted');
        const banner = this.el.querySelector('#cookie-banner');
        if (banner) banner.style.display = 'none';
    },
    _onDeclineAll() {
        localStorage.setItem('cookieConsent', 'declined');
        const banner = this.el.querySelector('#cookie-banner');
        if (banner) banner.style.display = 'none';
    },
});

publicWidget.registry.CookieConsentWidget = CookieConsentWidget;
export default CookieConsentWidget;
`,
  },
  {
    path: 'data/website_menu_data.xml',
    name: 'website_menu_data.xml',
    language: 'xml',
    category: 'Data & Menus',
    content: `<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <data noupdate="1">
        <record id="menu_wizsmith_home" model="website.menu">
            <field name="name">Accueil</field>
            <field name="url">/</field>
            <field name="parent_id" ref="website.main_menu"/>
            <field name="sequence" type="int">10</field>
        </record>
        <record id="menu_wizsmith_solutions" model="website.menu">
            <field name="name">Solutions</field>
            <field name="url">/packs</field>
            <field name="parent_id" ref="website.main_menu"/>
            <field name="sequence" type="int">30</field>
        </record>
    </data>
</odoo>
`,
  },
  {
    path: 'README.md',
    name: 'README.md',
    language: 'markdown',
    category: 'Documentation',
    content: `# WizSmith Web Platform Theme

Installation Guide:
1. Copier dans custom_addons/
2. Redémarrer le service web
3. Mettre à jour la liste des modules
4. Installer 'website_wizsmith_theme'
`,
  },
];
