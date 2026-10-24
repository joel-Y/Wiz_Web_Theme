/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

const CONSENT_KEY = 'cookieConsent';
const PREFS_KEY = 'cookiePreferences';

// localStorage can throw (private mode, blocked site data): never let that break the page.
function storageGet(key) {
    try {
        return window.localStorage.getItem(key);
    } catch (e) {
        return null;
    }
}
function storageSet(key, value) {
    try {
        window.localStorage.setItem(key, value);
    } catch (e) {
        /* consent simply isn't remembered */
    }
}

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

        // Global opener for the footer "Gestion des cookies" button
        window.wizsmithCustomizeCookies = () => this._onOpenSettings();

        if (!storageGet(CONSENT_KEY) && this.banner) {
            this._bannerTimer = setTimeout(() => {
                this.banner.style.display = 'block';
            }, 800);
        }
        return Promise.resolve();
    },

    destroy() {
        clearTimeout(this._bannerTimer);
        if (window.wizsmithCustomizeCookies) {
            delete window.wizsmithCustomizeCookies;
        }
        this._super(...arguments);
    },

    _storePrefs(consent, prefs) {
        storageSet(PREFS_KEY, JSON.stringify(prefs));
        storageSet(CONSENT_KEY, consent);
    },

    _onAcceptAll(ev) {
        if (ev) ev.preventDefault();
        this._storePrefs('accepted', { essential: true, analytics: true, marketing: true });
        this._hideBanner();
    },

    _onDeclineAll(ev) {
        if (ev) ev.preventDefault();
        this._storePrefs('declined', { essential: true, analytics: false, marketing: false });
        this._hideBanner();
    },

    _getModal() {
        const Modal = window.bootstrap && window.bootstrap.Modal;
        return this.modal && Modal ? Modal.getOrCreateInstance(this.modal) : null;
    },

    _onOpenSettings(ev) {
        if (ev) ev.preventDefault();
        if (!this.modal) return;

        // Reflect the visitor's saved choices in the toggles
        try {
            const saved = JSON.parse(storageGet(PREFS_KEY) || 'null');
            if (saved) {
                this.modal.querySelector('#cookie-opt-analytics').checked = !!saved.analytics;
                this.modal.querySelector('#cookie-opt-marketing').checked = !!saved.marketing;
            }
        } catch (e) { /* ignore corrupted value */ }

        const instance = this._getModal();
        if (instance) {
            instance.show();
        }
    },

    _onSaveSettings(ev) {
        if (ev) ev.preventDefault();
        const analytics = !!this.modal.querySelector('#cookie-opt-analytics')?.checked;
        const marketing = !!this.modal.querySelector('#cookie-opt-marketing')?.checked;
        this._storePrefs('customized', { essential: true, analytics, marketing });

        const instance = this._getModal();
        if (instance) {
            instance.hide();
        }
        this._hideBanner();
    },

    _hideBanner() {
        if (!this.banner) return;
        this.banner.style.transition = 'opacity 0.4s ease';
        this.banner.style.opacity = '0';
        setTimeout(() => {
            this.banner.style.display = 'none';
        }, 400);
    },
});

publicWidget.registry.CookieConsentWidget = CookieConsentWidget;
export default CookieConsentWidget;
