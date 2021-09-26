class Point {
    constructor(xPos, yPos, radius) {
        this.pos = createVector(xPos, yPos);
        this.r = radius;
    }

    show() {
        fill(230);
        noStroke();
        circle(this.pos.x, this.pos.y, this.r);
    }
}


class QuadTree {
    constructor(xPos, yPos, edgelen, capacity) {
        this.pos = createVector(xPos, yPos);
        this.edgelen = edgelen;
        this.capacity = capacity;
        this.subdivided = false;
        this.points = [];
    }

    subdivide() {
        this.upperLeft = new QuadTree(this.pos.x, this.pos.y, this.edgelen / 2, this.capacity);
        this.upperRight = new QuadTree(this.pos.x + this.edgelen / 2, this.pos.y, this.edgelen / 2, this.capacity);
        this.lowerLeft = new QuadTree(this.pos.x, this.pos.y + this.edgelen / 2, this.edgelen / 2, this.capacity);
        this.lowerRight = new QuadTree(this.pos.x + this.edgelen / 2, this.pos.y + this.edgelen / 2, this.edgelen / 2, this.capacity);
    }

    inBorders(xPos, yPos) {
        return (xPos >= this.pos.x && xPos <= this.pos.x + this.edgelen && yPos >= this.pos.y && yPos <= this.pos.y + this.edgelen);
    }

    insert(point) {
        if (!this.inBorders(point.pos.x, point.pos.y)) {
            return true;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
        }
        else {
            if (!this.subdivided) {
                this.subdivided = true;
                this.subdivide();

                for (let i = 0; i < this.points.length; i++) {
                    this.upperLeft.insert(this.points[i]);
                    this.upperRight.insert(this.points[i]);
                    this.lowerLeft.insert(this.points[i]);
                    this.lowerRight.insert(this.points[i]);
                }
            }

            this.upperLeft.insert(point);
            this.upperRight.insert(point);
            this.lowerLeft.insert(point);
            this.lowerRight.insert(point);
        }
    }

    show() {
        strokeWeight(4);
        stroke(0);
        noFill();

        rect(this.pos.x, this.pos.y, this.edgelen, this.edgelen);
        if (this.subdivided) {
            this.upperLeft.show();
            this.upperRight.show();
            this.lowerLeft.show();
            this.lowerRight.show();
        }
    }
}