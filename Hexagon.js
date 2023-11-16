let size = 50;
let direction=[];
let hexagons =[];
let extension =1 ; 
function setup() {
    createCanvas(1000, 1000);
    background(0);
    direction =[createVector(1,0),createVector(1,-1),createVector(0,-1),
                createVector(-1,0),createVector(-1,1),createVector(0,1)];
    translate(width/2,height/2);   
    let hex = new Hexagon(0,0); 
    hex.create();
    hexagons.push(hex);
      for (let i = 0 ; i<2;i++){
      for(let x=0;x<direction.length;x++){
          let neighbor = p5.Vector.add(direction[x],hexagons[i].posNo);
          
          hex = new Hexagon(neighbor.x,neighbor.y);
          hexagons.push(hex);
          hex.create();
        }
      }
      
  //  for (let x=-extension; x<extension;x++){
  //   for (let y=-extension; y<extension;y++){
  //          let hex = new Hexagon(x,y); 
  //              hex.create();
  //              hexagons.push(hex);
  //   }
  //  }

      
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
    constructor(q, r) {
        // Cube storage
        this.posNo = createVector(q,r);
        this.q=q;
        this.r=r;
        this.x = size * (     3/2 * this.q                    );
        this.y = size * (sqrt(3)/2 * this.q  +  sqrt(3) * this.r);
               
         
    }
    create(){
        push();   
        fill('#D3504A');
        stroke('#FFDC76');
        strokeWeight(3);
        drawHexagon(this.x, this.y, size);
        pop();

    }

  }


  function pixel_to_flat_hex(point){
    var q = ( 2./3 * point.x                        ) / size
    var r = (-1./3 * point.x  +  sqrt(3)/3 * point.y) / size
    return axial_round(Hex(q, r))
  }