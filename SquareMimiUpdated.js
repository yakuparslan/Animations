let width = 1000;
let height = 1000;
let rotation_margin_fast = 1.9;
let rotation_margin_slow = rotation_margin_fast * 0.8;
let count = 0 ;
let stop = true;
let y = 0 ;
var sW = [];
var sC = [];
let size= 150  ;
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
  background('#2B3A55');

  noi_width = floor((width*factor-size)/(size*factor+size));
  noi_height = floor((height*factor-size)/(size*factor+size));
 
  posX = margin+size/2;
  posY = margin + size/2;

 
 

  for (let y= 0 ; y<noi_height;y++) {
    for ( let x = 0 ; x <noi_width; x ++) {
      var bool = Math.random() < 0.5;
      offset = random(-0.10,0.10);  
      //scale(sC[x*noi+y]);
     
     //
     // rotate(radians(random(-5,5)));
     // strokeWeight(sW[x*noi+y]);
     // stroke ('#FFC286');
     // drawSquareMimi(0,0,size);
     var trans_x = posX+(margin+size)*x;
     var trans_y = posY+(margin+size)*y;
   
      push();
      myDraw[index] = new MimiDraw(index,x,y,size,random(0,360),random(0.1,3.9),'#FFC286',bool,trans_x,trans_y,offset,offset,sync,[index]);
      translate(trans_x,trans_y);
      myDraw[index].display();
      pop();
      index++;
     
    }
  }

  console.log('tamam');
}

function draw() {
  background('#2B3A55');
  for(let x = 0 ;x<index;x++) {
 
  push();
  translate(myDraw[x].trans_x,myDraw[x].trans_y);  
  myDraw[x].rotate();
  //scale(scale_x);
  myDraw[x].display();
  myDraw[x].compare();
  pop();

    scale_x=scale_x - 0.0001;
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

    rotate(){

   
      /*if(this.side){

        this.rotation = random(this.rotation-rotation_margin_fast,this.rotation+rotation_margin_slow);
      }

        else
      {
      this.rotation = random(this.rotation+rotation_margin_fast,this.rotation-rotation_margin_slow);
      }*/

     
      this.rotation = map(sin(this.angle), -1, 1, 0, 360);
      this.angle +=this.offset;
    //  console.log(this.offset+ '  '+ this.rotation);
   
   
    }

    compare() {
   
     let compare = ComparableMonsters(this.index);
    // if(myDraw[this.index].sync==false){
     for(let x = 0 ; x<compare.length;x++) {
      let compared = Math.abs(floor(myDraw[compare[x]].rotation));
      let curRotation = Math.abs(floor(this.rotation));
      //console.log(curRotation+' '+compared);
       if(curRotation==0||curRotation==90||curRotation==180||curRotation==360){
       if(curRotation==compared){
       console.log(curRotation+' '+compared);
         console.log('equal');
         MonstersMatched(myDraw[this.index],myDraw[compare[x]]);
         break;
       }
      }
    }
       
     
       
      }
     


     
     

     




    }


//}

function MonstersMatched(first,second){
 // if(first.sync==false) {
  first.sync=true;
  second.sync=true;
 
  first.synced_index=[...new Set(first.synced_index.concat(second.synced_index))];
  second.synced_index=[...new Set(second.synced_index.concat(first.synced_index))];
  let avgWeight=0;
  let avgOffset=0;
  let avgAngle=0;

  for(let i =0 ;i<second.synced_index.length;i++ ){
     avgWeight += myDraw[second.synced_index[i]].weight;
     avgOffset += myDraw[second.synced_index[i]].offset;
     avgAngle  += myDraw[second.synced_index[i]].angle;

  }
  let random_color = getRandomColor();
  for(let i =0 ;i<second.synced_index.length;i++ ){
    myDraw[second.synced_index[i]].weight=avgWeight/second.synced_index.length;
    myDraw[second.synced_index[i]].offset=avgOffset/second.synced_index.length;
    myDraw[second.synced_index[i]].angle=avgAngle/second.synced_index.length;
    myDraw[second.synced_index[i]].color= random_color;

 }
}
 

//}

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




function drawSquareMimi(x,y,size){
 
  var x = x-size/2;
  var y = y-size/2;

  beginShape();
 
  line(x,y,x+size,y);
  line(x+size,y,x+size,y+size);
  line(x+size,y+size,x,y+size);
  let current_x  = x ;
  let current_y  = y+size;
  let status = 0 ;
  //size = size - size/5;
  let multiplier = 7  ;
  size = size * (multiplier/10);
 
  for (let a = 0 ; a <6 ; a ++) {
    if(status==0) {
    line(current_x,current_y,current_x,current_y-size);
    line(current_x,current_y-size,current_x+size,current_y-size);
    current_x = current_x+size ;
    current_y = current_y-size;
    //size = size - (size/(4-a));
    size = size * (multiplier/10);
   
    status =1 ;
  }
  if (status==1)
  {
    line(current_x,current_y,current_x,current_y+size);
    line(current_x,current_y+size,current_x-size,current_y+size);
    current_x = current_x-size;
    current_y = current_y+size;
    //size = size - (size/(4-a));;
    size = size * (multiplier/10);
   
    status=0;
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
  