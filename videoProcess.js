let camera_stream = null;
let video;
let videoWidth, videoHeight;
let setVideoHeightTemp;
let setVideoWidthTemp;
let vc;
let streaming = false;
let start_time = new Date();
let frameCo = 0;
let hr_array = [];
let ppg_time = [];
let raw_intensity = [];

let frame;
let dstC1;
let dstC3;
let dstC4;
let stats;

let dataPointsHue = [];
let redFrames = [];
let blueFrames = [];
let frameCount = 0;
let sumred = 0;
let sumblue = 0;

let faceClassifier;
let canvasInput = null;
let canvasBuffer = null;
let canvasOutput = document.getElementById("canvasOutput");
let canvasOutputCtx = canvasOutput && canvasOutput.getContext("2d");
let canvasInputCtx = null;
let canvasBufferCtx = null;
let srcMat = null;
let grayMat = null;

let setRawTemp;
let setTimeTemp;
let setFPSCountTemp;
let setTextForIdTemp;

export async function faceScan(
  setRaw,
  setTime,
  setFPSCount,
  setVideoHeight,
  setVideoWidth,
  setTextForId
) {
  stats = new Stats();
  stats.showPanel(0);
  video = document.getElementById("video");
  camera_stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: "user", mirrored: true },
  });
  video.srcObject = camera_stream;
  videoWidth = 320;
  videoHeight = 180;
  video.play();
  start_time = new Date();
  video.addEventListener(
    "canplay",
    function () {
      if (!streaming) {
        video.setAttribute("width", videoWidth);
        video.setAttribute("height", videoHeight);
        streaming = true;
        vc = new cv.VideoCapture(video);
        startVideoProcessing();
      }
    },
    false
  );
  setVideoHeightTemp = setVideoHeight;
  setVideoWidthTemp = setVideoWidth;
  setTextForIdTemp = setTextForId;
  setFPSCountTemp = setFPSCount;
  setTimeTemp = setTime;
  setRawTemp = setRaw;
  document.getElementById("instruction").style.display = "none";
  document.getElementById("canvasOutput").style.display = "block";
}

function startVideoProcessing() {
  if (!streaming) {
    console.warn("Please startup your webcam");
    return;
  }
  canvasInput = document.createElement("canvas");
  canvasInput.width = videoWidth;
  canvasInput.height = videoHeight;
  canvasInputCtx = canvasInput.getContext("2d");
  canvasBuffer = document.createElement("canvas");
  canvasBuffer.width = videoWidth;
  canvasBuffer.height = videoHeight;
  canvasBufferCtx = canvasBuffer.getContext("2d");
  srcMat = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
  grayMat = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);
  faceClassifier = new cv.CascadeClassifier();
  faceClassifier.load("haarcascade_frontalface_default.xml");
  stopVideoProcessing();
  frame = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
  dstC1 = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);
  dstC3 = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC3);
  dstC4 = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
  requestAnimationFrame(processVideo);
}

function stopVideoProcessing() {
  if (frame != null && !frame.isDeleted()) frame.delete();
  if (dstC1 != null && !dstC1.isDeleted()) dstC1.delete();
  if (dstC3 != null && !dstC3.isDeleted()) dstC3.delete();
  if (dstC4 != null && !dstC4.isDeleted()) dstC4.delete();
}

function hsv(frame) {
  cv.cvtColor(frame, dstC3, cv.COLOR_RGBA2RGB);
  let row = 1,
    col = 2;
  let src = frame;
  if (src) {
    let R = src.data[row * src.cols * src.channels() + col * src.channels()];
    let G =
      src.data[row * src.cols * src.channels() + col * src.channels() + 1];
    let B =
      src.data[row * src.cols * src.channels() + col * src.channels() + 2];
    let hsv = new Array(3).fill(0);
    hsv = RGBtoHSV(R, G, B, hsv);
    let timeDiff = new Date() - start_time;
    if (R > 0) {
      dataPointsHue.push(hsv[0]);
      redFrames.push(R);
      blueFrames.push(B);
      sumblue += B;
      sumred += R;
      frameCount++;
      console.log("openvc", R, G, B);
      let avgRGB = {
        r: R,
        g: G,
        b: B,
      };
      raw_intensity.push(avgRGB);
      ppg_time.push(timeDiff);
    }
  }
  return dstC3;
}

