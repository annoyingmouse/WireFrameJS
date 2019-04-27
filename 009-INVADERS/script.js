import Shield from "./Shield.js";
import Shot from "./Shot.js";

new p5(p5 => {

    const width = 1180;
    const height = 700;
    const shields = [];
    const shots = [];

    p5.setup = () => {
        p5.createCanvas(width, height);
        p5.background(255);
        shields.push(...Array.from(Array(4).keys(), n => new Shield(p5, (220 * n) + (60 * (n + 1)), 500)));
        setInterval(() => shots.push(new Shot(p5, Math.floor(p5.random(0, (((p5.width - 40) / 10)))) * 10)), 1000);
    };

    const drawShots = () => {
        let index = shots.length;
        while (index--) {
            if (shots[index].y > p5.height) {
                shots.splice(index, 1);
            } else {
                shots[index].draw();
                if (shots[index].exploded) {
                    shields.forEach(shield => {
                        shield.erode(shots[index].getShrapnel())
                    });
                    shots.splice(index, 1);
                }
            }
        }
    }

    const drawShields = () => {
        let index = shields.length;
        while (index--) {
            if (shields[index].empty()) {
                shields.splice(index, 1);
            } else {
                shields[index].draw();
            }
        }
    }

    p5.draw = () => {
        p5.clear()
        shields.forEach(shield => {
            shots.forEach((shot, shotIndex) => {
                if (shot.impact(shield.erode(shot.getShrapnel())) > 3) {
                    shot.explode(shotIndex);
                }
            });
        });
        drawShots();
        drawShields();
    };
});