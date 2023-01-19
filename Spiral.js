var angle = 2.0;
var offset = 500;
var scalar = 3.5;
var speed = 0.1;
var col = {
  r: 255,
  g: 0,
  b: 0
};
var stop = false;

function setup() { 
  createCanvas(1000, 1000);
  noStroke();
  background (0);
} 

function draw() { 
  if(stop==true) {  
  col.r = random(0, 200);
  col.g = random(0, 250);
  col.b = random(100, 250);
  var x = offset + cos(angle)*scalar;
  var y = offset + sin(angle)*scalar;

  fill(col.r, col.g, col.b);
  noStroke();
  console.log(x+" "+y+' '+angle);
  ellipse(x, y, 5, 5);
  angle += speed;
  scalar += speed;
  }
  
}

function mouseClicked() {
    if(stop==true){stop = false;}
    else{stop = true};
  }

  