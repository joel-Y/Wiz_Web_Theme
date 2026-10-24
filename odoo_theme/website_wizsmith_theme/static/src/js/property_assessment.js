/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Optional interactive scoring. The shipped snippet displays a static sample
 * report, so with no `.assessment-input` fields the widget leaves the markup
 * untouched. If inputs are added (data-score = points awarded when checked),
 * the displayed score is computed from them.
 */
export const PropertyAssessmentWidget = publicWidget.Widget.extend({
    selector: '.s_wizsmith_assessment',
    events: {
        'change .assessment-input': '_onRecalculate',
        'click .btn-run-assessment': '_onRunAssessment',
    },

    start() {
        this._super(...arguments);
        this._calculateScore();
        return Promise.resolve();
    },

    _onRecalculate() {
        this._calculateScore();
    },

    _onRunAssessment(ev) {
        if (ev) ev.preventDefault();
        this._calculateScore();
        const resultsEl = this.el.querySelector('.assessment-results-panel');
        if (resultsEl) {
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            resultsEl.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        }
    },

    _calculateScore() {
        const inputs = this.el.querySelectorAll('.assessment-input');
        const scoreDisplay = this.el.querySelector('.wiz-score-value');
        if (!inputs.length || !scoreDisplay) {
            return; // static sample: keep the markup as authored
        }
        let total = 0;
        let earned = 0;
        inputs.forEach((input) => {
            const points = parseInt(input.dataset.score || '1', 10) || 0;
            total += points;
            if (input.checked) {
                earned += points;
            }
        });
        scoreDisplay.textContent = total ? String(Math.round((earned / total) * 100)) : '0';
    },
});

publicWidget.registry.PropertyAssessmentWidget = PropertyAssessmentWidget;
export default PropertyAssessmentWidget;
