(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.fingerScan = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _regeneratorRuntime(){_regeneratorRuntime=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",a=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var o=e&&e.prototype instanceof f?e:f,a=Object.create(o.prototype),i=new S(r||[]);return a._invoke=function(t,e,n){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return k()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var c=_(i,n);if(c){if(c===l)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=s(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}(t,n,i),a}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var l={};function f(){}function p(){}function h(){}var d={};c(d,o,function(){return this});var v=Object.getPrototypeOf,m=v&&v(v(E([])));m&&m!==e&&n.call(m,o)&&(d=m);var g=h.prototype=f.prototype=Object.create(d);function y(t){["next","throw","return"].forEach(function(e){c(t,e,function(t){return this._invoke(e,t)})})}function w(t,e){var r;this._invoke=function(o,a){function i(){return new e(function(r,i){!function r(o,a,i,c){var u=s(t[o],t,a);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==_typeof(f)&&n.call(f,"__await")?e.resolve(f.__await).then(function(t){r("next",t,i,c)},function(t){r("throw",t,i,c)}):e.resolve(f).then(function(t){l.value=t,i(l)},function(t){return r("throw",t,i,c)})}c(u.arg)}(o,a,r,i)})}return r=r?r.then(i,i):i()}}function _(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,_(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=s(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,l;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function b(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(b,this),this.reset(!0)}function E(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,a=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:k}}function k(){return{value:void 0,done:!0}}return p.prototype=h,c(g,"constructor",h),c(h,"constructor",p),p.displayName=c(h,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,c(t,i,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},y(w.prototype),c(w.prototype,a,function(){return this}),t.AsyncIterator=w,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new w(u(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then(function(t){return t.done?t.value:i.next()})},y(g),c(g,i,"Generator"),c(g,o,function(){return this}),c(g,"toString",function(){return"[object Generator]"}),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=E,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,l):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),x(n),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;x(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:E(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},t}function asyncGeneratorStep(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(t){return function(){var e=this,n=arguments;return new Promise(function(r,o){var a=t.apply(e,n);function i(t){asyncGeneratorStep(a,r,o,i,c,"next",t)}function c(t){asyncGeneratorStep(a,r,o,i,c,"throw",t)}i(void 0)})}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var start_time,video,canvas,ctx,totalCalibrationTime=2e4,minimumScanTime=6e4,totalScanTime=12e4,_isInitializing=!0,_isScanning=!1,_canStop=!1,onFrameCallback=function(t){t.type,t.timeElapsed,t.confidence,t.fps},onScanFinishCallback=function(t){t.raw_intensity,t.ppg_time,t.average_fps},onErrorCallback=function(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Error("Fingerscan Error.")},_isFingerInView=!1,noDetectionCount=0,raw_intensity=[],ppg_time=[],fps_array=[],setupCamera=function(){return new Promise(function(){var t=_asyncToGenerator(_regeneratorRuntime().mark(function t(e,n){var r;return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"environment",aspectRatio:16/9}});case 3:r=t.sent,video.srcObject=r,video.onloadedmetadata=function(){e()},t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),n(new Error("We are not able to access the Camera. Please try again."));case 11:case"end":return t.stop()}},t,null,[[0,8]])}));return function(e,n){return t.apply(this,arguments)}}())},stopScan=function(){var t,e,n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];_isScanning=!1,null===(t=video)||void 0===t||null===(e=t.srcObject)||void 0===e||e.getTracks().forEach(function(t){t.stop()}),!n&&_canStop&&onScanFinishCallback({raw_intensity:raw_intensity,ppg_time:ppg_time,average_fps:Math.round(fps_array.reduce(function(t,e){return t+e},0)/fps_array.length)})},calcConfidence=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{r:0,g:0,b:0},e=void 0,n=t.g+t.b;return(e=n<=75?1:n>=125?0:(125-n)/50)>.5?(noDetectionCount=0,_isFingerInView=!0):_isFingerInView=!1,e},calcRGB_fromImageData=function(t){for(var e=0,n={r:0,g:0,b:0},r=0;r<t.data.length;r+=4)t.data[r+3]>0&&(e++,n.r+=t.data[r],n.g+=t.data[r+1],n.b+=t.data[r+2]);return{r:n.r/e,g:n.g/e,b:n.b/e}},drawCanvas=function(){ctx.save(),ctx.clearRect(0,0,canvas.width,canvas.height),ctx.drawImage(video,0,0,canvas.width,canvas.height);var t=ctx.getImageData(0,0,canvas.width,canvas.height);return ctx.restore(),calcRGB_fromImageData(t)},scan=function(){var t=_asyncToGenerator(_regeneratorRuntime().mark(function t(e){var n,r,o,a,i,c,u,s,l;return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n=performance.now()-start_time;try{_isScanning&&(null===(r=video)||void 0===r||null===(o=r.srcObject)||void 0===o||null===(a=o.getVideoTracks())||void 0===a||null===(i=a[0])||void 0===i||i.applyConstraints({advanced:[{torch:!0}]}).catch(console.error),n<=totalCalibrationTime?(c=drawCanvas(),u=calcConfidence(c),onFrameCallback({type:"calibration",timeElapsed:n,confidence:u,fps:1e3/(performance.now()-e)}),requestAnimationFrame(scan)):n<=totalCalibrationTime+totalScanTime?noDetectionCount>200?onErrorCallback(new Error("Unable to measure your vitals.\nTry to keep your finger steady the next time.")):(_canStop=n>totalCalibrationTime+minimumScanTime,s=drawCanvas(),l=calcConfidence(s),_isFingerInView||noDetectionCount++,raw_intensity.push(s),ppg_time.push(performance.now()-start_time),fps_array.push(1e3/(performance.now()-e)),onFrameCallback({type:"scan",timeElapsed:n,confidence:l,fps:fps_array[fps_array.length-1]}),requestAnimationFrame(scan)):(_canStop=!0,stopScan()))}catch(t){onErrorCallback(null!=t?t:new Error("Fingerscan Error."))}case 2:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),startScan=function(){var t=_asyncToGenerator(_regeneratorRuntime().mark(function t(){var e,n,r=arguments;return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=r.length>0&&void 0!==r[0]?r[0]:6e4,n=r.length>1&&void 0!==r[1]?r[1]:12e4,t.prev=2,_isInitializing=!0,_isScanning=!1,_canStop=!1,_isFingerInView=!1,noDetectionCount=0,raw_intensity=[],ppg_time=[],fps_array=[],!(e<6e4)){t.next=13;break}throw new Error("Minimum 60 seconds of Scan is Mandatory.");case 13:if(!(e>n)){t.next=15;break}throw new Error("Total Scan-Time cannot be smaller than Minimum Scan-Time.");case 15:if(minimumScanTime=e,totalScanTime=n,!(video=document.getElementById("videoInput"))){t.next=24;break}return t.next=21,setupCamera();case 21:video.play(),t.next=25;break;case 24:throw new Error("Cannot get the video element.");case 25:if(!(canvas=document.getElementById("canvasOutput"))){t.next=32;break}canvas.width=video.videoWidth,canvas.height=video.videoHeight,ctx=canvas.getContext("2d"),t.next=33;break;case 32:throw new Error("Cannot get the canvas element.");case 33:start_time=performance.now(),requestAnimationFrame(scan),_isInitializing=!1,_isScanning=!0,t.next=42;break;case 39:t.prev=39,t.t0=t.catch(2),onErrorCallback(null!==t.t0&&void 0!==t.t0?t.t0:new Error("Fingerscan Initialization Error."));case 42:case"end":return t.stop()}},t,null,[[2,39]])}));return function(){return t.apply(this,arguments)}}(),fingerScan={startScan:startScan,stopScan:stopScan,onFrame:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(t){t.type,t.timeElapsed,t.confidence,t.fps};"function"==typeof t&&(onFrameCallback=t)},onScanFinish:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(t){t.raw_intensity,t.ppg_time,t.average_fps};"function"==typeof t&&(onScanFinishCallback=t)},onError:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Error("Fingerscan Error.")};"function"==typeof t&&(onErrorCallback=t)},isInitializing:function(){return _isInitializing},isScanning:function(){return _isScanning},canStop:function(){return _canStop},isFingerInView:function(){return _isFingerInView}},_default=fingerScan;exports.default=_default,module.exports=exports.default;

},{}]},{},[1])(1)
});
