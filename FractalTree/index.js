let slider;
let angle = 0;
var sensitivity = 0.0001;
let colors = ["brown", "red", "yellow", "blue", "green", "magenta", "aqua", "violet", "white", "pink", "silver", "gold", "black"];
let color = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(0, TWO_PI, PI / 8, sensitivity);
  color = floor(random(0, 11));
}

function draw() {
  background(60);
  angle = slider.value() / 2;
  translate(width/2, height);
  branch(300);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  stroke(colors[color]);
  if (color <= 11) {
    color++;
  }
  else {
    color = 0;
  }
  if (len > 4) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }
  //line(0, 0, 0, -len);
}
