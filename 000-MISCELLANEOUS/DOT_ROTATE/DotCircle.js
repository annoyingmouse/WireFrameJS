export class DotCircle {
  constructor(p5, fill, x, y, dotWidth, number, speed) {
    this.p5 = p5;
    this.fill = fill;
    this.x = x;
    this.y = y;
    this.dotWidth = dotWidth;
    this.number = number;
    this.circumference = this.number * (this.dotWidth * 2);
    this.diameter = this.circumference / Math.PI;
    this.step = p5.TWO_PI / this.number;
    this.increment = 0;
  }
  draw() {
    this.p5.fill(this.fill);
    this.p5.noStroke();
    for (
      let j = 0 + this.increment;
      j < this.p5.TWO_PI + this.increment;
      j += this.step
    ) {
      this.p5.circle(
        this.x + (Math.cos(j) * this.diameter) / 2,
        this.y + (Math.sin(j) * this.diameter) / 2,
        this.dotWidth,
      );
    }
    this.increment += 360 / this.number / 3600;
    if (this.increment >= this.step) {
      this.increment = 0;
    }
  }
}
