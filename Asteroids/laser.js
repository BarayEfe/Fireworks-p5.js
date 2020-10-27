function Laser(shipPos, angle) {
  this.pos = createVector(shipPos.x, shipPos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(17);

  this.movement = function() {
    this.pos.add(this.vel);
  }

  this.render = function() {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }

  this.hits = function(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r * 2) {
      return true;
    } else {
      return false;
    }
  }

}
