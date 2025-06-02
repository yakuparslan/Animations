let objects = [];
let numObjects =16 ;
let cols, rows;

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  
  cols = floor(sqrt(numObjects)); // Number of columns
  rows = ceil(numObjects / cols); // Number of rows
  
  let colWidth = width / (cols + 1);
  let rowHeight = height / (rows + 1);

  // Create multiple objects with random properties
  for (let i = 0; i < numObjects; i++) {
    let col = i % cols;
    let row = floor(i / cols);

    objects.push({
      initialAngle: PI/4, // Random initial angle between -PI and PI
      rotationRange: PI, // Random rotation range between -PI and PI
      angle: 0, // Initial angle for oscillation
      angleIncrement: map(i,0,numObjects,0.005,0.007), // Random angle increment between 0.02 and 0.07
      x: (col + 1) * colWidth, // Equally distributed x position
      y: (row + 1) * rowHeight,
      strokeColor: "RGBA(57, 62, 70,1)", //lerpColor(color('#393E46'), color('#00000'), i / numObjects), // Different shades of #45474B
      fillColor: "#EEEEEE", // Different shades of #45474B for fill
      opacity: 0.01 // Different opacity values
    });
  }
}

function draw() {
  // Calculate the average angle increment
  let averageSpeed = objects.reduce((sum, obj) => sum + obj.angleIncrement, 0) / objects.length;

  // Adjust each object's angleIncrement and angle to sync them
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];
    // Gradually adjust angleIncrement towards the average speed
    obj.angleIncrement += (averageSpeed - obj.angleIncrement) * 0.001;
    
    // Gradually adjust angle to synchronize oscillation
    let avgAngle = objects.reduce((sum, o) => sum + o.angle, 0) / objects.length;
    obj.angle += (avgAngle - obj.angle) * 0.001;
  }

  background('rgba(245, 247, 248,0.01)'); // Optionally uncomment to clear background each frame

  // Loop through each object and draw it with its calculated rotation
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];

    // Calculate the sine of the angle
    let oscillation = sin(obj.angle);

    // Map the oscillation value (-1 to 1) to a rotation range around the initial angle
    let rotation = obj.initialAngle + map(oscillation, -1, 1, -obj.rotationRange, obj.rotationRange);

    // Increment the angle for the next frame
    obj.angle += obj.angleIncrement;

    // Draw the rectangle at the object's position with the calculated rotation
    push();
    translate(obj.x, obj.y);
    rotate(rotation);
    stroke(obj.strokeColor);
    fill(red(obj.fillColor), green(obj.fillColor), blue(obj.fillColor), obj.opacity * 255); // Apply fill color with opacity
    rect(0, 0, 90, 90);
    //rect(0, 0, 20, 20);
   // ellipse(10, 10, 50,50);
   // ellipse(-10, -10, 50,50);
    pop();
  }
}
