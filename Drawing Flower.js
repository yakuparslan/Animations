let jumper;
let myDraw=[];
let backgroundColor = 'rgba(247,247,247,0.9)';
let backloop = 'rgba(247,247,247,0.01)';
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
let frameX = 1;
let offsetX = 1;
let dd = 0 ; 
let width_flow = 500; 
function setup() {
	createCanvas(1024, 1024 );
    rectMode(CENTER);
    
    background(backgroundColor);
}

function draw() {
    
   // background(backloop);
    let wide_x = wide_obj * cos(PI/12);
    let wide_y = wide_obj * sin(PI/12);
    if(stop===true) {
      //  background(backgroundColor);
   console.log(frameX+' '+offsetX); 
   if(offset%180==0&&offset!=0){
    if(dd%2!=0){
        cont +=1;  
        width_flow=random(20,500); 
    }

    cont = cont +90;
    offset=0;
    offsetX=1;
    dd++;
   
}  
    
    let a = '0.9';
    let b = '0.1  ';
    lfo = map(cos(offset * Math.PI / 180), 1, -1, 0, 90)+cont ;
    wide_obj = map(cos(frameC*Math.PI/180), 1, -1, 0, width_flow) ;
   // size = map(cos(frameC), 1, -1, 50, 100) ;
    let back = map(cos(frameC), 1, -1, 0.01, 0.02) ;
    trans =radians(lfo);
 //   backloop = 'rgba(247,247,247,'+back+')';   
//    console.log(wide_obj);



    push();
    beginShape();
 
    translate(width/2,height/2);
    ;
    strokeWeight(10);
    stroke('rgba(235, 83, 83,'+a+')');
    rotate(45);
    rotate(trans);
    fill('rgba(235, 83, 83,'+b+')');
    point(0,-1*wide_obj);    
   // rotate(trans);
    stroke('rgba(249, 217, 35,'+a+')');
    fill('rgba(249, 217, 35,'+b+')');
    point(-wide_obj,0);
   // rotate(trans);
    stroke('rgba(54,174 ,124,'+a+')');
    fill('rgba(54,174 ,124,'+b+')');
    point(wide_obj,0);
    stroke('rgba(24,116,152,'+a+')');
    fill('rgba(24,116,152,'+b+')');
    point(0,wide_obj);

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
  