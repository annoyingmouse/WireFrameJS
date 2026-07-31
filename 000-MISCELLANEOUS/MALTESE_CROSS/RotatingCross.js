export class RotatingCross {
  constructor(
    p5,
    fill = "#000000",
    x,
    y,
    width = 45,
    angle = 0,
    velocity = 0.01,
    pause = 0,
    delay = 120,
    clockwise = true,
    startDelay = 0,
    restDelay = delay
  ) {
    this.p5 = p5;
    this.fill = fill;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.width = width;
    this.halfWidth = width / 2;
    this.thirdWidth = width / 3;
    this.twoThirdsWidth = this.thirdWidth * 2;
    this.velocity = velocity;
    this.clockwise = clockwise;
    this.pause = pause + startDelay;
    this.delay = delay;
    this.restDelay = restDelay;
    this.activeRemaining = delay;
  }
  get isActive() {
    return this.pause === 0;
  }
  draw() {
    this.p5.noStroke();
    this.p5.fill(this.fill);
    this.p5.push();
    this.p5.translate(this.x + this.halfWidth, this.y + this.halfWidth);
    this.p5.rotate(this.angle);
    this.p5.beginShape();
    this.p5.vertex(this.thirdWidth - this.halfWidth, -this.halfWidth);
    this.p5.vertex(this.twoThirdsWidth - this.halfWidth, -this.halfWidth);
    this.p5.vertex(this.twoThirdsWidth - this.halfWidth, this.thirdWidth - this.halfWidth);
    this.p5.vertex(this.width - this.halfWidth, this.thirdWidth - this.halfWidth);
    this.p5.vertex(this.width - this.halfWidth, this.twoThirdsWidth - this.halfWidth);
    this.p5.vertex(this.twoThirdsWidth - this.halfWidth, this.twoThirdsWidth - this.halfWidth);
    this.p5.vertex(this.twoThirdsWidth - this.halfWidth, this.width - this.halfWidth);
    this.p5.vertex(this.thirdWidth - this.halfWidth, this.width - this.halfWidth);
    this.p5.vertex(this.thirdWidth - this.halfWidth, this.twoThirdsWidth - this.halfWidth);
    this.p5.vertex(-this.halfWidth, this.twoThirdsWidth - this.halfWidth);
    this.p5.vertex(-this.halfWidth, this.thirdWidth - this.halfWidth);
    this.p5.vertex(this.thirdWidth - this.halfWidth, this.thirdWidth - this.halfWidth);
    this.p5.endShape(this.p5.CLOSE);
    this.p5.pop();
    if (this.pause > 0) {
      this.pause -= 1;
    } else {
      this.angle += this.clockwise ? this.velocity : -this.velocity;
      this.activeRemaining -= 1;
      if (this.activeRemaining <= 0) {
        this.pause = this.restDelay;
        this.activeRemaining = this.delay;
      }
    }
  }
}
