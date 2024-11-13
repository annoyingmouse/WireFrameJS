export default class Brick {
  constructor(p5, x, y, width, height, colour) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = colour;
  }

  draw() {
    this.p5.noStroke();
    this.p5.fill(...this.colour);
    this.p5.rect(this.x, this.y, this.width, this.height);
  }
}
