// Set up variables
let sunRadius = 50;
let earthRadius = 20;
let moonRadius = 10;
let earthDistance = 150;
let moonDistance = 50;
let earthAngle = 0;
let moonAngle = 0;

// Set up 3D scene
function setup() {
  createCanvas(600, 600, WEBGL);
}

// Draw function
function draw() {
  background(0);
  noStroke();

  // Set up camera
  rotateX(-PI/6);
  rotateY(frameCount * 0.01);

  // Draw sun
  fill('yellow');
  sphere(sunRadius);

  // Calculate earth position
  let earthX = earthDistance * cos(earthAngle);
  let earthY = earthDistance * sin(earthAngle);

  // Draw earth
  push();
  translate(earthX, earthY, 0);
  fill('blue');
  sphere(earthRadius);
  
  // Calculate moon position
  let moonX = moonDistance * cos(moonAngle);
  let moonY = moonDistance * sin(moonAngle);

  // Draw moon
  translate(moonX, moonY, 0);
  fill('gray');
  sphere(moonRadius);
  pop();

  // Update angles
  earthAngle += 0.01;
  moonAngle += 0.03;
}
