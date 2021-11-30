let width = 800;
let height = 800;
let count = 0 ; 
let stop = true; 
let y = 0 ; 
let begin  = 60 ;
function setup() {

  createCanvas(width, height);
  let ms = millis();
  
  background(255);
}

function draw() {
  


 
  for(let x = 0 ; x<39 ; x++) {
     stroke('#2F86A6');    
     line(10,x*20+20,780,x*20+20);
     line(10,x*20+20,780,x*20+20);
   
  }

  stroke('#FF0000');
  line (50,0,50,800);
  
  push();
  stroke('black');
  /*
 if (count != 0 && count%40==0)  {
   y++;
   count = 0;
   strokeWeight(random(1.1,2.1)); 
 }
 */
y=0;



    if(count%2==0) {
      line(begin+y*10,count*20+begin,begin+y*10,count*20+40);
      line(begin+10+y*10,count*20+begin,begin+10+y*10,count*20+40);
      line(begin+20+y*10,count*20+begin,begin+20+y*10,count*20+40);
    }
    else {
      line(begin+y*10,count*20+begin,begin+10+y*10,count*20+40);
    //  line(begin+10+y*10,count*20+begin,begin  +y*10,count*20+40);
    }
   
    pop();
  


   




  count++;
}
