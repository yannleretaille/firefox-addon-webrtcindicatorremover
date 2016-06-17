/* (c) 2016 Yann Leretaille
  License: The MIT License <http://opensource.org/licenses/MIT>

  Resources:
    [webrtcIndicator]
        https://github.com/mozilla/gecko-dev/blob/master/browser/base/content/webrtcIndicator.js
        https://github.com/mozilla/gecko-dev/blob/master/browser/base/content/webrtcIndicator.xul
    [misc]
        see assertWebRTCIndicatorStatus():
            https://github.com/mozilla/gecko-dev/blob/master/browser/base/content/test/general/head.js
*/

//requirements
var { setInterval, clearInterval } = require("sdk/timers");
var { Cu } = require("chrome");

//imports
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource:///modules/webrtcUI.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "Promise",
  "resource://gre/modules/Promise.jsm");


function listener(event) {
    //wait until showGlobalIndicator is true (max 1000ms)
    promiseWaitForCondition(() => webrtcUI.showGlobalIndicator).then(function() {
        //wait until the indicator window is actually really displayed (max 100ms)
        promiseWaitForCondition(() => Services.wm.getMostRecentWindow("Browser:WebRTCGlobalIndicator")).then(function() {
            //get window and close it
            Services.wm.getMostRecentWindow("Browser:WebRTCGlobalIndicator").close();
        });
    });
}

//listen to new recording events (e.g. after the user clicked on "share/allow" and mic/screen/camera are shared)
var observer = function(sub,top,data){
	//console.log("obsservice");
	listener(data);
}
Services.obs.addObserver(observer,"getUserMedia:response:allow",false)


/* HELPER FUNCTIONS */
function waitForCondition(condition, nextTest) {
    var tries = 0;
    var interval = setInterval(function() {
        if (tries >= 500) {
            moveOn();
        }
        var conditionPassed;
        try {
            conditionPassed = condition();
        } catch (e) {
            conditionPassed = false;
        }
        if (conditionPassed) {
            moveOn();
        }
        tries++;
    }, 2);
    var moveOn = function() { clearInterval(interval); nextTest(); };
}

function promiseWaitForCondition(aConditionFn) {
    let deferred = Promise.defer();
    waitForCondition(aConditionFn, deferred.resolve);
    return deferred.promise;
}


