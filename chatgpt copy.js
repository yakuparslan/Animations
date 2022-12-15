//import Values from 'values.js'
let offset=0;
let angle;
let lfo;
let it = 500 ; 
let stop = false;

//const color = new Values('hsl(204deg 100% 50% / 1)');

function setup() {
    createCanvas(1000, 1000);
    background('#2D4059');
  
}

  
  function draw() {
    
    
  if ( stop == true) {
  //  background('#2D4059');
    lfo = map(sin(offset), -1, 1, 0, 45);
    scale_lfo = map(sin(offset), -1, 1, 1, 5);
    // Translate to the middle of the canvas
    translate(width / 2, height / 2);
    //scale(scale_lfo);
    drawObject();
    offset += 0.01  ;
  }
  }


  function drawObject(){
    if (it>0){
    scale(it/500);
    // Rotate the square
    rotate(radians(lfo));
    // Draw the square
    rectMode(CENTER);
   
    if(it>490){
    //  fill('#EA5455'); 
      noFill();
      stroke('#EA5455');
      strokeWeight(0.01); 
    }
    else if (it>485&&it<=490){
     //fill('#2D4059');
     noFill();
    // stroke('#61C0BF'); 
     //strokeWeight(0.02); 
     
    }
    else if (it>475&&it<=485){
      noFill();
      //fill('#FFD460'); 
      stroke('#FFD460');
      strokeWeight(0.01); 
    }
    else if (it>465&&it<=475){
   //   fill('#EA5455'); 
   noFill();
   
    }
    else if (it>450&&it<=465){
      fill('#61C0BF'); 
      stroke('#2D4059');
      strokeWeight(3); 
   
    }
    else {
    //  fill('#679B9B'); 
    noFill();
    stroke('#2D4059');
    strokeWeight(3); 
    }
       
   
  //  rect(0, 0, 300, 500);
    polygon(0,0,360,4)
    it=it-1;
    drawObject();
    }
    else {
        it = 500;
       
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