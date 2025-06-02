let img;
let pixelDataArray = [];
let currentResolutionIndex = 0; // Start with the first resolution
let transitioning = false; // Whether we are in transition
let transitionProgress = 0; // Progress of the transition (0 to 1)

function preload() {
  img = loadImage("picture3.png"); // Replace with your image path
}

function setup() {
  createCanvas(400, 400);
  img.loadPixels();

  let maxResolution = img.width; // Assuming square image
  let resolutions = [];
  for (let res = 1; res <= maxResolution; res *= 2) {
    resolutions.push(res);
  }

  for (let res of resolutions) {
    let pixelData = generatePixelData(res);
    pixelDataArray.push({ resolution: res, pixelData: pixelData });
  }

  noLoop(); // Wait for user interaction
  console.log(pixelDataArray);
}

function draw() {
  background(0);

  if (!transitioning) {
    // Show the current resolution normally
    showResolutionPixels(pixelDataArray[currentResolutionIndex]);
  } else {
    // Animate the transition between resolutions
    animateTransition();
  }

  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(
    `Resolution: ${pixelDataArray[currentResolutionIndex].resolution}x${pixelDataArray[currentResolutionIndex].resolution}`,
    width / 2,
    height - 20
  );
}

function generatePixelData(resolution) {
  let pixelGrid = [];
  let sectionWidth = img.width / resolution;
  let sectionHeight = img.height / resolution;

  for (let row = 0; row < resolution; row++) {
    for (let col = 0; col < resolution; col++) {
      let x = col * sectionWidth;
      let y = row * sectionHeight;
      let avgColor = getAverageColor(x, y, sectionWidth, sectionHeight);
      pixelGrid.push(avgColor);
    }
  }

  return pixelGrid;
}

function getAverageColor(x, y, w, h) {
  let r = 0,
    g = 0,
    b = 0;
  let totalPixels = 0;

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let px = int(x + i);
      let py = int(y + j);
      if (px < img.width && py < img.height) {
        let color = img.get(px, py);
        r += red(color);
        g += green(color);
        b += blue(color);
        totalPixels++;
      }
    }
  }

  r = r / totalPixels;
  g = g / totalPixels;
  b = b / totalPixels;

  return color(r, g, b);
}

function showResolutionPixels(resolutionData) {
  let resolution = resolutionData.resolution;
  let pixelData = resolutionData.pixelData;
  let cellWidth = width / resolution;
  let cellHeight = height / resolution;

  let index = 0;
  for (let row = 0; row < resolution; row++) {
    for (let col = 0; col < resolution; col++) {
      fill(pixelData[index]);
      noStroke();
      rect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
      index++;
    }
  }
}

function animateTransition() {
  let currentData = pixelDataArray[currentResolutionIndex];
  let nextData = pixelDataArray[currentResolutionIndex + 1];
  let currentResolution = currentData.resolution;
  let nextResolution = nextData.resolution;

  let cellWidth = width / nextResolution;
  let cellHeight = height / nextResolution;

  let transitionColors = interpolateColors(
    currentData.pixelData,
    nextData.pixelData,
    currentResolution,
    nextResolution,
    transitionProgress
  );

  let index = 0;
  for (let row = 0; row < nextResolution; row++) {
    for (let col = 0; col < nextResolution; col++) {
      fill(transitionColors[index]);
      noStroke();
      rect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
      index++;
    }
  }

  transitionProgress += 0.02; // Adjust speed of transition
  if (transitionProgress >= 1) {
    transitioning = false;
    transitionProgress = 0;
    currentResolutionIndex++;
  }
}

function interpolateColors(currentColors, nextColors, curRes, nextRes, progress) {
  let interpolatedColors = [];
  let factor = nextRes / curRes;

  for (let i = 0; i < nextColors.length; i++) {
    let x = i % nextRes;
    let y = Math.floor(i / nextRes);
    let parentX = Math.floor(x / factor);
    let parentY = Math.floor(y / factor);
    let parentIndex = parentY * curRes + parentX;

    let startColor = currentColors[parentIndex];
    let endColor = nextColors[i];

    let r = red(startColor) + (red(endColor) - red(startColor)) * sin(progress * HALF_PI);
    let g = green(startColor) + (green(endColor) - green(startColor)) * sin(progress * HALF_PI);
    let b = blue(startColor) + (blue(endColor) - blue(startColor)) * sin(progress * HALF_PI);

    interpolatedColors.push(color(r, g, b));
  }

  return interpolatedColors;
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW && currentResolutionIndex < pixelDataArray.length - 1) {
    transitioning = true;
    loop(); // Restart the draw loop
  }
}
