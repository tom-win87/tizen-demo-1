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
- `onLoad` runs on startup, trigger registerKey and bindEvents functions
- `getViewportWindow` get window object of an iframe
- `getActiveElement` get an active element of the document
- `triggerClick` handle enter button pressed event
- `registerKey` register a button of a remote control by key name
- `unregisterKey` unregister a button of a remote control by key name
- `onKeyDown` handle pressed keys of a remote control
- `bindEvents` add event listener from a remote control

## Implementation notes
To make the consent manager work just include a bundle of scripts into your index.html:
1. To display a Privacy Manager window include these scripts:
```
<script type="text/javascript">
    !function (t) { var e = {}; function n(r) { if (e[r]) return e[r].exports; var o = e[r] = { i: r, l: !1, exports: {} }; return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports } n.m = t, n.c = e, n.d = function (t, e, r) { n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r }) }, n.r = function (t) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 }) }, n.t = function (t, e) { if (1 & e && (t = n(t)), 8 & e) return t; if (4 & e && "object" == typeof t && t && t.__esModule) return t; var r = Object.create(null); if (n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t) for (var o in t) n.d(r, o, function (e) { return t[e] }.bind(null, o)); return r }, n.n = function (t) { var e = t && t.__esModule ? function () { return t.default } : function () { return t }; return n.d(e, "a", e), e }, n.o = function (t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, n.p = "", n(n.s = 3) }([function (t, e) { t.exports = function (t) { return "object" == typeof t ? null !== t : "function" == typeof t } }, function (t, e, n) { t.exports = !n(2)(function () { return 7 != Object.defineProperty({}, "a", { get: function () { return 7 } }).a }) }, function (t, e) { t.exports = function (t) { try { return !!t() } catch (t) { return !0 } } }, function (t, e, n) { "use strict"; n.r(e); n(4); !function () { if ("function" != typeof window.__tcfapi) { var t, e = [], n = window, r = n.document; !n.__tcfapi && function t() { var e = !!n.frames.__tcfapiLocator; if (!e) if (r.body) { var o = r.createElement("iframe"); o.style.cssText = "display:none", o.name = "__tcfapiLocator", r.body.appendChild(o) } else setTimeout(t, 5); return !e }() && (n.__tcfapi = function () { for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)r[o] = arguments[o]; if (!r.length) return e; if ("setGdprApplies" === r[0]) r.length > 3 && 2 === parseInt(r[1], 10) && "boolean" == typeof r[3] && (t = r[3], "function" == typeof r[2] && r[2]("set", !0)); else if ("ping" === r[0]) { var i = { gdprApplies: t, cmpLoaded: !1, apiVersion: "2.0" }; "function" == typeof r[2] && r[2](i, !0) } else e.push(r) }, n.addEventListener("message", function (t) { var e = "string" == typeof t.data, r = {}; try { r = e ? JSON.parse(t.data) : t.data } catch (t) { } var o = r.__tcfapiCall; o && n.__tcfapi(o.command, o.parameter, o.version, function (n, r) { var i = { __tcfapiReturn: { returnValue: n, success: r, callId: o.callId } }; e && (i = JSON.stringify(i)), t.source.postMessage(i, "*") }) }, !1)) } }() }, function (t, e, n) { var r = n(5).f, o = Function.prototype, i = /^\s*function ([^ (]*)/; "name" in o || n(1) && r(o, "name", { configurable: !0, get: function () { try { return ("" + this).match(i)[1] } catch (t) { return "" } } }) }, function (t, e, n) { var r = n(6), o = n(7), i = n(10), f = Object.defineProperty; e.f = n(1) ? Object.defineProperty : function (t, e, n) { if (r(t), e = i(e, !0), r(n), o) try { return f(t, e, n) } catch (t) { } if ("get" in n || "set" in n) throw TypeError("Accessors not supported!"); return "value" in n && (t[e] = n.value), t } }, function (t, e, n) { var r = n(0); t.exports = function (t) { if (!r(t)) throw TypeError(t + " is not an object!"); return t } }, function (t, e, n) { t.exports = !n(1) && !n(2)(function () { return 7 != Object.defineProperty(n(8)("div"), "a", { get: function () { return 7 } }).a }) }, function (t, e, n) { var r = n(0), o = n(9).document, i = r(o) && r(o.createElement); t.exports = function (t) { return i ? o.createElement(t) : {} } }, function (t, e) { var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(); "number" == typeof __g && (__g = n) }, function (t, e, n) { var r = n(0); t.exports = function (t, e) { if (!r(t)) return t; var n, o; if (e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o; if ("function" == typeof (n = t.valueOf) && !r(o = n.call(t))) return o; if (!e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o; throw TypeError("Can't convert object to primitive value") } }]);
</script>
<script type="text/javascript">
  window._sp_queue = [];
  window._sp_ = {
      config: {
          accountId: 22,
          baseEndpoint: 'https://cdn.privacy-mgmt.com',
          propertyHref: 'http://tizen.app.com',
          gdpr: { }
      }
}
</script>
<script src="https://cdn.privacy-mgmt.com/unified/wrapperMessagingWithoutDetection.js"></script>
```

