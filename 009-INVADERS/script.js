import Shield from "./Shield.js";

new p5(p5 => {

    const width = 1200;
    const height = 700;
    const shields = [];

    p5.setup = () => {
        p5.createCanvas(width, height);
        p5.background(0);
        p5.frameRate(1);
        shields.push(...Array.from(Array(4).keys(), n => new Shield(p5, (220 * n) + (64 * (n + 1)), 500)));
    };

    p5.draw = () => {
        shields.forEach(shield => shield.draw());
    };

});