function Asteroid(pos, r) {
  if (pos) {
    this.pos = pos.copy();
  }
  else {
    this.pos = createVector(random(screenWidth), random(screenHeight));
  }

  if (r) {
    this.r = r * 0.5;
  }
  else {
    this.r = random(10, 45);
  }

  this.totalVertex = floor(random(5, 14));
  this.offset = [];

  this.vel = p5.Vector.random2D();

  for (let i = 0; i < this.totalVertex; i++) {
    this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
  }

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);
    //ellipse(0, 0, this.r * 2);
    beginShape();
    for (let i = 0; i < this.totalVertex; i++) {
      let angle = map(i, 0, this.totalVertex, 0, TWO_PI);
      let r = this.r + this.offset[i];
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  this.movement = function() {
    this.pos.add(this.vel);
  }

  this.edges = function() {
    if (this.pos.x > screenWidth + this.r) {
      this.pos.x = -this.r;
    }
    else if (this.pos.x < -this.r) {
      this.pos.x = screenWidth + this.r;
    }
    if (this.pos.y > screenHeight + this.r) {
      this.pos.y = -this.r;
    }
    else if (this.pos.y < -this.r) {
      this.pos.y = screenHeight + this.r;
    }
  }

  this.breakup = function() {
    let newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }
}
