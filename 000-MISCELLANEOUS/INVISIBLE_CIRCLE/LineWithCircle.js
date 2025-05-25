export class Disk {
  constructor(
    p5,
    x,
    y,
    radius,
    startAngle,
    tenth,
    onColour,
    offColour,
    translateTo,
    translateBackTo,
  ) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.tenth = tenth;
    this.onColour = onColour || "#FFFFFF";
    this.offColour = offColour || "#000000";
    this.startAngle = startAngle || 0;
    this.originalStartAngle = startAngle || 0;
    this.translateTo = translateTo || 0;
    this.originalTranslateTo = translateTo || 0;
    this.translateBackTo = translateBackTo || 0;
    this.firstPhase = true;
    this.increment = (this.translateTo - this.startAngle) / 100;
    this.sixteenth = 360 / 16;
  }
  draw = () => {
    this.p5.noStroke();
    this.p5.fill(this.onColour);
    this.p5.circle(this.x, this.y, this.radius);

    for (let i = 0; i < 16; i++) {
      const x =
        (this.radius / 2 - this.tenth / 4) *
          this.p5.cos(this.sixteenth * i + this.startAngle) +
        this.x;
      const y =
        (this.radius / 2 - this.tenth / 4) *
          this.p5.sin(this.sixteenth * i + this.startAngle) +
        this.y;
      this.p5.noStroke();
      this.p5.fill(this.offColour);
      this.p5.circle(x, y, this.tenth / 4);
    }

    if (this.startAngle < this.translateTo) {
      if (this.startAngle + this.increment >= this.translateTo) {
        this.startAngle = this.translateTo;
      } else {
        this.startAngle += this.increment;
      }
    }
  };
}
