var fireworks = [];
var particles = [];
var blownIds = [];
var positionId = [];
var fireworkCount = 6;
var particleColor;
var particleColors = ["purple", "red", "green", "yellow"];

var normalScreenWidth = 1080;
var normalScreenHeight = 1920;

function setup() {
  createCanvas(screen.width, screen.height);
	
  noStroke();

  for (i = 0; i < fireworkCount; i++) {
    fireworks[i] = new Fireworks(random(width), height, random(-4, 4), random(-18, -26), random(6, 8));
  }
}

function draw() {
  background(0, 0, 0);

  for (i = fireworkCount - 1; i > -1; i--) {
    fireworks[i].show();
    fireworks[i].forceManager();
    fireworks[i].applyForce(createVector(0, 0.3));

    positionId[i] = fireworks[i].pos;

    if (fireworks[i].vel.y > 10) {
      blownIds.push(i);
      fireworks.splice(i, 1);
      fireworks.push(new Fireworks(random(width), height, random(-4, 4), random(-18, -25), random(6, 8)));
    }
  }

  for (i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].forceManager();
    particles[i].applyForce(createVector(0, 0.3));
  }

  for (i = 0; i < blownIds.length; i++) {
    particleColor = particleColors[floor(random(0, particleColors.length))];
    print(blownIds);
    for (j = 0; j < random(50, 75); j++) {
      particles.push(new Particles(positionId[blownIds[i]].x, positionId[blownIds[i]].y, random(-1, 1), random(-1, 1), random(4, 7), particleColor));
    }
  }
  blownIds = []

  for (i = particles.length - 1; i > -1; i--) {
    if (particles[i].vel.y > 20) {
      particles.splice(i, 1);
    }
  }
}