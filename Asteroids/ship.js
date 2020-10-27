function Ship() {
  this.pos = createVector(screenWidth/2, screenHeight/2);
  this.r = 15;
  this.headingR = 0;

  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.headingR + PI/2);
    fill(0);
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  }

  this.turn = function(angle) {
    this.headingR += angle;
  }

  this.movement = function() {
    this.pos.add(this.vel);
    this.vel.mult(0.95);
  }

  this.boost = function() {
    let force = p5.Vector.fromAngle(this.headingR);
    force.mult(0.8)
    this.vel.add(force);
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

  this.hits = function(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    }
    else {
      return false;
    }
  }

}


function turn(angle) {
  if (keyIsPressed) {
    if (keyIsDown(65)) {
      ship.turn(-angle);
    }
    if (keyIsDown(68)) {
      ship.turn(angle);
    }
  }
}
