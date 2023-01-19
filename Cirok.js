let width = 1280;
let height = 720;
let stop=true;
let random_array=[];
let framee = 0;
function preload(){
    sound = loadSound('Cirok.mp3');
  }
  
  function setup(){
    for(let i =0;i<1024;i++) {
            random_array.push(i);
    }
    random_array=shuffle(random_array);
    let cnv = createCanvas(width,height);
    background('#A0C3D2');
    colorMode(HSB);
    cnv.mouseClicked(togglePlay);
    fft = new p5.FFT(0.9,1024);
    angleMode(DEGREES);
    sound.amp(1);
   // sound.loop()
   
  }
  
  function draw(){
   if ( stop == false) {  
    //background('white');
    let spectrum = fft.analyze();
   
   
    let colorthing = 'rgba(0,255,0,'+random(0,1) +')';
    translate(width/2,height/2);
    fill('#F7F5EB');
    stroke('#EAC7C7');
    beginShape();
  
    let drawCount=0;
    let firstX=0;
    let firstY=0;
    let vertex_array=[[]];
    for (let i = 0; i< spectrum.length; i++){
      let maxim = Math.max(...spectrum);
      let minim = maxim*0.50;
      let angle = map(i, 0, spectrum.length, 0, 360);
      let x = sin(angle)*spectrum[random_array[i]];
      let y = cos(angle)*spectrum[random_array[i]];   
     
     if(spectrum[random_array[i]]>minim)   {
       if(drawCount===0){
        firstX=x;
        firstY=y;
       }
       //console.log(framee+' '+x+' '+y+" "+firstX+' '+firstY);
       vertex(x,y);
       vertex_array.push([x,y]);
       drawCount++;
      }
      
     
      
        
     
    }
    vertex(firstX,firstY);
    vertex_array.push([firstX,firstY]);
    console.log(vertex_array);
    endShape();

   }
   framee++;
 /*

noStroke();
fill(255, 0, 255);
for (let i = 0; i< spectrum.length; i++){
  let x = map(i, 0, spectrum.length, 0, width);
  let h = -height + map(spectrum[random_array[i]], 0, 255, height, 0);
  rect(x, height, width / spectrum.length, h )
}







}
   /*
    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(20);
    for (let i = 0; i < waveform.length; i++){
      let x = map(i, 0, waveform.length, 0, width);
      let y = map( waveform[i], -1, 1, 0, height);
      vertex(x,y);
    }
    endShape();
  
    text('tap to play', 20, 20);
      */

  }

  
  function togglePlay() {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.loop();
    }
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

function mouseClicked() {
    if(stop==true){stop = false;}
    else{stop = true};
  }
