let width = 1000;
let height = 1000;
let stop=true;
let random_array=[];
let framee = 0;
let spectrum;
let randomStrokeWeight=1;
let gradientArray;
let hex_color='#6D9886';
let scale = 1;

let rows = 10;
let columns = 1024;
let array = Array(rows).fill().map(() => Array(columns).fill(0));
let drawArray=Array(rows).fill().map(() => Array(columns).fill(0));
let index = 0;
let backgroundColor = '#2D4059';
// the canvas capturer instance
var capturer = new CCapture({ format: 'gif', workersPath: 'libraries/',framerate:30 });

function preload(){
    sound = loadSound('Cirok.mp3');
  }
  
  function setup(){
   
    for(let i =0;i<1024;i++) {
            random_array.push(i);
    }
    random_array=shuffle(random_array);
    let cnv = createCanvas(width,height);
    background(backgroundColor);
    
    cnv.mouseClicked(togglePlay);
    fft = new p5.FFT(0.9,1024);
    angleMode(DEGREES);
    sound.amp(1);
    sound.play();
   // sound.loop()
   gradientArray = new Gradient().setColorGradient("#FFFFFF", "#000000").getColors();
 //  console.log(gradientArray);
  }
  
  function draw(){
    background(backgroundColor);
    sound.onended(test);
    spectrum = fft.analyze();
      if(Math.max(...spectrum)!=0){
      drawArray.pop();
      drawArray.unshift(spectrum);
      console.log(drawArray); 
      //for(let i=0;i<drawArray.length;i++){
       drawArray[0] = drawArray[0].map(x => x*(0.4)+200);  
       drawArray[5] = drawArray[5].map(x => x*(0.4)+100); 
       drawArray[2] = drawArray[2].map(x => x*(0.4)+300); 
       // drawing(drawArray[2],'rgba(252,248,232,0.60)');
       // drawing(drawArray[1],'rgba(236,179,144,0.40)');
       let fillColor = 'rgba(236,179,144,0.10)';
       drawing(drawArray[0],fillColor); 
      // drawing(drawArray[5],fillColor);
        
        
     // }
       
      
      
    }
   
    framee++;
  
  }

  function drawing(input,circleColor){

    push();
    
    translate(width/2,height/2);
    //fill(circleColor);
    strokeWeight(randomStrokeWeight);
    stroke(hex_color);
    beginShape();
  
    let drawCount=0;
    let firstX=0;
    let firstY=0;
    let vertex_array=[[]];
    for (let i = 0; i< input.length; i++){
      let maxim = Math.max(...input);
      let minim = maxim*0.50;
      let angle = map(i, 0, input.length, 0, 360);
      let x = sin(angle)*input[random_array[i]];
      let y = cos(angle)*input[random_array[i]];   
     
     if(input[random_array[i]]>minim)   {
       if(drawCount===0){
        firstX=x;
        firstY=y;
       }
    
       vertex(x,y);
      // vertex_array.push([x,y]);
       drawCount++;
      }
      
     
      
        
     
    }
    vertex(firstX,firstY);
    vertex_array.push([firstX,firstY]);
    endShape();

    pop();
  
    index++;
  
  }

  
  function togglePlay() {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.play();
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


  function gradient(startColor, endColor, steps) {
    var start = {
            'Hex'   : startColor,
            'R'     : parseInt(startColor.slice(1,3), 16),
            'G'     : parseInt(startColor.slice(3,5), 16),
            'B'     : parseInt(startColor.slice(5,7), 16)
    }
    var end = {
            'Hex'   : endColor,
            'R'     : parseInt(endColor.slice(1,3), 16),
            'G'     : parseInt(endColor.slice(3,5), 16),
            'B'     : parseInt(endColor.slice(5,7), 16)
    }
    diffR = end['R'] - start['R'];
    diffG = end['G'] - start['G'];
    diffB = end['B'] - start['B'];

    stepsHex  = new Array();
    stepsR    = new Array();
    stepsG    = new Array();
    stepsB    = new Array();

    for(var i = 0; i <= steps; i++) {
            stepsR[i] = start['R'] + ((diffR / steps) * i);
            stepsG[i] = start['G'] + ((diffG / steps) * i);
            stepsB[i] = start['B'] + ((diffB / steps) * i);
            stepsHex[i] = '#' + Math.round(stepsR[i]).toString(16) + '' + Math.round(stepsG[i]).toString(16) + '' + Math.round(stepsB[i]).toString(16);
    }
    return stepsHex;

}

function incrementColor(color, step){
  var colorToInt = parseInt(color.substr(1), 16),                     // Convert HEX color to integer
      nstep = parseInt(step);                                         // Convert step to integer
  if(!isNaN(colorToInt) && !isNaN(nstep)){                            // Make sure that color has been converted to integer
      colorToInt += nstep;                                            // Increment integer with step
      var ncolor = colorToInt.toString(16);                           // Convert back integer to HEX
      ncolor = '#' + (new Array(7-ncolor.length).join(0)) + ncolor;   // Left pad "0" to make HEX look like a color
      if(/^#[0-9a-f]{6}$/i.test(ncolor)){                             // Make sure that HEX is a valid color
          return ncolor;
      }
  }
  return color;
};

function test(){
  console.log('finished recording.');
 // capturer.stop();
 // capturer.save();
  return;
}