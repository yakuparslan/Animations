let x = 0 ;
function setup() {
    createCanvas(1024, 768); // Increased width to 800 to accommodate text on the right side
    RectMode(center);   
  }
  
  function draw() {
    background(0);
    translate(width/2,height/2);
    fill(x%255);
    rect(0,0,200,200);
    x++;
  }