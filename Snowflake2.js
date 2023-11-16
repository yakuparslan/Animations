// Coding Challenge 127: Brownian Motion Snowflake
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/127-brownian-snowflake.html
// https://youtu.be/XUA8UREROYE

let current;
let current_mirror;
let snowflake = [];
let radius_x = 50;

function setup() {
  createCanvas(1000, 1000);
  let firstPosition = random(0,TWO_PI/4);
  let velocity = p5.Vector.fromAngle(firstPosition); // Set the angle of the velocity vector
  velocity.mult(-2); // Reverse the direction if needed
  current = new Particle(height/2-radius_x, firstPosition,velocity);  
  
  // let velocity_mirror = p5.Vector.fromAngle(-firstPosition);
  // velocity_mirror.mult(-1); // Reverse the direction if needed
  // current_mirror = new Particle(height/2-radius_x, -firstPosition,velocity_mirror);  
  // snowflake.push(current_mirror);

}





function draw() {
  translate(width/2, height/2);
  background(0);
  if(current.finished()==true||current.intersects(snowflake)){
    snowflake.push(current);
    let firstPosition = random(0,TWO_PI/4);
    let velocity = p5.Vector.fromAngle(firstPosition); // Set the angle of the velocity vector
    velocity.mult(-5); // Reverse the direction if needed
    current = new Particle(height/2-radius_x, firstPosition,velocity);  

  }
  current.update_2();
  current.show();

  for (let p of snowflake){
    p.show();
  }
    
   
  

  
 // current.update(); 
}

// Function that draws a hexagon (or any other regular polygon)
// centerX and centerY determine where the polygon is positioned
// the radius parameter determines the size of the enclosing circle
// numSides specifies the number of the polygon's sides
function drawHexagon(centerX, centerY, radius, numSides){

  // p5 already has some functionality for drawing more complex shapes
  // beginShape tells p5 that we'll be positioning some vertices in a bit
  beginShape()

  // This is where the heavy lifting happens
  // Make equiangular steps around the circle depending on the number of sides
  for(let a = 0; a < TAU; a+=TAU/numSides){

    // calculate the cartesian coordinates for a given angle and radius
    // and centered at the centerX and centerY coordinates
    var x = centerX + radius * cos(a)
    var y = centerY + radius * sin(a)

    // creating the vertex
    vertex(x, y)
  }

  // telling p5 that we are done positioning our vertices
  // and can now draw it to the canvas
  endShape(CLOSE)
}

// Coding Challenge 127: Brownian Motion Snowflake
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/127-brownian-snowflake.html
// https://youtu.be/XUA8UREROYE
// Kok3/2

class Particle {

    constructor(radius, angle,velocity) {
      this.pos = p5.Vector.fromAngle(angle);
      this.pos.mult(radius);
      this.r = radius_x;
      this.velocity=velocity;
      this.angle = angle;
    }
    update_2() {
         // Update particle position based on velocity vector
         this.pos.add(this.velocity);
    }
  
    update() {
      this.pos.x -= 1;
      this.pos.y += random(-3, 3);
  
      let angle = this.pos.heading();
      angle = constrain(angle, 0, PI/6);
      let magnitude = this.pos.mag();
      this.pos = p5.Vector.fromAngle(angle);
      this.pos.setMag(magnitude);
    }
  
    show() {
      push();
      //rotate(this.angle);
      fill(255, 255, 255, 255);
      noStroke();
      drawHexagon(this.pos.x, this.pos.y, this.r,6);
      pop();
    }
  
    intersects(snowflake) {
      let result = false;
      for (let s of snowflake) {
        let d = dist(s.pos.x, s.pos.y, this.pos.x, this.pos.y); 
        if (d < this.r * sqrt(3)) {
          result = true;
          break;
        }
      }
      return result;
    }
  
    finished() {
      return (this.pos.x < 1);
    }
  }
  