let start = 25;
let margin = 92;
let wid = 75;
let xOff = 0;
let inc = 0.012;
let fgil = 1;
let uppermarg = 800;
let noisemarg = 1000;

let meteor = [];

function setup() {
    createCanvas(screen.width, screen.height);

    frameRate(60);

    for (let i = 0; i < 5; i++) {
        meteor[i] = new Meteor(-1000, random(screen.height / 4, screen.height + 100), 10, random(0, -1), random(0, -1));
    }
    
    noStroke();
    fill(255);
}

function draw() {
    background(0, 70);

    for (let i = 0; i < 5; i++) {
        if (meteor[i].pos.x < 0 || meteor[i].pos.y < 0 || meteor[i].pos.x > screen.width || meteor[i].pos.y > screen.height) {
            if (random(1) >= 0.5) {
                meteor[i] = new Meteor(screen.width, random(0, screen.height / 2), 3, random(-30, -40), random(5, -5));
            }
            else {
                meteor[i] = new Meteor(0, random(0, screen.height / 2), 3, random(30, 40), random(5, -5));
            }       
        }
        meteor[i].physics();
        meteor[i].show();
    }

    for (let i = 0; i < 19; i++) {
        bloch(start + margin * i, noisemarg * i, fgil);
    }

    xOff += inc;
}

function bloch(marg, nstart, fil) {
    if (fil) {
        fill(255);
    }
    else {
        fill(noise(xOff + nstart) * 255 + 60);
    }
    rect(marg, screen.height, wid, -noise(xOff + nstart) * uppermarg);
}