# careplix-web-algo
Careplix Web SDK for Node & Browser Environment to generate Raw Scan Data.

# Installation
## Node.js Environment
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

## Standalone
You can download the standalone js files from [GitHub](https://github.com/CareNow-HealthCare/careplix-web-algo/tree/master/dist)\
Or, you can also use a CDN like [jsdelivr](https://www.jsdelivr.com/package/npm/careplix-web-algo) or [unpkg](https://www.unpkg.com/browse/careplix-web-algo/)
```html
<head>
  <!-- For faceScan -->
  <script src="https://cdn.jsdelivr.net/npm/careplix-web-algo/dist/faceScan.bundle.js"></script>

  <!-- For fingerScan -->
  <script src="https://cdn.jsdelivr.net/npm/careplix-web-algo/dist/fingerScan.bundle.js"></script>
</head>
```



# Usage
Include the following html elements in the Scan Page.
```html
<div style="height: 100vh; position: relative;">
  <video id="videoInput" width="0" height="0" autoplay muted hidden playsinline></video>
  <canvas id="canvasOutput" style="width:100%; height:100%; scale: -1 1;"></canvas>
</div>
```

## Face Scan
```js
// Initialize the Callbacks
faceScan.onFrame(({ type, timeElapsed, isLightMode, fps }) => {
  // Save each frame data
});
faceScan.onError(err => {
  // On any error this callback will be called
});
faceScan.onScanFinish(({ raw_intensity, ppg_time, average_fps }) => {
  // Call our API with the given parameters
});

// Start Scan Process
faceScan.startScan().then(() => {
  console.log('Scan Started')
});
```

### `onFrame()`
During Scan you recieve data from every processed frame through this callback.
| Property Name | Type | Description |
| --- | --- | --- |
| type | string | Type of the frame. Which can be either `"calibration"` or `"scan"` |
| timeElapsed | number | Time Elapsed in ms |
| isLightMode | boolean | `true` if light mode is being used during the scan, due to poor device performance |
| fps | number | Current FPS of the frame |

### `onError()`
If any error occurs during Scan, this callback will be called with the `Error` object.

### `onScanFinish()`
When the scan is finished successfully, this callback will be called with raw data, which will be needed for the backend API call.
| Property Name | Type | Description |
| --- | --- | --- |
| raw_intensity | array | Raw Scan Data |
| ppg_time | array | Raw Scan Data |
| average_fps | number | Average FPS During Scan |

### `startScan()`
This function call starts the Scan.
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| minimumScanTime_inMS | number | 60000 | Minimum Duration of the Scan in ms |
| totalScanTime_inMS | number | 12000 | Total Duration of the Scan in ms |
| modelPath | string | "/" | Path of the model files, if the files are self-hosted |

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
| `canStop()` | Returns `true` if Minimum Scan Time is elapsed |
| `isFaceInView()` | Returns `false` if the face is not properly visible |



## Finger Scan
```js
// Initialize the Callbacks
fingerScan.onFrame(({ type, timeElapsed, confidence, fps }) => {
  // Save each frame data
});
fingerScan.onError(err => {
  // On any error this callback will be called
});
fingerScan.onScanFinish(({ raw_intensity, ppg_time, average_fps }) => {
  // Call our API with the given parameters
});

// Start Scan Process
fingerScan.startScan().then(() => {
  console.log('Scan Started')
});
```

### `onFrame()`
During Scan you recieve data from every processed frame through this callback.
| Property Name | Type | Description |
| --- | --- | --- |
| type | string | Type of the frame. Which can be either `"calibration"` or `"scan"` |
| timeElapsed | number | Time Elapsed in ms |
| confidence | number | Confidence score between the range `0-1` (poor - good) |
| fps | number | Current FPS of the frame |

### `onError()`
If any error occurs during Scan, this callback will be called with the `Error` object.

### `onScanFinish()`
When the scan is finished successfully, this callback will be called with raw data, which will be needed for the backend API call.
| Property Name | Type | Description |
| --- | --- | --- |
| raw_intensity | array | Raw Scan Data |
| ppg_time | array | Raw Scan Data |
| average_fps | number | Average FPS During Scan |

### `startScan()`
This function call starts the Scan.
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| minimumScanTime_inMS | number | 60000 | Minimum Duration of the Scan in ms |
| totalScanTime_inMS | number | 12000 | Total Duration of the Scan in ms |

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
| `canStop()` | Returns `true` if Minimum Scan Time is elapsed |
| `isFingerInView()` | Returns `false` if the finger is not properly detected |

## Capture image during scan
```js
function captureImage() {
    let canvas = document.getElementById("canvasOutput");
    let dataURL = canvas.toDataURL('image/png');

    process(dataURL);
    /*
      with the dataURL i.e. "data:image/png;base64,*****" you can do the following things...
      1. Save as PNG image file, then upload to backend.
      2. Send the dataURL to the backend, then save it as file in server.
      3. Send & Save the dataURL as-is.
    */
}
```

## License
MIT
