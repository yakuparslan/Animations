let res_width = 1080;
let res_height = 1080;
let speedx,speedy ;
let stop=false; 
let count = 0 ;
let dirt = [];
let num_of_dirts = 1;
let rotate_vacuum ;
let speed_angle;


function setup() {
  createCanvas(res_width, res_height);
  rectMode(CENTER);
  background(34, 40, 49);
  vac = new VacuumCleaner(res_width/2,res_height/2);
  carpet = new Carpet();

   rotate_vacuum = 90;
   speed_angle = tan(rotate_vacuum);
  speedx = -2*speed_angle;
  speedy = 2;
  frameRate(30);
 
  //drawGrid();
}

function draw() {
  background(34, 40, 49);
  if(stop===true) {
  if(count===0) {
    carpet.create();
  }
  carpet.display(); 
  //vac.display();
  vac.clean();
  
  //print(rotate_vacuum+" "+ speed_angle+ " " + speedx +" "+ speedy);
  
  count++;
}

 
  
}

class Carpet{
  constructor(){

  }
  create(){

    fill(255);
    push();
    beginShape();
    for (let x = 0 ; x <num_of_dirts ; x++){
      dirt.push([random(0,width),random(0,height),random(1,20)]);
    }
    
    endShape();
    pop();

}
display() {
  for ( let x = 0 ; x <num_of_dirts; x ++) {
    circle(dirt[x][0],dirt[x][1],dirt[x][2]);

  }
 
}
}


class VacuumCleaner {
  constructor(x,y){
    this.x=x;
    this.y=y;

   }
  display(){
    strokeWeight(2);
    fill(255);
    
    translate(this.x,this.y);
    push();
    beginShape();
    rect(0,0,60,10);
    line(0,-20,0,-100);
     

    beginShape();
    vertex(-25,-5);
    vertex(-15,-15);
    vertex(0,-20);
    vertex(15,-15);
    vertex(25,-5);
    endShape();
 

    beginShape();
    
    curve(-10,-16.66,-15,-50,-10,-80);
    vertex(0,-80);
    vertex(0,-20);
    endShape();

    beginShape();
    curve(10,-16.66,15,-50,10,-80);
    vertex(0,-80);
    vertex(0,-20);
    endShape();


    endShape();
    pop();
  }
  move(){
    this.x += speedx;
    this.y += speedy;  
  }
  getPosition()  {
    let vacuum_pos = [this.x,this.y] ; 
    return vacuum_pos; 
  }
  clean() {
      let closestDirt = getClosestDirt();
      let x = closestDirt[0] - this.x ; 
      let y = closestDirt[1] - this.y ; 
      let tan_dirt = y /x ; 
      let ang = atan(tan_dirt)+180;
      print(this.x +" "+ this.y + " "+ closestDirt[0]+" "+closestDirt[1]+" "+x+" "+y+" "+ang );
      rotate(radians(ang));
      vac.display();

  }

 
}   


function getClosestDirt(){
    let vacuum_pos = vac.getPosition();
    let closestDirt = [];
    let dist = 10000 ; 
    for(let a = 0 ; a<num_of_dirts;a++){
      let x = Math.abs(vacuum_pos[0]-dirt[a][0]);
      let y = Math.abs(vacuum_pos[1]-dirt[a][1]);
      if(sqrt( x*x + y*y )<dist) {
        dist = sqrt( x*x + y*y )
        closestDirt[0] = dirt[a][0];
        closestDirt[1] = dirt[a][1];
      }   

    } 
    return closestDirt;
}







function mouseClicked() {
  if(stop==true){stop = false;
                  rotate_vacuum=random(0,360);
  }
  else{stop = true};
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
