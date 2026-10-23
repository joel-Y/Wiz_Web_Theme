/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

export const CookieConsentWidget = publicWidget.Widget.extend({
    selector: '#wrapwrap',
    events: {
        'click #btn-accept-cookies': '_onAcceptAll',
        'click #btn-decline-cookies': '_onDeclineAll',
        'click #btn-customize-cookies': '_onOpenSettings',
        'click #btn-save-cookie-settings': '_onSaveSettings',
    },

    start() {
        this._super(...arguments);
        this.banner = this.el.querySelector('#cookie-banner');
        this.modal = this.el.querySelector('#cookie-settings-modal');

        // Expose global opener for footer link
        window.wizsmithCustomizeCookies = () => this._onOpenSettings();

        // Check stored consent
        const consent = localStorage.getItem('cookieConsent');
        if (!consent && this.banner) {
            setTimeout(() => {
                this.banner.style.display = 'block';
            }, 800);
        }
    },

    _onAcceptAll(ev) {
        if (ev) ev.preventDefault();
        const prefs = { essential: true, analytics: true, marketing: true };
        localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
        localStorage.setItem('cookieConsent', 'accepted');
        this._hideBanner();
    },

    _onDeclineAll(ev) {
        if (ev) ev.preventDefault();
        const prefs = { essential: true, analytics: false, marketing: false };
        localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
        localStorage.setItem('cookieConsent', 'declined');
        this._hideBanner();
    },

    _onOpenSettings(ev) {
        if (ev) ev.preventDefault();
        if (this.modal && window.bootstrap && window.bootstrap.Modal) {
            const modalInstance = new window.bootstrap.Modal(this.modal);
            modalInstance.show();
        } else if (this.modal) {
            this.modal.classList.add('show');
            this.modal.style.display = 'block';
        }
    },

    _onSaveSettings(ev) {
        if (ev) ev.preventDefault();
        const form = this.el.querySelector('#cookie-settings-form');
        const analytics = form ? form.querySelector('#cookie-opt-analytics').checked : false;
        const marketing = form ? form.querySelector('#cookie-opt-marketing').checked : false;

        const prefs = { essential: true, analytics, marketing };
        localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
        localStorage.setItem('cookieConsent', 'customized');

        if (this.modal && window.bootstrap && window.bootstrap.Modal) {
            const modalInstance = window.bootstrap.Modal.getInstance(this.modal);
            if (modalInstance) modalInstance.hide();
        } else if (this.modal) {
            this.modal.classList.remove('show');
            this.modal.style.display = 'none';
        }

        this._hideBanner();
    },

    _hideBanner() {
        if (this.banner) {
            this.banner.style.opacity = '0';
            this.banner.style.transition = 'opacity 0.4s ease';
            setTimeout(() => {
                this.banner.style.display = 'none';
            }, 400);
        }
    },
});

publicWidget.registry.CookieConsentWidget = CookieConsentWidget;
export default CookieConsentWidget;
