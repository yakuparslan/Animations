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
    
    hex = new Hexagon(0,0,'#D3504A'); 
    hex2 = new Hexagon(5,5,'#E25E3E');
    // hexagons.push(hex);
    //   for (let i = 0 ; i<2;i++){
    //   for(let x=0;x<direction.length;x++){
    //       let neighbor = p5.Vector.add(direction[x],hexagons[i].posNo);
          
    //       hex = new Hexagon(neighbor.x,neighbor.y);
    //       hexagons.push(hex);
    //       hex.create();
    //     }
    //   }
  
  }


  function draw() {
   
    translate(width/2,height/2);   
    hex.create(); 
    let random_num = int(random(direction.length));
    let randomDirection = direction[random_num];
    let adding = p5.Vector.add(hex.posNo,randomDirection);
    if (point_to_pixel_limit(adding)==false){
    hex.posNo.add(randomDirection);
    hex.update();

    }
  
    
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
        this.x = size * (     3/2 * this.posNo.x                    );
        this.y = size * (sqrt(3)/2 * this.posNo.x  +  sqrt(3) * this.posNo.y);
        this.color = color;       
         
    }
    create(){
        push();   
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = -5;
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = 'rgba(251, 245, 102,0.1)';
        fill('rgba(237, 80, 74,0.1)');
        stroke('rgba(251, 245, 102,0.1)');
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