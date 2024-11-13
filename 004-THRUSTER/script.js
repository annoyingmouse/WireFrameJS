import Ship from "./Ship.js";

new p5((p5) => {
  const width = 800;
  const height = 800;
  let ship = null;

  p5.setup = () => {
    p5.createCanvas(width, height);
    p5.imageMode(p5.CENTER);
    p5.angleMode(p5.RADIANS);
    ship = new Ship(
      p5,
      width / 2,
      height / 2,
      ["images/spaceship.png", "images/spaceship_thrust.png"],
      0,
    );
  };

  p5.draw = () => {
    p5.background(0);
    if (p5.keyIsDown(37)) {
      ship.rotate(-0.02);
    }
    if (p5.keyIsDown(38)) {
      ship.accelerate();
      ship.trusting();
    } else {
      ship.coasting();
    }
    if (p5.keyIsDown(39)) {
      ship.rotate(0.02);
    }
    ship.draw();
  };
});
