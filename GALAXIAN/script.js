var width = 400;
var height = 800;
var DIVE_WOBBLE_SPEED = 2;
var DIVE_WOBBLE_AMOUNT = 100;
var ship = null
function setup() {
    createCanvas(width, height);
    background(0);
    frameRate(20);
    ship = new Ship(100, 100, loadImage('images/ship.png'), 90)
}

function draw() {

}