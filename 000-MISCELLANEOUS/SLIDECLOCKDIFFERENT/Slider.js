export class Slider {
  constructor(p5, x, y, unitWidth, unitHeight, black, positions) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.unitWidth = unitWidth;
    this.unitHeight = unitHeight;
    this.black = black || "#000000";
    this.pg = p5.createGraphics(unitWidth, unitHeight);
    this.positions = [...positions];
    this.number = 0;
    this.x = this.positions[this.number][0] * this.unitWidth;
    this.y = this.positions[this.number][1] * this.unitHeight;
  }

  update(num) {
    this.number = num;
    if (this.positions[num][0] * this.unitWidth !== this.x) {
      if (this.positions[num][0] * this.unitWidth > this.x) {
        this.x += this.unitWidth / this.unitHeight;
      } else {
        this.x -= this.unitWidth / this.unitHeight;
      }
    }
    if (this.positions[num][1] * this.unitHeight !== this.y) {
      if (this.positions[num][1] * this.unitHeight > this.y) {
        this.y += 1;
      } else {
        this.y -= 1;
      }
    }
  }
}
