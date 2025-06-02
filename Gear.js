let rotat=0;
function setup() {
    createCanvas(800, 400); // Increased width to 800 to accommodate text on the right side

    angleMode(DEGREES);
  }
  
  function draw() {
    background(255);
    translate(width / 4, height / 2); // Changed to width / 4 to leave space for text on the right
    //drawGrid();

    drawGear(100, 12,20 );
    
    rotat++;
  }
  x
  function drawGear(radius, numTeeth, toothDepth) {
    let angle = 360 / numTeeth;
    let halfAngle = angle / 2;
    let vertexIndex = 0;

    rotate(rotat);
    noFill(); // Ensure the gear is not filled with color
    stroke(0); // Set the outline color to black
    strokeWeight(1);
    beginShape();
    
    for (let i = 0; i < 360; i += angle) {
      // Outer edge of the tooth
      let x1 = adjustedCos(radius, i);
      let y1 = adjustedSin(radius, i);
      vertex(x1, y1);
    //  displayVertexInfo(vertexIndex++, x1, y1);
      
      let x2 = adjustedCos(radius, i + halfAngle);
      let y2 = adjustedSin(radius, i + halfAngle);
      vertex(x2, y2);
     // displayVertexInfo(vertexIndex++, x2, y2);

      let edge = Math.sqrt(Math.pow(toothDepth,2)*2);
      let edge2 = Math.sqrt( Math.pow(toothDepth,2) - Math.pow(edge/2,2)); 
 
    //   let x3 = x2 - x2 / toothDepth*cos(67.5);  
    //   let y3 = y2 - y2 / toothDepth*sin(67.5);
    //   vertex(x3, y3);
    //   displayVertexInfo(vertexIndex++,x3,y3);
      // Inner edge of the tooth
      let x3 = adjustedCos(radius - toothDepth, i + halfAngle);
      let y3 = adjustedSin(radius - toothDepth, i + halfAngle);
      vertex(x3, y3);
    //  displayVertexInfo(vertexIndex++, x3, y3);
      
      let x4 = adjustedCos(radius - toothDepth, i + angle);
      let y4 = adjustedSin(radius - toothDepth, i + angle);
      vertex(x4, y4);
     // displayVertexInfo(vertexIndex++, x4, y4);
      
      // Close the rectangle to ensure perpendicular edges
   
    }
    endShape(CLOSE);
  }
  
  function adjustedCos(radius, angle) {
    let value = radius * cos(angle);
    return (abs(value) < 1e-10) ? 0 : value; // Adjust threshold as needed
  }
  
  function adjustedSin(radius, angle) {
    let value = radius * sin(angle);
    return (abs(value) < 1e-10) ? 0 : value; // Adjust threshold as needed
  }
  
  function displayVertexInfo(index, x, y) {

    text(`Vertex ${index}: (${nf(x, 1, 2)}, ${nf(y, 1, 2)})`, width / 2 + 20, 20 + index * 20);
  }
  function drawGrid() {
	stroke(0);
    strokeWeight(0.1);
	
	for (var x=-width; x < width; x+=40) {
		line(x, -height, x, height);
		text(x, x+1, 12);
	}
	for (var y=-height; y < height; y+=40) {
		line(-width, y, width, y);
		text(y, 1, y+12);
	}
}
