function Navigation (options) {
    options = options ? options : {};
    this.viewportModal = options.viewport || "[id^='sp_message_iframe_']";
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
    this.tvKey = {
        KEY_ENTER: 13,          //
        KEY_PAUSE: 19,          // MediaPause
        KEY_LEFT: 37,           //
        KEY_UP: 38,             //
        KEY_RIGHT: 39,          //
        KEY_DOWN: 40,           //
        KEY_0: 48,              // 0
        KEY_1: 49,              // 1
        KEY_2: 50,              // 2
        KEY_3: 51,              // 3
        KEY_4: 52,              // 4
        KEY_5: 53,              // 5
        KEY_6: 54,              // 6
        KEY_7: 55,              // 7
        KEY_8: 56,              // 8
        KEY_9: 57,              // 9
        KEY_EMPTY: 189,         // Minus
        KEY_RED: 403,           // ColorF0Red
        KEY_GREEN: 404,         // ColorF1Green
        KEY_YELLOW: 405,        // ColorF2Yellow
        KEY_BLUE: 406,          // ColorF3Blue
        KEY_RW: 412,            // MediaRewind
        KEY_STOP: 413,          // MediaStop
        KEY_PLAY: 415,          // MediaPlay
        KEY_REC: 416,           // MediaRecord
        KEY_FF: 417,            // MediaFastForward
        KEY_CH_UP: 427,         // ChannelUp
        KEY_CH_DOWN: 428,       // ChannelDown
        KEY_VOL_UP: 447,        // VolumeUp
        KEY_VOL_DOWN: 448,      // VolumeDown
        KEY_MUTE: 449,          // VolumeMute
        KEY_INFO: 457,          // Info
        KEY_GUIDE: 458,         // Guide
        KEY_RETURN: 10009,      //
        KEY_SOURCE: 10072,      // Source
        KEY_CHLIST: 10073,      // ChannelList
        KEY_MENU: 10133,        // Menu
        KEY_TOOLS: 10135,       // Tools
        KEY_ASPECT: 10140,      // PictureSize
        KEY_EMANUAL: 10146,     // E-Manual
        KEY_EXIT: 10182,        // Exit
        KEY_PRECH: 10190,       // PreviousChannel
        KEY_MTS: 10195,         // MTS
        KEY_3D: 10199,          // 3D
        KEY_TTX_MIX: 10200,     // Teletext
        KEY_CAPTION: 10221,     // Caption
        KEY_SEARCH: 10225,      // Search
        KEY_SOCCER: 10228,      // Soccer
        KEY_REWIND_: 10232,     // MediaTrackPrevious
        KEY_FF_: 10233,         // MediaTrackNext
        KEY_PLAY_PAUSE: 10252,  // MediaPlayPause
        KEY_EXTRA: 10253        // Extra
    };
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
            this.tvKey[supportedKeys[i].code] = supportedKeys[i].name;
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
            case tileNavigation.tvKey.KEY_LEFT:
                tileNavigation.handleEvent('left')
                break;

            case tileNavigation.tvKey.KEY_RIGHT:
                tileNavigation.handleEvent('right')
                break;

            case tileNavigation.tvKey.KEY_UP:
                tileNavigation.handleEvent('up')
                break;

            case tileNavigation.tvKey.KEY_DOWN:
                tileNavigation.handleEvent('down')
                break;

            case tileNavigation.tvKey.KEY_ENTER:
                logger.debug('enterButtonClickHandler');
                tileNavigation.triggerClick();
                break;

            case tileNavigation.tvKey.KEY_EXIT:
                window.tizen.application.getCurrentApplication().exit();
                break;

            case tileNavigation.tvKey.KEY_1:
                logger.toolbarToggle();
                break;

            case tileNavigation.tvKey.KEY_0:
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
