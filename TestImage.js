let img;
let cnv;

let res_width = 500;
let res_height = 500;
function preload() {
  img = loadImage('portrait.jpg');
}
// setup the drawing
function setup() {
  cnv=createCanvas(res_width, res_height);
  cnv.mouseOver(changeColor);
  pixelDensity(1);
  image(img, 0, 0);

 
}

function draw() {
  
 
}


function changeColor(){
  let index = (mouseX+mouseY*res_width)*4
  loadPixels();
    pixels[index+0]=255;
    pixels[index+1]=255;
    pixels[index+2]=255;
    pixels[index+3]=255;
  updatePixels();


}

function mouseClicked() {
  let index = (mouseX+mouseY*res_width)*4
  loadPixels();
    pixels[index+0]=255;
    pixels[index+1]=255;
    pixels[index+2]=255;
    pixels[index+3]=255;
  updatePixels();
}
 
  