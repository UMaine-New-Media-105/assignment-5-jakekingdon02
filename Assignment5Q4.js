// Jake Kingdon
// Assignment 5 challange 4
// Due: April 19th, 2023.
// In this sketch, I created a sketch animates my breeders so they will start at a random position and speed at the left edge of the screen, switching 
// direction when they hit a canvas edge. I also detected any collision between two breeders and create a new one at the same location. 

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

// Define the Fish object with constructor(), move()/update() and show() methods
class Fish {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color(random(255), random(255), random(255));
    this.direction = 1;
  }

  display() {
    // Draw the body of the fish
    fill(this.color);
    stroke(0);
    strokeWeight(2);
    ellipse(this.x, this.y, this.size, this.size / 2);

    // Draw the tail of the fish
    let tailWidth = this.size / 2;
    let tailHeight = this.size / 4;
    triangle(
      this.x - this.size / 2,
      this.y,
      this.x - this.size / 2 - tailWidth,
      this.y - tailHeight,
      this.x - this.size / 2 - tailWidth,
      this.y + tailHeight
    );

    // Draw the eye of the fish
    fill(255);
    noStroke();
    ellipse(this.x + this.size / 4, this.y, this.size / 6, this.size / 6);
  }

  move() {
    if (this.x + this.size / 2 >= width || this.x - this.size / 2 <= 0) {
      // check if fish reaches edge of the canvas
      this.direction *= -1; // change direction if it does
    }
    this.x += this.direction * 5; // move the fish based on the direction
  }

  update() {
    this.move();
  }
}

// Define the Breeder object with constructor(), move()/update(), checkCollision() and show() methods
class Breeder {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color(random(255), random(255), random(255));
    this.speed = random(1, 5);
    this.direction = 1;
  }

  display() {
    // Draw the body of the breeder
    fill(this.color);
    stroke(0);
    strokeWeight(2);
    ellipse(this.x, this.y, this.size, this.size);

    // Draw the eyes of the breeder
fill(255);
noStroke();
ellipse(this.x - this.size / 6, this.y - this.size / 6, this.size / 6, this.size / 6);
ellipse(this.x + this.size / 6, this.y - this.size / 6, this.size / 6, this.size / 6);

// Draw the mouth of the breeder
stroke(0);
strokeWeight(1);
noFill();
arc(this.x, this.y + this.size / 6, this.size / 2, this.size / 3, 0, PI);

// Draw the fins of the breeder
fill(this.color);
noStroke();
triangle(
  this.x - this.size / 2,
  this.y,
  this.x - this.size / 2 + this.size / 6,
  this.y - this.size / 6,
  this.x - this.size / 2 + this.size / 6,
  this.y + this.size / 6
);
triangle(
  this.x + this.size / 2,
  this.y,
  this.x + this.size / 2 - this.size / 6,
  this.y - this.size / 6,
  this.x + this.size / 2 - this.size / 6,
  this.y + this.size / 6
);
}

move() {
if (this.x >= width || this.x <= 0) {
this.direction = -this.direction;
}
this.x += this.direction * this.speed;
}

update() {
this.move();
}

checkCollision(other) {
let d = dist(this.x, this.y, other.x, other.y);
if (d < this.size / 2 + other.r) {
return true;
} else {
return false;
}
}
}

// Create an array to hold the bubbles, fishes and breeders
let bubbles = [];
let fishes = [];
let breeders = [];

function setup() {
createCanvas(600, 400);
// Create 10 bubbles and push them into the bubbles array
for (let i = 0; i < 10; i++) {
let x = random(width);
let y = random(height);
let r = random(10, 50);
let b = new Bubble(x, y, r);
bubbles.push(b);
}

// Create 5 fishes and push them into the fishes array
for (let i = 0; i < 5; i++) {
let x = random(width);
let y = random(height);
let size = random(30, 50);
let f = new Fish(x, y, size);
fishes.push(f);
}

// Create 3 breeders and push them into the breeders array
for (let i = 0; i < 3; i++) {
let x = random(width);
let y = random(height);
let size = random(50, 80);
let b = new Breeder(x, y, size);
breeders.push(b);
}
}

function draw() {
background(50, 100, 150);

// Display all the bubbles
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].show();
bubbles[i].update();
}

// Display all the fishes
for (let i = 0; i < fishes.length; i++) {
fishes[i].display();
fishes[i].update();
}
}
