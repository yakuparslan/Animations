let width = 1080;
let height = 1920;
let rotation_margin_fast = 1.9;
let rotation_margin_slow = rotation_margin_fast * 0.8;
let count = 0 ;
let stop = true;
let y = 0 ;
var sW = [];
var sC = [];
let size= 166  ;
let factor = 2;
let margin = size /factor ;
let posX,posY;
let noi;
let scale_x = 1 ;
let myDraw=[];
let disappear = false;
var index = 0 ;
let offset;
let sync = false;
function setup() {
  rectMode(CENTER);
  createCanvas(width, height);
  background('white');
  frameRate(50);
  noi_width = floor((width*factor-size)/(size*factor+size));
  noi_height = floor((height*factor-size)/(size*factor+size));
 
  posX = margin+size/2;
  posY = margin+size/2;

 
 

  for (let y= 0 ; y<noi_height;y++) {
    for ( let x = 0 ; x <noi_width; x ++) {
    var bool = Math.random() < 0.5;
    offset = random(-0.05 ,0.05);  
    var trans_x = posX+(margin+size)*x;
    var trans_y = posY+(margin+size)*y;
  
    push();
    myDraw[index] = new MimiDraw(index,x,y,size,random(0,360),random(2.1,5.9),random_rgba(),trans_x,trans_y,offset,offset,sync,[index]);
    translate(trans_x,trans_y);
    myDraw[index].display();
    pop();
    index++;
     
    }
  }

}

function draw() {
 //   background('white');
  for(let x = 0 ;x<index;x++) {
  myDraw[x].compare();
  myDraw[x].rotate();
  }
   
  for(let x = 0 ;x<index;x++) {
    push();
    translate(myDraw[x].trans_x,myDraw[x].trans_y);  
    scale(1);
    myDraw[x].display();
    pop();
  }
}





class MimiDraw {
  constructor(index,arr_x,arr_y,size,rotation,weight,color=[],trans_x,trans_y,offset,angle,sync,synced_index=[]){
    this.index = index;
    this.arr_x=arr_x;
    this.arr_y=arr_y;
    this.size = size;
    this.rotation = rotation ;
    this.weight = weight;
    this.color = color ;
    this.trans_x=trans_x;
    this.trans_y=trans_y;
    this.offset=offset;
    this.angle=angle;
    this.sync=sync;
    this.synced_index=synced_index;
   
  }
  display(){
    drawCircle(myDraw[this.index]);
    
  
  }

    rotate(){
      this.rotation = map(sin(this.angle), -1, 1, 0, 360);
      this.angle +=this.offset;
    }

    compare() {
   
     let compare = ComparableMonsters(this.index);

     for(let x = 0 ; x<compare.length;x++) {
      if(CompareArray(this.synced_index,myDraw[compare[x]].synced_index)==false) {
      let compared = Math.abs(floor(myDraw[compare[x]].rotation));
      let curRotation = Math.abs(floor(this.rotation));
 
       if(curRotation==0||curRotation==90||curRotation==180||curRotation==360){
       if(curRotation==compared){
      
         console.log(this.index+' '+compare[x]);
         MonstersMatched(myDraw[this.index],myDraw[compare[x]]);
         break;
       }
      }
    }
  }
       
     
       
      }
     


     
     

     




    }




function MonstersMatched(first,second){

  first.sync=true;
  second.sync=true;
  all=[...new Set(first.synced_index.concat(second.synced_index))];

  for (let x=0;x<all.length;x++){
    myDraw[all[x]].synced_index=all;
  }
  let avgWeight=0;
  let avgOffset=0;
  let avgAngle=0;
  let avgColorR=0;
  let avgColorG=0;
  let avgColorB=0;

  for(let i =0 ;i<all.length;i++ ){
     avgWeight += myDraw[all[i]].weight;
     avgOffset += Math.abs(myDraw[all[i]].offset);
     avgAngle  += Math.abs(myDraw[all[i]].angle);
     avgColorR += myDraw[all[i]].color[0]*myDraw[all[i]].color[0];
     avgColorG += myDraw[all[i]].color[1]*myDraw[all[i]].color[1];
     avgColorB += myDraw[all[i]].color[2]*myDraw[all[i]].color[2];

  }
  let random_color = getRandomColor();
  let bool = Math.random() < 0.5;
  let offset_direction = 0;
  if (bool===true){
    offset_direction=1;
  }
  else {
    offset_direction = -1
  }
  for(let i =0 ;i<all.length;i++ ){
    myDraw[all[i]].weight=avgWeight/all.length;
    myDraw[all[i]].offset=(avgOffset/all.length)*offset_direction;
    myDraw[all[i]].angle=avgAngle/all.length;
    myDraw[all[i]].color[0]= Math.round(sqrt(avgColorR/all.length));
    myDraw[all[i]].color[1]= Math.round(sqrt(avgColorG/all.length));
    myDraw[all[i]].color[2]= Math.round(sqrt(avgColorB/all.length));
 }
}
 



