# careplix-web-algo

Careplix Web SDK for Node & Browser Environment to generate Raw Scan Data.

# Installation

```sh
# with npm
npm install careplix-web-algo

# with yarn
yarn add careplix-web-algo
```

```js
//import Face Scan module
import { faceScan } from "careplix-web-algo";

//import Finger Scan module
import { fingerScan } from "careplix-web-algo";
```

# Usage

Include the following html elements in the Scan Page.

```html
<div style="height: 100vh; position: relative;">
  <video
    id="videoInput"
    style="position: fixed; right: 1rem; top: 1rem; height: 1px; width: 1px;"
    autoplay
    muted
    playsinline></video>
  <canvas id="canvasOutput" style="width: 100%; height: 100%; transform: scaleX(-1);"></canvas>
</div>
```

## Face Scan

```js
// Initialize the Callbacks
faceScan.onFrame(({ type, timeElapsed, percentage, isFaceInView, isLiteMode }) => {
  // Save each frame data
});
faceScan.onError((err) => {
  // On any error this callback will be called
});
faceScan.onScanFinish(({ raw_intensity, ppg_time, average_fps }) => {
  // Call our Cloud APIs with the given parameters
});

// Start Scan Process
faceScan
  .startScan({})
  .then(() => {
    console.log("scan started");
  })
  .catch((err) => {
    console.log("scan failed");
    console.error(err);
  });
```

> Note: If you're using React, please consider the following approach...

```js
React.useEffect(() => {
  // intialize all the callbacks like onFrame, onScanFinish, onError etc.
  ...

  // Start Scan Process
  faceScan.startScan({});

  return function cleanup() {
    // be sure to cancel the ongoing scan in cleanup function
    faceScan.stopScan(true);
  };
}, []);
```

### `onFrame()`

