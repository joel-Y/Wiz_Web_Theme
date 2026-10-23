# WizSmith Web Platform Theme (`website_wizsmith_theme`)

Module pour la plateforme technologique **WizSmith** (Sécurité, Automatisation & Intelligence Immobilière).

---

## 1. Audit du Projet Existant (Phase 1 Findings)

* **Architecture** : Plateforme Web modulaire haute performance (`websocket_worker`).
* **Devise active** : Franc CFA (`FCFA` - ID 42) et Dollar (`$` - ID 1).
* **Couleurs de marque officielles WizSmith** :
  * Bleu Cobalt principal : `#0047AB`
  * Bleu Marine sombre : `#1A1A2E`
  * Orange vif d'action : `#E8630A`
  * Neutres : `#F8FAFC`, `#FFFFFF`, `#E2E8F0`
* **Intégrations préservées** :
  * Assistant IA Shuri (`https://shuri-chat.vercel.app/`)
  * Système de gestion des consentements cookies RGPD
  * Liens d'assistance et maintenance : WizFix (`/claim`) & WizRenouv (`/warranty`)
  * Prise de rendez-vous consultation : `/page/appointment`
  * Diagnostic IA Gratuit : `/support-ia`
* **Tarification préservée** :
  * Pack **BUSINESS** : À partir de 25 000 FCFA/mois (Bureaux, commerces, PME)
  * Pack **ÉLITE** : À partir de 40 000 FCFA/mois (Résidences privées, meublés Airbnb)
  * Pack **PRESTIGE** : À partir de 50 000 FCFA/mois (Villas, hôtels connectés, HomeKit)

---

## 2. Structure du Module

```text
website_wizsmith_theme/
├── __init__.py
├── __manifest__.py
├── README.md
├── controllers/
│   ├── __init__.py
│   └── main.py                       # Routeurs HTTP : /website/appointment/submit -> calendar.event
├── data/
│   └── website_menu_data.xml         # Menus de navigation
├── views/
│   ├── theme_templates.xml           # Layout, Header sticky, Footer, Shuri & Cookies
│   ├── snippets.xml                  # Blocs de construction glisser-déposer
│   └── pages.xml                     # Pages dédiées (Accueil, Airbnb, Hôtels, Rendez-vous, WizFix)
└── static/
    └── src/
        ├── scss/
        │   ├── primary_variables.scss # Variables Bootstrap ($primary, $dark...)
        │   ├── theme.scss             # Typographie Inter, responsive et composants
        │   └── snippets.scss          # Styles personnalisés des snippets
        └── js/
            ├── shuri_chat.js          # Widget pour l'assistant IA Shuri
            ├── cookie_consent.js      # Widget de gestion des cookies
            ├── property_assessment.js # Widget interactif de scoring de sécurité
            └── theme.js               # Comportements généraux et navigation mobile
```

---

## 3. Instructions d'Installation

### Prérequis
- Odoo 18.0 Community Edition opérationnel avec Python 3.10+
- Modules standards `website` et `calendar` installés

### Étape 1 : Copie du module dans vos addons
Copiez le dossier `website_wizsmith_theme` dans le répertoire d'addons configuré dans `odoo.conf` :
```bash
cp -r website_wizsmith_theme /chemin/vers/custom_addons/
```

### Étape 2 : Redémarrage du service
Redémarrez le service web Odoo :
```bash
sudo systemctl restart odoo
```
Ou en ligne de commande :
```bash
./odoo-bin -c odoo.conf -u base
```

### Étape 3 : Installation via l'interface
1. Connectez-vous en tant qu'Administrateur.
2. Allez dans le menu **Applications**.
3. Activez le Mode Développeur et cliquez sur **Mettre à jour la liste des applications**.
4. Recherchez `WizSmith Theme` ou `website_wizsmith_theme`.
5. Cliquez sur **Activer / Installer**.

---

## 4. Instructions de Mise à Jour (Upgrade)

Pour mettre à jour le thème après modification des templates, du SCSS ou des contrôleurs :
```bash
./odoo-bin -c odoo.conf -d nom_de_votre_base -u website_wizsmith_theme --stop-after-init
```

