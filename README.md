
NaCl demo application in C++
=======================

This is an example of a NaCl application implemented in C++.
It launches a NaCl module that waits for a string type message form JavaScript 
and sends back an echo message.

### Shows how to:
* implement a NaCl plugin in C++
* send text message from NaCl to JavaScript

### Requirements:
* pepper_42 or newer

### Files description:
* `config.xml`

    Smart TV widget manifest file. For more info search https://developer.tizen.org 
    for config.xml in TizenTV: 
    [link](https://developer.tizen.org/development/tizen-studio/web-tools/configuring-your-app/configuration-editor).

* `src/cmp_module.cc`

    A NaCl C++ application source file. It contains code that is essential to 
    launch a NaCl module written in C++ (implements pp::Module and pp::Instance 
    PPAPIs) and handles simple messaging communication with JavaScript.

* `sourcepoint_cmp_nacl.nmf`

    NaCl application manifest file.
    A JSON file that points to binary file depending on processor architecture.
    Also it shall contain permissions request if a NaCl application wants to use
    some non public Pepper API (like `*_Dev`, `*_Samsung`, `*_Private`).
    See [here](https://developer.chrome.com/native-client/devguide/coding/application-structure#manifest-files).
    Note: This file is generated by NaCl toolchain when building a NaCl project 
    in Samsung TizenTV SDK IDE.

* `sourcepoint_cmp_nacl.*.nexe`

    A NaCl application binaries for specific processor architecture (arm, x86 32
    and 64 bit). 
    These binaries are built by NaCl toolchain when project is built from Samsung
    TizenTV SDK IDE, or you may compile them from CLI using make command. 
    More info [here](https://developer.chrome.com/native-client/devguide/devcycle/building).
    Note: Samsung SmartTVs don't support pnacl files actually, only nexe 
    binaries for ARM architecture. For release version there is no 
    need to include binaries for any other architecture.

* `index.html`

    HTML Web Page file that loads a NaCl plugin.

### Prerequisites:
1. Install Python 2.7 on your computer. Make sure that the "python" executable is accessible from
   your PATH environment variable.
   `NOTE: Python 3 and higher is not supported.`
2. Install the Samsung TV SDK, which includes the Tizen Studio and the extensions needed to develop TV applications.
3. Install the Samsung NaCl SDK version you want to use.
    You can do this in 2 ways:
    - Since Samsung TV Extensions 6.0, download and install the Samsung NaCl SDK using the NaCl SDK Manager.
    - Install the Samsung NaCl SDK manually: 
      ```
      Download the Samsung NaCl SDK to your computer and extract the "nacl_sdk" folder to a location of your choice.
      Open the NaCl SDK Manager.
      In the Tizen Studio, select "Window > Preferences > Tizen Studio > NaCl".
      Enter the full path to your "nacl_sdk" folder in the "NaCl SDK root" field, or click "Browse" to open the file browser and select the folder.
      ```
4. For more information [see](https://developer.samsung.com/smarttv/develop/extension-libraries/nacl/managing-nacl-projects/creating-nacl-projects.html)

### Build instructions:

1. Make necessary changes to environment variables:

   - set NACL_SDK_ROOT to your pepper_xx directory: 
     `export NACL_SDK_ROOT=/path/to/pepper_xx`
   - append the appropriate toolchain to PATH:
     `export PATH=$PATH:$NACL_SDK_ROOT/toolchain/linux_pnacl/bin`
2. Move this project folder under your `$NACL_SDK_ROOT/getting_started` folder
3. In the Debug directory, run:
   `make`
   
### Run:
1. Navigate to the $NACL_SDK_ROOT folder and run `make serve` command. It runs the local server
2. In another terminal run `/opt/google/chrome/google-chrome http://localhost:5103/sourcepoint_cmp_nacl --enable-nacl --no-first-run  --allow-nacl-socket-api=localhost --allow-nacl-socket-api=127.0.0.1`
More info how to run an application see [here](https://developer.chrome.com/docs/native-client/devguide/tutorial/tutorial-part1/)

### Implementation notes
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
2. Interaction between JavaScript and compiled C or C++ [howto](https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html)