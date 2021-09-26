let gravity = 0.4;
let scrwidth =1500, scrheight = 900;
let points = [];
let sticks = [];
let wcnt = 50, hcnt = 31, xoffset = 200;
let blen = 20;
let strength = 5;
let clickAction = 0, actionCnt = 2;

function setup() {
    createCanvas(scrwidth, scrheight);
/*     points.push(new Point(scrwidth / 2, scrheight / 2, scrwidth / 2, scrheight / 2));
    points.push(new Point(scrwidth / 3, scrheight / 3, scrwidth / 3 + 200, scrheight / 3));
    points.push(new Point(scrwidth / 2, scrheight / 3, scrwidth / 2, scrheight / 3));
    points.push(new Point(scrwidth / 3, scrheight / 2, scrwidth / 3 + 200, scrheight / 2));
    sticks.push(new Stick(points[0], points[2], 5));
    sticks.push(new Stick(points[1], points[2], 5));
    sticks.push(new Stick(points[1], points[3], 5));
    sticks.push(new Stick(points[0], points[3], 5));
    sticks.push(new Stick(points[1], points[0], 5)); */

    for (let i = 0; i < wcnt; i++) {
        for (let j = 0; j < hcnt; j++) {
            if (i % 4 == 0 && j == 0) {
                points.push(new Point(i * blen + blen + xoffset, j * blen + blen, i * blen + blen + xoffset, j * blen + blen, true));
            }
            else {
                points.push(new Point(i * blen + blen + xoffset, j * blen + blen, i * blen + blen + xoffset, j * blen + blen, false));
            }
        }
    }

    for (let i = 0; i < wcnt; i++) {
        for (let j = 0; j < hcnt - 1; j++) {
            sticks.push(new Stick(points[(i * hcnt) + j], points[(i * hcnt) + j + 1], 5));
        }
    }

    for (let i = 0; i < hcnt; i++) {
        for (let j = 0; j < wcnt - 1; j++) {
            sticks.push(new Stick(points[(j * hcnt) + i], points[((j + 1) * hcnt) + i], 5));
        }
    }

    /* let down = 300;

    points.push(new Point(scrwidth / 2, 20 + down, scrwidth / 2, 20 + down, true));
    points.push(new Point(scrwidth / 3 , -80 + down, scrwidth / 3, -80 + down, false));
    points.push(new Point(scrwidth / 4 , -300 + down, scrwidth / 4, -300 + down, false));
    sticks.push(new Stick(points[0], points[1]));
    sticks.push(new Stick(points[2], points[1])); */
}

function draw() {
    background(40);

    for (let i = 0; i < points.length; i++) {
        points[i].update();
    }

    for (let i = 0; i < strength; i++) {
        for (let j = 0; j < sticks.length; j++) {
            sticks[j].update();
        }
        for (let j = 0; j < points.length; j++) {
            //points[j].constrain();
        }
    }

    for (let i = 0; i < points.length; i++) {
        //points[i].show();
    }

    for (let i = 0; i < sticks.length; i++) {
        sticks[i].show();
    }

    if (mouseIsPressed) {
        if (clickAction == 0) {
            for (let i = 0; i < sticks.length; i++) {
                const s = sticks[i];
                if (s.deleteCheck()) {
                    sticks.splice(i, 1);
                }
            }
        }
        else if (clickAction == 1) {
            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                p.dragCheck();
            }
        }
    }
}

function keyTyped() {
    if (key == ' ') {
        clickAction = (clickAction + 1) % actionCnt;
    }
}