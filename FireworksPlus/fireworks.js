class Fireworks {
    constructor(x, y, speedX, speedY, radius) {
        this.r = radius;
        this.pos = createVector(x, y);
        this.vel = createVector(speedX, speedY);
        this.acc = createVector(0, 0);
    }

    forceManager() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc = createVector(0, 0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    show() {
        fill(100);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
}