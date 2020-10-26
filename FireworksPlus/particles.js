class Particles {
    constructor(x, y, speedX, speedY, radius, genColor) {
        this.r = radius;
        this.pos = createVector(x, y);
        this.vel = createVector(speedX, speedY).normalize();
	this.vel.mult(random(8, 13));
        this.acc = createVector(0, 0);
        this.color = color(random(255), random(255), random(255));

	if (genColor == "purple") {
		this.color = color(random(200, 240), 100, 100);
	}
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
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
}