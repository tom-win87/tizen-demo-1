function Navigation (options) {
    options = options ? options : {};
    this.viewportModal = options.viewport || "[id^='sp_message_iframe_']";
    this.tvKey = {
        KEY_ENTER: 13,          // Enter           0x0D
        KEY_PAUSE: 19,          // MediaPause
        KEY_LEFT: 37,           // ArrowLeft       0x25
        KEY_UP: 38,             // ArrowUp         0x26
        KEY_RIGHT: 39,          // ArrowRight      0x27
        KEY_DOWN: 40,           // ArrowDown       0x28
        KEY_BACK: 461,          // Back            0x1CD

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
        KEY_RED: 403,           // ColorF0Red      0x193
        KEY_GREEN: 404,         // ColorF1Green    0x194
        KEY_YELLOW: 405,        // ColorF2Yellow   0x195
        KEY_BLUE: 406,          // ColorF3Blue     0x196
    };
    this.onLoad();
}

Navigation.prototype = {
    onLoad: function () {
        var lunaReq= webOS.service.request("luna://com.webos.service.tv.systemproperty", {
            method:"getSystemInfo",
            parameters: {"keys": ["modelName", "firmwareVersion", "UHD", "sdkVersion"]},
            onSuccess: function (args) {
                console.log("sdkVersion: ", args.sdkVersion);
            },
            onFailure: function (args) { console.log("Error calling LUNA service"); }
        });
        this.bindEvents();
    },
    /**
      * Returns the window object of an iframe from options
      */
    getViewportWindow: function () {
        const viewport = document.querySelector(this.viewportModal);
        return !!viewport ? viewport.contentWindow : false;
    },
    /**
      * Returns the active element of a page,
      * regardless of shadow root or iframe window.
      * @returns {HTMLElement}
      */
    getActiveElement: function (element) {
        if (typeof(element) === "undefined") { element = document.activeElement; }
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
        var enterEvent = new Event('keydown', {bubbles: true, cancelable: true});
        enterEvent.keyCode = this.tvKey.KEY_ENTER;
        if (activeElement.style.cssText === 'font-weight: normal;'){
            enterEvent = new KeyboardEvent('keypress',{key: 'Enter', bubbles: true, charCode: 0, keyCode: this.tvKey.KEY_ENTER});
        }
        activeElement.dispatchEvent(enterEvent);
    },
    /**
     * Handles remotes key press event.
     * Dispatch fired event to the iframe window.
     */
    onKeyDown: function(event) {
        const iframeWindow =  window.tileNavigation.getViewportWindow();
        switch (event.keyCode) {
            case  window.tileNavigation.tvKey.KEY_ENTER:
                if (!!iframeWindow) {
                     window.tileNavigation.triggerClick();
                }
                break;
            default:
                if (!!iframeWindow){
                    const evnt = new Event('keydown', {'bubbles': true, 'cancelable': true});
                    evnt.currentTarget = event.currentTarget;
                    evnt.keyCode = event.keyCode;
                    iframeWindow.dispatchEvent(evnt);
                }
                break;
        }
    },
    onMouseClick: function(event) {
        const iframeWindow = window.tileNavigation.getViewportWindow();
        if (!!iframeWindow){
            const evnt = new Event('keydown', {'bubbles': true, 'cancelable': true});
            evnt.currentTarget = event.currentTarget;
            evnt.keyCode = event.keyCode;
            iframeWindow.dispatchEvent(evnt);
        }
    },
    bindEvents: function() {
        const iframeWindow = window.tileNavigation.getViewportWindow();
        console.log("[bindEvents] iframeWindow: ", iframeWindow);
        document.addEventListener('click', this.onMouseClick);
        document.addEventListener('keydown', this.onKeyDown);

        window.addEventListener('popstate', function (event) {
            webOS.platformBack();
        }, false);
    }
};
