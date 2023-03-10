let jumper;
let myDraw=[];
let backgroundColor = '#CBE4DE';
let frequency = 1024;
function preload(){
    sound = loadSound('Cirok.mp3');
  }
function setup() {
	createCanvas(1024, 1024 );

   // myDraw[0] = new Jumper(512,'black');
    
    fft = new p5.FFT(0.9,frequency);
   // angleMode(DEGREES);
    sound.amp(1);   
    sound.play();
    background(backgroundColor);
   //rectMode(CENTER);
    
    
}

function draw() {
    background(backgroundColor);
    spectrum = fft.analyze();
    noFill();
    beginShape();
    for(let x = 0; x<spectrum.length;x++){
        vertex(x,map(spectrum[x], 0, 255, height-200, 0));
    
    }
    
        endShape();
    
   // myDraw[0].run();
    vel = -10;
  //  if (myDraw[0].canJump()){
 //       myDraw[0].vel.y = vel;
//}

	
}

function back(input){
 

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