import Tile from "./Tile.js";

new p5((p5) => {
  const style = window.getComputedStyle(document.querySelector("body"), null);
  const bodyWidth = parseInt(style.getPropertyValue("width"));
  const tiles = [];
  const maps = [
    [
      0, 90, 0, 90, 0, 90, 0, 90, 0, 90, 0, 90, 90, 0, 90, 0, 90, 0, 90, 0, 90,
      0, 90, 0, 0, 90, 0, 90, 0, 90, 0, 90, 0, 90, 0, 90, 90, 0, 90, 0, 90, 0,
      90, 0, 90, 0, 90, 0, 0, 90, 0, 90, 0, 90, 0, 90, 0, 90, 0, 90, 90, 0, 90,
      0, 90, 0, 90, 0, 90, 0, 90, 0, 0, 90, 0, 90, 0, 90, 0, 90, 0, 90, 0, 90,
      90, 0, 90, 0, 90, 0, 90, 0, 90, 0, 90, 0, 0, 90, 0, 90, 0, 90, 0, 90, 0,
      90, 0, 90, 90, 0, 90, 0, 90, 0, 90, 0, 90, 0, 90, 0, 0, 90, 0, 90, 0, 90,
      0, 90, 0, 90, 0, 90, 90, 0, 90, 0, 90, 0, 90, 0, 90, 0, 90, 0,
    ],
    [
      0, 90, 90, 0, 0, 90, 90, 0, 0, 90, 90, 0, 0, 90, 90, 0, 0, 90, 90, 0, 0,
      90, 90, 0, 90, 0, 0, 90, 90, 0, 0, 90, 90, 0, 0, 90, 90, 0, 0, 90, 90, 0,
      0, 90, 90, 0, 0, 90, 0, 90, 90, 0, 0, 90, 90, 0, 0, 90, 90, 0, 0, 90, 90,
      0, 0, 90, 90, 0, 0, 90, 90, 0, 90, 0, 0, 90, 90, 0, 0, 90, 90, 0, 0, 90,
      90, 0, 0, 90, 90, 0, 0, 90, 90, 0, 0, 90, 0, 90, 90, 0, 0, 90, 90, 0, 0,
      90, 90, 0, 0, 90, 90, 0, 0, 90, 90, 0, 0, 90, 90, 0, 90, 0, 0, 90, 90, 0,
      0, 90, 90, 0, 0, 90, 90, 0, 0, 90, 90, 0, 0, 90, 90, 0, 0, 90,
    ],
    [
      0, 0, 0, 0, 0, 0, 90, 90, 90, 90, 90, 90, 0, 0, 0, 0, 0, 0, 90, 90, 90,
      90, 90, 90, 0, 0, 0, 0, 0, 0, 90, 90, 90, 90, 90, 90, 0, 0, 0, 0, 0, 0,
      90, 90, 90, 90, 90, 90, 0, 0, 0, 0, 0, 0, 90, 90, 90, 90, 90, 90, 0, 0, 0,
      0, 0, 0, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 0, 0, 0, 0, 0, 0,
      90, 90, 90, 90, 90, 90, 0, 0, 0, 0, 0, 0, 90, 90, 90, 90, 90, 90, 0, 0, 0,
      0, 0, 0, 90, 90, 90, 90, 90, 90, 0, 0, 0, 0, 0, 0, 90, 90, 90, 90, 90, 90,
      0, 0, 0, 0, 0, 0, 90, 90, 90, 90, 90, 90, 0, 0, 0, 0, 0, 0,
    ],
  ];
  const dimension = 57;
  const spinning = 3;
  let canvas;
  let img;
  let map = 0;
  let next = 1;
  let pause = 0;
  const delay = 180;
  p5.setup = () => {
    p5.angleMode(p5.DEGREES);
    canvas = p5.createCanvas(bodyWidth, bodyWidth);
    canvas.parent("canvasContainer");
    img = p5.loadImage("assets/segment.png");
    let counter = 0;
    for (let y = 0; y < bodyWidth; y += dimension) {
      for (let x = 0; x < bodyWidth; x += dimension) {
        maps[1][counter] !== null &&
          tiles.push(new Tile(p5, x, y, dimension, img, maps[map][counter]));
        counter++;
      }
    }
  };
  p5.draw = () => {
    p5.background(p5.color(223, 222, 219));
    tiles.forEach((tile) => {
      tile.draw();
    });
    if (tiles.filter((tile) => tile.rotating).length < spinning) {
      const unRotating = tiles.filter(
        (value, index) => !value.rotating && value.degree !== maps[next][index],
      );
      if (unRotating.length) {
        unRotating[~~(Math.random() * unRotating.length)].rotate();
      } else {
        next = maps[next + 1] ? next + 1 : 0;
      }
    }
  };
});