During Scan you recieve data from every processed frame through this callback.
| Property Name | Type | Description |
| --- | --- | --- |
| type | string | Type of the frame. Which can be either `"calibration"` or `"scan"` |
| timeElapsed | number | Time Elapsed in ms |
| percentage | number | Percentage of completion |
| isFaceInView | boolean | `true` when the face is present in the frame |
| isLiteMode | boolean | `true` when the SDK switches to [Lite-Mode](#LiteMode) |

### `onError()`

If any error occurs during Scan, this callback will be called with the `Error` object.
| Error Message | Cause/Reason |
| --- | --- |
| Please check your internet connection & try again. | SDK failed to download neccessary files for AI scan. |
| Face not Detected. | Face is not visible in the camera frame. |
| No suitable subject detected. If the issue persists, consider adjusting the framing or removing any obstructions from the view. | No human face detected for a certain duration during scan-time. |

[More Errors...](#Errors)

### `onScanFinish()`

When the scan is finished successfully, this callback will be called with raw data, which will be needed for the API call.
| Property Name | Type | Description |
| --- | --- | --- |
| raw_intensity | array | Raw Scan Data |
| ppg_time | array | Raw Scan Data |
| average_fps | number | Average FPS During Scan |

### `startScan()`

This function call starts the Scan.
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| calibrationTime_inSec | number | 10 | Duration of Calibration phase in sec (3-20) |
| scanTime_inSec | number | 60 | Duration of Scan phase in sec (30-120) |
| models_path | string | CarePlix CDN | Path of the models directory, if model files are self-hosted |
| liteModeRedetectionInterval_inSec | number | 3 | Face Re-Detection interval for [Lite-Mode](#LiteMode) |
| draw_type | string | "face-circle" | Drawing type on face during the scan<br>Possible options are "face-circle" or "bounding-box" or "corner-box" |
| draw_color | string | "#fff" | Draw color of the above draw_type |
| strict_mode | boolean | false | Strict Mode Config ([Read More](#StrictMode)) |
| videoElement | HTMLVideoElement | | Ref (React) or DOMElement refering to video element |
| canvasElement | HTMLCanvasElement | | Ref (React) or DOMElement refering to canvas element |

### `stopScan()`

This function call stops the Scan.
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| noCallback | boolean | false | Set this to true, if you want to stop the scan but do not want to trigger the `onScanFinish()` callback |

### Other Helper Methods

| Method | Description |
| --- | --- |
| `isInitializing()` | Returns `true` if the scan process is initializing i.e. accessing camera permission |
| `isScanning()` | Returns `true` if the scan process is ongoing |

## LiteMode

During Calibration time we try to detect if the device has enough processing resource available to run the Face Detection continuously. If for any reason, the device does not have enough resources available, we then start the Scan in Lite Mode. In Lite Mode, we detect the face periodically and continue with the Scanning Process.  
The Face Re-Detection interval is configurable during development via the `startScan()` method.

## Finger Scan

```js
// Initialize the Callbacks
fingerScan.onFrame(({ type, timeElapsed, percentage, isFingerInView }) => {
  // Save each frame data
});
fingerScan.onError((err) => {
  // On any error this callback will be called
});
fingerScan.onScanFinish(({ raw_intensity, ppg_time, average_fps }) => {
  // Call our Cloud APIs with the given parameters
});

// Start Scan Process
fingerScan
  .startScan({})
  .then(() => {
    console.log("scan started");
  })
  .catch((err) => {
    console.log("scan failed");
    console.error(err);
  });
```

> Note: If you're using React, please consider the following approach...

```js
React.useEffect(() => {
  // intialize all the callbacks like onFrame, onScanFinish, onError etc.
  ...

  // Start Scan Process
  fingerScan.startScan({});

  return function cleanup() {
    // be sure to cancel the ongoing scan in cleanup function
    fingerScan.stopScan(true);
  };
}, []);
```

### `onFrame()`

During Scan you recieve data from every processed frame through this callback.
| Property Name | Type | Description |
| --- | --- | --- |
| type | string | Type of the frame. Which can be either `"calibration"` or `"scan"` |
| timeElapsed | number | Time Elapsed in ms |
| percentage | number | Percentage of completion |
| isFingerInView | boolean | `true` when the finger is placed properly on the back camera |

### `onError()`

If any error occurs during Scan, this callback will be called with the `Error` object.
| Error Message | Cause/Reason |
| --- | --- |
| Finger movement detected during the scan. | Finger moved too much during the scan. |
| Flash could not be acquired. | (Non-Severe) This error will not Cancel the Scan.<br>This error will be logged in console, when device flashlight isn't accessible via the SDK. |

[More Errors...](#Errors)

### `onScanFinish()`

When the scan is finished successfully, this callback will be called with raw data, which will be needed for the API call.
| Property Name | Type | Description |
| --- | --- | --- |
| raw_intensity | array | Raw Scan Data |
| ppg_time | array | Raw Scan Data |
| average_fps | number | Average FPS During Scan |

### `startScan()`

This function call starts the Scan.
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| calibrationTime_inSec | number | 10 | Duration of Calibration phase in sec (3-20) |
| scanTime_inSec | number | 60 | Duration of Scan phase in sec (10-120) |
| strict_mode | boolean | false | Strict Mode Config ([Read More](#StrictMode)) |
| videoElement | HTMLVideoElement | | Ref (React) or DOMElement refering to video element |
| canvasElement | HTMLCanvasElement | | Ref (React) or DOMElement refering to canvas element |

### `stopScan()`

This function call stops the Scan.
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| noCallback | boolean | false | Set this to true, if you want to stop the scan but do not want to trigger the `onScanFinish()` callback |

### Other Helper Methods

| Method | Description |
| --- | --- |
| `isInitializing()` | Returns `true` if the scan process is initializing i.e. accessing camera permission |
| `isScanning()` | Returns `true` if the scan process is ongoing |

## StrictMode

Strict Mode adds some rigidity to the scans, where the scans will be cancelled immediately when the user does something wrong.  
If Strict Mode is disabled, the user is allowed to make a mistake for a certain period of time.  
**Note:** Strict Mode is `disabled` by default.

## Errors

Following are some Errors which are common to both Finger/Face Scan SDK
| Error Message | Cause/Reason |
| --- | --- |
| We are not able to access the Camera. Please try again. | SDK is unable to get access to camera, either browser permission is disabled, or device camera is disabled, or hardware camera is not available. |
| Sorry we're unable to compute the signal. Please try again. | SDK failed to perform some logical operation during the scan. |
| App functionality disabled in the Background. Keep it in the Foreground for proper operation. | App is moved to background, maybe due to a phone-call or other reasons. |

## Capture image during scan

```js
function captureImage() {
  let canvas = document.getElementById("canvasOutput");
  let dataURL = canvas.toDataURL("image/png");

  process(dataURL);
  /*
      with the dataURL i.e. "data:image/png;base64,*****" you can do the following things...
      1. Save as PNG image file, then upload to backend.
      2. Send the dataURL to the backend, then save it as file in server.
      3. Send & Save the dataURL as-is.
    */
}
```