---

## 5. Checklist de Validation & Tests Staging

- [x] Syntaxe Python et XML validée selon les standards Odoo 18 Community
- [x] Séparation stricte Front-Office / Back-Office : aucun panneau ou bouton gestionnaire visible aux visiteurs
- [x] Formulaire `/page/appointment` 100% orienté conversion client avec réassurance locale Abidjan
- [x] Synchronisation automatique du formulaire web vers l'application Calendrier native d'Odoo 18 (`calendar.event`)
- [x] Responsive testé de 320px à 1440px sans débordement horizontal
- [x] L'assistant Shuri ne masque pas les boutons d'action sur mobile
- [x] Le bandeau de cookies respecte le consentement `localStorage`
- [x] Les prix et intitulés commerciaux (Business, Élite, Prestige) sont strictement respectés
- [x] Structure de navigation avec URLs préservées
- [x] Prise en charge des langues (Français, Anglais, Espagnol, Arabe RTL)

---

## 6. Synchronisation avec le Calendrier Natif Odoo 18 Community

Ce thème intègre une synchronisation directe avec le module standard **Calendrier** (`calendar`) d'Odoo 18 Community Edition, et est également 100% compatible avec l'addon *Website Appointment Customer Management and Integration with Calendar* de Probuse Consulting Service Pvt. Ltd.

### Isolation Stricte Front / Back
* **Sur le Site Web Public (`/page/appointment`)** : Les visiteurs ne voient **aucun** bouton d'administration, aucun statut interne, ni aucune console gestionnaire. Ils profitent d'un parcours fluide de réservation avec numéro de dossier et confirmation WhatsApp.
* **Dans Votre Backend Odoo Privé (`/web`)** : En tant que gestionnaire WizSmith, vous retrouvez tous les rendez-vous pris sur le site directement dans votre menu **Calendrier > Réunions** (`calendar.action_calendar_event`).

### Mappage Automatique dans `calendar.event` :
1. **Création ou liaison du contact** : La méthode vérifie l'existence du client via son téléphone WhatsApp ou email dans `res.partner`. S'il n'existe pas, une nouvelle fiche contact est créée.
2. **Attribution du créneau** : Les heures de début (`start`) et fin (`stop`) sont calculées à partir de la date d'audit et du créneau horaire choisi (ex: 10h30 – 12h00).
3. **Localisation précise** : La commune abidjanaise (Cocody, Marcory, Plateau, Bingerville, etc.) est renseignée dans le champ `location`.
4. **Description enrichie** : Les détails techniques (type de propriété, particularités, notes du client, numéro de dossier `WZ-RDV-2026-X`) sont formatés dans le champ `description` pour vos ingénieurs de terrain.

---

## 7. Intégration des Services SAV WizFix & Garanties WizRenouv (Odoo Maintenance)

Le thème intègre également une gestion complète du Service Après-Vente et du parc d'équipements :

### A. WizFix (Dépannage & Maintenance d'Urgence)
- **Front-Office** : Formulaire `/claim` permettant aux clients de déclarer une anomalie (serrure, caméra, passerelle, climatisation) avec niveau d'urgence.
- **Backend Odoo (`maintenance.request`)** :
  - Génère automatiquement un ticket d'intervention dans le module **Maintenance** Odoo.
  - Attribution d'un technicien d'astreinte (`user_id`) avec priorité (Standard / Urgent 24h).
  - Suivi des étapes : *Nouveau*, *Assigné*, *En intervention*, *Résolu*.
  - Compte-rendu d'intervention et historique des pièces remplacées sous garantie.

### B. WizRenouv (Garanties Matérielles & Renouvellement)
- **Front-Office** : Vérificateur `/warranty` permettant au client de consulter son contrat par numéro de contrat ou numéro IMEI de sa passerelle.
- **Backend Odoo (`maintenance.equipment`)** :
  - Suivi du parc d'équipements installés chez chaque client (`partner_id`).
  - Décompte de la date d'éligibilité au renouvellement annuel (remplacement préventif gratuit inclus dans les abonnements ÉLITE et PRESTIGE).
  - Traçabilité des numéros de série et des garanties matérielles.
