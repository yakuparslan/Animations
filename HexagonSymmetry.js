let size = 20;
let direction=[];
let hexagons =[];
let extension =1 ; 
let hex,hex2;
function setup() {
    createCanvas(1000, 1000);
    background('rgb(0, 0, 0)');
    direction =[createVector(1,0),createVector(1,-1),createVector(0,-1),
                createVector(-1,0),createVector(-1,1),createVector(0,1)];
    
    translate(width/2,height/2); 
    hex = new Hexagon(0,0,'#D3504A'); 
    hex.create(); 

    hexagons.push(hex);
    for (let i = 0 ; i<1;i++){
      for(let x=0;x<direction.length;x++){
          let neighbor = p5.Vector.add(direction[x],hexagons[i].posNo);
          hex = new Hexagon(neighbor.x,neighbor.y,'#D3504A');
          hexagons.push(hex);
          hex.create();
        }
      }
  
  }


  function draw() {
   
  
    
  }


  function drawHexagon(centerX, centerY, radius){

    // p5 already has some functionality for drawing more complex shapes
    // beginShape tells p5 that we'll be positioning some vertices in a bit
    beginShape();
  
    // This is where the heavy lifting happens
    // Make equiangular steps around the circle depending on the number of sides
    for(let a = 0; a < TAU; a+=TWO_PI/6){
  
      // calculate the cartesian coordinates for a given angle and radius
      // and centered at the centerX and centerY coordinates
      var x = centerX + radius * cos(a)
      var y = centerY + radius * sin(a)
  
      // creating the vertex
      vertex(x, y)
    }
  
    // telling p5 that we are done positioning our vertices
    // and can now draw it to the canvas
    endShape(CLOSE);
  }


  // JavaScript object to represent Hex
class Hexagon {
    constructor(q, r,color) {
        // Cube storage
        this.posNo = createVector(q,r);
        this.q=this.posNo.x;
        this.r=this.posNo.y;
        this.s = -(q+r);
        this.x = size * (3/2 * this.posNo.x);
        this.y = size * (sqrt(3)/2 * this.posNo.x  +  sqrt(3) * this.posNo.y);
        this.color = color;       
         
    }
    create(){
        push();   
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = -5;
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = 'rgba(251, 245, 102,0.1)';
        fill(this.color);
        stroke('rgba(251, 245, 102,0.9)');
        strokeWeight(2);
        drawHexagon(this.x, this.y, size);
        pop();

    }
    update(){
      this.x = size * (     3/2 * this.posNo.x                    );
      this.y = size * (sqrt(3)/2 * this.posNo.x  +  sqrt(3) * this.posNo.y);
    }

  }


  function pixel_to_flat_hex(point){
    var q = ( 2./3 * point.x                        ) / size
    var r = (-1./3 * point.x  +  sqrt(3)/3 * point.y) / size
    return axial_round(Hex(q, r))
  }


  function point_to_pixel_limit (vec){
    let x= size * (     3/2 * vec.x     );
    let y =size * (sqrt(3)/2 * vec.x  +  sqrt(3) * vec.y)
    if (Math.abs(x)>width/2+size || Math.abs(y)>height/2+size){
      return true;
    } 
    else {
      return false;
    }
  }


function reflectQ(h) { 
  hexa = new Hexagon(h.q,h.s,'#D3504A');   
  hexa.create(); 
  hexa = new Hexagon(-h.q,-h.s,'#D3504A');   
  hexa.create(); 
  hexa = new Hexagon(h.s,h.r,'#D3504A');   
  hexa.create(); 
  hexa = new Hexagon(h.r,h.q,'#D3504A');   
  hexa.create(); 
  hexa = new Hexagon(-h.r,-h.q,'#D3504A');   
  hexa.create(); 
  }
function reflectR(h) { return Cube(h.s, h.r, h.q); }
function reflectS(h) { return Cube(h.r, h.q, h.s); }