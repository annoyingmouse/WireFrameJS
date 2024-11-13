export default class Bat {
  constructor(p5, x, y) {
    this.p5 = p5;
    this.width = 80;
    this.height = 12;
    this.x = x - this.width / 2;
    this.y = y;
  }

  draw() {
    this.p5.fill("pink");
    this.p5.noStroke();
    this.p5.rect(this.x, this.y, this.width, this.height);
  }

  move(amount) {
    this.x = amount - this.width / 2;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > this.p5.width) {
      this.x = this.p5.width - this.width;
    }
  }
}
