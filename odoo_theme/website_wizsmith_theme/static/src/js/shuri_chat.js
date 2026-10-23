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

        // Esc key closes chat
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.frame && this.frame.style.display !== 'none') {
                this._onCloseChat();
            }
        });
    },

    _onToggleChat(ev) {
        if (ev) ev.preventDefault();
        if (!this.frame) return;

        const isVisible = this.frame.style.display === 'block';
        if (isVisible) {
            this._onCloseChat();
        } else {
            this.frame.style.display = 'block';
            this.launcher.setAttribute('aria-expanded', 'true');
        }
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
