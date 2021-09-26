function bob() {
	this.pos = createVector();
    this.tiePos = createVector();
    this.vel = 0;
    this.acc = 0;
    this.radius = 13;
    this.ropelen = 250;
    this.angle = PI / 3;

    this.applyForce = function(force) {
        if (force == 0) {
            return;
        }
        this.acc = force / 100;// / this.ropelen;
        this.vel += this.acc;
        this.angle += this.vel;

        this.pos.x = sin(this.angle) * this.ropelen + this.tiePos.x;
        this.pos.y = cos(this.angle) * this.ropelen + this.tiePos.y;
    }

    this.show = function() {
        stroke(255);
        strokeWeight(2);
        fill(0);
        if (this.vel > 0) {
            fill(255, 0, 0);
        }
        else {
            fill(200, 0, 0);
        }
        //line(this.tiePos.x, this.tiePos.y, this.pos.x, this.pos.y);
        circle(this.pos.x, this.pos.y, this.radius);
    }
}