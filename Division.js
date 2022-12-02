  let width = 1000;
  let height = 1000;
  let count = 0 ; 
  let stop = false; 
  let y = 0 ; 
  let fr = 12; //starting FPS
  let size_x = 500;
  let size_y = 500;
  let random_angle;
  let img;

  function preload() {
    img = loadImage('Picture2.png');
  }

  function setup() {
  // rectMode(CENTER);
    createCanvas(width, height);
    frameRate(fr); 
    image(img, 0, 0);
    random_angle = random(0,360); 
    
  }

  function draw() {
    image(img, 0, 0);
    rectMode(CORNERS);

    if(stop==true) {
    
    if(random_angle>0&&random_angle<=90&&(size_x<=0||size_x>=1000||size_y<=0||size_y>=1000)){
      random_angle = random(180,360);
    }  
    else if (random_angle>90&&random_angle<=180&&(size_x<=0||size_x>=1000||size_y<=0||size_y>=1000)){
      random_angle = random(180,360);
    }
    else if (random_angle>180&&random_angle<=270&&(size_x<=0||size_x>=1000||size_y<=0||size_y>=1000)){
      random_angle = random(0,180);
    }
    else if (random_angle>270&&random_angle<=360&&(size_x<=0||size_x>=1000||size_y<=0||size_y>=1000)){
      random_angle = random(0,180);
    }

    let myDegrees = map(mouseX, 0, width, 0, 360);
    let v = p5.Vector.fromAngle(radians(random_angle), 10);
    let vx = v.x;
    let vy = v.y;

    size_x = size_x +vx;
    size_y = size_y +vy;
    fill(240, 19, 77,100);
    rect(0,0,size_x,size_y);
    fill(245, 240, 227,100);
    rect(0,1000,size_x,size_y);
    fill(64, 191, 193,100);
    rect(1000,0,size_x,size_y);
    fill(0, 18, 83,100);
    rect(1000,1000,size_x,size_y);
    console.log(size_x+' '+size_y+' '+ random_angle)
  }



  }
    


  





  function mouseClicked() {
    if(stop==true){stop = false;}
    else{stop = true};
  }

