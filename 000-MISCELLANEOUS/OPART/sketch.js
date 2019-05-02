import Square from "./Tile.js";

new p5(p5 => {

    const rows = 14;
    const columns = 14;
    const dimension = 15
    const height = rows * dimension;
    const width = columns * dimension;
    const framerate = 10;
    

    p5.setup = () => {
        p5.createCanvas(width, height);

    };

    p5.draw = () => {

    };
});