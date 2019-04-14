"use strict";
let puck;
let left;
let right;
let speed = 10;
let leftscore = 0;
let rightscore = 0;

function setup() {
    createCanvas(600, 400);
    puck = new Ball(100, 100);
    left = new Paddle(true);
    right = new Paddle(false);
}

function draw() {
    background(51);
    puck.checkPaddle(left, true);
    puck.checkPaddle(right, false);
    // puck.checkPaddleLeft(left);
    // puck.checkPaddleRight(right);
    left.show();
    right.show();
    left.update();
    right.update();

    puck.update();
    puck.edges();
    puck.show();

    fill(255);
    textSize(32);
    text(leftscore, 32, 40);
    text(rightscore, width - 64, 40);

}

function keyReleased() {
    left.move(0);
    right.move(0);
}

function keyTyped() {
    if (key === 'a') {
        left.move(-10);
    } else if (key === 'z') {
        left.move(10);
    } else if (key === 'j') {
        right.move(-10);
    } else if (key === 'm') {
        right.move(10);
    }
}

// Converts from degrees to radians.
Math.radians = degrees => degrees * Math.PI / 180;

// Converts from radians to degrees.
Math.degrees = radians => radians * 180 / Math.PI;