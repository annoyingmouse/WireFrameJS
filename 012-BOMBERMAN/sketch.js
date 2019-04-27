import Wall from "./Wall.js"
import Ground from "./Ground.js"
import Player from "./Player.js"
import Bricks from "./Bricks.js"

new p5(p5 => {

    const size = 45;

    const width = size * 45 - 5;
    const height = size * 45 - 5;
    const Walls = [];
    const Ground = [];
    const Player = [];
    const Bricks = [];

    p5.setup = () => {
        p5.createCanvas(width, height);

    };

    p5.draw = () => {

    };
});