let screenWidth = 1900;
let screenHeight = 987;
let asteroids = [];
let lasers = [];
let ship;
let display = true;
let won = false;
let lost = false;

function setup() {
  screenWidth = windowWidth;
  screenHeight = windowHeight;

  createCanvas(screenWidth, screenHeight);

  ship = new Ship();

  for (i = 0; i < 20; i++) {
    asteroids.push(new Asteroid);
  }
}

function draw() {
  background(0);

  if (asteroids.length <= 0) {
    display = false;
    lost = false;
  }

  if (display == false) {
    textSize(64);
    fill(255);
    textAlign(CENTER);

    if (lost == true) {
      text("You Lost", screenWidth/2, screenHeight/2);
    }
    else {
      text("You Won", screenWidth/2, screenHeight/2);
    }


    asteroids = [];

    for (i = 0; i < 20; i++) {
      asteroids.push(new Asteroid);
    }

    ship.pos = createVector(screenWidth/2, screenHeight/2);
  }

  if (display == true) {

    for (let i = 0; i < asteroids.length; i++) {
      if (ship.hits(asteroids[i])) {
        display = false;
        if (asteroids.length > 0) {
          lost = true;
        }
      }
      asteroids[i].render();
      asteroids[i].movement();
      asteroids[i].edges();
    }

    for (let i = lasers.length - 1; i >= 0 ; i--) {
      lasers[i].render();
      lasers[i].movement();
      for (let a = asteroids.length - 1; a >= 0; a--) {
        if (lasers[i].hits(asteroids[a])) {
          if (asteroids[a].r > 10) {
            let newAsteroids = asteroids[a].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(a, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }

    ship.render();
    ship.movement();
    ship.edges();
    turn(0.15);

    if (keyIsDown(87)) {
      ship.boost();
    }
  }
}

function keyPressed() {
  if (display == true) {
    if (keyIsDown(32)) {
      lasers.push(new Laser(ship.pos, ship.headingR));
    }
  }
  if (display == false) {
    display = true;
    lost = false;
    won = false;
  }
}
