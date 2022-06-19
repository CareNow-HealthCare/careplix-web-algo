# careplix-web-algo

## Installation

```sh
npm install careplix-web-algo
```
##### OR
```sh
yarn add careplix-web-algo
```

## Usage

### Finger Scan

```js
//import Finger Scan module
import { fingerScan } from "careplix-web-algo";

// Initialize the Callbacks
fingerScan.onFrame(({ type, timeElapsed, confidence, fps }) => {
  // Save each frame data
});
fingerScan.onScanFinish(({ raw_intensity, ppg_time, average_fps }) => {
  // Call our API with the given parameters
});
fingerScan.onError(err => {
  // On any error this callback will be called
});

// Start Scan Process
fingerScan.startScan().then(() => {
  console.log('Scan Started')
});

// Helper Methods
fingerScan.stopScan(false); // Stop scan process at any moment
fingerScan.isInitializing(); // returns true if the scan process is initializing
fingerScan.isScanning(); // returns true if the scan is in progress
fingerScan.canStop(); // returns true if enough scan data is achieved
fingerScan.isFingerInView(); // returns false if finger is not placed properly
```

### Face Scan

```js
//import Face Scan module
import { faceScan } from "careplix-web-algo";

// Initialize the Callbacks
faceScan.onFrame(({ type, timeElapsed, isLightMode, fps }) => {
  // Save each frame data
});
faceScan.onScanFinish(({ raw_intensity, ppg_time, average_fps }) => {
  // Call our API with the given parameters
});
faceScan.onError(err => {
  // On any error this callback will be called
});

// Start Scan Process
faceScan.startScan().then(() => {
  console.log('Scan Started')
});

// Helper Methods
faceScan.stopScan(false); // Stop scan process at any moment
faceScan.isInitializing(); // returns true if the scan process is initializing
faceScan.isScanning(); // returns true if the scan is in progress
faceScan.canStop(); // returns true if enough scan data is achieved
faceScan.isFaceInView(); // returns false if face is not visible
```

## License

MIT
