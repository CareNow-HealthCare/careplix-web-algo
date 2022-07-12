import { FaceMesh } from "@mediapipe/face_mesh";

const totalCalibrationTime = 20000;
let minimumScanTime = 60000;
let totalScanTime = 120000;

let isInitializing = true;
let isScanning = false;
let canStop = false;
let start_time;

let video;
let canvas;
let ctx;

let onFrameCallback = ({ type = '', timeElapsed = 0, isLightMode = false, fps = 0 }) => { };
let onScanFinishCallback = ({ raw_intensity = [], ppg_time = [], average_fps = 0 }) => { };
let onErrorCallback = (err = new Error('Facescan Error.')) => { };

let fmesh;
let faceCircleRegion = undefined;
let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
let calibrationFPSArray = [];

let isFaceInView = false;
let noDetectionCount = 0;
let raw_intensity = [];
let ppg_time = [];
let fps_array = [];

const setupCamera = () => new Promise(async (resolve, reject) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: "user", aspectRatio: 16 / 9 },
    });
    video.srcObject = stream;
    video.onloadedmetadata = () => { resolve() };
  } catch (error) {
    reject(new Error("We are not able to access the Camera. Please try again."));
  }
});


const stopScan = (noCallback = false) => {
  isScanning = false;
  video?.srcObject?.getTracks().forEach(function (track) { track.stop(); });
  if (!noCallback && canStop) onScanFinishCallback({
    raw_intensity,
    ppg_time,
    average_fps: Math.round(fps_array.reduce((sum, value) => sum + value, 0) / fps_array.length),
  });
}

const drawPath = (points) => {
  const region = new Path2D();
  if (points?.length > 1) {
    const firstPoint = points.shift();
    region.moveTo(firstPoint[0], firstPoint[1]);
    points.forEach((point) => region.lineTo(point[0], point[1]));
    region.closePath();
  }
  return region;
}

const getRegion = () => new Promise(async (resolve, reject) => {
  try {
    fmesh.send({ image: video });
    fmesh.onResults(results => {
      if (results?.multiFaceLandmarks?.[0]?.length > 0) {
        faceCircleRegion = drawPath(
          [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288,
            397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136,
            172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109].map(
              idx => [(results.multiFaceLandmarks[0][idx].x * canvas.width), (results.multiFaceLandmarks[0][idx].y * canvas.height)]
            )
        );
        minX = Infinity; minY = Infinity; maxX = 0; maxY = 0;
        const points = [
          114, 121, 120, 119, 118, 117, 111, 116, 123, 147, 187, 207, 206, 203, 142, 126, 217, // Left  Cheek
          343, 350, 349, 348, 347, 346, 340, 345, 352, 376, 411, 427, 426, 423, 371, 355, 437, // Right Cheek
        ].map(idx => {
          const x = (results.multiFaceLandmarks[0][idx].x * canvas.width);
          const y = (results.multiFaceLandmarks[0][idx].y * canvas.height);
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
          return [x, y];
        });
        const region = new Path2D();
        region.addPath(drawPath(points.slice(0, 17)));
        region.addPath(drawPath(points.slice(17)));
        noDetectionCount = 0;
        isFaceInView = true;
        resolve(region);
      } else {
        isFaceInView = false;
        resolve(undefined);
      }
    })
  } catch (err) {
    reject(err);
  }
});

const calcRGB_fromImageData = (imgData) => {
  let count = 0, sumRGB = { r: 0, g: 0, b: 0 };
  for (let i = 0; i < imgData.data.length; i += 4) {
    if (imgData.data[i + 3] > 0) {
      count++;
      sumRGB.r += imgData.data[i];
      sumRGB.g += imgData.data[i + 1];
      sumRGB.b += imgData.data[i + 2];
    }
  }
  return { r: (sumRGB.r / count), g: (sumRGB.g / count), b: (sumRGB.b / count) };
}


const drawCanvas = (drawRegion = undefined, cutRegion = { region: undefined, rect: { x: 0, y: 0, w: 0, h: 0 } }) => {
  try {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (cutRegion.region) ctx.clip(cutRegion.region);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const bloodRegion = ctx.getImageData(cutRegion.rect.x, cutRegion.rect.y, cutRegion.rect.w, cutRegion.rect.h);
    if (cutRegion.region) {
      ctx.restore();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    if (isFaceInView && drawRegion) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(107,184,248,0.8)';
      ctx.stroke(drawRegion);
    }
    ctx.restore();
    return calcRGB_fromImageData(bloodRegion);
  } catch (err) {
    throw err;
  }
}

