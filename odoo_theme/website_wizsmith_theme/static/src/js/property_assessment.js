/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Interactive security diagnostic (port of the React AssessmentSection + utils/rules.ts).
 * The markup ships with the default answers already rendered, so the section reads
 * correctly without JavaScript; this widget recomputes the report on every change.
 * Everything is written with textContent / createElement: no HTML is built from strings.
 */

const LEVEL_CLASS = { 'faible': 'is-faible', 'modéré': 'is-modere', 'élevé': 'is-eleve', 'critique': 'is-critique' };

const DEFAULTS = {
    propertyType: 'residential',
    surfaceM2: 160,
    entryPointsCount: 3,
    cameraCount: 2, // same fixed assumption as the React design (no control for it)
    smartLocks: false,
    aiDetection: false,
    remoteControl: false,
    energyAutomation: false,
    staffMonitoring: false, // same as the React design (no control for it)
};

/** Same rules as src/utils/rules.ts calculatePropertySecurityScore(). */
export function computeAssessment(input) {
    let score = 25;
    const risks = [];
    const equipments = [];

    if (input.smartLocks) {
        score += 20;
    } else {
        risks.push("Clés physiques vulnérables aux doubles non autorisés et pertes.");
        equipments.push({
            name: "Serrure Intelligente WizLock Pro", priority: 'Haute',
            rationale: "Supprime les clés physiques et enregistre chaque passage avec horodatage.",
        });
    }

    if (input.cameraCount === 0) {
        risks.push("Absence de vision en temps réel en cas d'intrusion ou d'incident.");
        equipments.push({
            name: "Caméras Haute Définition Intelligentes WizVision", priority: 'Haute',
            rationale: "Couvre les zones stratégiques et points d'accès vulnérables.",
        });
    } else if (!input.aiDetection) {
        score += 10;
        risks.push("Caméras passives nécessitant un visionnage manuel fastidieux.");
        equipments.push({
            name: "Module IA WizBridge pour caméras existantes", priority: 'Haute',
            rationale: "Transforme vos caméras actuelles en système proactif avec détection humaine/véhicule.",
        });
    } else {
        score += 25;
    }

    if (input.remoteControl) {
        score += 15;
    } else {
        risks.push("Manque de visibilité et incapacité d'intervention lors de vos déplacements.");
    }

    if (input.energyAutomation) {
        score += 10;
    } else if (['airbnb', 'hotel', 'business'].includes(input.propertyType)) {
        risks.push("Gaspillage énergétique important (climatiseurs en marche dans les espaces inoccupés).");
        equipments.push({
            name: "Thermostats & Relais d'Énergie Connectés", priority: 'Moyenne',
            rationale: "Économise jusqu'à 35% sur la facture électrique Sonabel/CIE.",
        });
    }

    if (input.propertyType === 'hotel' || input.propertyType === 'business') {
        if (input.staffMonitoring) {
            score += 5;
        } else {
            risks.push("Manque de traçabilité des heures d'arrivée et d'intervention des équipes.");
        }
    }

    score = Math.min(100, Math.max(10, score));

    let riskLevel;
    if (score >= 80) riskLevel = 'faible';
    else if (score >= 60) riskLevel = 'modéré';
    else if (score >= 40) riskLevel = 'élevé';
    else riskLevel = 'critique';

    let plan = 'ÉLITE';
    let monthly = 40000;
    if (input.propertyType === 'business') {
        plan = 'BUSINESS';
        monthly = 25000;
    } else if (input.propertyType === 'hotel' || (input.surfaceM2 > 350 && input.propertyType === 'residential')) {
        plan = 'PRESTIGE';
        monthly = 50000;
    }

    return {
        score,
        riskLevel,
        risks: risks.length ? risks : ["Faible vulnérabilité résiduelle aux coupures réseau."],
        equipments,
        plan,
        monthly,
    };
}

