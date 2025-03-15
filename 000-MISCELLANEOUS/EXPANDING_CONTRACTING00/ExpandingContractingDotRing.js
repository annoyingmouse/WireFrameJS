export class ExpandingContractingDotRing {
  constructor(p5, fill, x, y, initialDotWidth, dotWidth, number) {
    this.p5 = p5;
    this.fill = fill;
    this.x = x;
    this.y = y;
    this.initialDotWidth = initialDotWidth;
    this.dotWidth = dotWidth;
    this.number = number;
    this.circumference = this.number * this.initialDotWidth;
    this.diameter = this.circumference / Math.PI;
    this.step = p5.TWO_PI / this.number;
    this.increment = 0;
    this.growing = false;
  }
  draw() {
    this.p5.fill(this.fill);
    this.p5.noStroke();
    for (
      let j = 0 + this.increment;
      j < this.p5.TWO_PI + this.increment;
      j += this.step
    ) {
      if (this.dotWidth > 0) {
        this.p5.circle(
          this.x + (Math.cos(j) * this.diameter) / 2,
          this.y + (Math.sin(j) * this.diameter) / 2,
          this.dotWidth,
        );
      }
    }
  }
}
