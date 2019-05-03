import Tile from "./Tile.js";

new p5(p5 => {

    const rows = 14;
    const columns = 14;
    const dimension = 20
    const height = rows * dimension;
    const width = columns * dimension;
    const framerate = 1;
    const tiles = [];


    p5.setup = () => {
        p5.createCanvas(width, height);
        p5.frameRate(framerate);
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                //if (!r && !c) {
                tiles.push(new Tile(p5, c * dimension, r * dimension, dimension, dimension, r, c));
                //}
            }
        }
    };

    p5.draw = () => {
        p5.background(200);
        tiles.forEach((tile) => {
            const img = tile.draw();
            console.log(img);
            p5.image(img.i, img.x, img.y);
        });
    };
});