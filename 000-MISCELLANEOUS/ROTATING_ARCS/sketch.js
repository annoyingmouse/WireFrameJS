import Tile from "./Tile.js";

new p5(p5 => {
    const style = window.getComputedStyle(document.querySelector("body"), null);
    const bodyWidth = Math.floor(parseInt(style.getPropertyValue("width"), 10) / 10) * 10;
    const tiles = [];
    const dimmention = 40;
    const spinning = 3;
    let canvas;
    let img;
    p5.setup = () => {
        p5.angleMode(p5.DEGREES);
        canvas = p5.createCanvas(bodyWidth, bodyWidth);
        canvas.parent("canvasContainer");
        img = p5.loadImage("assets/segment.png");
        for (let y = 0; y < bodyWidth; y += dimmention) {
            for (let x = 0; x < bodyWidth; x += dimmention) {
                tiles.push(new Tile(p5, x, y, dimmention, img));
            }

        }
    };
    p5.draw = () => {
        p5.background(p5.color(223, 222, 219));
        tiles.forEach(tile => {
            tile.draw();
        });
        if (tiles.filter(tile => tile.rotating).length < spinning) {
            for (let spinners = 0; spinners < spinning; spinners++) {
                const unRotating = tiles.filter(tile => !tile.rotating);
                unRotating.length && unRotating[~~(Math.random() * unRotating.length)].rotate();
            }
        }
    };
});
