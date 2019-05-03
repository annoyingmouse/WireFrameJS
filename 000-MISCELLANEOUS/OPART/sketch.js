import Tile from "./Tile.js";

new p5(p5 => {

    const rows = 14;
    const columns = 14;
    const dimension = 40
    const framerate = 1;
    const tiles = [];
    const delay = 30;

    p5.setup = () => {
        p5.createCanvas(columns * dimension, rows * dimension);
        //p5.frameRate(framerate);
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                tiles.push(new Tile(
                    p5,
                    column * dimension,
                    row * dimension,
                    dimension,
                    row,
                    (row * 2) + (column % 2 ? delay : 0)
                ));
            }
        }
    };

    p5.draw = () => {
        p5.background(200);
        tiles.forEach((tile) => {
            p5.image(tile.update(), tile.x, tile.y);
        });
    };
});
