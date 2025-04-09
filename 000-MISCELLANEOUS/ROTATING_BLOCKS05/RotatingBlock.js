export class RotatingBlock {
  constructor(
    p5,
    backgroundColour = "#000000",
    fill = "#FFFFFF",
    x,
    y,
    width,
    angle = 0,
    velocity = 0.01,
  ) {
    this.p5 = p5;
    this.backgroundColour = backgroundColour;
    this.fill = fill;
    this.x = x - width / 4;
    this.y = y - width / 4;
    this.angle = angle;
    this.width = width * 1.5;
    this.height = width * 1.5;
    this.velocity = velocity;
    this.clockwise = true;
  }
  draw() {
    this.p5.fill(this.backgroundColour);
    this.p5.noStroke();
    this.p5.rect(this.x, this.y, this.width, this.height);
    this.p5.fill(this.fill);
    this.p5.push();
    this.p5.translate(this.x + this.height / 2, this.y + this.height / 2);
    this.p5.rotate(this.angle);
    this.p5.rect(
      -(this.width / 6),
      -(this.height / 2),
      this.width / 3,
      this.height,
    );
    this.p5.pop();
    if (this.clockwise) {
      this.angle += this.velocity;
    } else {
      this.angle -= this.velocity;
    }
    if (this.angle % 360 === 0) {
      this.clockwise = !this.clockwise;
    }
  }
}
