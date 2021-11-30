let rt = 45 ; 
let circleSize = 5;
let red = [223, 120, 97];
let white = [252, 248, 232];
var offset = 0;
var strum = 1;
var angle;
var lfo;
let arrayRandom=[];
let arrayBinary=[-1,1];
let stop = false; 

  

let canvas;
let gifLength = 30;
var capturer = new CCapture( {
  framerate: 30
});
let firstDraw = 0 ; 
let  random_width=[];
let  random_height=[];
let  random_scale=[];


function setup() {
  var p5Canvas = createCanvas(540, 960);
  canvas = p5Canvas.canvas;
  for(let x =0 ; x<100;x++) {
    arrayRandom.push(random(2.1,3.1));
  }
  arrayBinary = shuffle(arrayBinary);
  arrayRandom = shuffle(arrayRandom);
  rectMode(CENTER);
  background(34, 40, 49);
  stroke(34, 40, 49);
  //frameRate(60);
 
  
}

function draw() {
  /*
  if(firstDraw==0) {
     capturer.start();
  }
  */
  
 // if ( stop == true) {
  let centerx = width/2; 
  let centery = height/2;
  
  angle = offset ;
  lfo = map(sin(angle), -strum, strum, 150, 500)/80;
  push();
  translate(centerx,centery); 
  rotate(lfo*arrayRandom[0]*arrayBinary[0]);
  drawMiddle();
  pop();

  push();
  translate(centerx,centery/2); 
  rotate(lfo*arrayRandom[1]*arrayBinary[1]);
  drawMiddle();
  pop();
  
  push();
  translate(centerx,centery/2+centery); 
  rotate(lfo*arrayRandom[2]*arrayBinary[0]);
  drawMiddle();
  pop();

  push();
  translate(centerx/4,centery); 
  rotate(lfo*arrayRandom[3]*arrayBinary[1]);
  drawMiddle();
  pop();

  push();
  translate(3*centerx/4+centerx,centery); 
  rotate(lfo*arrayRandom[4]*arrayBinary[0]);
  drawMiddle();
  pop();

  offset += 0.008;
  firstDraw +=1;
  
  //}
  /*
  if (firstDraw >= 50) { 
     capturer.stop();  capturer.save();  
  }
  */
 


}



function drawMiddle(){
  
  fill(221, 221, 221);
  drawCircle(95,40);
  

}


function drawCircle(x,size){
  let point = 0 ;
  
  push();
  
  circle(0,point,size);
  circle(0,point+size,size);
  circle(0,-80,size);
  circle(120,0,size);
  circle(-160,0,size);
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