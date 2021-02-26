function Navigation (options) {
    options = options ? options : {};
    this.viewportModal = options.viewport || '#sp_message_iframe_393148';
    this.active_ott_card = {
        node: null,
        count: 0
    };
    this.active_controls_btns = {
        node: null,
        count: 0
    }
    this.activeGroup = 'cards-row';
    this.activeElement = null;
    this.onLoad();
}

Navigation.prototype = {
    onLoad: function () {
        this.registerAllKey();
        this.bindEvents();

        this.markupMainPageContent();
    },

    getViewportContent: function () {
        return document.querySelector(this.viewportModal).contentWindow.document;
    },

    markupMainPageContent: function () {
        let that = this;
        setTimeout(function () {
            let ottCards = that.getViewportContent().querySelectorAll('.ott-card');
            [].forEach.call(ottCards, function(el, i){
                el.classList.add('focusable');
                el.dataset.elementGroup = 'cards-row';
            });
        }, 2000);
    },

    handleEvent: function (direction) {
        switch (direction) {
            case 'up':
            case 'down':
                this.moveVertically(direction);
                break;
            case 'left':
            case 'right':
                this.moveHorizontally(direction);
                break;
        }
    },
    /**
     * Crawls over the certain elements group that will be
     * set for selector in it's `data-element-group` attribute
     */
    moveHorizontally: function(direction){
        logger.debug('moveHorizontally', direction);
        const ott_cards = this.getViewportContent().querySelectorAll('.ott-card');
        const control_buttons = this.getViewportContent().querySelectorAll('.message-row .focusable');
        const LAST_COUNT = ott_cards.length - 1;
        let count, btn_count = 0;

        switch (direction) {
            case 'left':
                if(this.activeGroup === 'cards-row') {
                    if (!this.active_ott_card.node) {
                        this.active_ott_card = {
                            node: ott_cards[0],
                            count: 0
                        };
                    } else {
                        count = this.active_ott_card.count > 0 ? --this.active_ott_card.count : LAST_COUNT;
                        this.active_ott_card = {
                            node: ott_cards[count],
                            count: count
                        };
                    }
                    this.active_ott_card.node.focus();
                } else {
                    btn_count = this.active_controls_btns.count > 0 ? --this.active_controls_btns.count : control_buttons.length - 1;
                    this.active_controls_btns = {
                        node: control_buttons[btn_count],
                        count: btn_count
                    }
                    this.active_controls_btns.node.focus()
                }
                break;
            case 'right':
                if(this.activeGroup === 'cards-row') {
                    if (!this.active_ott_card.node) {
                        this.active_ott_card = {
                            node: ott_cards[0],
                            count: 0
                        };
                    } else {
                        count = this.active_ott_card.count < LAST_COUNT ? ++this.active_ott_card.count : 0;
                        this.active_ott_card = {
                            node: ott_cards[count],
                            count: count
                        };
                    }
                    this.active_ott_card.node.focus();
                } else {
                    btn_count = this.active_controls_btns.count < control_buttons.length - 1 ? ++this.active_controls_btns.count : 0;
                    this.active_controls_btns = {
                        node: control_buttons[btn_count],
                        count: btn_count
                    }
                    this.active_controls_btns.node.focus()
                }
                break;
        }
    },
    /**
     * Crawls over the certain elements group that will be
     * set for selector in it's `data-element-group` attribute
     */
    moveVertically: function (direction) {
        logger.debug('moveVertically', direction);
        switch (direction) {
            case 'up':
                this.activeGroup = 'cards-row';
                this.getViewportContent().querySelectorAll('.ott-card')[0].focus();
                break;
            case 'down':
                this.activeGroup = 'controls-row';
                this.getViewportContent().querySelectorAll('.message-row .focusable')[0].focus();
                break;
        }
    },
    triggerClick: function(){
        if (!this.activeElement) return
        this.activeElement.click();
    },
    /**
     * Opens a provided URL in default browser of the TV.
     */
    launchBrowser: function (url) {
        logger.debug('[launchBrowser] URL:', url);
        let appControl = new window.tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view", url);

        window.tizen.application.launchAppControl(
            appControl,
            null,
            function() {logger.debug("[launchBrowser] succeed callback"); },
            function(e) {logger.debug("[launchBrowser] failed callback:", e.message); },
            null );
    },
    /**
     * Registers all supported input device keys to receive DOM keyboard events
     * when they are pressed or released.
     * Additionally stores information about registered keys in object.
     */
    registerAllKey: function () {
        let supportedKeys = window.tizen.tvinputdevice.getSupportedKeys(), i;
        for (i = 0; i < supportedKeys.length; i += 1) {
            try {
                this.registerKey(supportedKeys[i].name);
            } catch (e) {
                logger.error('[registerAllKey] Failed to register ' + supportedKeys[i].name);
            }
            tvKey[supportedKeys[i].code] = supportedKeys[i].name;
        }
        logger.debug("[registerAllKey] Register all supported keys. [available:" + supportedKeys.length + "; registered:" + i + "]");
    },

    registerKey: function (keyName) {
        window.tizen.tvinputdevice.registerKey(keyName);
    },

    unregisterKey: function (keyName) {
        window.tizen.tvinputdevice.unregisterKey(keyName);
    },

    /**
     * Handles remotes key press event.
     * Checks whether pressed button is registered or not and applies
     * an action.
     */
    onKeyDownPress: function(event) {
        logger.debug('[onKeyDownPress] Pressed key code:' + event.keyCode);

        switch (event.keyCode) {
            case tvKey.KEY_LEFT:
                tileNavigation.handleEvent('left')
                break;

            case tvKey.KEY_RIGHT:
                tileNavigation.handleEvent('right')
                break;

            case tvKey.KEY_UP:
                tileNavigation.handleEvent('up')
                break;

            case tvKey.KEY_DOWN:
                tileNavigation.handleEvent('down')
                break;

            case tvKey.KEY_ENTER:
                logger.debug('enterButtonClickHandler');
                tileNavigation.triggerClick();
                break;

            case tvKey.KEY_EXIT:
                window.tizen.application.getCurrentApplication().exit();
                break;

            case tvKey.KEY_1:
                logger.toolbarToggle();
                break;

            case tvKey.KEY_0:
                window.location.reload();
                break;
            default:
                break;
        }
    },


    bindEvents: function() {
        window.addEventListener('keydown', this.onKeyDownPress);
    }
};
