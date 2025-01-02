import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { Glyph } from "./Glyph.js";

new p5((p5) => {
  let glyph;
  p5.setup = () => {
    const canvas = p5.createCanvas(1144, 1640);
    canvas.style("display", "block");
    canvas.style("outline", "1px solid #000");
    // p5.frameRate(1);
    glyph = new Glyph(p5, 20, 20, 0.25, null, null, " ");
  };

  p5.draw = () => {
    p5.background(255);
    glyph.draw();
  };
});
