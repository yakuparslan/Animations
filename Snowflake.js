
let snowflakes = []; // array to hold snowflake objects
let heightGround = 300;
let meltingTime = 20;
function setup() {
  createCanvas(1024, 1280);
  fill(240);
  noStroke();
}

function draw() {
  background('#374045');
  push();
  fill('#1B2430');
  rect(0,height-heightGround,width,heightGround);
  pop();
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(3); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
    flake.delete(t);
  }
}
//rgb(245, 247, 248)

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(1, 5);
  this.stopPos = random(heightGround);
  this.stoppedTime = 0;
  this.stop = false;
  this.red = parseInt(random(255));
  this.green = parseInt(random(255));
  this.blue = parseInt(random(255));
  //this.color = 'rgba('+this.red+','+this.green+','+ this.blue+','+1+")"; 
  this.color = 'rgba(245, 247, 248,'+1+")" 
   console.log(this.color);
  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    if(this.stop==false){
    // x position follows a circle
    let w = 0.01; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size/3, 0.5);
    }
    // delete snowflake if past end of screen
    if (this.posY > height-this.stopPos&&this.stop==false) {
      let index = snowflakes.indexOf(this);
      this.stop=true;
      this.stoppedTime=time;
    }
  };
  this.delete = function(time) {
    if(this.stop==true){
    let durationOfStop = time - this.stoppedTime;
    let untilStop = meltingTime - durationOfStop;
    if(durationOfStop>meltingTime&&this.stoppedTime!=0){
   
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
    else{
      let snowFlakeMelt = map(untilStop, 20, 0, 1.0, 0.01);
      this.color = 'rgba(245, 247, 248,'+snowFlakeMelt+")" 

    }
  }
  };

  this.display = function() {
    fill(this.color);
    ellipse(this.posX, this.posY, this.size);
  };
}
