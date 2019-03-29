var layers = [];
var WIDTH = 800
var HEIGHT = 400
function setup() {
    createCanvas(WIDTH, HEIGHT);
    var layer_back = {
        img: loadImage('images/image_back.png'),
        top: 0,
        left: 0,
        speed: 1
    }
    var layer_middle = {
        img: loadImage('images/image_middle.png'),
        top: 0,
        left: 0,
        speed: 3
    }
    var layer_front = {
        img: loadImage('images/image_front.png'),
        top: 0,
        left: 0,
        speed: 5
    }
    layers.push(layer_back);
    layers.push(layer_middle);
    layers.push(layer_front);
}
function draw() {
    clear();
    layers.forEach(function (l) {
        image(l.img, l.left, l.top);
        l.left -= l.speed;
        if (l.left <= -Math.abs(WIDTH)) {
            l.left = 0
        }
    });
}