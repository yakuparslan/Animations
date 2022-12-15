let rt = 45 ; 
let circleSize = 5;
let red = [223, 120, 97];
let white = [252, 248, 232];
var offset = 0;
var strum = 1;
var angle;
var lfo;
let arrayRandom=[];
let stop = false; 

  

let canvas;
let gifLength = 30;
var capturer = new CCapture( {
  framerate: 60,
  format: 'gif',
  workersPath: './libraries/',
  verbose: true
});
let firstDraw = 0 ; 
let  random_width=[];
let  random_height=[];
let  random_scale=[];


function setup() {
  var p5Canvas = createCanvas(1080, 1920);
  canvas = p5Canvas.canvas;
  for(let x =0 ; x<100;x++) {
    arrayRandom.push(random(-5.1,5.1));
  }
  arrayRandom = shuffle(arrayRandom);
  rectMode(CENTER);
  background(red);
  //capturer.start();
  
}

function draw() {
  
  if ( stop == true) {
  print(firstDraw);
  let centerx = width/2; 
  let centery = height/2;
  
  angle = offset ;
  lfo = map(sin(angle), -strum, strum, 0, 360);
  let y = 1920;
  
 

    push();
    translate(centerx,centery); 
    rotate(radians(lfo));
    drawMiddle();
    pop();
    
   
  /*
    for (let x = 0; x<5;x++){
      if(firstDraw==0){
       random_width.push(random(0,1000));
       random_height.push(random(0,1900));
       random_scale.push(random(0.5,3));
      }
      push();
      scale(random_scale[x]);
      translate(random_width[x],random_height[x]);
      rotate(lfo*arrayRandom[x]);
      drawMiddle();
      pop();
    }
*/
  
  offset += 0.005;
  firstDraw +=1;
  }
 


}



function drawMiddle(){
   
  push();
  fill(white);
  translate(0,-200);
  rotate(radians(45));
  drawTest(0,0,6);
  pop();

  push();
  fill(white);
  translate(200,0);
  rotate(radians(135));
  drawTest(0,0,5);
  pop();

  
  push();
  fill(white);
  translate(0,200);
  rotate(radians(225));
  drawTest(0,0,5);
  pop();


  push();
  fill(white);
  translate(-200,0);
  rotate(radians(315));
  drawTest(0,0,5);
  pop();

  
  
  
  
  fill(red);
  drawSquare(0,250,45);
  fill(white);
  drawStar(0, 0, 120, 60, 8,0);
  fill(red);
  drawSquare(0,80,45);
  fill(white);
  drawCircle(95,12);
  

}


function drawCircle(x,size){
  push()
  circle(0,0,size);
  circle(0,x,size);
  circle(0,-x,size);
  circle(x,0,size);
  circle(-x,0,size);
  pop();
}

function drawSquare(x,size,rt){
  push();
  rotate(radians(rt));
  square(x,x,size);
  pop()
}

function drawStar(x, y, radius1, radius2, npoints,rt) {
  push();
  rotate(radians(rt));
   let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}




function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


function drawEdge(startPointX,startPointY,numTriangle) {
  beginShape();
  let x = startPointX;
  let y = startPointY;
  vertex(x,y);
  
  for (let a = 0 ; a<numTriangle; a++) {
    vertex(x+20,y-20);
    vertex(x+20,y-1);
    
    
    x= x+20;
    }
    endShape();
 
}

function drawGrid() {
	stroke(200);
	fill(120);
	for (var x=-width; x < width; x+=40) {
		line(x, -height, x, height);
		text(x, x+1, 12);
	}
	for (var y=-height; y < height; y+=40) {
		line(-width, y, width, y);
		text(y, 1, y+12);
	}
}


function drawTest(startPointX,startPointY,numTriangle) {
  beginShape();
  let x = startPointX;
  let y = startPointY;
  vertex(x,y);
  
  for (let a = 0 ; a<numTriangle*2; a++) {
    vertex(x+(a+1)*28.284,y-28.284*(1-a%2));
    }

    endShape();
 
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}


function mouseClicked() {
  if(stop==true){stop = false;}
  else{stop = true};
}