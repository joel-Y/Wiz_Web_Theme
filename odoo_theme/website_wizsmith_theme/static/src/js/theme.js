/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

export const WizSmithThemeWidget = publicWidget.Widget.extend({
    selector: '#wrapwrap',

    start() {
        this._super(...arguments);
        this._setupMobileNav();
        this._setupSmoothScroll();
        this._setupBillingToggle();
        return Promise.resolve();
    },

    _setupBillingToggle() {
        // Monthly / annual (-10%) switch on the pricing snippet
        this.el.querySelectorAll('.wiz-billing-toggle').forEach((toggle) => {
            const section = toggle.closest('section');
            toggle.querySelectorAll('button[data-billing]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const mode = btn.dataset.billing;
                    toggle.querySelectorAll('button[data-billing]').forEach((b) => {
                        const on = b === btn;
                        b.classList.toggle('active', on);
                        b.setAttribute('aria-pressed', on ? 'true' : 'false');
                    });
                    section.querySelectorAll('.wiz-price').forEach((el) => {
                        el.textContent = el.dataset[mode] || el.textContent;
                    });
                });
            });
        });
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
                    let targetEl = null;
                    try {
                        targetEl = document.querySelector(targetId);
                    } catch (err) {
                        return; // not a valid selector (e.g. "#a:b"): let the browser handle it
                    }
                    if (targetEl) {
                        e.preventDefault();
                        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                        targetEl.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
                    }
                }
            });
        });
    },
});

publicWidget.registry.WizSmithThemeWidget = WizSmithThemeWidget;
export default WizSmithThemeWidget;
