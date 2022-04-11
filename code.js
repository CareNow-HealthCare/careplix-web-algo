let stream;
let dataPointsHue = [];
let redFrames = [];
let blueFrames = [];
let frameCount = 0;
let timeDiff = 0;
let sumred = 0;
let sumblue = 0;
let fmesh;
let video;
let videoWidth, videoHeight;
let videoDataSum;
let avgIntensity;
let tmp, fftData;

let setRawTemp;
let setTimeTemp;
let setFPSCountTemp;
let setTextForIdTemp;

let raw = [];
let ppg_time2 = [];

var canvas;
var ctx;
var fft;
var curFaces;
var maxHistLen = 64;
var raw_intensity = [];
var ppg = [];
var ppg_time = [];
var start_time = new Date();
var bloodHist = Array(maxHistLen).fill(0);
var timingHist = Array(maxHistLen).fill(0);
var last = performance.now();
var avgRGB;
let boxLeft, boxTop, boxWidth, boxHeight;

var average = (array) => array.reduce((a, b) => a + b) / array.length;

async function setupCamera() {
  video = document.getElementById("video");
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      aspectRatio: 1.333,
      width: { ideal: 1280 },
    },
  });
  video.srcObject = stream;
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function renderPrediction() {
  const facepred = await fmesh.estimateFaces(canvas);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  if (facepred.length > 0 && timeDiff <= 60000) {
    curFaces = facepred;
    counter1++;
    await drawFaces();
  }
  if (timeDiff <= 60000) {
    requestAnimationFrame(renderPrediction);
  }
}

async function renderFingerPrediction() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  if (timeDiff <= 60000) {
    await getFingerIntensities();
  }
  requestAnimationFrame(renderFingerPrediction);
}

async function getFingerIntensities() {
  let bloodRegion = ctx.getImageData(10, 10, canvas.width, canvas.height);
  avgRGB = calcRGB(bloodRegion);
  let hsv = new Array(3).fill(0);
  if (avgRGB.r > 0) {
    hsv = RGBtoHSV(avgRGB.r, avgRGB.g, avgRGB.b, hsv);
    dataPointsHue.push(hsv[0]);
    redFrames.push(avgRGB.r);
    blueFrames.push(avgRGB.b);
    sumblue += avgRGB.b;
    sumred += avgRGB.r;
    frameCount++;
  }
  document.body.style.backgroundColor = "rgb(" + avgRGB.r + ",0,0)";
  raw_intensity.push(avgRGB.r.toFixed(2));
  videoDataSum = bloodRegion.data.reduce((a, b) => a + b, 0);
  videoDataSum -= 10 * 10 * 255;
  avgIntensity = avgRGB.r;
  timingHist.push(1 / ((performance.now() - last) * 0.001));
  last = performance.now();
  ppg.push(bloodHist[maxHistLen - 1] * 0.8 + 0.2 * avgIntensity);
  ppg_time.push(new Date() - start_time);
  bloodHist.push(bloodHist[maxHistLen - 1] * 0.8 + 0.2 * avgIntensity);
  if (bloodHist.length > maxHistLen) {
    bloodHist.shift();
    timingHist.shift();
    fftData = await calcFFT(bloodHist);
  }
}

async function drawFaces() {
  ctx.strokeStyle = "#3399f1";
  ctx.lineWidth = 2;
  for (face of curFaces) {
    if (face.faceInViewConfidence > 0.9) {
      let mesh = face.scaledMesh;
      boxLeft = mesh[117][0];
      boxTop = mesh[117][1];
      boxWidth = mesh[346][0] - boxLeft;
      boxHeight = mesh[164][1] - boxTop;
      ctx.beginPath();
      const boxsize = 4;
      ctx.rect(
        boxLeft - boxsize,
        boxTop - boxsize,
        boxWidth + boxsize * 2,
        boxHeight + boxsize * 2
      );
      ctx.stroke();
      let bloodRegion = ctx.getImageData(boxLeft, boxTop, boxWidth, boxHeight);
      avgRGB = calcRGB(bloodRegion);
      let hsv = new Array(3).fill(0);
      if (avgRGB.r > 0) {
        hsv = RGBtoHSV(avgRGB.r, avgRGB.g, avgRGB.b, hsv);
        dataPointsHue.push(hsv[0]);
        redFrames.push(avgRGB.r);
        blueFrames.push(avgRGB.b);
        sumblue += avgRGB.b;
        sumred += avgRGB.r;
        frameCount++;
        raw.push(avgRGB.r);
        let td = new Date() - start_time;
        ppg_time2.push(td);
      }
      raw_intensity.push(avgRGB.r.toFixed(2));
      videoDataSum = bloodRegion.data.reduce((a, b) => a + b, 0);
      videoDataSum -= boxWidth * boxHeight * 255;
      avgIntensity = avgRGB.r;
      timingHist.push(1 / ((performance.now() - last) * 0.001));
      last = performance.now();
      ppg.push(bloodHist[maxHistLen - 1] * 0.8 + 0.2 * avgIntensity);
      ppg_time.push(new Date() - start_time);
      bloodHist.push(bloodHist[maxHistLen - 1] * 0.8 + 0.2 * avgIntensity);
      if (bloodHist.length > maxHistLen) {
        bloodHist.shift();
        timingHist.shift();
        fftData = await calcFFT(bloodHist);
      }
    }
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

async function calcFFT(data) {
  const avg = average(data);
  data = data.map((elem) => elem - avg);
  tmp = fft.forward(data);
  return tmp.slice(1);
}

function calcRGB(image) {
  counter2++;
  var blockSize = 5,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;
  length = image.data.length;
  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += image.data[i];
    rgb.g += image.data[i + 1];
    rgb.b += image.data[i + 2];
  }
  rgb.r = rgb.r / count;
  rgb.g = rgb.g / count;
  rgb.b = rgb.b / count;
  return rgb;
}

export async function face(setRaw, setTime, setFPSCount, setVideoHeight, setVideoWidth, setTextForId) {
  fmesh = await facemesh.load({ maxFaces: 1 });
  setTextForIdTemp = setTextForId;
  setTextForIdTemp("time", "OPEN_CAMERA")
  setTextForIdTemp("sub_text", "ELLIPSES")
  setRawTemp = setRaw;
  setTimeTemp = setTime;
  setFPSCountTemp = setFPSCount;
  await setupCamera();
  videoWidth = video.videoWidth;
  videoHeight = video.videoHeight;
  video.play();
  canvas = document.getElementById("faceoutput");
  canvas.width = videoWidth / 2;
  canvas.height = videoHeight / 2;
  ctx = canvas.getContext("2d");
  fft = new window.kiss.FFTR(maxHistLen);
  renderPrediction();
  document.getElementById("faceoutput").style.display = "block";
  document.getElementById("instruction").style.display = "none";
}
