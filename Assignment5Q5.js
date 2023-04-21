// Jake Kingdon
// Assignment 5 challange 5
// Due: April 24th, 2023.
// In this sketch, I created a sketch that animates my catchers so they will start at a random position and speed at the right edge of the screen, 
// switching direction when they hit a canvas edge. I also detected any collision between a catcher and a breeder, and remove the breeder from the simulation.


// Define the Bubble object with constructor(), move()/update() and show() methods
class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }
  
  update() {
    this.move();
  }

  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
}

// Define the YellowStar object with constructor(), move()/update() and show() methods
class YellowStar {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.direction = 1;
  }

  move() {
    if (this.x >= width || this.x <= 0) {
      this.direction = -this.direction;
    }
    this.x += this.direction * 2;
  }

  update() {
    this.move();
  }

  show() {
    stroke(255, 255, 0);
    strokeWeight(1);
    fill(255, 255, 0);
    star(this.x, this.y, this.r, this.r * 4, 5);
  }
}

// Define the Fish object with constructor(), move()/update() and show() methods
class Fish {
  constructor(y, size) {
    this.x = width;
    this.y = y;
    this.size = size;
    this.color = color(random(255), random(255), random(255));
    this.direction = -1;
  }

  display() {
    fill(this.color);
    stroke(0);
    strokeWeight(2);
    ellipse(this.x, this.y, this.size, this.size / 2);

    let tailWidth = this.size / 2;
    let tailHeight = this.size / 4;
    triangle(
      this.x + this.size / 2,
      this.y,
      this.x + this.size / 2 + tailWidth,
      this.y - tailHeight,
      this.x + this.size / 2 + tailWidth,
      this.y + tailHeight
    );

    fill(255);
    noStroke();
    ellipse(this.x - this.size / 4, this.y, this.size / 6, this.size / 6);
  }

  move() {
  if (this.x >= width + this.size) {
    this.direction = -1;
    this.x = width + this.size;
  } else if (this.x <= 0) { // check if fish reaches left edge of the canvas
    this.direction = 1; // change direction if it does
    this.x = 0; // reset the x position
  }
  this.x += this.direction * 10;
}

  update() {
   this.move();
 }
}
// Define the array.
let bubbles = [];
let stars = [];
let fishes = [];

function setup() {
  createCanvas(960, 540);

  // Create 50 new Bubble with random positions and add them to the bubbles array.
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 50);
    bubbles.push(new Bubble(x, y, r));
  }

  // Create 10 new YellowStar with random positions and add them to the stars array.
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(0, height - 100);
    let r = random(10, 20);
    stars.push(new YellowStar(x, y, r));
  }

  // Create 50 new Fish with random positions and scaled size, and add them to the fishes array.
for (let i = 0; i < 50; i++) {
let x = random(width);
let y = random(height -400, height - 20);
let size = random(1, 1);
fishes.push(new Fish(x, y, size));
}
}


// Create background detail.
function draw() {
  background("blue");
  noStroke();
  fill("tan");
  rect(0, 440, 700);

  // Update and show bubbles in the array.
  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    bubble.update();
    bubble.show();
  }

  // Update and show YellowStars in the array.
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    star.update();
    star.show();
  }

  // Update and show Fish in the array.
  for (let i = 0; i < fishes.length; i++) {
    let fish = fishes[i];
    fish.update();
    fish.display();
  }
}

// Define the star function to draw the YellowStar
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
