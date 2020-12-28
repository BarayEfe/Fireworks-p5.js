class Button {
    constructor(bposx, bposy, bwidth, bheight, round) {
        this.w = bwidth;
        this.h = bheight;
        this.round = round;
        this.pos = createVector(bposx, bposy);
    }

    show(label) {
        rectMode(CENTER);
        fill(200);
        rect(this.pos.x, this.pos.y, this.w, this.h, this.round);
        textAlign(CENTER, CENTER);
        fill(30);
        text(label, this.pos.x, this.pos.y);
    }
}