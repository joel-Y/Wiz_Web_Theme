/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

export const WizSmithThemeWidget = publicWidget.Widget.extend({
    selector: '#wrapwrap',

    start() {
        this._super(...arguments);
        this._setupMobileNav();
        this._setupSmoothScroll();
        this._setupBillingToggle();
        this._setupScrollEffects();
        return Promise.resolve();
    },

    _setupScrollEffects() {
        // Skip while the website editor is open, and for visitors who asked for less motion.
        if (document.body.classList.contains('editor_enable') || document.documentElement.classList.contains('o_is_editing')) {
            return;
        }
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Header gets a soft shadow once the page is scrolled.
        const nav = this.el.querySelector('header .navbar');
        const scroller = this.el;
        if (nav) {
            const onScroll = () => nav.classList.toggle('wiz-scrolled', (scroller.scrollTop || window.scrollY) > 8);
            scroller.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        if (reduce || !('IntersectionObserver' in window)) {
            return;
        }
        // Sections below the hero fade up as they enter the viewport (staggered per row).
        const targets = this.el.querySelectorAll(
            '.s_wizsmith_problems .row > [class*="col-"], .s_wizsmith_why .row > [class*="col-"], ' +
            '.s_wizsmith_solutions .row > [class*="col-"], .s_wizsmith_pricing .row > [class*="col-"], ' +
            '.s_wizsmith_testimonials .row > [class*="col-"], .s_wizsmith_assessment .row > [class*="col-"], ' +
            '.s_wizsmith_cta .container > *'
        );
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('wiz-reveal-hidden');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        targets.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                return; // already on screen: leave it alone
            }
            el.classList.add('wiz-reveal', 'wiz-reveal-hidden');
            el.style.transitionDelay = `${(i % 3) * 80}ms`;
            io.observe(el);
        });
        this._wizObserver = io;
    },

    destroy() {
        if (this._wizObserver) {
            this._wizObserver.disconnect();
        }
        return this._super(...arguments);
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
