import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";

new p5((p5) => {
  let background;
  let foreground;
  let angle = 0;

  p5.preload = () => {
    background = p5.loadImage("./images/background.png");
    foreground = p5.loadImage("./images/rotatable.png");
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(800, 800);
    canvas.style("display", "block");
    canvas.style("outline", "1px solid #000");
    p5.imageMode(p5.CENTER);
    // p5.angleMode(p5.DEGREES);
  };

  p5.draw = () => {
    p5.background(255);
    p5.fill(0);
    p5.translate(p5.width / 2, p5.height / 2);
    p5.image(background, 0, 0);
    p5.push();
    p5.rotate((p5.PI / 180) * angle);
    p5.image(foreground, 0, 0);
    p5.pop();
    angle += 0.1;
  };
});