function formatCFA(amount) {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

export const PropertyAssessmentWidget = publicWidget.Widget.extend({
    selector: '.s_wizsmith_assessment',
    events: {
        'click .wiz-assess-type': '_onType',
        'input #wiz-assess-surface': '_onRange',
        'input #wiz-assess-entries': '_onRange',
        'change .wiz-assess-check': '_onCheck',
        'click .wiz-assess-reset': '_onReset',
    },

    start() {
        this._super(...arguments);
        this.state = Object.assign({}, DEFAULTS);
        this._shownScore = null;
        this._raf = null;
        this._render(false);
        return Promise.resolve();
    },

    destroy() {
        if (this._raf) {
            cancelAnimationFrame(this._raf);
        }
        return this._super(...arguments);
    },

    // ---- events --------------------------------------------------------
    _onType(ev) {
        this.state.propertyType = ev.currentTarget.dataset.type;
        this._render(true);
    },

    _onRange() {
        this.state.surfaceM2 = parseInt(this.el.querySelector('#wiz-assess-surface').value, 10) || DEFAULTS.surfaceM2;
        this.state.entryPointsCount = parseInt(this.el.querySelector('#wiz-assess-entries').value, 10) || DEFAULTS.entryPointsCount;
        this._render(true);
    },

    _onCheck(ev) {
        this.state[ev.currentTarget.dataset.key] = ev.currentTarget.checked;
        this._render(true);
    },

    _onReset(ev) {
        ev.preventDefault();
        ['smartLocks', 'aiDetection', 'remoteControl', 'energyAutomation'].forEach((k) => {
            this.state[k] = false;
        });
        this._render(true);
    },

    // ---- rendering -----------------------------------------------------
    _render(animate) {
        const s = this.state;
        const r = computeAssessment(s);
        const q = (sel) => this.el.querySelector(sel);

        // Controls (kept in sync so reset / initial state always match)
        this.el.querySelectorAll('.wiz-assess-type').forEach((b) => {
            const on = b.dataset.type === s.propertyType;
            b.classList.toggle('active', on);
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        this.el.querySelectorAll('.wiz-assess-check').forEach((c) => {
            c.checked = !!s[c.dataset.key];
        });
        const surface = q('.wiz-surface-val');
        const entries = q('.wiz-entries-val');
        if (surface) surface.textContent = String(s.surfaceM2);
        if (entries) entries.textContent = String(s.entryPointsCount);

        // Gauge + risk label colour
        const cls = LEVEL_CLASS[r.riskLevel];
        ['.wiz-gauge', '.wiz-risk-label'].forEach((sel) => {
            const el = q(sel);
            if (el) {
                Object.values(LEVEL_CLASS).forEach((c) => el.classList.remove(c));
                el.classList.add(cls);
            }
        });
        const riskText = q('.wiz-risk-text');
        if (riskText) riskText.textContent = r.riskLevel;
        this._setScore(r.score, animate);

        // Risks
        const riskList = q('.wiz-risk-list');
        if (riskList) {
            riskList.replaceChildren(...r.risks.map((text) => {
                const li = document.createElement('li');
                const dot = document.createElement('span');
                dot.className = 'wiz-bullet';
                dot.textContent = '•';
                const t = document.createElement('span');
                t.textContent = text;
                li.append(dot, t);
                return li;
            }));
        }

        // Equipment (top two, hidden when nothing to recommend)
        const equipBlock = q('.wiz-equip-block');
        const equipList = q('.wiz-equip-list');
        if (equipBlock && equipList) {
            equipBlock.classList.toggle('d-none', !r.equipments.length);
            equipList.replaceChildren(...r.equipments.slice(0, 2).map((eq) => {
                const li = document.createElement('li');
                const left = document.createElement('span');
                const name = document.createElement('strong');
                name.className = 'text-white d-block';
                name.textContent = eq.name;
                const why = document.createElement('span');
                why.className = 'wiz-equip-why';
                why.textContent = eq.rationale;
                left.append(name, why);
                const prio = document.createElement('span');
                prio.className = 'wiz-prio';
                prio.textContent = eq.priority;
                li.append(left, prio);
                return li;
            }));
        }

        // Plan
        const price = q('.wiz-plan-price');
        const plan = q('.wiz-plan-name');
        if (price) price.textContent = formatCFA(r.monthly);
        if (plan) plan.textContent = r.plan;
    },

    _setScore(target, animate) {
        const el = this.el.querySelector('.wiz-score-value');
        if (!el) return;
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const from = this._shownScore === null ? target : this._shownScore;
        this._shownScore = target;
        if (this._raf) cancelAnimationFrame(this._raf);
        if (!animate || reduce || from === target) {
            el.textContent = String(target);
            return;
        }
        const start = performance.now();
        const duration = 450;
        const step = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = String(Math.round(from + (target - from) * eased));
            if (t < 1) {
                this._raf = requestAnimationFrame(step);
            } else {
                this._raf = null;
            }
        };
        this._raf = requestAnimationFrame(step);
    },
});

publicWidget.registry.PropertyAssessmentWidget = PropertyAssessmentWidget;
export default PropertyAssessmentWidget;
