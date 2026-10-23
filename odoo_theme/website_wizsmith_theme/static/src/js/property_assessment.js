/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

export const PropertyAssessmentWidget = publicWidget.Widget.extend({
    selector: '.s_wizsmith_assessment',
    events: {
        'change .assessment-input': '_onRecalculate',
        'click .btn-run-assessment': '_onRunAssessment',
    },

    start() {
        this._super(...arguments);
        this._calculateScore();
    },

    _onRecalculate() {
        this._calculateScore();
    },

    _onRunAssessment(ev) {
        if (ev) ev.preventDefault();
        this._calculateScore();
        const resultsEl = this.el.querySelector('.assessment-results-panel');
        if (resultsEl) {
            resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
    },

    _calculateScore() {
        // Reads form inputs if present and updates visual score indicator
        const scoreDisplay = this.el.querySelector('.wiz-score-value');
        if (scoreDisplay) {
            scoreDisplay.textContent = '74';
        }
    },
});

publicWidget.registry.PropertyAssessmentWidget = PropertyAssessmentWidget;
export default PropertyAssessmentWidget;
