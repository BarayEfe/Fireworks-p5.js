let w = 2;
let arr = [];

function setup() {
    createCanvas(screen.width, screen.height - 50);
    frameRate(60);

    for (let i = 0; i < floor(width / w); i++) {
        arr.push(random(height));
    }
}

function swap(ar, i1, i2) {
    let cont = ar[i1];
    ar[i1] = ar[i2];
    ar[i2] = cont;
}

function bubbleSort(ar) {
    for (let i = 0; i < ar.length - 1; i++) {
        if (ar[i] > ar[i + 1]) {
            swap(ar, i, i + 1);
            fill(240, 0, 0);
            rect(i * w, height - arr[i], w, arr[i]);
        }
    }
}

function draw() {
    background(40);

    for (let i = 0; i < arr.length; i++) {
        stroke(0);
        fill(0, 250, 0);
        rect(i * w, height - arr[i], w, arr[i]);
    }

    bubbleSort(arr);
}
