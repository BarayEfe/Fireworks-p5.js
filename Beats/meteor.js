class Meteor {
    constructor(x, y, r, vx, vy) {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);
        this.r = r;
    }

    physics() {
        this.pos.add(this.vel);
    }

    show() {
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}