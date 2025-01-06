import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { HextileLattice } from "./HextileLattice.js";
import { GridLayout } from "./GridLayout.js";

new p5((p5) => {
  const layers = [
    {
      name: "red",
      hex: "#ff00ff",
      layer: null,
      angle: 0,
    },
    {
      name: "blue",
      hex: "#0c9ad5",
      layer: null,
      angle: 180,
    },
  ];

  const drawHexagon = (context, cX, cY, r, colour) => {
    context.push();
    context.beginShape();
    context.strokeWeight(r / 3);
    context.stroke(colour);
    context.noFill();
    for (let a = 0; a < p5.TAU; a += p5.TAU / 6) {
      context.vertex(cX + r * p5.cos(a), cY + r * p5.sin(a));
    }
    context.endShape(p5.CLOSE);
    context.pop();
  };

  function rotate_and_draw(img, angle, left, right) {
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate((p5.PI / 180) * angle);
    p5.imageMode(p5.CENTER);
    p5.image(img, left, right);
    p5.pop();
  }

  p5.setup = () => {
    const w = p5.min(p5.windowWidth, p5.windowHeight);
    const hexSize = w / 40;
    const canvas = p5.createCanvas(w, w);
    layers.forEach((layer) => {
      layer.layer = p5.createGraphics(w, w);
      layer.layer.background("rgba(123, 123, 123, 0)");
      let count = 0;
      for (let y = 5; y < w; y += hexSize / 2.3) {
        for (let x = 5; x < w; x += hexSize * 1.5) {
          drawHexagon(
            layer.layer,
            x + 31.2 + hexSize * (count % 2 == 0) * 0.75,
            y + 10.8,
            hexSize / 2,
            layer.hex,
          );
        }
        count++;
      }
    });
  };

  p5.draw = () => {
    p5.background(255, 255, 255, 255);
    layers.forEach((layer) => {
      rotate_and_draw(layer.layer, layer.angle, 0, 0);
    });
    layers[1].angle += 0.05;
  };
});
