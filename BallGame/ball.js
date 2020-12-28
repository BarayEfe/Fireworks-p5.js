class Ball {
    constructor(x, y, mass, radius, bouncPerc) {
        this.m = mass;
        this.r = radius;
        this.bPerc = bouncPerc / 100;

        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }

    applyPhysics() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    applyForce(force) {
        force.div(this.m);
        this.acc.add(force);
    }

    maxVel(maximum) {
        this.vel.limit(maximum);
    }

    bounds() {
        if (this.pos.x >= screen.width - (this.r)) {
            this.vel.x *= -1 * this.bPerc;
            this.pos.x = screen.width - this.r;
        }
        else if(this.pos.x <= this.r) {
            this.vel.x *= -1 * this.bPerc;
            this.pos.x = + this.r;
        }

        if (this.pos.y >= realHeight - (this.r)) {
            this.vel.y *= -1 * this.bPerc;
            this.pos.y = realHeight - this.r;
        }
        else if (this.pos.y <= this.r) {
            this.vel.y *= -1 * this.bPerc;
            this.pos.y = + this.r;
        }
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}