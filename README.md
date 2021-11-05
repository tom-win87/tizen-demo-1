# WebOS Demo App
WebOS Demo Web App that demonstrates ability to display integrated CMP

## Requirements
1. WebOS SDK

## Import project
If you already have WebOS IDE installed:
1. Clone the repo to your workspace directory
2. In WebOS IDE click `File > Import` menu item
3. As source choose `Git`, then `Projects from Git > Existing local repository`
4. Choose the repo from step 1

## Running on the WebOS Emulator
To run the application on the emulator:
1. Turn on an Emulator machine
2. In the IDE Targe manager menu connect to the emulator machine
1. In the Project Explorer view of IDE, right-click the project and select `Run As / Debug As > webOS Application`

# Useful links
https://webostv.developer.lge.com/sdk/installation/
https://webostv.developer.lge.com/sdk/tools/emulator/introduction-emulator/
https://webostv.developer.lge.com/api/web-api/supported-standard-web-api/

## Implementation notes
To make the consent manager work just include a bundle of scripts into your index.html:
1. To display a Privacy Manager window include these scripts:
```
<script type="text/javascript">
   function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(){var t=function(){var t,e,o=[],n=window,r=n;for(;r;){try{if(r.frames.__tcfapiLocator){t=r;break}}catch(t){}if(r===n.top)break;r=n.parent}t||(!function t(){var e=n.document,o=!!n.frames.__tcfapiLocator;if(!o)if(e.body){var r=e.createElement("iframe");r.style.cssText="display:none",r.name="__tcfapiLocator",e.body.appendChild(r)}else setTimeout(t,5);return!o}(),n.__tcfapi=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if(!n.length)return o;"setGdprApplies"===n[0]?n.length>3&&2===parseInt(n[1],10)&&"boolean"==typeof n[3]&&(e=n[3],"function"==typeof n[2]&&n[2]("set",!0)):"ping"===n[0]?"function"==typeof n[2]&&n[2]({gdprApplies:e,cmpLoaded:!1,cmpStatus:"stub"}):o.push(n)},n.addEventListener("message",(function(t){var e="string"==typeof t.data,o={};if(e)try{o=JSON.parse(t.data)}catch(t){}else o=t.data;var n="object"===_typeof(o)?o.__tcfapiCall:null;n&&window.__tcfapi(n.command,n.version,(function(o,r){var a={__tcfapiReturn:{returnValue:o,success:r,callId:n.callId}};t&&t.source&&t.source.postMessage&&t.source.postMessage(e?JSON.stringify(a):a,"*")}),n.parameter)}),!1))};"undefined"!=typeof module?module.exports=t:t()}();
</script>
<script type="text/javascript">
    window._sp_ = {
        config: {
             isOTT: true,
             accountId: 22,
             propertyHref: 'http://webos.app.com', // Fake Domain
             baseEndpoint: 'https://cdn.privacy-mgmt.com',
        }
    }
</script>
<script src="https://cdn.privacy-mgmt.com/unified/wrapperMessagingWithoutDetection.js"></script>
<script type="text/javascript">
function Navigation(e){e=e||{},this.viewportModal=e.viewport||"[id^='sp_message_iframe_']",this.tvKey={KEY_ENTER:13,KEY_PAUSE:19,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_BACK:461,KEY_0:48,KEY_1:49,KEY_2:50,KEY_3:51,KEY_4:52,KEY_5:53,KEY_6:54,KEY_7:55,KEY_8:56,KEY_9:57,KEY_RED:403,KEY_GREEN:404,KEY_YELLOW:405,KEY_BLUE:406},this.onLoad()}Navigation.prototype={onLoad:function(){webOS.service.request("luna://com.webos.service.tv.systemproperty",{method:"getSystemInfo",parameters:{keys:["modelName","firmwareVersion","UHD","sdkVersion"]},onSuccess:function(e){console.log("sdkVersion: ",e.sdkVersion)},onFailure:function(e){console.log("Error calling LUNA service")}});this.bindEvents()},getViewportWindow:function(){const e=document.querySelector(this.viewportModal);return!!e&&e.contentWindow},getActiveElement:function(e){void 0===e&&(e=document.activeElement);const t=e.shadowRoot,n=e.contentDocument;return t&&t.activeElement?this.getActiveElement(t.activeElement):n&&n.activeElement?this.getActiveElement(n.activeElement):e},triggerClick:function(){const e=this.getActiveElement();var t=new Event("keydown",{bubbles:!0,cancelable:!0});t.keyCode=this.tvKey.KEY_ENTER,"font-weight: normal;"===e.style.cssText&&(t=new KeyboardEvent("keypress",{key:"Enter",bubbles:!0,charCode:0,keyCode:this.tvKey.KEY_ENTER})),e.dispatchEvent(t)},onKeyDown:function(e){const t=window.tileNavigation.getViewportWindow();switch(e.keyCode){case window.tileNavigation.tvKey.KEY_ENTER:t&&window.tileNavigation.triggerClick();break;default:if(t){const n=new Event("keydown",{bubbles:!0,cancelable:!0});n.currentTarget=e.currentTarget,n.keyCode=e.keyCode,t.dispatchEvent(n)}}},onMouseClick:function(e){const t=window.tileNavigation.getViewportWindow();if(t){const n=new Event("keydown",{bubbles:!0,cancelable:!0});n.currentTarget=e.currentTarget,n.keyCode=e.keyCode,t.dispatchEvent(n)}},bindEvents:function(){const e=window.tileNavigation.getViewportWindow();console.log("[bindEvents] iframeWindow: ",e),document.addEventListener("click",this.onMouseClick),document.addEventListener("keydown",this.onKeyDown),window.addEventListener("popstate",function(e){webOS.platformBack()},!1)}};
window.onload = function () { window.tileNavigation = new Navigation();};
</script>
```
