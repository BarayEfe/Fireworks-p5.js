let number = 94903423947892374892384238746782332387562376587324723646238747234823646234672364823763255233456828464357892436786945783248237423492347982357832657623756723864394593753475734897598573475345793476973468734573475983475834975934875893475734597345734957893457983475983453458345739475348953489753475983434435793468;
let steps = 0;
let len = 20;
let lineLen = 30;
let angle = 0;
let stepLimit = 50;
let forLen = 50;
let slider;
let onAngle = true;
let oneAngle = false;
let rotatedP = false;
let rotatedM = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(250, 160, 0);
  translate(300, height/6);
  //slider = createSlider(0, TWO_PI, PI/6, 0.01);
  angle = PI / 7;
  stroke(255);
  textSize(120);
  textAlign(CENTER);
  fill(255);
  text("Collatz", width/2 + width/7, height/4);
  text("Conjecture", width/2 + width/10, height/2 - height/10);

  for (let i = 0; i < forLen; i++) {
    steps = 0;
    Collatz();
  }
}

function draw() {
  //angle = slider.value();
  //print(angle);
}


function Collatz() {
  steps++;
  push();
  if (number % 2 == 0) {
    number = number / 2;
    if (oneAngle == true && rotatedP == false) {
      rotate(angle);
      rotatedP = true;
      rotatedM = false;
    }
    else if (onAngle == true) {
      rotate(angle);
    }
    line(0, 0, lineLen, 0);
  }
  else {
    number = number * 3 + 1;
    if (oneAngle == true && rotatedM == false) {
      rotate(-angle);
      rotatedP = false;
      rotatedM = true;
    }
    else if (onAngle == true) {
      rotate(-angle);
    }
    line(0, 0, lineLen, 0);
  }
  translate(len, 0);
  print(steps + ". " + number);
  if (steps < stepLimit) {
      Collatz();
  }
  pop();
}
