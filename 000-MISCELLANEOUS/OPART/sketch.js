import Tile from "./Tile.js";

new p5(p5 => {

    const rows = 14;
    const columns = 14;
    const dimension = 15
    const height = rows * dimension;
    const width = columns * dimension;
    const framerate = 10;
    const tiles = [];
    

    p5.setup = () => {
        p5.createCanvas(width, height);
        p5.frameRate(framerate);
        for(let r = 0; r < rows; r++){
            for(let c = 0; c < columns; c++){
                tiles.push(new Tile(p5, c * dimension, r * dimension, dimension, dimension, r));
            }
        }
    };

    p5.draw = () => {
        tiles.forEach((tile) => tile.update());
    };
});