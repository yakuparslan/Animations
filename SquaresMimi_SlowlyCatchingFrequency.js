let width = 1080;
let height = 1920;
let rotation_margin_fast = 1.9;
let rotation_margin_slow = rotation_margin_fast * 0.8;
let count = 0 ;
let stop = true;
let y = 0 ;
var sW = [];
var sC = [];
let size=  63   ;
let factor = 2;
let margin = size /factor ;
let posX,posY;
let noi;
let scale_x = 1 ;
let myDraw=[];
let disappear = false;
var index = 0 ;
let offset;
let startingAngle;
let sync = false;
function setup() {
  rectMode(CENTER);
  createCanvas(width, height);
  background('#2C3639');
  noi_width = floor((width*factor-size)/(size*factor+size));
  noi_height = floor((height*factor-size)/(size*factor+size));
  posX = margin+size/2;
  posY = margin + size/2;
  for (let y= 0 ; y<noi_height;y++) {
    for ( let x = 0 ; x <noi_width; x ++) {
      var bool = Math.random() < 0.5;  
      var trans_x = posX+(margin+size)*x;
      var trans_y = posY+(margin+size)*y;
      offset = 0.01;
      startingAngle=random(-1,1);
      push();
      myDraw[index] = new MimiDraw(index,x,y,size,offset,random(1,1),'rgba(220, 215, 201, 1)',bool,trans_x,trans_y,offset,startingAngle,sync,[index]);
      translate(trans_x,trans_y);
      myDraw[index].display();
      pop();
      index++;
     
    }
  }

  console.log('tamam');
}

function draw() {
  background('#2C3639');
  for(let x = 0 ;x<index;x++) {
 
  push();
  translate(myDraw[x].trans_x,myDraw[x].trans_y);  
  myDraw[x].rotate();
  myDraw[x].display();
  //  myDraw[x].compare();
  pop();

  }

}





class MimiDraw {
  constructor(index,arr_x,arr_y,size,rotation,weight,color,side,trans_x,trans_y,offset,angle,sync,synced_index=[]){
    this.index = index;
    this.arr_x=arr_x;
    this.arr_y=arr_y;
    this.size = size;
    this.rotation = rotation ;
    this.weight = weight;
    this.color = color ;
    this.side = side ;
    this.trans_x=trans_x;
    this.trans_y=trans_y;
    this.offset=offset;
    this.angle=angle;
    this.sync=sync;
    this.synced_index=synced_index;
   
  }
  display(){
   
    var x = 0-this.size/2;
    var y = 0-this.size/2;
   
   
    strokeWeight(this.weight);
    stroke (this.color);
    rotate(radians(this.rotation));


    beginShape();
    var currentSize = this.size ;
    line(x,y,x+currentSize,y);
    line(x+currentSize,y,x+currentSize,y+currentSize);
    line(x+currentSize,y+currentSize,x,y+currentSize);
    let current_x  = x ;
    let current_y  = y+currentSize;
    let status = 0 ;
 
    let multiplier = 9  ;
    currentSize = currentSize * (multiplier/10);
   
    for (let a = 0 ; a <15   ; a ++) {
      if(a%2===0) {
      line(current_x,current_y,current_x,current_y-currentSize);
      line(current_x,current_y-currentSize,current_x+currentSize,current_y-currentSize);
      current_x = current_x+currentSize ;
      current_y = current_y-currentSize;
      currentSize = currentSize * (multiplier/10);
     
      }
      else 
      {
        line(current_x,current_y,current_x,current_y+currentSize);
        line(current_x,current_y+currentSize,current_x-currentSize,current_y+currentSize);
        current_x = current_x-currentSize;
        current_y = current_y+currentSize;
        //currentSize = currentSize - (currentSize/(4-a));;
        currentSize = currentSize * (multiplier/10);
       
     
      }


    }

  endShape();
   

    }

    rotate(){

      this.rotation = map(sin(this.angle), -1, 1, 0, 360);
      this.angle +=this.offset;
    }
    
    }

    
function calculateAverageAngleDifference() {
  let totalDifference = 0;
  let count = 0;

  for (let i = 0; i < myDraw.length; i++) {
    for (let j = i + 1; j < myDraw.length; j++) {
      let angleDifference = abs(myDraw[i].rotation - myDraw[j].rotation);
      totalDifference += angleDifference;
      count++;
    }
  }

  return totalDifference / count;
}



function getRandomColor() {
    // Generate a random grayscale value between 0 and 255
    var value = Math.floor(Math.random() * 256);
  
    // Convert the grayscale value to a hex string
    var hexValue = value.toString(16).padStart(2, '0');
    
    // Create a color string in the format "#RRGGBB"
    var color = '#' + hexValue + hexValue + hexValue;
    
    return color;
    // var letters = '0123456789ABCDEF';
    // var color = '#';
    // for (var i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
  }
  