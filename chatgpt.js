//import Values from 'values.js'
let offset=0;
let angle;
let lfo;
let lfo_previous;
let it = 50 ; 
let division = it;
let stop = true;
let frame_num =0;
//const color = new Values('hsl(204deg 100% 50% / 1)');
// the canvas capturer instance
var capturer = new CCapture({ format: 'gif', workersPath: 'libraries/',framerate:50 });

function setup() {
    createCanvas(1080, 1220);
    frameRate(50);
  //  background('#393E46')
  
}

  
  function draw() {
    
    
  
/*
    if (frame_num==0) {
      console.log('started');
      capturer.start();
    }

    if (stop==false) {
      console.log('finished recording.');
      capturer.stop();
      capturer.save();
      return;
    }
*/





    //background('#2D4059');
    lfo = map(sin(offset), -1, 1, 0, 360);
    
  
    lfo_previous = lfo;
   // console.log(lfo);
    scale_lfo = map(sin(offset), -1, 1, 1, 5);
    // Translate to the middle of the canvas
    translate(width / 2, height / 2);
    scale(1);
    drawObject();
    offset += 0.01  ;
  //  capturer.capture(document.getElementById('defaultCanvas0'));
    frame_num +=1;
  }
  


  function drawObject(){
    if (it>0){
    scale(it/division);
    // Rotate the square
    rotate(radians(lfo));
    // Draw the square
    rectMode(CENTER); 
    strokeWeight(0.1); 
   
     noFill();  
    stroke('#00ADB5');
  //  rect(0, 0, 300, 500);
    polygon(0,0,360,2)
    it=it-1;
    drawObject();
    }
    else {
        it = 50;
       
    }
  }

  
function mouseClicked() {
    if(stop==true){stop = false;}
    else{stop = true};
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


  function LightenDarkenColor(col,amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;
    
    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}