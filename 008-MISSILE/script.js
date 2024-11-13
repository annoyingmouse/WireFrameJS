import Missile from "./Missile.js";

new p5((p5) => {
  const width = 800;
  const height = 800;
  const missiles = [];

  p5.setup = () => {
    p5.createCanvas(width, height);
    p5.background(0);
    missiles.push(new Missile(p5, p5.random(600, 800), p5.random(-70, -10)));
    setInterval(
      () =>
        missiles.push(
          new Missile(p5, p5.random(600, 800), p5.random(-70, -10)),
        ),
      2000,
    );
  };

  p5.draw = () => {
    p5.background(0);
    let index = missiles.length;
    while ((index -= 1)) {
      if (missiles[index].trail.length > 1200) {
        missiles.splice(index, 1);
      } else {
        missiles[index].step();
      }
    }
  };
});
