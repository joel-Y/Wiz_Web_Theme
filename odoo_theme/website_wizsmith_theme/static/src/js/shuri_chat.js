/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

export const ShuriChatWidget = publicWidget.Widget.extend({
    selector: '#wizsmith-shuri-widget',
    events: {
        'click #shuri-launcher': '_onToggleChat',
        'click #shuri-close': '_onCloseChat',
    },

    start() {
        this._super(...arguments);
        this.frame = this.el.querySelector('#shuri-frame');
        this.launcher = this.el.querySelector('#shuri-launcher');
        this.iframe = this.el.querySelector('#shuri-iframe');

        // Esc closes the chat. Bound once and removed in destroy() so
        // re-starting the widget (editor, navigation) never stacks listeners.
        this._onKeydown = (ev) => {
            if (ev.key === 'Escape' && this._isOpen()) {
                this._onCloseChat();
                this.launcher && this.launcher.focus();
            }
        };
        document.addEventListener('keydown', this._onKeydown);
        return Promise.resolve();
    },

    destroy() {
        document.removeEventListener('keydown', this._onKeydown);
        this._super(...arguments);
    },

    _isOpen() {
        return !!this.frame && this.frame.style.display === 'block';
    },

    _onToggleChat(ev) {
        if (ev) ev.preventDefault();
        if (!this.frame) return;

        if (this._isOpen()) {
            this._onCloseChat();
            return;
        }
        // Load the third-party chat only when the visitor opens it: no
        // external request nor camera/microphone prompt on page load.
        if (this.iframe && !this.iframe.getAttribute('src')) {
            this.iframe.setAttribute('src', this.iframe.dataset.src);
        }
        this.frame.style.display = 'block';
        this.launcher.setAttribute('aria-expanded', 'true');
    },

    _onCloseChat(ev) {
        if (ev) ev.preventDefault();
        if (!this.frame) return;

        this.frame.style.display = 'none';
        this.launcher.setAttribute('aria-expanded', 'false');
    },
});

publicWidget.registry.ShuriChatWidget = ShuriChatWidget;
export default ShuriChatWidget;
