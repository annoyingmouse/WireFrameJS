export class ThreeQuartersCircle {
  constructor(
    p5,
    {
      diameter,
      colour = "#000000",
      notchAngle,
      orbitCenterX,
      orbitCenterY,
      orbitRadius = 0,
      orbitAngle = 0,
      orbitSpeed = 0,
    },
  ) {
    this.p5 = p5;
    this.diameter = diameter;
    this.colour = colour;

    this.baseNotchAngle = notchAngle;
    this.baseOrbitAngle = orbitAngle;
    this.orbitCenterX = orbitCenterX;
    this.orbitCenterY = orbitCenterY;
    this.orbitRadius = orbitRadius;
    this.orbitSpeed = orbitSpeed;
    this.orbitProgress = 0;

    this.notchAngle = notchAngle;
    this.orbitAngle = orbitAngle;

    this.x = orbitCenterX + orbitRadius * p5.cos(orbitAngle);
    this.y = orbitCenterY + orbitRadius * p5.sin(orbitAngle);
  }

  // The notch holds still, then clicks through two 45° turns clustered
  // around the moment the assembly is exactly cross-aligned (orbit
  // progress 45° into its 90° cycle), then holds again, repeating every
  // 90° of orbit progress: hold 0-20°, spin 20-45°, spin 45-60°, hold
  // 60-90°.
  #notchOffset = (progress) => {
    const clicks = Math.floor(progress / 90);
    const cycle = progress - clicks * 90;
    let withinCycle;
    if (cycle < 20) withinCycle = 0;
    else if (cycle < 45) withinCycle = (45 * (cycle - 20)) / 25;
    else if (cycle < 60) withinCycle = 45 + (45 * (cycle - 45)) / 15;
    else withinCycle = 90;
    return clicks * 90 + withinCycle;
  };

  draw = () => {
    this.p5.noStroke();
    this.p5.fill(this.colour);
    this.p5.arc(
      this.x,
      this.y,
      this.diameter,
      this.diameter,
      this.notchAngle,
      this.notchAngle + 270,
    );

    this.orbitProgress += this.orbitSpeed;
    this.orbitAngle = this.baseOrbitAngle + this.orbitProgress;
    this.notchAngle = this.baseNotchAngle + this.#notchOffset(this.orbitProgress);

    if (this.orbitRadius > 0) {
      this.x = this.orbitCenterX + this.orbitRadius * this.p5.cos(this.orbitAngle);
      this.y = this.orbitCenterY + this.orbitRadius * this.p5.sin(this.orbitAngle);
    }
  };
}
