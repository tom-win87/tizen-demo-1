function Navigation (options) {
    options = options ? options : {};
    this.viewportModal = options.viewport || "[id^='sp_message_iframe_']";
    this.activeElement = null;
    this.activeElementCount = 0;
    this.enterEvent = null;
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
    },

    getViewportContent: function () {
        return document.querySelector(this.viewportModal).contentWindow.document;
    },

    handleMoveEvent: function (direction) {
        const tabindexedElements = this.getViewportContent().querySelectorAll("[tabindex='-1']");
        switch (direction) {
            case 'up':
            case 'down':
                this.moveVertically(tabindexedElements, direction);
                break;
            case 'left':
            case 'right':
                this.moveHorizontally(tabindexedElements, direction);
                break;
        }
    },
    /**
     * Crawls over the certain elements that have
     * tabindex attribute setted as `-1`
     */
    moveHorizontally: function(elems, direction){
        logger.debug('moveHorizontally', direction);
        // If (for some reason) no elements to move to then exit
        if (!elems) return
        const LAST_COUNT = elems.length - 1;
        if (direction === 'left'){
            this.activeElementCount = this.activeElementCount > 0 ? --this.activeElementCount : LAST_COUNT;
        } else {
            this.activeElementCount = this.activeElementCount < LAST_COUNT ? ++this.activeElementCount : 0;
        }
        this.activeElement = elems[this.activeElementCount];
        this.activeElement.focus();
    },
    /**
     * Crawls over the certain elements group that will be
     * set for selector in it's `data-element-group` attribute
     */
    moveVertically: function (elems, direction) {
        logger.debug('moveVertically', direction);
        if(direction === 'up') {
            this.activeElement = elems[0];
            this.activeElementCount = 0;
        } else {
            const LAST_COUNT = elems.length - 1;
            this.activeElement = elems[LAST_COUNT];
            this.activeElementCount = LAST_COUNT;
        }
        this.activeElement.focus();
    },
    /**
     * Dispatch enter button event on an active DOM element
     */
    triggerClick: function(){
        logger.debug('enterButtonClickHandler');
        if (!this.activeElement) return
        if (!this.enterEvent) {
            this.enterEvent = new Event('keydown', {'bubbles': true, 'cancelable': true});
            this.enterEvent.keyCode = 13;
        }
        this.activeElement.dispatchEvent(this.enterEvent);
        // this.activeElement.click();
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
                tileNavigation.handleMoveEvent('left')
                break;

            case tileNavigation.tvKey.KEY_RIGHT:
                tileNavigation.handleMoveEvent('right')
                break;

            case tileNavigation.tvKey.KEY_UP:
                tileNavigation.handleMoveEvent('up')
                break;

            case tileNavigation.tvKey.KEY_DOWN:
                tileNavigation.handleMoveEvent('down')
                break;

            case tileNavigation.tvKey.KEY_ENTER:
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
