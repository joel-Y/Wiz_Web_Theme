/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

export const WizSmithThemeWidget = publicWidget.Widget.extend({
    selector: '#wrapwrap',

    start() {
        this._super(...arguments);
        this._setupMobileNav();
        this._setupSmoothScroll();
    },

    _setupMobileNav() {
        const navLinks = this.el.querySelectorAll('#wizNavbarCollapse .nav-link');
        const collapseEl = this.el.querySelector('#wizNavbarCollapse');

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992 && collapseEl && window.bootstrap && window.bootstrap.Collapse) {
                    const bsCollapse = window.bootstrap.Collapse.getInstance(collapseEl);
                    if (bsCollapse) bsCollapse.hide();
                }
            });
        });
    },

    _setupSmoothScroll() {
        // Safe internal smooth scrolling
        const anchors = this.el.querySelectorAll('a[href^="#"]:not([href="#"]):not([data-bs-toggle])');
        anchors.forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    },
});

publicWidget.registry.WizSmithThemeWidget = WizSmithThemeWidget;
export default WizSmithThemeWidget;
