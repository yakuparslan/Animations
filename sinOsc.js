let objects = [];
let numObjects =100 ;
let cols, rows;

function setup() {
  createCanvas(1080, 1080);
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
      initialAngle: random(-PI, PI), // Random initial angle between -PI and PI
      rotationRange: random(-PI, PI), // Random rotation range between -PI and PI
      angle: 0, // Initial angle for oscillation
      angleIncrement: random(0.02, 0.05), // Random angle increment between 0.02 and 0.07
      x: (col + 1) * colWidth, // Equally distributed x position
      y: (row + 1) * rowHeight // Equally distributed y position
    });
  }
}

function draw() {
  // Calculate the average angle increment
  let averageSpeed = objects.reduce((sum, obj) => sum + obj.angleIncrement, 0) / objects.length;

    // // Adjust each object's angleIncrement and angle to sync them
    // for (let i = 0; i < objects.length; i++) {
    //   let obj = objects[i];
    //   // Gradually adjust angleIncrement towards the average speed
    //   obj.angleIncrement += (averageSpeed - obj.angleIncrement) * 0.001;

    //   // Gradually adjust angle to synchronize oscillation
    //   let avgAngle = objects.reduce((sum, o) => sum + o.angle, 0) / objects.length;
    //   obj.angle += (avgAngle - obj.angle) * 0.001;
    // }

  // background(220); // Optionally uncomment to clear background each frame

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
    stroke('#45474B');
    fill('rgba(245, 247, 248,0.1)');
    rect(0, 0, 100, 100);
   // ellipse(10, 10, 50,50);
 //   ellipse(-10, -10, 50,50);
    pop();
  }
}
