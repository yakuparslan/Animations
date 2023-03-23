let objs = [];
let colors = ['#4D455D','#E96479','#7DB9B6','#F5E9CF'];
let earth,moon,sun;
let angle = 0;
let x;
let lfo=0;
let numbObjects=50;

let img;
function preload() {
  img = loadImage('2k_sun.jpg');
}

function setup(){
    createCanvas(1280,720,WEBGL);
    rectMode(CENTER);
    background(hex2rgb('#FFDE7D',0.1));
   // ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500);
   // earth = new SpaceObjects(300,0,0,50,random(colors),false);
   // moon  = new SpaceObjects(400,0,0,20,random(colors),false);
   // sun = new SpaceObjects(0,0,0,100,random(colors),true);
   console.log(hex2rgb(random(colors),0.1));
   for(let x=0;x<numbObjects;x++){
    let col = random(colors);
    objs.push( new DrawObjects(x,0,0,0,hex2rgb(col,0.001*(numbObjects-x)),hex2rgb(col,1),3*x,0));
}
}
function draw(){
background('#FFDE7D');

for ( let i of objs){
    i.drawThem();
    i.update(); 
   
}
angle +=0.01;
}

class DrawObjects{
        constructor(i,x,y,z,boxcolor,strokeColor,size,rotate){
            this.i=i;
            this.x=x;
            this.y=y;
            this.z=z;
            this.boxcolor=boxcolor;
            this.strokeColor=strokeColor;
            this.size=size;

        }
        drawThem(){
            lfo = map(cos(angle+this.i/50), 1, -1, 0, TWO_PI);
            let x = 1;
            if(this.i%2==0){
                 x = 1;
            }
            push();
            fill(this.boxcolor);
            stroke(this.strokeColor);
            rotateY(x*lfo);
            rotateX(x*lfo*0.2);
            rotateZ(x*lfo*0.4);
            box(this.size);
            pop();

        }
        
        update(){
          let new_size  = map(cos(angle), 1, -1, this.size, objs[(this.i+1)%numbObjects].size);
          this.size=new_size;
           // this.boxcolor=objs[(this.i+1)%20].boxcolor;
           // this.strokeColor=objs[(this.i+1)%20].strokeColor;
        }


}

class SpaceObjects {
        constructor(x,y,z,radius,color,lightSource){
            this.x=x;
            this.y=y;
            this.z=z;
            this.radius=radius;
            this.color = color ;
            this.lightSource=lightSource;
        }

        show(){
            if(this.lightSource){
                push();
                noStroke();
                rotateY(angle);
                translate(this.x,this.y,this.z);
                texture(img);
                sphere(this.radius);        
                pop();     
            }
            else {
                push();
                noStroke();
                rotateY(angle);
                ambientMaterial(this.color);
                translate(this.x,this.y,this.z);
                sphere(this.radius);        
                pop();          
            }
            



        }
        light(){
            pointLight(255,255,0,0,0,0);
        }
        rotateObj(){

        }




}



    /*
    camera(0,500,mouseX,0,0,0,0,0,1);
    ambientLight(255);
    background(0);
    rotateY(angle*3);
    push();
    translate(300,0,0);
    //stroke('rgba(255,0,0,0.5)')
    //noStroke();
    rotateY(angle);
    fill('rgba(255,0,0,0.9)');
    sphere(70);
    pop();

    push();
    translate(0,0,0);
    //noStroke();
    texture(img);
    sphere(70);
    pop();
   /*
    sun.light();
    earth.show();
    moon.show();
    sun.show();
   
    
*/

const hex2rgb = (hex,alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    let output = 'rgba('+r+','+g+','+b+','+alpha+')';
    // return {r, g, b} 
    return output;
}
