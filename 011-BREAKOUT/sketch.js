import Brick from "./Brick.js"
import Bat from "./Bat.js"
import Ball from "./Ball.js";

new p5(p5 => {

    const width = 600;
    const height = 800;
    const bricks = [];
    const columns = 10;
    const margin = 50;
    const rows = 5;
    const brick_width = (width - 2 * margin) / columns;
    const brick_height = 25;
    let bat = null;
    let ball = null;

    const reset = () => {
        bricks.length = 0;
        ball.reset(width / 2, height / 2);
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                const hue = (x + y) / columns;
                const saturation = (y / rows) * 0.5 + 0.5;
                const hightlight = HSV2RGB(hue, saturation * 0.7, 1);
                const colour = HSV2RGB(hue, saturation, 0.8);
                bricks.push(new Brick(p5, x * brick_width + margin, y * brick_height + margin, brick_width - 1, brick_height - 1, colour, hightlight))
            }
        }
    }

    p5.setup = () => {
        p5.createCanvas(width, height);
        //p5.frameRate(1);
        bat = new Bat(p5, width / 2, height - 50);
        ball = new Ball(p5, width / 2, height / 2);
        reset();
    };

    p5.draw = () => {
        if (ball.x + ball.radius + ball.velocity.x > width) {
            ball.velocity.x *= -1;
        }
        if (ball.x - ball.radius + ball.velocity.x < 0) {
            ball.velocity.x *= -1;
        }
        if (ball.y + ball.radius + ball.velocity.y > bat.y) {
            if (
                ball.x + ball.radius + ball.velocity.x > bat.x &&
                ball.x - ball.radius + ball.velocity.x < bat.x + bat.width
            ) {
                ball.velocity.y *= -1;
                ball.velocity.x += (ball.x - (bat.x + bat.width / 2)) * 0.05;
            }
        }
        if (ball.y - ball.radius + ball.velocity.y < 0) {
            ball.velocity.y *= -1;
        }
        if (ball.y + ball.radius + ball.velocity.y > height) {
            reset();
        }
        if (!bricks.length) {
            reset();
        }
        let broken_brick = null;
        /*
         * Inspired by
         * https://happycoding.io/tutorials/processing/collision-detection#edge-collision-detection
         */
        bricks.forEach((brick, i) => {
            if (ball.x + ball.radius + ball.velocity.x > brick.x &&
                ball.x - ball.radius + ball.velocity.x < brick.x + brick.width &&
                ball.y + ball.radius + ball.velocity.y > brick.y &&
                ball.y - ball.radius + ball.velocity.y < brick.y + brick.height
            ) {
                broken_brick = i;
                ball.velocity.x *= -1;
            }
            if (ball.x + ball.radius + ball.velocity.x > brick.x &&
                ball.x - ball.radius + ball.velocity.x < brick.x + brick.width &&
                ball.y + ball.radius + ball.velocity.y > brick.y &&
                ball.y - ball.radius + ball.velocity.y < brick.y + brick.height) {
                broken_brick = i;
                ball.velocity.y *= -1;
                ball.velocity.x *= -1;
            }
        });
        if (broken_brick !== null) {
            bricks.splice(broken_brick, 1);
        }
        if (!bricks.length) {
            reset();
        }
        p5.background(0);
        bricks.forEach(brick => brick.draw());
        bat.move(p5.mouseX);
        bat.draw();
        ball.move();
    };

    /**
     * https://gist.github.com/mjackson/5311256#file-color-conversion-algorithms-js
     * Converts an HSV color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
     * Assumes h, s, and v are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   Number  h       The hue
     * @param   Number  s       The saturation
     * @param   Number  v       The value
     * @return  Array           The RGB representation
     */
    const HSV2RGB = (h, s, v) => {
        let r, g, b;
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return [r * 255, g * 255, b * 255];
    }

});