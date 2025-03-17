import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { Pattern } from "./Pattern.js";

new p5((p5) => {
  const layers = [
    {
      name: "red",
      layer: new Pattern(p5, 490, 490, "#ff00ff").getPattern(),
      angle: 180,
      scale: 1,
      growing: true,
      top: true,
    },
    {
      name: "blue",
      layer: new Pattern(p5, 490, 490, "#00ffff").getPattern(),
      angle: 0,
      scale: 1,
      growing: false,
      top: false,
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
    // Rotate
    layers[0].angle -= 0.05;
    if (layers[0].angle < 0) {
      layers[0].angle = 180;
    }
    layers[1].angle += 0.05;
    if (layers[1].angle > 180) {
      layers[1].angle = 0;
    }
    // Scale
    if (layers[0].growing) {
      layers[0].scale += 0.001;
      if (layers[0].scale >= 1.1) layers[0].growing = false;
    } else {
      layers[0].scale -= 0.001;
      if (layers[0].scale <= 0.9) layers[0].growing = true;
    }
    if (layers[1].growing) {
      layers[1].scale += 0.001;
      if (layers[1].scale >= 1.1) layers[1].growing = false;
    } else {
      layers[1].scale -= 0.001;
      if (layers[1].scale <= 0.9) layers[1].growing = true;
    }
    if (layers[1].top) {
      rotate_and_draw(layers[1].layer, layers[1].angle, 0, 0, layers[1].scale);
      rotate_and_draw(layers[0].layer, layers[0].angle, 0, 0, layers[0].scale);
    } else {
      rotate_and_draw(layers[0].layer, layers[0].angle, 0, 0, layers[0].scale);
      rotate_and_draw(layers[1].layer, layers[1].angle, 0, 0, layers[1].scale);
    }
  };

  function rotate_and_draw(img, angle, left, right, scale) {
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate((p5.PI / 180) * angle);
    p5.imageMode(p5.CENTER);
    p5.scale(scale);
    p5.image(img, left, right);
    p5.pop();
  }
});
