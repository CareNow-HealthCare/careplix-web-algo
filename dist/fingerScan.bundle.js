(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.fingerScan = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _regeneratorRuntime(){_regeneratorRuntime=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),a=new _(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return L()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=b(a,r);if(c){if(c===s)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=l(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===s)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var s={};function f(){}function h(){}function p(){}var d={};c(d,o,function(){return this});var v=Object.getPrototypeOf,g=v&&v(v(k([])));g&&g!==e&&r.call(g,o)&&(d=g);var y=p.prototype=f.prototype=Object.create(d);function m(t){["next","throw","return"].forEach(function(e){c(t,e,function(t){return this._invoke(e,t)})})}function w(t,e){var n;this._invoke=function(o,i){function a(){return new e(function(n,a){!function n(o,i,a,c){var u=l(t[o],t,i);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==_typeof(f)&&r.call(f,"__await")?e.resolve(f.__await).then(function(t){n("next",t,a,c)},function(t){n("throw",t,a,c)}):e.resolve(f).then(function(t){s.value=t,a(s)},function(t){return n("throw",t,a,c)})}c(u.arg)}(o,i,n,a)})}return n=n?n.then(a,a):a()}}function b(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return s;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var n=l(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,s;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,s):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,s)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function k(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:L}}function L(){return{value:void 0,done:!0}}return h.prototype=p,c(y,"constructor",p),c(p,"constructor",h),h.displayName=c(p,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,c(t,a,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},m(w.prototype),c(w.prototype,i,function(){return this}),t.AsyncIterator=w,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new w(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then(function(t){return t.done?t.value:a.next()})},m(y),c(y,a,"Generator"),c(y,o,function(){return this}),c(y,"toString",function(){return"[object Generator]"}),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=k,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,s):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),s},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),x(r),s}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;x(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),s}},t}function asyncGeneratorStep(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function _asyncToGenerator(t){return function(){var e=this,r=arguments;return new Promise(function(n,o){var i=t.apply(e,r);function a(t){asyncGeneratorStep(i,n,o,a,c,"next",t)}function c(t){asyncGeneratorStep(i,n,o,a,c,"throw",t)}a(void 0)})}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var fingerScan=function(){var t,e,r,n,o=6e4,i=12e4,a=!1,c=!1,u=function(t){t.type,t.timeElapsed,t.confidence,t.fps},l=function(t){t.raw_intensity,t.ppg_time,t.average_fps},s=function(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Error("Fingerscan Error.")},f=void 0,h=!1,p=0,d=[],v=[],g=[],y=function(){var t,r,n,o,i,u,s=arguments.length>0&&void 0!==arguments[0]&&arguments[0];a=!1,window.onblur=void 0,null===(t=f)||void 0===t||t.release().then(function(){return console.log("WakeLock Released.")}).catch(function(t){console.log("WakeLock Error."),console.error(t)}),null===(r=e)||void 0===r||null===(n=r.srcObject)||void 0===n||null===(o=n.getTracks)||void 0===o||null===(i=o.call(n))||void 0===i||null===(u=i.forEach)||void 0===u||u.call(i,function(t){var e;null==t||null===(e=t.stop)||void 0===e||e.call(t)}),!s&&c&&l({raw_intensity:d,ppg_time:v,average_fps:Math.round(g.reduce(function(t,e){return t+e},0)/g.length)})},m=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{r:0,g:0,b:0},e=void 0;if(t.r+t.g+t.b===0)e=0;else{var r=t.g+t.b;e=r<=75?1:r>=125?0:(125-r)/50}return e>.5?(p=0,h=!0):h=!1,e},w=function(){n.save(),n.clearRect(0,0,r.width,r.height),n.drawImage(e,0,0,r.width,r.height);var t=n.getImageData(0,0,r.width,r.height);return n.restore(),function(t){for(var e=0,r={r:0,g:0,b:0},n=0;n<t.data.length;n+=4)t.data[n+3]>0&&(e++,r.r+=t.data[n],r.g+=t.data[n+1],r.b+=t.data[n+2]);return{r:r.r/e,g:r.g/e,b:r.b/e}}(t)},b=function(){var e=_asyncToGenerator(_regeneratorRuntime().mark(function e(r){var n,l,f,E,x;return _regeneratorRuntime().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=performance.now()-t;try{a&&(n<=2e4?(l=w(),f=m(l),u({type:"calibration",timeElapsed:n,confidence:f,fps:1e3/(performance.now()-r)}),requestAnimationFrame(b)):n<=2e4+i?p>200?(y(!0),s(new Error("Unable to measure your vitals.\nTry to keep your finger steady the next time."))):(c=n>2e4+o,E=w(),x=m(E),h||p++,d.push(E),v.push(performance.now()-t),g.push(1e3/(performance.now()-r)),u({type:"scan",timeElapsed:n,confidence:x,fps:g[g.length-1]}),requestAnimationFrame(b)):(c=!0,y()))}catch(t){y(!0),s(null!=t?t:new Error("Fingerscan Error."))}case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();return{startScan:function(){var u=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6e4,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:12e4;return a=!1,c=!1,h=!1,p=0,d=[],v=[],g=[],new Promise((m=_asyncToGenerator(_regeneratorRuntime().mark(function c(h,p){var d;return _regeneratorRuntime().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:if(c.prev=0,!(u<6e4)){c.next=3;break}throw new Error("Minimum 60 seconds of Scan is Mandatory.");case 3:if(!(u>l)){c.next=5;break}throw new Error("Total Scan-Time cannot be smaller than Minimum Scan-Time.");case 5:if(o=u,i=l,null===(d=navigator.wakeLock)||void 0===d||d.request("screen").then(function(t){f=t,console.log("WakeLock Active.")}).catch(function(t){console.log("WakeLock Error."),console.error(t)}),!(e=document.getElementById("videoInput"))){c.next=15;break}return c.next=12,new Promise(function(){var t=_asyncToGenerator(_regeneratorRuntime().mark(function t(r,n){var o,i,a,c;return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"environment",aspectRatio:16/9}});case 3:c=t.sent,null===(o=c.getVideoTracks())||void 0===o||null===(i=o[0])||void 0===i||null===(a=i.applyConstraints)||void 0===a||a.call(i,{advanced:[{torch:!0}]}).catch(function(){return console.error("Flash could not be acquired.")}),e.srcObject=c,e.onloadedmetadata=function(){r()},t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),n(new Error("We are not able to access the Camera. Please try again."));case 12:case"end":return t.stop()}},t,null,[[0,9]])}));return function(e,r){return t.apply(this,arguments)}}());case 12:e.play(),c.next=16;break;case 15:throw new Error("Cannot get the video element.");case 16:if(!(r=document.getElementById("canvasOutput"))){c.next=23;break}r.width=e.videoWidth,r.height=e.videoHeight,n=r.getContext("2d"),c.next=24;break;case 23:throw new Error("Cannot get the canvas element.");case 24:t=performance.now(),requestAnimationFrame(b),a=!0,window.onblur=function(){y(!0),s(new Error("App in Background."))},h(),c.next=36;break;case 31:c.prev=31,c.t0=c.catch(0),y(!0),s(null!==c.t0&&void 0!==c.t0?c.t0:new Error("Fingerscan Initialization Error.")),p("Fingerscan Initialization Error.");case 36:case"end":return c.stop()}},c,null,[[0,31]])})),function(t,e){return m.apply(this,arguments)}));var m},stopScan:y,onFrame:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(t){t.type,t.timeElapsed,t.confidence,t.fps};"function"==typeof t&&(u=t)},onScanFinish:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(t){t.raw_intensity,t.ppg_time,t.average_fps};"function"==typeof t&&(l=t)},onError:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Error("Fingerscan Error.")};"function"==typeof t&&(s=t)},get isInitializing(){return function(){return!Boolean(a)}},get isScanning(){return function(){return Boolean(a)}},get canStop(){return function(){return Boolean(c)}},get isFingerInView(){return function(){return Boolean(h)}}}}(),_default=fingerScan;exports.default=_default,module.exports=exports.default;

},{}]},{},[1])(1)
});
