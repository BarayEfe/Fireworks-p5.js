var relativeBigness = 2;
var mutationChance = 0.4;
var reverseChance = 0.05;
var simulationSpeed = 1;
var distanceToBoundary = 0;

function Vehicle(x, y, parentDNA) {
  var mapCenter = createVector(width/2, height/2);

  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, -2);
  this.position = createVector(x, y);
  this.r = 6 / relativeBigness;
  this.maxSpeed = 10 / relativeBigness * simulationSpeed;
  this.maxForce = 0.2 / relativeBigness * simulationSpeed;
  this.mutationMult = 1;
  this.reverse = 1;

  this.health = 1;

  this.dna = [];
  if (parentDNA == null) {
    //Food and poison attraction
    this.dna[0] = random(-5, 5) / relativeBigness;
    this.dna[1] = random(-5, 5) / relativeBigness;

    //Sight lenght for food and poison
    this.dna[2] = random(10, 300) / relativeBigness;
    this.dna[3] = random(10, 300) / relativeBigness;
  }
  else {
    if (random(0, 1) < reverseChance) {
      this.reverse = -1;
    }
    if (random(0, 1) < mutationChance) {
      //Food and poison attraction
      this.dna[0] = random(-5, 5) / relativeBigness;
      this.dna[1] = random(-5, 5) / relativeBigness;

      //Sight lenght for food and poison
      this.dna[2] = random(10, 300) / relativeBigness;
      this.dna[3] = random(10, 300) / relativeBigness;

      print("Mutation!");
    }
    else {
      this.dna[0] = parentDNA[0] + random(-0.3, 0.3) * this.mutationMult;
      this.dna[1] = parentDNA[1] + random(-0.3, 0.3) * this.mutationMult;
      this.dna[2] = parentDNA[2] + random(-5, 5) * this.mutationMult;
      this.dna[3] = parentDNA[3] + random(-5, 5) * this.mutationMult;
    }

    this.dna[random(0, 1)] *= this.reverse;
  }

  this.update = function() {
    this.health -= 0.003;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.behaviors = function(good, bad) {
    var steerG = this.eat(good, 0.1, this.dna[2]);
    var steerB = this.eat(bad, -0.75, this.dna[3]);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  this.eat = function(list, healthImpact, sightLenght) {
    var record = sightLenght;
    var closestIndex = -1;
    for (var i = 0; i < list.length; i++) {
      var d = this.position.dist(list[i]);
      if (d < record) {
        record = d;
        closestIndex = i;
      }
    }

    //The moment of eating
    if (record < 8 / relativeBigness) {
      list.splice(closestIndex, 1);
      this.health += healthImpact;
    }
    else if (closestIndex > -1) {
      return this.seek(list[closestIndex]);
    }

    return createVector(0, 0);
  }

  this.seek = function(target) {
    var desired = p5.Vector.sub(target, this.position);

    desired.setMag(this.maxSpeed);

    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;
    //this.applyForce(steer);
  }

  this.dead = function() {
    return (this.health < 0);
  }

  this.boundaries = function() {
    if (this.position.x < distanceToBoundary) {
      //this.position.x = distanceToBoundary;
      this.velocity.mult(-1.2);
      //this.applyForce(mapCenter.sub(this.position).mult(100 / relativeBigness));
    }
    else if (this.position.x > width - distanceToBoundary) {
      //this.position.x = width - distanceToBoundary;
      this.velocity.mult(-1.2);
      //this.applyForce(mapCenter.sub(this.position).mult(100 / relativeBigness));
    }

    if (this.position.y < distanceToBoundary) {
      //this.position.y = distanceToBoundary;
      this.velocity.mult(-1.2);
      //this.applyForce(mapCenter.sub(this.position).mult(100 / relativeBigness));
    }
    else if (this.position.y > height - distanceToBoundary) {
      //this.position.y = height - distanceToBoundary;
      this.velocity.mult(-1.2);
      //this.applyForce(mapCenter.sub(this.position).mult(100 / relativeBigness));
    }

    if (this.position.x == 0 && this.position.y == 0) {
      this.position = mapCenter;
    }
  }

  this.display = function() {
    var theta = this.velocity.heading() + PI;

    var gr = color(0, 255, 0);
    var rd = color(255, 0, 0);
    var col = lerpColor(rd, gr, this.health);

    if (debug.checked()) {
      strokeWeight(2);
      stroke(100);
      line(this.position.x, this.position.y, this.position.x + this.velocity.x * 5, this.position.y + this.velocity.y * 5);

      textSize(36 / relativeBigness);
      textAlign(CENTER);
      fill(100);
      text(this.health.toFixed(2), this.position.x, this.position.y + 20 / relativeBigness);
    }

    push();
    angleMode(RADIANS);
    translate(this.position.x, this.position.y);
    rotate(theta + PI / 2);

    if (debug.checked()) {
      strokeWeight(2);
      stroke(0, 255, 0);
      line(0, 0, 0, this.dna[0] * 20);
      stroke(255, 0, 0);
      line(0, 0, 0, this.dna[1] * 20);

      noFill();
      stroke(255, 0, 0);
      ellipse(0, 0, this.dna[3]);
      stroke(0, 255, 0);
      ellipse(0, 0, this.dna[2]);
    }

    fill(col);
    stroke(col);
    triangle(-8 / relativeBigness, -8 / relativeBigness, 8 / relativeBigness, -8 / relativeBigness, 0 / relativeBigness, 12 / relativeBigness);
    pop();
  }
}