function ComparableMonsters (index){
  var arr   = [];
  var statusX = 0;
  var statusY = 0;
  var left  = index -1 ;
  var right = index +1 ;
  var up    = index - noi_width;
  var down  = index + noi_width;
  if ( index %noi_width==0) {
    var statusX = 1;
  }
  else if ((index+1)%noi_width==0){
    var statusX = 2;
  }

  if(index>=0&&index<noi_width){
    var statusY=1;
  }
  else if (index>=noi_width*(noi_height-1)&&index<noi_width*noi_height){
    var statusY=2;
  }

  if(statusX==0&&statusY==0) {
    arr.push(left);
    arr.push(right);
    arr.push(up);
    arr.push(down);

  }
  else if (statusX==1&&statusY==0){
    arr.push(right);
    arr.push(up);
    arr.push(down);
  }
  else if (statusX==2&&statusY==0){
    arr.push(left);
    arr.push(up);
    arr.push(down);
  }
  else if (statusX==0&&statusY==1){
    arr.push(left);
    arr.push(right);
    arr.push(down);
  }
  else if (statusX==0&&statusY==2){
    arr.push(left);
    arr.push(right);
    arr.push(up);
   
  }  
  else if (statusX==1&&statusY==1){
   
    arr.push(right);
    arr.push(down);
   
  }
  else if (statusX==1&&statusY==2){
   
    arr.push(right);
    arr.push(up);
   
  }    
  else if (statusX==2&&statusY==1){
   
    arr.push(left);
    arr.push(down);
   
  }
  else if (statusX==2&&statusY==2){
   
    arr.push(left);
    arr.push(up);
   
  }
  return arr ;


 

}

function drawSomething(current) {
  var x = 0-current.size/2;
  var y = 0-current.size/2;
  beginShape();
  rotate(radians(current.rotation));
  stroke('white');
  rect(x,y,x+current.size,y);
  endShape();
  
}




function drawCircle(current){
  let clr = 'rgb(' + current.color[0] + ',' + current.color[1] + ',' + current.color[2]  + ')';
   
  push();
  fill(color(clr));
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 2;
  drawingContext.shadowColor = color(clr);
  var x = 0-current.size/3;
  var y = 0-current.size/3;
  
  rotate(radians(current.rotation));
  circle(-x,-y,current.size/3);
  pop();

 
  
}

function drawSquareMimi(current){
    var x = 0-current.size/2;
    var y = 0-current.size/2;
   
    let clr = 'rgb(' + current.color[0] + ',' + current.color[1] + ',' + current.color[2]  + ')';
    strokeWeight(current.weight);
    strokeCap(ROUND);
    stroke (color(clr));
    rotate(radians(current.rotation));


    beginShape();
    var currentSize = current.size ;
    line(x,y,x+currentSize,y);
    line(x+currentSize,y,x+currentSize,y+currentSize);
    line(x+currentSize,y+currentSize,x,y+currentSize);
    let current_x  = x ;
    let current_y  = y+currentSize;
    let status = 0 ;
 
    let multiplier = 7  ;
    currentSize = currentSize * (multiplier/10);
   
    for (let a = 0 ; a <10   ; a ++) {
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


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  function CompareArray(first=[],second=[]){
    let x = first.every(elem => second.includes(elem));
    return x ;
  }

  function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    var x = o(r()*s) ;
    var g = o(r()*s) ;
    var b = o(r()*s) ;
    var a = r().toFixed(1);
    return [x,g,b,a];
}



function drawSquare(x,size,rt){
  push();
  rotate(radians(rt));
  square(x,x,size);
  pop()
}

function drawStar(x, y, radius1, radius2, npoints,rt) {
  push();
  rotate(radians(rt));
   let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}




function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


function drawEdge(startPointX,startPointY,numTriangle) {
  beginShape();
  let x = startPointX;
  let y = startPointY;
  vertex(x,y);
  
  for (let a = 0 ; a<numTriangle; a++) {
    vertex(x+20,y-20);
    vertex(x+20,y-1);
    
    
    x= x+20;
    }
    endShape();
 
}



function drawTest(startPointX,startPointY,numTriangle) {
  beginShape();
  let x = startPointX;
  let y = startPointY;
  vertex(x,y);
  
  for (let a = 0 ; a<numTriangle*2; a++) {
    vertex(x+(a+1)*28.284,y-28.284*(1-a%2));
    }

    endShape();
 
}