const scan = async (loop_start_time) => {
  const timeElapsed = performance.now() - start_time;
  try {
    if (isScanning) {
      if (timeElapsed <= totalCalibrationTime) {
        drawCanvas(undefined, { region: undefined, rect: { x: 0, y: 0, w: canvas.width, h: canvas.height } });
        getRegion().then(() => calibrationFPSArray.push((1000 / (performance.now() - loop_start_time))));
        onFrameCallback({
          type: 'calibration',
          timeElapsed,
          isLightMode: false,
          fps: calibrationFPSArray[calibrationFPSArray.length - 1],
        });
        requestAnimationFrame(scan);
      } else if (timeElapsed <= (totalCalibrationTime + totalScanTime)) {
        if (noDetectionCount > 100) {
          onErrorCallback(new Error('Unable to measure your vitals.\nTry to look at the camera the next time.'));
        } else {
          if (timeElapsed > (totalCalibrationTime + minimumScanTime)) canStop = true;
          else canStop = false;
          let region = undefined;
          if ((calibrationFPSArray.reduce((sum, value) => sum + value, 0) / calibrationFPSArray.length) < 15) region = undefined;
          else region = await getRegion();
          if (!isFaceInView) noDetectionCount++;
          const avgRGB = drawCanvas(faceCircleRegion, { region, rect: { x: minX, y: minY, w: maxX - minX, h: maxY - minY } });
          raw_intensity.push(avgRGB);
          ppg_time.push((performance.now() - start_time));
          fps_array.push((1000 / (performance.now() - loop_start_time)));
          onFrameCallback({
            type: 'scan',
            timeElapsed,
            isLightMode: (typeof region === 'undefined'),
            fps: fps_array[fps_array.length - 1],
          });
          requestAnimationFrame(scan);
        }
      } else {
        canStop = true;
        stopScan();
      }
    }
  }
  catch (err) {
    onErrorCallback(err ?? new Error('Facescan Error.'));
  }
}

const startScan = async (
  minimumScanTime_inMS = 60000,
  totalScanTime_inMS = 120000,
  modelPath = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
) => {
  try {
    isInitializing = true;
    isScanning = false;
    canStop = false;
    isFaceInView = false;
    noDetectionCount = 0;
    faceCircleRegion = undefined;
    minX = Infinity; minY = Infinity; maxX = 0; maxY = 0;
    calibrationFPSArray = [];
    raw_intensity = [];
    ppg_time = [];
    fps_array = [];

    if (minimumScanTime_inMS < 60000)
      throw new Error('Minimum 60 seconds of Scan is Mandatory.');
    if (minimumScanTime_inMS > totalScanTime_inMS)
      throw new Error('Total Scan-Time cannot be smaller than Minimum Scan-Time.');
    minimumScanTime = minimumScanTime_inMS;
    totalScanTime = totalScanTime_inMS;

    fmesh = new FaceMesh({ locateFile: file => `${modelPath}/${file}` });
    fmesh.setOptions({
      enableFaceGeometry: false,
      refineLandmarks: false,
      selfieMode: false,
      maxNumFaces: 1,
    });
    await fmesh.initialize();

    // Set up front-facing camera
    video = document.getElementById("videoInput");
    if (video) {
      await setupCamera();
      video.play();
    } else throw new Error('Cannot get the video element.');

    // Create canvas and drawing context
    canvas = document.getElementById("canvasOutput");
    if (canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx = canvas.getContext("2d");
    } else throw new Error('Cannot get the canvas element.');

    // start prediction loop
    start_time = performance.now();
    requestAnimationFrame(scan);
    isInitializing = false;
    isScanning = true;
  } catch (err) {
    onErrorCallback(err ?? new Error('Facescan Initialization Error.'));
  }
}

const faceScan = {
  startScan,
  stopScan,
  onFrame: (callback = ({ type = '', timeElapsed = 0, isLightMode = false, fps = 0 }) => { }) => {
    if (typeof callback === 'function') onFrameCallback = callback;
  },
  onScanFinish: (callback = ({ raw_intensity = [], ppg_time = [], average_fps = 0 }) => { }) => {
    if (typeof callback === 'function') onScanFinishCallback = callback;
  },
  onError: (callback = (err = new Error('Facescan Error.')) => { }) => {
    if (typeof callback === 'function') onErrorCallback = callback;
  },
  isInitializing: () => isInitializing,
  isScanning: () => isScanning,
  canStop: () => canStop,
  isFaceInView: () => isFaceInView,
};

export default faceScan;