function Navigation (options) {
    options = options ? options : {};
    this.viewportModal = options.viewport || "[id^='sp_message_iframe_']";
    this.tvKey = {
        KEY_ENTER: 13,          // Enter
        KEY_PAUSE: 19,          // MediaPause
        KEY_LEFT: 37,           // ArrowLeft
        KEY_UP: 38,             // ArrowUp
        KEY_RIGHT: 39,          // ArrowRight
        KEY_DOWN: 40,           // ArrowDown
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
        // this.registerAllKey();
        this.bindEvents();
    },
    /**
      * Returns the window object of an iframe from options
      */
    getViewportWindow: function () {
        return document.querySelector(this.viewportModal).contentWindow;
    },
    /**
      * Returns the active element of a page,
      * regardless of shadow root or iframe window.
      * @returns {HTMLElement}
      */
    getActiveElement: function (element = document.activeElement ) {
        const shadowRoot = element.shadowRoot;
        const contentDocument = element.contentDocument;
        if (shadowRoot && shadowRoot.activeElement) {
            return this.getActiveElement(shadowRoot.activeElement);
        }
        if (contentDocument && contentDocument.activeElement) {
            return this.getActiveElement(contentDocument.activeElement);
        }
        return element;
    },
    /**
     * Dispatch enter button event on an active DOM element
     */
    triggerClick: function(){
        const activeElement = this.getActiveElement();
        let enterEvent = new Event('keydown', {bubbles: true, cancelable: true});
        enterEvent.keyCode = this.tvKey.KEY_ENTER;
        if (activeElement.style.cssText === 'font-weight: normal;'){
            enterEvent = new KeyboardEvent('keypress',{key: 'Enter', bubbles: true, charCode: 0, keyCode: this.tvKey.KEY_ENTER});
        }
        activeElement.dispatchEvent(enterEvent);
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
     * Dispatch fired event to the iframe window.
     */
    onKeyDownPress: function(event) {
        // logger.debug('[onKeyDownPress] Pressed key code:' + event.keyCode);
        // console.log('keydown', event);
        switch (event.keyCode) {
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
                const iframeWindow = tileNavigation.getViewportWindow();
                const evnt = new Event('keydown', {'bubbles': true, 'cancelable': true});
                evnt.currentTarget = event.currentTarget;
                evnt.keyCode = event.keyCode;
                iframeWindow.dispatchEvent(evnt);
                break;
        }
    },
    bindEvents: function() {
        window.addEventListener('keydown', this.onKeyDownPress);
    }
};
