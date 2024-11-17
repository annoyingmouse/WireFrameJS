import { drawSquare } from "./drawSquare.js";

export class Colon {
  constructor(p5, backGroundColour, x, y, unitWidth, unitHeight, orange) {
    this.p5 = p5;
    this.backGroundColour = backGroundColour;
    this.x = x;
    this.y = y;
    this.unitWidth = unitWidth;
    this.unitHeight = unitHeight;
    this.orange = orange || "#FF3131";
    this.pg = p5.createGraphics(unitWidth, unitHeight * 5);
  }
  draw() {
    this.pg.noStroke();
    this.pg.fill(this.backGroundColour);
    this.pg.rect(0, 0, this.unitWidth * 1, this.unitHeight * 5);
    this.figure = [0, 1, 0, 1, 0];
    for (let y = 0; y < this.figure.length; y++) {
      if (this.figure[y] === 1) {
        drawSquare(
          this.pg,
          0,
          y * this.unitHeight,
          this.unitWidth,
          this.unitHeight,
          this.orange,
          true,
        );
      }
    }
    return this.p5.image(this.pg, this.x, this.y);
  }
}
