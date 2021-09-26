let quadtree;
let scrwidth = 1500;
let scrheight = 900;
let pointCnt = 1000;
let points = [];

function setup() {
    createCanvas(scrwidth, scrheight);
    background(90);

    let quadtree = new QuadTree(0, 0, scrwidth, 4);

    for (let i = 0; i < pointCnt; i++) {
        points.push(new Point(random(0, scrwidth), random(0, scrheight), 10));
        quadtree.insert(points[i]);
    }

    quadtree.show();

    for (let i = 0; i < pointCnt; i++) {
        points[i].show();
    }
}

function draw() {
    //backgroud(90);


}