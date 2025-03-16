export class CircleWithRotatingDot {
  constructor(
    p5,
    x,
    y,
    radius,
    speed = 2,
    angle = 0,
    circleColor = "#000000",
    dotColor = "#00FFFF",
  ) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.angle = angle;
    this.circleColor = circleColor;
    this.dotColor = dotColor;
  }
  draw() {
    this.p5.fill(this.circleColor);
    this.p5.noStroke();
    this.p5.circle(this.x, this.y, this.radius * 2);
    this.p5.fill(this.dotColor);
    this.p5.circle(
      this.x + (this.radius - this.radius / 2) * this.p5.cos(this.angle),
      this.y + (this.radius - this.radius / 2) * this.p5.sin(this.angle),
      this.radius,
    );
    this.angle += this.speed;
    this.angle = this.angle % 360;

    // this.p5.push();
    // this.p5.translate(this.x, this.y);
    // this.p5.rotate(this.angle);
    //
    // this.p5.pop();
    // this.angle += this.speed;
  }
}
