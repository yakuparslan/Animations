let objects = [];
let numCols, numRows;
let objectSize = 200  ;
let angleDifferenceHistory = [];
let speed = 0.001;
function setup() {
  createCanvas(1080, 1080);
background("#45474B");
  // Calculate the number of columns and rows based on object size
  numCols = floor(width / objectSize);
  numRows = floor(height / objectSize);

  // Initialize the rotating objects
  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      let x = i * objectSize + objectSize / 2;
      let y = j * objectSize + objectSize / 2;
      let angularVelocity = random(0.01, 1);
      let initialAngle = random(-1.0,1.0);
      objects.push(new RotatingObject(x, y, angularVelocity, initialAngle));
    }
  }
}

function draw() {
  background("#45474B");

  // Update and display the objects
  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects.length; j++) {
      if (i !== j) {
       objects[i].update(objects[j].angle);
        objects[i].rotat();
      
      }
    }
  }

  for (let obj of objects) {  
    obj.display();
  }

//   // Calculate and display the synchronization information
//   let avgAngleDifference = calculateAverageAngleDifference();
//   angleDifferenceHistory.push(avgAngleDifference);

//   fill(0);
//   noStroke();
//   textSize(16);
//   textAlign(LEFT, TOP);
//   text("Average Angle Difference: " + nf(avgAngleDifference, 1, 4), 10, 10);

//   displayAngleDifferenceHistory();
 }

class RotatingObject {
  constructor(x, y, angularVelocity, initialAngle) {
    this.x = x;
    this.y = y;
    this.angularVelocity = angularVelocity;
    this.angle = initialAngle;
    this.initialAngle=initialAngle;
    this.rotation=0;
   // this.damping = 0.99; // Damping factor to prevent unrealistic speed increase
  }

  update(otherAngle) {
    // Coupling strength
    let coupling = 0.000001;

    // Difference in angles
    let angleDifference = otherAngle - this.angle;

    // Adjust angular velocity based on the angle difference
    this.angularVelocity = coupling * sin(angleDifference);
    this.angle += this.angularVelocity;
    // Keep the angle within 0 to TWO_PI

    this.angle = this.angle  % TWO_PI;
  }
  rotat(){

    this.rotation = map(sin(this.angle), this.initialAngle, -this.initialAngle, 0, 360);
    this.angle += 0.001;
    console.log(this.angle,this.rotation);
    
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.rotation));
    stroke('rgba(244, 206, 20,1)');
    fill('rgba(245, 247, 248,0.001)');
 //   noFill();
    rectMode(CENTER);
    rect(0, 0, objectSize - 10, 20);

    pop();
  }
}

function calculateAverageAngleDifference() {
  let totalDifference = 0;
  let count = 0;

  for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      let angleDifference = abs(objects[i].angle - objects[j].angle);
      totalDifference += angleDifference;
      count++;
    }
  }

  return totalDifference / count;
}

function displayAngleDifferenceHistory() {
  let graphWidth = width - 20;
  let graphHeight = 100;
  let graphX = 10;
  let graphY = height - graphHeight - 10;

  // Draw the graph background
  fill(240);
  noStroke();
  rect(graphX, graphY, graphWidth, graphHeight);

  // Draw the angle difference history
  stroke('0');
  noFill();
  beginShape();
  for (let i = 0; i < angleDifferenceHistory.length; i++) {
    let x = map(i, 0, angleDifferenceHistory.length, graphX, graphX + graphWidth);
    let y = map(angleDifferenceHistory[i], 0, PI, graphY + graphHeight, graphY);
    vertex(x, y);
  }
  endShape();

  // Limit the history length to fit the graph width
  if (angleDifferenceHistory.length > graphWidth) {
    angleDifferenceHistory.splice(0, 1);
  }
}