function processVideo() {
  stats.begin();
  vc.read(frame);
  frameCo++;
  let result;
  stats.end();
  canvasInputCtx.drawImage(video, 0, 0, videoWidth, videoHeight);
  let rect = new cv.Rect(
    Math.round(videoWidth / 3.5),
    Math.round(videoHeight / 4.75),
    Math.round(videoWidth / 2.75),
    Math.round(videoHeight / 12)
  );
  let roi = frame.roi(rect);
  if (new Date() - start_time > 20000) {
    result = hsv(roi);
    let comp = (new Date() - start_time - 20000) / 40000;
    let perc = comp * 100;
    let percentageText = Math.round(perc);
    setTextForIdTemp("time", "PERCENT_COMPLETED", percentageText);
  } else {
    result = hsv(roi);
    setTextForIdTemp("time", "CALIBRATION_IN_PROGRESS");
  }
  canvasOutput = document.getElementById("canvasOutput");
  canvasOutputCtx = canvasOutput && canvasOutput.getContext("2d");
  if (canvasOutputCtx) {
    canvasOutputCtx.drawImage(canvasInput, 0, 0, videoWidth, videoHeight);
    var ctx = canvasOutput.getContext("2d");
    ctx.fillStyle = "#3399f170";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ffffff";
    ctx.fillRect(
      Math.round(videoWidth / 4),
      Math.round(videoHeight / 4.75),
      Math.round(videoWidth / 2.25),
      Math.round(videoHeight / 10)
    );
  }
  if (new Date() - start_time <= 60000) {
    if (ppg_time[0] < 15000) {
      requestAnimationFrame(processVideo);
    } else {
      camera_stream.getTracks().forEach(function (track) {
        track.stop();
      });
      canvasOutput = null;
      setTextForIdTemp("time", "POOR_SIGNAL");
      setTextForIdTemp("sub_text", "UNABLE_TO_PROCESS");
      setFPSCountTemp(0);
      setTimeTemp(ppg_time);
      setRawTemp(raw_intensity);
    }
  } else {
    camera_stream.getTracks().forEach(function (track) {
      track.stop();
    });
    canvasOutput = null;
    setTextForIdTemp("time", "SCAN_COMPLETED");
    hr_array.sort();
    var final_hr = 0;
    if (hr_array.length % 2 == 0) {
      final_hr = hr_array[hr_array.length / 2];
    } else {
      final_hr =
        (hr_array[(hr_array.length - 1) / 2] +
          hr_array[(hr_array.length + 1) / 2]) /
        2;
    }
    let raw_size = raw_intensity.length;
    setFPSCountTemp(Math.round(raw_size / 40));
    setTimeTemp(ppg_time);
    setRawTemp(raw_intensity);
  }
}

function minVal(a, b) {
  return a < b ? a : b;
}

function maximumVal(a, b) {
  return a > b ? a : b;
}

function RGBtoHSV(r, g, b, hsv) {
  let min, max, delta;
  min = minVal(r, minVal(g, b));
  max = maximumVal(r, maximumVal(g, b));
  hsv[2] = max;
  delta = max - min;
  if (max != 0) hsv[1] = delta / max;
  else {
    hsv[1] = 0;
    hsv[0] = -1;
    return hsv;
  }
  if (r == max) hsv[0] = (g - b) / delta;
  else if (g == max) hsv[0] = 2 + (b - r) / delta;
  else hsv[0] = 4 + (r - g) / delta;
  hsv[0] *= 60;
  if (hsv[0] < 0) hsv[0] += 360;
  return hsv;
}
