var vehicles = [];
var food = [];
var poison = [];
var genRecord = 0;
var currentBest = null;
var bestDNA = [];
var points = 0;
var record = 0;
var currentGen = 1;
var defPointsPerFrame = 0.1;
var pointsPerFrame = 0.1;

var debug;
var speedSlider;

function setup() {
  createCanvas(windowWidth - 25, windowHeight - 40);

  for (var i = 0; i < 5 * pow(relativeBigness, 2); i++) {
    var x = random(width);
    var y = random(height);
    vehicles[i] = new Vehicle(x, y);
  }

  for (var i = 0; i < 25 * pow(relativeBigness, 2); i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
  for (var i = 0; i < 25 * pow(relativeBigness, 2) ; i++) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }

  debug = createCheckbox();
  speedSlider = createSlider(0, 5, 1, 1);
}

function draw() {
  background(200);

  simulationSpeed = speedSlider.value();
  points += pointsPerFrame;

  if (random(1) < 0.05 * pow(relativeBigness, 2)) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
  if (random(1) < 0.02 * pow(relativeBigness, 2)) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }

  noStroke();
  for (var i = 0; i < food.length; i++) {
    fill(0, 230, 0);
    ellipse(food[i].x, food[i].y, 10 / relativeBigness, 10 / relativeBigness);
  }
  for (var i = 0; i < poison.length; i++) {
    fill(230, 0, 0);
    ellipse(poison[i].x, poison[i].y, 10 / relativeBigness, 10 / relativeBigness);
  }

  genRecord = 0;
  for (var i = vehicles.length - 1; i >= 0; i--) {
    vehicles[i].behaviors(food, poison);
    vehicles[i].update();
    vehicles[i].display();
    vehicles[i].boundaries();

    if (vehicles[i].health > genRecord) {
      genRecord = vehicles[i].health;
      currentBest = vehicles[i];
    }

    if (vehicles[i].dead()) {
      vehicles.splice(i, 1);
    }
  }

  if (vehicles.length < 2) {
    for (var i = 0; i < 10 * relativeBigness; i++) {
      var x = random(width);
      var y = random(height);
      vehicles[i] = new Vehicle(x, y, bestDNA);
    }

    poison = [];
    food = [];
    for (var i = 0; i < 25 * pow(relativeBigness, 2); i++) {
      var x = random(width);
      var y = random(height);
      food.push(createVector(x, y));
    }
    for (var i = 0; i < 25 * pow(relativeBigness, 2) ; i++) {
      var x = random(width);
      var y = random(height);
      poison.push(createVector(x, y));
    }

    pointsPerFrame = defPointsPerFrame * simulationSpeed;
    points = 0;
    currentGen++;
  }

  if (currentBest != undefined && currentBest != null) {
    bestDNA = currentBest.dna;
  }

  if (points > record) {
    record = points;
  }

  noFill();
  stroke(255, 255, 0);
  strokeWeight(4 / relativeBigness);
  ellipse(currentBest.position.x, currentBest.position.y, 40 / relativeBigness, 40 / relativeBigness);

  fill(0);
  textSize(85);
  noStroke();
  textAlign(LEFT);
  text("Gen: " + currentGen, 10, 80);
  text("Record: " + record.toFixed(2), width - 700, 80);
}
