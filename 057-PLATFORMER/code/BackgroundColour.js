export class BackgroundColour {
  constructor() {
    this.backgroundBaseColour = [95, 148, 255];
    this.backgroundColour = [0, 0, 0];
  }
  getBackgroundColour(screenPosition, maxScreenPosition) {
    let colourScale = -screenPosition / maxScreenPosition;
    if (colourScale > 1) colourScale = 1;
    return [
      this.backgroundBaseColour[0] * colourScale,
      this.backgroundBaseColour[1] * colourScale,
      this.backgroundBaseColour[2] * colourScale,
    ];
  }
}
