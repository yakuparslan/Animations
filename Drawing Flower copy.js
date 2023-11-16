let myDraw=[];
let backgroundColor = 'rgba(247, 192, 74,0.6    )';
let backloop = 'rgba(247,247,247,0.01)';
let direction = 'RIGHT';
let size = 50;
let gap = 5;
var angle=0.00;
var lfo;
let offset = 270;
let width = 1280;
let height = 720;
let x = size/2+gap;
let y = size/2+gap;
let edge = size/2+gap;
let end_point_x = width-edge;
let end_point_y = height-edge; 

let frameC = 0;
let turns = 0 ; 
function setup() {
	createCanvas(width, height);
    rectMode(CENTER);
    background (backgroundColor);
    
    
}

function draw() {
    background (backgroundColor);

    if(stop===true) {
    if(direction=='RIGHT'){
        x = map(sin(offset*Math.PI / 180), -1, 1, edge+(turns-1)*(gap+size), end_point_x-turns*(gap+size));
        if((offset-270)%180==0&&frameC!=0){
            direction='DOWN';
            
        }
    }
    else if(direction=='DOWN'){
        y = map(sin(offset*Math.PI / 180), 1, -1, edge+turns*(gap+size), end_point_y-turns*(gap+size));
        if((offset-270)%180==0){
            direction='LEFT';
            
        }
    }
    else if(direction=='LEFT'){
        x = map(sin(offset*Math.PI / 180), -1, 1, end_point_x-turns*(gap+size), edge+turns*(gap+size));
        if((offset-270)%180==0){
            direction='UP';
            turns +=1;

            
        }       
    }
    else if(direction=='UP'){
        y = map(sin(offset*Math.PI / 180), 1, -1, end_point_y-(turns-1)*(gap+size),edge+turns*(gap+size));
        if((offset-270)%180==0){
            direction='RIGHT';
            
        }
    }

        fill('rgb(83, 145, 101)');
        stroke('rgba(152, 223, 214,1)');
        circle(x,y,size);
        
        fill(' ');
        stroke('rgba(63, 73, 127,   1)');
        circle( width-x,height-y,size);
        
        console.log(offset+ ' '+sin(offset*Math.PI / 180));
        offset+=1;
        frameC++;

    }

    

 


    }



    /*  arrived = Math.abs(Math.abs(x)-Math.abs(end_point_x));
    //  console.log(arrived+' '+prev_arrived);
        if (arrived >prev_arrived){
           direction= (direction+1)%3;

        }
        else {
            prev_arrived = arrived;     
        }

       */


function mouseClicked() {
    if(stop==true){stop = false;}
    else{stop = true};
  }
  