import Shield from "./Shield.js";
import Shot from "./Shot.js";

new p5(p5 => {

    const width = 1180;
    const height = 700;
    const shields = [];
    const shots = [];

    p5.setup = () => {
        p5.createCanvas(width, height);
        p5.background(51);
        shields.push(...Array.from(Array(4).keys(), n => new Shield(p5, (220 * n) + (60 * (n + 1)), 500)));
        setInterval(() => shots.push(new Shot(p5, Math.floor(p5.random(0, (((p5.width - 30) / 10)))) * 10)), 2000);
    };

    p5.draw = () => {
        p5.clear()
        p5.background(51);
        shields.forEach(shield => shield.draw());
        shots.forEach(shot => shot.draw());
    };

});