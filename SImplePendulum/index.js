let scrwidth = 1640, scrheight = 950;
let bobs = [];
let g = 0.5;

function setup() {
    createCanvas(scrwidth, scrheight);
    for (let i = 0; i < 100; i++) {
        bobs.push(new bob());
        bobs[i].angle = PI / 3 - (i * PI / 500);
        bobs[i].ropelen = i * 15 + 30;
        bobs[i].tiePos = createVector(scrwidth / 2, 0);
    }
}

function draw() {
    background(90);

    for (let i = 0; i < 100; i++) {
        bobs[i].applyForce(-sin(bobs[i].angle) * g);
        bobs[i].show();
    }
}