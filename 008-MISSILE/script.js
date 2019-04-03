import Missile from "./Missile.js";

new p5(p5 => {

    const width = 800;
    const height = 400;
    const framerate = 10;
    const missiles = [];

    p5.setup = () => {
        p5.createCanvas(width, height);
        p5.frameRate(framerate);
        p5.background(0);
        missiles.push(new Missile(p5, p5.random(600, 800), p5.random(-70, -10)))
    };

    p5.draw = () => {
        p5.background(0);
        missiles.forEach((missile) => missile.step(p5.millis() * 1000));
    };
});
