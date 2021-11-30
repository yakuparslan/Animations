let width = 800;
let height = 800;
let count = 0 ; 
let stop = true; 
let y = 0 ; 
let begin  = 60 ;
function setup() {
  rectMode(CENTER);
  createCanvas(width, height);
    
  background(255);
}

function draw() {
    
  for (let x = 0 ; x<35;x++) {
    for ( let y = 0 ; y <35; y ++) {
      drawSquare(15+y*20,15+x*20,20,0);
    }
  }
  



}

function drawSquare(x,y,size,iteration){
  let it = iteration ; 
  if (it<10) {
   square(x,y,size);
  size = size * random(0.1,0.9);
  it++;
 

  drawSquare(x,y,size,it);
}
  


}
