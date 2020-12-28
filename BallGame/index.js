let balls = [];
let buttons = [];
let realHeight;
let ballCount = 10;
let gravity = 0.08;

function setup() {
    createCanvas(screen.width, screen.height - 80);
    realHeight = screen.height - 80;
    
    buttons.push(new Button(screen.width / 2, screen.height / 2, 80, 30, 20));
    for (let i = 0; i < ballCount; i++) {
        balls.push(new Ball(screen.width / 2, 60 + i * 30, 10 * 2, 10, 30));
    }
}

function draw() {
    background(40);
    let mouseVec = createVector(mouseX, mouseY);

    for (let i = 0; i < ballCount; i++) {
        balls[i].show();
        balls[i].applyPhysics();
        //balls[i].applyForce(createVector(0, gravity));
        balls[i].bounds();
        balls[i].maxVel(8);

        
        let distance = mouseVec.dist(balls[i].pos);
        let orbitForce = createVector((mouseVec.x - balls[i].pos.x) / 100, (mouseVec.y - balls[i].pos.y) / 100);
        distance = 600 / distance;
        orbitForce.mult(distance);

        balls[i].applyForce(orbitForce);
    }

    buttons[0].show("Start CET!");
}

function ballsCollide() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            if (balls[i].r + balls[j].r >= balls[i].pos.dist(balls[j].pos)) {
                let vec = createVector(balls[i].vel.x + balls[j].vel.x, balls[i].vel.y + balls[j].vel.y);
                vec.mult(0.5);
                balls[i].vel.mult(-1);
                balls[j].vel.mult(-1);
            }
        }
    }
}