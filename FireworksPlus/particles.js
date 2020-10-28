class Particles {
    constructor(x, y, speedX, speedY, radius, genColor) {
        this.r = radius;
        this.pos = createVector(x, y);
        this.vel = createVector(speedX, speedY).normalize();
	this.vel.mult(random(5, 13));
        this.acc = createVector(0, 0);
        this.color = color(160, 0, 250);

    	if (genColor == "purple") {
            this.color = color(random(110, 200), random(0, 20), random(190, 240));
        }
        else if(genColor == "green") {
            this.color = color(random(60, 140), random(180, 255), random(80, 160));
        }
        else if(genColor == "red") {
            this.color = color(random(170, 255), random(10, 40), random(10, 40));
        }
        else if(genColor == "yellow") {
            this.color = color(random(180, 255), random(180, 255), random(20, 50));
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