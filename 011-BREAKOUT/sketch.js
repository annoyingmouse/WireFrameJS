import Brick from "./Brick.js"

new p5(p5 => {

    const width = 600;
    const height = 800;
    const bricks = [];
    const columns = 10;
    const margin = 50;
    const rows = 5;
    const brick_width = (width - 2 * margin) / columns;
    const brick_height = 25;


    p5.setup = () => {
        p5.createCanvas(width, height);
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                const hue = (x + y) / columns;
                const saturation = (y / rows) * 0.5 + 0.5;
                const hightlight = HSV2RGB(hue, saturation * 0.7, 1);
                const colour = HSV2RGB(hue, saturation, 0.8);
                bricks.push(new Brick(p5, x * brick_width + margin, y * brick_height + margin, brick_width - 1, brick_height - 1, colour, hightlight))
            }
        }
    };

    p5.draw = () => {
        p5.background(0);
        bricks.forEach(brick => brick.draw());
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


    // p5.keyPressed = (p5) => {
    //     if (p5.keyCode === 40 && enemies.length) {
    //         const newEnemies = enemies[0].destroy();
    //         if (newEnemies.length) {
    //             enemies.push(...newEnemies);
    //         }
    //         enemies.shift();
    //     }
    // };
});