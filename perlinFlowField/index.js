var inc = 0.0013;
var scl = 2;

var maxVelocity = 5;
var flowStrength = 6;
var edgeForce = 0;
var edgeMargin = 90;

var particleCount = 4000;

var RedParticle = 255;
var GreenParticle = 255;
var BlueParticle = 255;
var AlphaParticle = 4;
var rainbow = 0;

var BackCol = 0;

var zoff = 0;
var particles = [];

function setup() {
    createCanvas(screen.width - 20, screen.height - 100);
    background(BackCol);

    if (rainbow == 1) {
        colorMode(HSB);
    }

    for (let i = 0; i < particleCount; i++) {
        particles[i] = new Particle();
    }
}

function draw() {
    //background(50);

    zoff += inc;

    for (let i = 0; i < particles.length; i++) {
        particles[i].calPhysics();
        particles[i].show();
        particles[i].edges();
        particles[i].noiseAcc(zoff);
    }
}