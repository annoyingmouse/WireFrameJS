import Ship from "./Ship.js";

new p5(p5 => {

    const width = 400;
    const height = 800;
    const wobble_speed = 2;
    const wobble_amount = 100;
    const epsilon = 0.001;
    let ship = null;

    p5.setup = () => {
        p5.createCanvas(width, height);
        p5.imageMode(p5.CENTER);
        p5.angleMode(p5.DEGREES);
        ship = new Ship(p5, 100, 100, 'images/ship.png', 90);
    };

    p5.draw = () => {
        p5.background(0);
        ship.draw();
    };

});

