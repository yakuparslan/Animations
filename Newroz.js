let objs = [];
let colors = ['#F6416C', '#FFDE7D','#00B8A9'];
let noiseFilter;

function setup() {
	createCanvas(1280, 720);
	rectMode(CENTER);
	let off = min(width, height) * 0.05;
	objs.push(new Objct(width / 2, height / 2, 300));

	noiseFilter = createImage(width, height);
	noiseFilter.loadPixels();
	let pix = noiseFilter.width * noiseFilter.height * 4;
	for (let i = 0; i < pix; i += 4) {
		noiseFilter.pixels[i] = random(255);
		noiseFilter.pixels[i + 1] = random(255);
		noiseFilter.pixels[i + 2] = random(255);
		noiseFilter.pixels[i + 3] = 20;
	}
	noiseFilter.updatePixels();
}

function draw() {
  grid();
	background('#f0e9df');
	for (let i of objs) {
		i.show();
		i.move();
	}
	image(noiseFilter, 0, 0);
}

function easeOutCirc(x) {
	return sqrt(1 - Math.pow(x - 1, 2));
}

class Objct {
	constructor(x, y, d) {
		this.x = x;
		this.y = y;
		this.d = d;
		this.n = 5;
		this.sw = d / this.n;
		this.te = 400;
		this.t = 0;
		this.circles = [];
		this.cols = [];
		shuffle(colors, true);
		for (let i = 0; i < this.n; i++) {
			this.cols.push(colors[i % colors.length]);
			this.circles.push(new Circle(0, 0, this.d * 1.1, -((this.te / this.n) * i) + this.te, this.te, this.cols[i]));
		}
		this.count = 0;
	}

	show() {
		push();
		translate(this.x, this.y);
		strokeWeight(0);
		stroke(0);
		noFill();
		circle(0, 0, this.d);
		drawingContext.clip();
		for (let i = 0; i < this.circles.length; i++) {
			let r = this.circles[i];
			r.show();
			r.move();

		}
		for (let i = 0; i < this.circles.length; i++) {
			let r = this.circles[i];

			if (r.isDead) {
				this.count++;
				this.circles.splice(i, 1);
				this.circles.push(new Circle(0, 0, this.d*1.1, 0, this.te, this.cols[this.count % this.cols.length]));
			}
		}
		pop();

	}
	move() {
		this.t++;
	}
}

class Circle {
	constructor(x, y, d, t0, t1, col) {
		this.x = x;
		this.y = y;
		this.d = 0;
		this.d1 = d;
		this.t = t0;
		this.t1 = t1;
		this.isDead = false;
		this.col = col;
	}

	show() {
		noStroke();
		fill(this.col);
		circle(this.x, this.y, this.d);
	}

	move() {
		if (0 < this.t && this.t < this.t1) {
			let n = norm(this.t, 0, this.t1 - 1);
			this.d = lerp(0, this.d1, easeOutCirc(n));
		}
		if (this.t > this.t1) {
			this.isDead = true;
		}

		this.t++;
	}
}



function grid() {
	let c = 40;
	let w = width / c;
	noStroke();
	fill(0);
	for (let i = 0; i < c; i++) {
		for (let j = 0; j < c; j++) {
			let x = i * w + w / 2;
			let y = j * w + w / 2;
			rect(x, y, w * 0.1);
		}
	}
}
