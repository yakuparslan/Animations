let rt = 0 ; 
var offset = 0;
var strum = 1;
var angle;
var lfo;
let trans = 0;
let strokeW = 1;
let colors = ['#105652','#DFD8CA','#B91646'];
function setup() {
    createCanvas(2000, 2000);
    rectMode(CENTER);
    background('#FBF3E4');
   
   
    //drawGrid();
  }
  
  function draw() {
        
  
   
  
      if(rt%360==0){
        strokeW++;
        colors = shuffle(colors);
      }
      push();
      stroke(colors[0]);
      strokeWeight(2);
      translate(1000,1000);
      rotate(radians(offset));
      noFill();
      //circle(0,0,1800);
      line(0,0,900,0);
      
      pop();

      

      rt = rt+1;
      offset += 1;
  }




    class lineCircle {
        constructor(x,y,size,colors) {
        this.x = x ; 
        this.y = y ; 
        this.size = size ; 
        this.colors = colors; 
        }
        display() {

        }

    } 

  
function drawGrid() {
	stroke(255);
	
	for (var x=-width; x < width; x+=40) {
		line(x, -height, x, height);
		text(x, x+1, 12);
	}
	for (var y=-height; y < height; y+=40) {
		line(-width, y, width, y);
		text(y, 1, y+12);
	}
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
  