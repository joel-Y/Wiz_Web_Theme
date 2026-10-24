# -*- coding: utf-8 -*-
{
    'name': 'WizSmith Theme - Smart Property Tech',
    'summary': 'Thème Web haut de gamme pour WizSmith : Sécurité, Automatisation & IA Immobilière',
    'description': """
WizSmith Web Platform Theme
===========================
Thème professionnel sur-mesure pour la plateforme technologique WizSmith (Côte d'Ivoire & Afrique de l'Ouest).
Conçu selon les standards stricts du framework WizSmith Web.

Caractéristiques principales :
------------------------------
* Architecture 100% mobile-first sans débordement horizontal
* Palette officielle WizSmith (#0047AB Bleu Cobalt, #1A1A2E Marine Nuit, #E8630A Orange d'action)
* Snippets modulaires pour l'Éditeur de Site Web WizSmith
* Intégration optimisée de l'Assistant IA Shuri (sans obstruction mobile)
* Système de consentement RGPD / Cookies conforme avec modal de préférences
* Outil de diagnostic et scoring de sécurité de propriété interactif
* Support multilingue natif (Français, Anglais, Espagnol, Arabe avec RTL)
* Pages dédiées : Accueil, Comment ça fonctionne, Packs & Solutions, Résidences & Airbnb, Hôtels intelligents, Rendez-vous
* Intégration backend des rendez-vous avec le Calendrier Odoo (compatible avec le module Probuse Website Appointment Customer Management and Integration with Calendar)
    """,
    'category': 'Theme/Corporate',
    'version': '1.0.0',
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
            ('after', 'website/static/src/scss/primary_variables.scss',
             'website_wizsmith_theme/static/src/scss/primary_variables.scss'),
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
    'images': [
        'static/description/theme_cover.png',
        'static/description/icon.png',
    ],
    'installable': True,
    'auto_install': False,
    'application': False,
}
