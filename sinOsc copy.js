let objects = [];
let numObjects = 10; // Adjust the number of rectangles
let initialSpeed = 0.01; // Initial rotational speed

function setup() {
  createCanvas(1000, 1000);
  rectMode(CENTER);

  let fib = fibonacci(numObjects); // Generate Fibonacci sequence
  let maxSize = 400; // Starting size for the largest rectangle
  let sizes = fib.map(f => f / fib[fib.length - 1] * maxSize); // Scale Fibonacci sizes

  let size = 600; // Starting size for the largest rectangle
  let initialAngle = random(-PI, PI); // Starting initial angle for the outermost rectangle
  let angleIncrement = random(0.02, 0.07); // Same rotational speed for all objects

  // Create multiple objects with calculated sizes and angles
  for (let i = 0; i < numObjects; i++) {
    objects.push({
      initialAngle: initialAngle , // Slightly more initial angle for each inner object
      rotationRange: PI, // Random rotation range between -PI and PI
      angle: 0, // Initial angle for oscillation
      angleIncrement: initialSpeed-i*0.001, // Same angle increment for all objects
      size: sizes[numObjects - 1 - i] // Size of the rectangle following Fibonacci
    });

  }
}

function draw() {
  background('rgba(245, 247, 248,0.1)'); // Clear background each frame

  // Loop through each object and draw it with its calculated rotation
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];

    // Calculate the sine of the angle
    let oscillation = sin(obj.angle);

    // Map the oscillation value (-1 to 1) to a rotation range around the initial angle
    let rotation = obj.initialAngle + map(oscillation, -1, 1, -obj.rotationRange, obj.rotationRange);

    // Increment the angle for the next frame
    obj.angle += obj.angleIncrement;

    // Draw the rectangle at the center of the canvas with the calculated rotation
    push();
    translate(width / 2, height / 2);
    rotate(rotation);
    stroke('rgba(69, 71, 75, 1)');
    fill('rgba(245, 247, 248,0.001)');
    rect(0, 0, obj.size, obj.size);
    pop();
  }
}


// Function to generate Fibonacci sequence
function fibonacci(n) {
  let fib = [1, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib;
}