2. To get possibility navigate on the Privacy Manager include:
```
<script type="application/javascript">
function Navigation(e){e=e||{},this.viewportModal=e.viewport||"[id^='sp_message_iframe_']",this.tvKey={KEY_ENTER:13,KEY_0:48,KEY_RETURN:10009,KEY_EXIT:10182},this.onLoad()}Navigation.prototype={onLoad:function(){this.registerKey("0"),this.bindEvents()},getViewportWindow:function(){const e=document.querySelector(this.viewportModal);return!!e&&e.contentWindow},getActiveElement:function(e=document.activeElement){const t=e.shadowRoot,n=e.contentDocument;return t&&t.activeElement?this.getActiveElement(t.activeElement):n&&n.activeElement?this.getActiveElement(n.activeElement):e},triggerClick:function(){const e=this.getActiveElement();let t=new Event("keydown",{bubbles:!0,cancelable:!0});t.keyCode=this.tvKey.KEY_ENTER,e.parentElement.className.split(" ").indexOf("categories")>=0&&(t=new KeyboardEvent("keypress",{key:"Enter",bubbles:!0,charCode:0,keyCode:this.tvKey.KEY_ENTER})),"BUTTON"===e.tagName&&e.className.split(" ").indexOf("message-button")>=0&&(t=new KeyboardEvent("keydown",{key:"Enter",bubbles:!0,charCode:0,keyCode:this.tvKey.KEY_ENTER,code:"Enter"})),e.dispatchEvent(t)},registerKey:function(e){window.tizen.tvinputdevice.registerKey(e)},unregisterKey:function(e){window.tizen.tvinputdevice.unregisterKey(e)},onKeyDown:function(e){const t=tileNavigation.getViewportWindow();switch(e.keyCode){case tileNavigation.tvKey.KEY_ENTER:t&&tileNavigation.triggerClick();break;case tileNavigation.tvKey.KEY_EXIT:window.tizen.application.getCurrentApplication().exit();break;case tileNavigation.tvKey.KEY_0:window.location.reload();break;default:if(t){const n=new Event("keydown",{bubbles:!0,cancelable:!0});n.currentTarget=e.currentTarget,n.keyCode=e.keyCode,t.dispatchEvent(n)}}},bindEvents:function(){window.addEventListener("keydown",this.onKeyDown)}};
var tileNavigation,DemoCMP={};DemoCMP.LoadCMP=function(){tileNavigation=new Navigation;try{console.log("Widget version: "+window.tizen.application.getAppInfo().version)}catch(o){console.log(o)}},window.onload=DemoCMP.LoadCMP();</script>
```
