import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";

new p5((p5) => {
  let n = 0;
  const c = 4;
  p5.setup = () => {
    p5.createCanvas(400, 400);
    p5.angleMode(p5.DEGREES);
    p5._colorMode = p5.HSB;
    p5.background(0);
  };

  p5.draw = () => {
    // if(n % 3 === 0) {
    const a = n * 137.5;
    const r = c * p5.sqrt(n);
    const x = r * Math.cos(a) + p5.width / 2;
    const y = r * Math.sin(a) + p5.height / 2;
    p5.fill(n % 255, 255, 255);
    p5.noStroke();
    p5.ellipse(x, y, 4, 4);

    // }
    n++;
  };
});
