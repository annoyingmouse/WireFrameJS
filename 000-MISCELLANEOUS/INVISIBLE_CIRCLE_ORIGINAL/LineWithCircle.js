import { easeOutSine as easing } from "./Easings.js";
export class LineWithCircle {
  constructor(
    p5,
    centerX,
    centerY,
    radius,
    rotationAngle,
    steps,
    startingStep,
    dotSize,
    dotColour = "#000000",
    strokeWeight = 1,
    strokeColour = "#000000",
  ) {
    this.p5 = p5;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.rotationAngle = rotationAngle;
    this.steps = steps;
    this.startingStep = startingStep;
    this.dotSize = dotSize;
    this.dotColour = dotColour;
    this.strokeWeight = strokeWeight;
    this.strokeColour = strokeColour;
    this.x1 = null;
    this.y1 = null;
    this.x2 = null;
    this.y2 = null;
    this.calculateRotatedLineEndPoints();
    this.expanding = true;
    this.stepIncrement = 0.05;
  }
  easeOutQuad = (x) => 1 - (1 - x) * (1 - x);
  calculateRotatedLineEndPoints = () => {
    this.x1 =
      this.centerX +
      (this.radius + this.dotSize) * this.p5.cos(this.rotationAngle);
    this.y1 =
      this.centerY +
      (this.radius + this.dotSize) * this.p5.sin(this.rotationAngle);
    this.x2 =
      this.centerX -
      (this.radius + this.dotSize) * this.p5.cos(this.rotationAngle);
    this.y2 =
      this.centerY -
      (this.radius + this.dotSize) * this.p5.sin(this.rotationAngle);
  };
  draw = () => {
    this.p5.stroke(this.strokeColour);
    this.p5.strokeWeight(this.strokeWeight);
    this.p5.line(this.x1, this.y1, this.x2, this.y2);
    this.p5.noStroke();

    if (this.expanding) {
      this.startingStep = Math.min(
        this.steps,
        this.startingStep + this.stepIncrement,
      );
      if (this.startingStep === this.steps) {
        this.expanding = false;
      }
    } else {
      this.startingStep = Math.max(0, this.startingStep - this.stepIncrement);
      if (this.startingStep === 0) {
        this.expanding = true;
      }
    }
    const rawPosition =
      (this.radius * (this.startingStep * 2 - this.steps)) / this.steps;
    const isNegative = rawPosition < 0;
    const normalizedAbsPosition = Math.abs(rawPosition) / this.radius;
    const easedNormalizedPosition = easing(normalizedAbsPosition);
    const easedMagnitude = easedNormalizedPosition * this.radius;
    const easedPosition = isNegative ? -easedMagnitude : easedMagnitude;
    const circleX =
      this.centerX + this.p5.cos(this.rotationAngle) * easedPosition;
    const circleY =
      this.centerY + this.p5.sin(this.rotationAngle) * easedPosition;
    this.p5.fill(this.dotColour);
    this.p5.circle(circleX, circleY, this.dotSize);
  };
}
