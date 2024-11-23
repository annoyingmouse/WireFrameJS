import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { Pattern } from "./Pattern.js";

new p5((p5) => {
  const layers = [
    {
      name: "red",
      layer: new Pattern(p5, 500, 500, "#ff00ff").getPattern(),
      angle: 0,
    },
    {
      name: "blue",
      layer: new Pattern(p5, 500, 500, "#00ffff").getPattern(),
      angle: 0,
    },
  ];

  p5.setup = () => {
    const canvas = p5.createCanvas(800, 800);
    canvas.style("display", "block");
    canvas.style("outline", "1px solid #000");
    p5.pixelDensity(1);
  };

  p5.draw = () => {
    p5.background(255);
    layers[1].angle += 0.1;
    layers.forEach((layer) => {
      rotate_and_draw(layer.layer, layer.angle, 0, 0);
    });
  };

  function rotate_and_draw(img, angle, left, right) {
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate((p5.PI / 180) * angle);
    p5.imageMode(p5.CENTER);
    p5.image(img, left, right);
    p5.pop();
  }
});
