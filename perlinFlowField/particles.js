function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxVel = maxVelocity;
    this.h = 0;
    this.radian;
    this.increment = 10;
    this.prev = this.pos.copy();

    this.calPhysics = function() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(this.maxVel);
    }

    this.show = function() {
        if (rainbow == 0) {
            stroke(RedParticle, GreenParticle, BlueParticle, AlphaParticle);
        }
        else {
            stroke(this.h, 255, 255, AlphaParticle / 255);
            this.h++;
            if (this.h > 255) {
                this.h = 0;
            }
        }
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
        this.takePrev();
    }

    this.takePrev = function() {
        this.prev = this.pos.copy();
    }

    this.addForce = function(force) {
        this.acc.add(force);
    }

    this.edges = function() {
        if (this.pos.x > width + edgeMargin) {
            this.pos.x = 0;
            this.addForce(createVector(edgeForce, 0));
            this.takePrev();
        }
        else if (this.pos.x < 0 - edgeMargin) {
            this.pos.x = width;
            this.addForce(createVector(-edgeForce, 0));
            this.takePrev();
        }

        if (this.pos.y > height + edgeMargin) {
            this.pos.y = 0;
            this.addForce(createVector(0, edgeForce));
            this.takePrev();
        }
        else if (this.pos.y < 0 - edgeMargin) {
            this.pos.y = height;
            this.addForce(createVector(0, -edgeForce));
            this.takePrev();
        }
    }

    this.noiseAcc = function(zoffset) {
        this.radian = noise(floor(this.pos.x / scl) / 100, floor(this.pos.y / scl) / 100, zoffset) * TWO_PI * 4;
        this.v = p5.Vector.fromAngle(this.radian);
        this.v.mult(flowStrength);
        this.addForce(this.v);
    }
}