class Point {
    constructor(x, y, ox, oy, pin) {
        this.pos = createVector(x, y);
        this.oldPos = createVector(ox, oy);
        this.radius = 10;
        this.pinned = pin;
        this.dragRadius = 50;
        this.dragged = false;
    }

    update() {
        if (this.pinned) {
            return true;
        }

        this.vel = p5.Vector.sub(this.pos, this.oldPos);
        this.oldPos = createVector(this.pos.x, this.pos.y);
        this.pos.add(this.vel);
        this.pos.y += gravity;
    }

    constrain() {
        if (this.pinned) {
            return true;
        }

        if (this.pos.x > scrwidth) {
            this.pos.x = scrwidth;
            this.oldPos.x = this.vel.x + this.pos.x;
        }
        else if (this.pos.x < 0) {
            this.pos.x = 0;
            this.oldPos.x = this.vel.x + this.pos.x;
        }
        else if (this.pos.y > scrheight) {
            this.pos.y = scrheight;
            this.oldPos.y = this.pos.y + this.vel.y;
        }
        else if (this.pos.y < 0) {
            this.pos.y = 0;
            this.oldPos.y = this.pos.y + this.vel.y;
        }
    }

    dragCheck() {
        if (this.pinned) {
            return true;
        }

        let dis = dist(this.pos.x, this.pos.y, mouseX, mouseY) + 15;
        if (dis - 15 < this.dragRadius) {
            let dragForce = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
            dragForce.mult(10 / dis);
            this.pos.add(dragForce);
        }
    }

    show() {
        fill(240);
        strokeWeight(2);
        stroke(0);
        circle(this.pos.x, this.pos.y, this.radius);
    }
}

class Stick {
    constructor(point1, point2, delrange) {
        this.p1 = point1;
        this.p2 = point2;
        this.distance = dist(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
        this.deleteRange = delrange;
    }

    update() {
        let dx = this.p2.pos.x - this.p1.pos.x;
        let dy = this.p2.pos.y - this.p1.pos.y;
        let dis = Math.sqrt(dx * dx + dy * dy);
        let dif = dis - this.distance;
        let perc = dif / dis / 2;

        if (!this.p1.pinned) {
            this.p1.pos.x += perc * dx;
            this.p1.pos.y += perc * dy;
        }
        if (!this.p2.pinned) {
            this.p2.pos.x -= perc * dx;
            this.p2.pos.y -= perc * dy;
        }
    }
    
    deleteCheck() {
        let maxX = Math.max(this.p1.pos.x, this.p2.pos.x);
        let minX = Math.min(this.p1.pos.x, this.p2.pos.x);
        let maxY = Math.max(this.p1.pos.y, this.p2.pos.y);
        let minY = Math.min(this.p1.pos.y, this.p2.pos.y);

        if (mouseX > maxX + this.deleteRange || mouseX < minX - this.deleteRange) {
            return false;
        }
        if (mouseY > maxY + this.deleteRange || mouseY < minY - this.deleteRange) {
            return false;
        }

        if (maxX - minX < this.deleteRange) {
            return true;
        }

        let intendedy = (maxX - mouseX) / (maxX - minX) * (maxY - minY) + minY;

        if (mouseY < intendedy - this.deleteRange || mouseY > intendedy + this.deleteRange) {
            return false;
        }

        return true;
    }

    show() {
        stroke(255);
        line(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
    }
}