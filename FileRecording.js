// the frame rate
var fps = 60;
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
let firstDraw = 0 ; 
let  random_width=[];
let  random_height=[];
let  random_scale=[];

// the canvas capturer instance
var capturer = new CCapture({ format: 'png', framerate: fps });

// setup the drawing
function setup() {
  createCanvas(540, 540);
  for(let x =0 ; x<100;x++) {
    arrayRandom.push(random(2.1,3.1));
  }
  arrayBinary = shuffle(arrayBinary);
  arrayRandom = shuffle(arrayRandom);
  rectMode(CENTER);
  background(34, 40, 49);
  stroke(34, 40, 49);
  // this is optional, but lets us see how the animation will look in browser.
  frameRate(fps);
}

// draw
var startMillis; // needed to subtract initial millis before first draw to begin at t=0.
function draw() {
  if (frameCount === 1) {
    // start the recording on the first frame
    // this avoids the code freeze which occurs if capturer.start is called
    // in the setup, since v0.9 of p5.js
    capturer.start();
  }

  if (startMillis == null) {
    startMillis = millis();
  }

  // duration in milliseconds
  var duration = 3000;

  // compute how far we are through the animation as a value between 0 and 1.
  var elapsed = millis() - startMillis;
  var t = map(elapsed, 0, duration, 0, 1);

  // if we have passed t=1 then end the animation.
  if (t > 1) {
    noLoop();
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    return;
  }

  let centerx = width/2; 
  let centery = height/2;
  
  angle = offset ;
  lfo = map(sin(angle), -strum, strum, 0, 360);
  push();
  translate(centerx,centery); 
  //rotate(lfo);
  drawMiddle();
  pop();

  offset += 0.008;
  firstDraw +=1;


  // handle saving the frame
  print(lfo);
  console.log('capturing frame');
  capturer.capture(document.getElementById('defaultCanvas0'));
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