class Jumper {
    constructor(position,color) {
      this.pos = createVector(position, 512);
      this.vel = createVector();
      this.grav = 0.1;
      this.size=120 ;
      this.color = color;
      this.rotate = 0.1;
    }
  
  update() {
      this.vel.y += this.grav; // vy = vy + gravity;
      this.pos.y += this.vel.y; // y = y + vy;
      this.pos.y = constrain(this.pos.y, 0, height);
      this.rotate = this.rotate + this.rotate;
      return this;
    }
  
    display() {
     fill(this.color);
      stroke(this.color);
     // rotate(this.rotate);
     // polygon(this.pos.x, this.pos.y, this.size, 7);
      ellipse(this.pos.x, this.pos.y, this.size,this.size);
      return this;
    }
  
    canJump() {
      return(this.pos.y >= height - this.size/2)
    }
  
    run() {
      return this.update().display();
    }
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