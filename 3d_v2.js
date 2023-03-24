let objs = [];
let colors = ['#FFFBF5']//,'#FFBF9B','#B46060','#EA5455']; //,'#E96479','#7DB9B6','#F5E9CF'];
let earth,moon,sun;
let angle = 0;
let x;
let lfo=0;
let numbObjects=50;
let noiseFilter;
let img;
function preload() {
 // img = loadImage('2k_sun.jpg');
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
   noiseFilter = createImage(1280, 720);
	noiseFilter.loadPixels();
	let pix = noiseFilter.width * noiseFilter.height * 4;
	for (let i = 0; i < pix; i += 4) {
		noiseFilter.pixels[i] = random(255);
		noiseFilter.pixels[i + 1] = random(255);
		noiseFilter.pixels[i + 2] = random(255);
		noiseFilter.pixels[i + 3] = 20;
	}
	noiseFilter.updatePixels();



   for(let x=0;x<numbObjects;x++){
    let colorChoise=Math.floor(x/(numbObjects/colors.length));
    let BoxTransparency = map(x,0,numbObjects,0.005,0.002);
    let BoxColor = hex2rgb(colors[colorChoise],BoxTransparency);
    let StrokeTransparency = map(x,0,numbObjects,0.1,0.05);
    let StrokeColor = hex2rgb(colors[colorChoise],StrokeTransparency);
    let StrokeW = map(x,0,numbObjects,2,0.1);  
    let size = map(x,0,numbObjects,50,150);
    objs.push( new DrawObjects(x,0,0,0,BoxColor,StrokeColor,StrokeW,size));
}
}
function draw(){
background('#1B2430');
//image(noiseFilter, -width/2, -height/2);
for ( let i of objs){
    push();
   // rotateY(angle);
   //// rotateZ(angle);
     i.rotateObj();
    i.drawThem();
    if(i.i==0) {console.log(i.i+' '+i.updatedsize)};
   // i.move();
   i.update(); 
    pop();
}
angle +=0.01;

}

class DrawObjects{
        constructor(i,x,y,z,boxcolor,strokeColor,strokeWeight,size){
            this.i=i;
            this.x=x;
            this.y=y;
            this.z=z;
            this.boxcolor=boxcolor;
            this.strokeColor=strokeColor;
            this.size=size;
            this.rotate=i/300;
            this.strokeWeight=strokeWeight;
            this.updatedsize=size;

        }
        drawThem(){
            translate(this.x,this.y,this.z);
            
            fill(this.boxcolor);
           // noFill();
            stroke(this.strokeColor);
            strokeWeight(this.strokeWeight);
            box(this.updatedsize);
        }
        
        update(){
          let new_size  = map(cos(angle/8+this.rotate), 1, -1, this.size, objs[numbObjects-1].size);
          this.updatedsize=new_size;
    
        }
        move(){
            let movex = map(cos(angle+this.rotate), 1, -1, -50, 50 );
            let movey = map(cos(angle/2+this.rotate), 1, -1, -50, 50    );
            let movez = map(cos(angle/4+this.rotate), 1, -1, -50, 50 );
            this.x=movex;
            this.y=movey;
            this.z=movez;
        }
        rotateObj(){
            let lfoX = map(cos(angle+this.rotate+0.01), 1, -1, 0, TWO_PI);
            let lfoY = map(cos(angle+this.rotate+0.02), 1, -1, 0, TWO_PI);
            let lfoZ = map(cos(angle+this.rotate+0.03), 1, -1, 0, TWO_PI);
            rotateY(lfoX);
            rotateX(lfoY);
            rotateZ(lfoZ);
            
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

const hex2rgb = (hex,alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    let output = 'rgba('+r+','+g+','+b+','+alpha+')';
    // return {r, g, b} 
    return output;
}