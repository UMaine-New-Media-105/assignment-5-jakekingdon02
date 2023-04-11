// Jake Kingdon
// Assignment 5 challange 2
// Due: April 12th, 2023.
// In this sketch, I created a sketch that adds 50 bubbles that jitter randomly to a canvas of size 960 x 540.

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

// Define the array.
let bubbles = [];

function setup() {
  createCanvas(960, 540);

  // Create 50 new Bubble with random positions and add them to the bubbles array.
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 50);
    bubbles.push(new Bubble(x, y, r));
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
}
