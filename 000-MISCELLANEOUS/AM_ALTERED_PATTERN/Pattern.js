export class Pattern {
  constructor(p5, width, height, colour) {
    this.p5 = p5;
    this.colour = colour;
    this.patternCnv = p5.createGraphics(490, 100);
    this.bufferCnv = p5.createGraphics(width, height);
    this.pattern = null;
  }
  isOdd = (num) => num % 2;
  getPattern = () => {
    this.p5.pixelDensity(1);
    this.patternCnv.pixelDensity(1);
    this.bufferCnv.pixelDensity(1);
    // Draw a pattern
    this.patternCnv.fill(this.colour);
    this.patternCnv.noStroke();
    for (let x = 0; x < 49; x++) {
      for (let y = 0; y < 10; y++) {
        if (this.isOdd(y)) {
          if (!this.isOdd(x)) {
            this.patternCnv.ellipse(x * 10 + 5, y * 10 + 5, 10);
          }
        } else {
          if (this.isOdd(x)) {
            this.patternCnv.ellipse(x * 10 + 5, y * 10 + 5, 10);
          }
        }
      }
    }
    this.patternCnv.noFill();
    this.patternCnv.stroke(0, 0, 0);
    this.patternCnv.strokeWeight(1);
    // this.patternCnv.rect(0,0,500,100)
    this.pattern = this.setupPattern();
    this.setFill();
    this.bufferCnv.noStroke();
    this.bufferCnv.square(0, 0, this.bufferCnv.width);
    return this.bufferCnv;
  };
  setupPattern = () =>
    this.bufferCnv.drawingContext.createPattern(
      this.patternCnv.canvas,
      "repeat",
    );
  setFill = () => {
    this.bufferCnv.fill(0);
    this.bufferCnv._renderer._setFill(this.pattern);
  };
}
