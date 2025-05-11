export class SquareCircle {
  constructor(p5, fill, canvas_dimension, diameter, countdown = 0) {
    this.p5 = p5;
    this.fill = fill;
    this.canvas_dimension = canvas_dimension;
    this.diameter = diameter;
    this.angle = 0;
    this.roundedness = 0;
    this.roundedness_degree = this.diameter / 2 / 90;
    this.clockwise = true;
    this.countdown = countdown;
    console.log(this.roundedness_degree);
  }

  // makeShadow(img, sigma, shadowColor, opacity) {
  //   // Gaussian goes to approx. 0 at 3sigma
  //   // away from the mean; pad image with
  //   // 3sigma on all sides to give space
  //   console.log(img);
  //   const newW = img.width + 6 * sigma;
  //   const newH = img.height + 6 * sigma;
  //   const g = this.p5.createGraphics(newW, newH);
  //   g.imageMode(this.p5.CENTER);
  //   g.translate(newW/2, newH/2);
  //   // //g.tint(0, 0, 0, );
  //   g.image(img, 0, 0);
  //   g.filter(this.p5.BLUR, sigma);
  //   //
  //   // const shadow = g.get();
  //   // const c = color(shadowColor);
  //   // shadow.loadPixels();
  //   // const numVals = 4 * shadow.width * shadow.height;
  //   // for (let i = 0; i < numVals; i+=4) {
  //   //   shadow.pixels[i + 0] = c.levels[0];
  //   //   shadow.pixels[i + 1] = c.levels[1];
  //   //   shadow.pixels[i + 2] = c.levels[2];
  //   //   shadow.pixels[i + 3] *= opacity;
  //   // }
  //   // shadow.updatePixels();
  //   //
  //   // g.remove();
  //   // return shadow;
  // }

  draw() {
    this.p5.push();
    this.p5.fill(this.fill);
    this.p5.noStroke();
    this.p5.translate(this.canvas_dimension / 2, this.canvas_dimension / 2);
    this.p5.rotate(this.angle);
    this.p5.rect(
      -(this.diameter / 2),
      -(this.diameter / 2),
      this.diameter,
      this.diameter,
      this.roundedness,
    );
    // this.makeShadow(this.p5.rect(
    //   -(this.diameter / 2),
    //   -(this.diameter / 2),
    //   this.diameter,
    //   this.diameter,
    //   this.roundedness,
    // ), 10, "#390cab", 0.5)

    this.p5.pop();
    if (this.countdown === 0) {
      if (this.clockwise) {
        this.angle += 1;

        this.roundedness += this.roundedness_degree;

        if (this.angle === 90) {
          this.clockwise = false;
        }
      } else {
        this.angle -= 1;
        if (this.roundedness - this.roundedness_degree < 0) {
          this.roundedness = 0;
        } else {
          this.roundedness -= this.roundedness_degree;
        }
        if (this.angle === 0) {
          this.clockwise = true;
        }
      }
    } else {
      this.countdown -= 1;
    }
  }
}
