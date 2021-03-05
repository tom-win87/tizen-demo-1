# Tizen Demo App
Tizen Demo Web App that demonstrates ability to display integrated CMP

## Requirements
1. Tizen Studio

## Import project
If you already have Tizen Studio installed:
1. Clone the repo to your workspace directory
2. In Tizen Studio click File > Import menu item
3. Choose the directory where you have just cloned the repo
4. Select project to import from the list

## Running on the Samsung TV Simulator
To run the application on the simulator:
1. In the Project Explorer view, right-click the project and select Run As > Tizen Web Simulator Application (Samsung TV).

# Useful links
https://docs.tizen.org/application/web/get-started/overview/
https://developer.samsung.com/smarttv/develop/getting-started/using-sdk/tv-simulator.html

## Navigation class(navigation.js)
Available methods:
- `onLoad` runs on startup, trigger registerAllKey and bindEvents functions
- `getViewportContent` gets document object of an iframe
- `handleMoveEvent` handle navigation event and depends on direction call appropriate function moveHorizontally or moveVertically
- `moveHorizontally` compute the next selector and focus it
- `moveVertically` compute the next group of elements and focus on its first element
- `registerAllKey` register all available key of a remote control
- `registerKey` register a button of a remote control by key name
- `unregisterKey` unregister a button of remote control by key name
- `onKeyDownPress` handle pressed keys of a remote control
- `bindEvents` add event listener from a remote control

