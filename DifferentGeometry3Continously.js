// the frame rate
var fps = 30;
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
let colors = ['#FFA500','#00ADB5','#E1578A','#222831','#00B8A9','#EAEAEA'];
let stop = false; 
let trans = 0 ; 

let canvas;
let gifLength = 30;
let firstDraw = 0 ; 
let  random_width=[];
let  random_height=[];
let  random_scale=[];
let  number_of_circle = 0 ;
let centerx; 
  let centery;

// the canvas capturer instance
var capturer = new CCapture({ format: 'gif', workersPath: 'libraries/',framerate:fps });

// setup the drawing
function setup() {
  createCanvas(1080, 1080);
  rectMode(CENTER);
  background(34, 40, 49);
  stroke(34, 40, 49);
  for(let x =0 ; x<100;x++) {
    arrayBinary = shuffle(arrayBinary);
    arrayRandom.push(random(1.1,2.1))
    arrayRandom[x]=arrayRandom[x]*arrayBinary[x%2];
  }
  centerx = width/2; 
  centery = height/2;
  // this is optional, but lets us see how the animation will look in browser.
  frameRate(fps); 
}

function draw() {
  if(stop===true) {
    
    if (firstDraw === 315) {
      // start the recording on the first frame
      // this avoids the code freeze which occurs if capturer.start is called
      // in the setup, since v0.9 of p5.js
      capturer.start();
    }
  
    // if we have passed t=1 then end the animation.
    if (firstDraw === 944) {
      console.log('finished recording.');
      capturer.stop();
      capturer.save();
      return;
    }
    


  /*
  angle = ( Math.round(offset*100)/100)%6.28;
  lfo = map(cos(angle), -strum, strum, -180, 180);
  trans = Math.round(radians(lfo)*1000)/1000;
  */

  
  
  angle = ( Math.round(offset*100)/100)%3.14 ; 
  lfo = map(cos(angle), -strum, strum, 360, 0) ;
  trans =radians(lfo);
  push();
  
  drawMiddle(0);
  pop();




  /*
  
  push();
  translate(centerx,centery/2+centery); 
  drawMiddle(1);
  pop();
  push();
  translate(centerx,centery/2); 
  rotate(trans*arrayRandom[1]*arrayBinary[1]);
  drawMiddle();
  pop();

  push();
  translate(centerx,centery/2+centery); 
  rotate(trans*arrayRandom[2]*arrayBinary[0]);
  drawMiddle();
  pop();
    */
  offset += 0.01;
  firstDraw +=1;


  print(angle+" "+lfo+" "+trans+" "+firstDraw);
  console.log('capturing frame');
 capturer.capture(document.getElementById('defaultCanvas0'));
}

//stop = false;

}



function drawMiddle(circle_num){
  
  
  drawCircle(150,0,80,circle_num*3);
  
}


function drawCircle(x,y,size,circle_num){
  push();
  fill(colors[circle_num]);
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 2;
  drawingContext.shadowColor = colors[circle_num];
  translate(7*centerx/8,centery-centery/8); 
  rotate(trans);
  circle(-x,-y,size);
  pop();

  push();
  fill(colors[circle_num+1]);
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 1;
  drawingContext.shadowColor = colors[circle_num+1];
  translate(centerx/8+centerx,centery-centery/8); 
  rotate(trans);
  triangle((x-40),-y+35,(x+40),-y+35,x,y-35 );
  pop();  

  push();
  fill(colors[circle_num+2]);
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 3;
  drawingContext.shadowColor = colors[circle_num+2];
  translate(centerx,centery+centery/8); 
  rotate(trans*-1);
  square(0,y-150,70);
  pop();

  /*
  push();
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 1;
  drawingContext.shadowColor = colors[circle_num+2];;
  rotate(trans*arrayRandom[circle_num+2]);
  circle(y*3,0,size);
  pop();
  */
  
 
  
}

function mouseClicked() {
  if(stop==true){stop = false;}
  else{stop = true};
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

