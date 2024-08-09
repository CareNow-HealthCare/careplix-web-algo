const fingerScan = (() => {
  let calibrationTime = 20000;
  let minimumScanTime = 60000;
  let totalScanTime = 120000;

  let isScanning = false;
  let canStop = false;
  let start_time;

  let video;

  let canvas;
  let ctx;

  let onFrameCallback = ({ type = "", timeElapsed = 0, confidence = 0, fps = 0 }) => {};
  let onScanFinishCallback = ({ raw_intensity = [], ppg_time = [], average_fps = 0 }) => {};
  let onErrorCallback = (err = new Error("Fingerscan Error.")) => {};

  let wakeLock = undefined;

  let isFingerInView = false;
  let noDetectionCount = 0;
  let raw_intensity = [];
  let ppg_time = [];
  let fps_array = [];

  const setupCamera = () =>
    new Promise(async (resolve, reject) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: "environment", aspectRatio: 16 / 9 },
        });
        stream
          .getVideoTracks()?.[0]
          ?.applyConstraints?.({ advanced: [{ torch: true }] })
          .catch(() => console.error("Flash could not be acquired."));
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          resolve();
        };
      } catch (error) {
        reject(new Error("We are not able to access the Camera. Please try again."));
      }
    });

  const stopScan = (noCallback = false) => {
    isScanning = false;
    window.onblur = undefined;
    wakeLock
      ?.release()
      .then(() => console.log("WakeLock Released."))
      .catch((err) => {
        console.log("WakeLock Error.");
        console.error(err);
      });
    video?.srcObject?.getTracks?.()?.forEach?.((track) => {
      track?.stop?.();
    });
    if (!noCallback && canStop)
      onScanFinishCallback({
        raw_intensity,
        ppg_time,
        average_fps: Math.round(fps_array.reduce((sum, value) => sum + value, 0) / fps_array.length),
      });
  };

  const calcConfidence = (rgb = { r: 0, g: 0, b: 0 }) => {
    let confidence = undefined;
    if (rgb.r + rgb.g + rgb.b === 0) confidence = 0;
    else {
      const value = rgb.g + rgb.b;
      if (value <= 75) confidence = 1;
      else if (value >= 125) confidence = 0;
      else confidence = (125 - value) / 50;
    }
    if (confidence > 0.5) {
      noDetectionCount = 0;
      isFingerInView = true;
    } else isFingerInView = false;
    return confidence;
  };

  const calcRGB_fromImageData = (imgData) => {
    let count = 0,
      sumRGB = { r: 0, g: 0, b: 0 };
    for (let i = 0; i < imgData.data.length; i += 4) {
      if (imgData.data[i + 3] > 0) {
        count++;
        sumRGB.r += imgData.data[i];
        sumRGB.g += imgData.data[i + 1];
        sumRGB.b += imgData.data[i + 2];
      }
    }
    return { r: sumRGB.r / count, g: sumRGB.g / count, b: sumRGB.b / count };
  };

  const drawCanvas = () => {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const bloodRegion = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.restore();
    return calcRGB_fromImageData(bloodRegion);
  };

  const scan = async (loop_start_time) => {
    const timeElapsed = performance.now() - start_time;
    try {
      if (isScanning) {
        if (timeElapsed <= calibrationTime) {
          const avgRGB = drawCanvas();
          const confidence = calcConfidence(avgRGB);
          onFrameCallback({
            type: "calibration",
            timeElapsed,
            confidence,
            fps: 1000 / (performance.now() - loop_start_time),
          });
          requestAnimationFrame(scan);
        } else if (timeElapsed <= calibrationTime + totalScanTime) {
          if (noDetectionCount > 200) {
            stopScan(true);
            onErrorCallback(new Error("Unable to measure your vitals.\nTry to keep your finger steady the next time."));
          } else {
            if (timeElapsed > calibrationTime + minimumScanTime) canStop = true;
            else canStop = false;
            const avgRGB = drawCanvas();
            const confidence = calcConfidence(avgRGB);
            if (!isFingerInView) noDetectionCount++;
            raw_intensity.push(avgRGB);
            ppg_time.push(performance.now() - start_time);
            fps_array.push(1000 / (performance.now() - loop_start_time));
            onFrameCallback({
              type: "scan",
              timeElapsed,
              confidence,
              fps: fps_array[fps_array.length - 1],
            });
            requestAnimationFrame(scan);
          }
        } else {
          canStop = true;
          stopScan();
        }
      }
    } catch (err) {
      stopScan(true);
      onErrorCallback(err ?? new Error("Fingerscan Error."));
    }
  };

  const startScan = (calibrationTime_inMS = 20000, minimumScanTime_inMS = 60000, totalScanTime_inMS = 120000) => {
    isScanning = false;
    canStop = false;
    isFingerInView = false;
    noDetectionCount = 0;
    raw_intensity = [];
    ppg_time = [];
    fps_array = [];

    return new Promise(async (resolve, reject) => {
      try {
        if (calibrationTime_inMS < 3000 || calibrationTime_inMS > 20000) throw new Error("Calibration duration should be in 3000-20000ms range.");
        if (minimumScanTime_inMS < 60000) throw new Error("Minimum 60 seconds of Scan is Mandatory.");
        if (minimumScanTime_inMS > totalScanTime_inMS) throw new Error("Total Scan-Time cannot be smaller than Minimum Scan-Time.");
        calibrationTime = calibrationTime_inMS;
        minimumScanTime = minimumScanTime_inMS;
        totalScanTime = totalScanTime_inMS;

        navigator.wakeLock
          ?.request("screen")
          .then((wakeLockSentinel) => {
            wakeLock = wakeLockSentinel;
            console.log("WakeLock Active.");
          })
          .catch((err) => {
            console.log("WakeLock Error.");
            console.error(err);
          });

        // Set up back camera
        video = document.getElementById("videoInput");
        if (video) {
          await setupCamera();
          video.play();
        } else throw new Error("Cannot get the video element.");

        // Create canvas and drawing context
        canvas = document.getElementById("canvasOutput");
        if (canvas) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx = canvas.getContext("2d");
        } else throw new Error("Cannot get the canvas element.");

        // start prediction loop
        start_time = performance.now();
        requestAnimationFrame(scan);
        isScanning = true;
        window.onblur = () => {
          stopScan(true);
          onErrorCallback(new Error("App in Background."));
        };
        resolve();
      } catch (err) {
        stopScan(true);
        onErrorCallback(err ?? new Error("Fingerscan Initialization Error."));
        reject("Fingerscan Initialization Error.");
      }
    });
  };

  return {
    startScan,
    stopScan,
    onFrame: (callback = ({ type = "", timeElapsed = 0, confidence = 0, fps = 0 }) => {}) => {
      if (typeof callback === "function") onFrameCallback = callback;
    },
    onScanFinish: (callback = ({ raw_intensity = [], ppg_time = [], average_fps = 0 }) => {}) => {
      if (typeof callback === "function") onScanFinishCallback = callback;
    },
    onError: (callback = (err = new Error("Fingerscan Error.")) => {}) => {
      if (typeof callback === "function") onErrorCallback = callback;
    },
    get isInitializing() {
      return () => !Boolean(isScanning);
    },
    get isScanning() {
      return () => Boolean(isScanning);
    },
    get canStop() {
      return () => Boolean(canStop);
    },
    get isFingerInView() {
      return () => Boolean(isFingerInView);
    },
  };
})();

export default fingerScan;
