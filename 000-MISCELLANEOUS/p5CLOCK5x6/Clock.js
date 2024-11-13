export class Clock {
  constructor(p5, x, y, width, multiplier) {
    this.degrees = 8 * multiplier;
    this.ticker = false;
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.width = width;
    this.arm = 1.2;
    this.minute = 0;
    this.hour = 0;
    this.pg = p5.createGraphics(width, width);
  }

  update(minute, hour) {
    if (this.minute !== minute) {
      if (this.minute + 1 === this.degrees) {
        this.minute = 0;
      } else {
        this.minute++;
      }
    }
    if (this.hour !== hour) {
      if (this.hour - 1 < 0) {
        this.hour = this.degrees;
      } else {
        this.hour--;
      }
    }
    return this.draw();
  }

  draw() {
    this.pg.noStroke();
    this.pg.fill(255);
    this.pg.rect(0, 0, this.width, this.width);
    this.pg.stroke(0);
    this.pg.strokeWeight(this.width * 0.1);
    let m =
      this.p5.map(this.minute, 0, this.degrees, 0, this.p5.TWO_PI) -
      this.p5.HALF_PI;
    let h =
      this.p5.map(this.hour, 0, this.degrees, 0, this.p5.TWO_PI) -
      this.p5.HALF_PI;
    this.pg.line(
      this.width / 2,
      this.width / 2,
      this.width / 2 + this.p5.cos(m) * ((this.width / 2) * this.arm),
      this.width / 2 + this.p5.sin(m) * ((this.width / 2) * this.arm),
    );
    this.pg.line(
      this.width / 2,
      this.width / 2,
      this.width / 2 + this.p5.cos(h) * ((this.width / 2) * this.arm),
      this.width / 2 + this.p5.sin(h) * ((this.width / 2) * this.arm),
    );
    this.p5.image(this.pg, this.x, this.y);
  }
}