## Implementation notes
To make the consent manager work just include a bundle of scripts into your index.html:
1. To display a Privacy Manager window include these scripts:
```
<script type="text/javascript">
    !function (t) { var e = {}; function n(r) { if (e[r]) return e[r].exports; var o = e[r] = { i: r, l: !1, exports: {} }; return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports } n.m = t, n.c = e, n.d = function (t, e, r) { n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r }) }, n.r = function (t) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 }) }, n.t = function (t, e) { if (1 & e && (t = n(t)), 8 & e) return t; if (4 & e && "object" == typeof t && t && t.__esModule) return t; var r = Object.create(null); if (n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t) for (var o in t) n.d(r, o, function (e) { return t[e] }.bind(null, o)); return r }, n.n = function (t) { var e = t && t.__esModule ? function () { return t.default } : function () { return t }; return n.d(e, "a", e), e }, n.o = function (t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, n.p = "", n(n.s = 3) }([function (t, e) { t.exports = function (t) { return "object" == typeof t ? null !== t : "function" == typeof t } }, function (t, e, n) { t.exports = !n(2)(function () { return 7 != Object.defineProperty({}, "a", { get: function () { return 7 } }).a }) }, function (t, e) { t.exports = function (t) { try { return !!t() } catch (t) { return !0 } } }, function (t, e, n) { "use strict"; n.r(e); n(4); !function () { if ("function" != typeof window.__tcfapi) { var t, e = [], n = window, r = n.document; !n.__tcfapi && function t() { var e = !!n.frames.__tcfapiLocator; if (!e) if (r.body) { var o = r.createElement("iframe"); o.style.cssText = "display:none", o.name = "__tcfapiLocator", r.body.appendChild(o) } else setTimeout(t, 5); return !e }() && (n.__tcfapi = function () { for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)r[o] = arguments[o]; if (!r.length) return e; if ("setGdprApplies" === r[0]) r.length > 3 && 2 === parseInt(r[1], 10) && "boolean" == typeof r[3] && (t = r[3], "function" == typeof r[2] && r[2]("set", !0)); else if ("ping" === r[0]) { var i = { gdprApplies: t, cmpLoaded: !1, apiVersion: "2.0" }; "function" == typeof r[2] && r[2](i, !0) } else e.push(r) }, n.addEventListener("message", function (t) { var e = "string" == typeof t.data, r = {}; try { r = e ? JSON.parse(t.data) : t.data } catch (t) { } var o = r.__tcfapiCall; o && n.__tcfapi(o.command, o.parameter, o.version, function (n, r) { var i = { __tcfapiReturn: { returnValue: n, success: r, callId: o.callId } }; e && (i = JSON.stringify(i)), t.source.postMessage(i, "*") }) }, !1)) } }() }, function (t, e, n) { var r = n(5).f, o = Function.prototype, i = /^\s*function ([^ (]*)/; "name" in o || n(1) && r(o, "name", { configurable: !0, get: function () { try { return ("" + this).match(i)[1] } catch (t) { return "" } } }) }, function (t, e, n) { var r = n(6), o = n(7), i = n(10), f = Object.defineProperty; e.f = n(1) ? Object.defineProperty : function (t, e, n) { if (r(t), e = i(e, !0), r(n), o) try { return f(t, e, n) } catch (t) { } if ("get" in n || "set" in n) throw TypeError("Accessors not supported!"); return "value" in n && (t[e] = n.value), t } }, function (t, e, n) { var r = n(0); t.exports = function (t) { if (!r(t)) throw TypeError(t + " is not an object!"); return t } }, function (t, e, n) { t.exports = !n(1) && !n(2)(function () { return 7 != Object.defineProperty(n(8)("div"), "a", { get: function () { return 7 } }).a }) }, function (t, e, n) { var r = n(0), o = n(9).document, i = r(o) && r(o.createElement); t.exports = function (t) { return i ? o.createElement(t) : {} } }, function (t, e) { var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(); "number" == typeof __g && (__g = n) }, function (t, e, n) { var r = n(0); t.exports = function (t, e) { if (!r(t)) return t; var n, o; if (e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o; if ("function" == typeof (n = t.valueOf) && !r(o = n.call(t))) return o; if (!e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o; throw TypeError("Can't convert object to primitive value") } }]);
</script>
<script type="text/javascript">
    window._sp_ = {
        config: {
             isOTT: true,
             accountId: 22,
             propertyHref: 'http://tizen.app.com', // Fake Domain
             baseEndpoint: 'https://cdn.privacy-mgmt.com',
        }
    }
</script>
<script src="https://cdn.privacy-mgmt.com/wrapperMessagingWithoutDetection.js"></script>
```
2. To get possibility navigate on the Privacy Manager include:
```
<script type="application/javascript">
function Navigation(e){e=e||{},this.viewportModal=e.viewport||"[id^='sp_message_iframe_']",this.activeElement=null,this.activeElementCount=0,this.enterEvent=null,this.tvKey={KEY_ENTER:13,KEY_PAUSE:19,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_0:48,KEY_1:49,KEY_2:50,KEY_3:51,KEY_4:52,KEY_5:53,KEY_6:54,KEY_7:55,KEY_8:56,KEY_9:57,KEY_EMPTY:189,KEY_RED:403,KEY_GREEN:404,KEY_YELLOW:405,KEY_BLUE:406,KEY_RW:412,KEY_STOP:413,KEY_PLAY:415,KEY_REC:416,KEY_FF:417,KEY_CH_UP:427,KEY_CH_DOWN:428,KEY_VOL_UP:447,KEY_VOL_DOWN:448,KEY_MUTE:449,KEY_INFO:457,KEY_GUIDE:458,KEY_RETURN:10009,KEY_SOURCE:10072,KEY_CHLIST:10073,KEY_MENU:10133,KEY_TOOLS:10135,KEY_ASPECT:10140,KEY_EMANUAL:10146,KEY_EXIT:10182,KEY_PRECH:10190,KEY_MTS:10195,KEY_3D:10199,KEY_TTX_MIX:10200,KEY_CAPTION:10221,KEY_SEARCH:10225,KEY_SOCCER:10228,KEY_REWIND_:10232,KEY_FF_:10233,KEY_PLAY_PAUSE:10252,KEY_EXTRA:10253},this.onLoad()}Navigation.prototype={onLoad:function(){this.registerAllKey(),this.bindEvents()},getViewportContent:function(){return document.querySelector(this.viewportModal).contentWindow.document},handleMoveEvent:function(e){const t=this.getViewportContent().querySelectorAll("[tabindex='-1']");switch(e){case"up":case"down":this.moveVertically(t,e);break;case"left":case"right":this.moveHorizontally(t,e)}},moveHorizontally:function(e,t){if(logger.debug("moveHorizontally",t),!e)return;const i=e.length-1;this.activeElementCount="left"===t?this.activeElementCount>0?--this.activeElementCount:i:this.activeElementCount<i?++this.activeElementCount:0,this.activeElement=e[this.activeElementCount],this.activeElement.focus()},moveVertically:function(e,t){if(logger.debug("moveVertically",t),"up"===t)this.activeElement=e[0],this.activeElementCount=0;else{const t=e.length-1;this.activeElement=e[t],this.activeElementCount=t}this.activeElement.focus()},triggerClick:function(){logger.debug("enterButtonClickHandler"),this.activeElement&&(this.enterEvent||(this.enterEvent=new Event("keydown",{bubbles:!0,cancelable:!0}),this.enterEvent.keyCode=13),this.activeElement.dispatchEvent(this.enterEvent))},launchBrowser:function(e){logger.debug("[launchBrowser] URL:",e);let t=new window.tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view",e);window.tizen.application.launchAppControl(t,null,function(){logger.debug("[launchBrowser] succeed callback")},function(e){logger.debug("[launchBrowser] failed callback:",e.message)},null)},registerAllKey:function(){let e,t=window.tizen.tvinputdevice.getSupportedKeys();for(e=0;e<t.length;e+=1){try{this.registerKey(t[e].name)}catch(i){logger.error("[registerAllKey] Failed to register "+t[e].name)}this.tvKey[t[e].code]=t[e].name}logger.debug("[registerAllKey] Register all supported keys. [available:"+t.length+"; registered:"+e+"]")},registerKey:function(e){window.tizen.tvinputdevice.registerKey(e)},unregisterKey:function(e){window.tizen.tvinputdevice.unregisterKey(e)},onKeyDownPress:function(e){switch(logger.debug("[onKeyDownPress] Pressed key code:"+e.keyCode),e.keyCode){case tileNavigation.tvKey.KEY_LEFT:tileNavigation.handleMoveEvent("left");break;case tileNavigation.tvKey.KEY_RIGHT:tileNavigation.handleMoveEvent("right");break;case tileNavigation.tvKey.KEY_UP:tileNavigation.handleMoveEvent("up");break;case tileNavigation.tvKey.KEY_DOWN:tileNavigation.handleMoveEvent("down");break;case tileNavigation.tvKey.KEY_ENTER:tileNavigation.triggerClick();break;case tileNavigation.tvKey.KEY_EXIT:window.tizen.application.getCurrentApplication().exit();break;case tileNavigation.tvKey.KEY_1:logger.toolbarToggle();break;case tileNavigation.tvKey.KEY_0:window.location.reload()}},bindEvents:function(){window.addEventListener("keydown",this.onKeyDownPress)}};
var tileNavigation,DemoCMP={},logger=new Logger({debugMode:!0});DemoCMP.LoadCMP=function(){tileNavigation=new Navigation},window.onload=DemoCMP.LoadCMP();
</script>
```