let jumper;
let myDraw=[];
let backgroundColor = 'rgba(247,247,247,0.5)';
let frequency = 1024;
let sc = 1;
let wide_obj = 200;

let size = 100;
var angle=0.00;
var lfo;
let trans = 0;
let offset = 0;
let direction = 1;
let prevAngle = 0; 
let cont =0;
let frameC = 0;
let frameX = 0.01;
let offsetX = 1;
function setup() {
	createCanvas(1024, 1024 );
    rectMode(CENTER);
    
    background(backgroundColor);
}

function draw() {
    
    background(backgroundColor);
    let wide_x = wide_obj * cos(PI/12);
    let wide_y = wide_obj * sin(PI/12);
    if(stop===true) {
      //  background(backgroundColor);
   
   if(offset%180==0&&offset!=0){
    cont = cont +90;
    offset=0;
    frameX = random(0.01,0.05);
    offsetX=1;
    console.log(frameX+' '+offsetX);

   
}   
    let a = '0.9';
    lfo = map(cos(offset * Math.PI / 180), 1, -1, 0, 90)+cont ;
    wide_obj = map(cos(frameC), 1, -1, 75, 300) ;
    size = map(cos(frameC), 1, -1, 200, 100) ;
    trans =radians(lfo);
//    console.log(wide_obj);
    push();
    beginShape();
 
    translate(width/2,height/2);
    ;
    stroke('rgba(235, 83, 83,'+a+')');
    rotate(trans);
    fill('rgba(235, 83, 83,'+a+')');
    ellipse(0,-1*wide_obj,size,size);    
   // rotate(trans);
    stroke('rgba(249, 217, 35,'+a+')');
    fill('rgba(249, 217, 35,'+a+')');
    ellipse(-wide_obj,0,size,size);
   // rotate(trans);
    stroke('rgba(54,174 ,124,'+a+')');
    fill('rgba(54,174 ,124,'+a+')');
    ellipse(wide_obj,0,size,size);
    stroke('rgba(24,116,152,'+a+')');
    fill('rgba(24,116,152,'+a+')');
    ellipse(0,wide_obj,size,size);

    /*
    fill('rgba(223, 120, 87,'+a+')');
    ellipse(0,wide_obj,size,size); 
    fill('rgba(97, 113, 67,'+a+')');
    ellipse(-1*wide_obj,0,size,size); 
    fill('rgba(14, 131, 136,'+a+')');
    ellipse(wide_obj,0,size,size);       
    */
    endShape();
    pop();

    offset += offsetX;
    frameC +=frameX;

    }
}


function mouseClicked() {
    if(stop==true){stop = false;}
    else{stop = true};
  }
  