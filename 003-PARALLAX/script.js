import Layer from "./Layer.js";

new p5((p5) => {
  const layers = [];
  const width = 800;
  const height = 400;

  p5.setup = () => {
    p5.createCanvas(width, height);
    layers.push(new Layer(p5, 0, 0, 1, "images/image_back.png"));
    layers.push(new Layer(p5, 0, 0, 3, "images/image_middle.png"));
    layers.push(new Layer(p5, 0, 0, 5, "images/image_front.png"));
  };

  p5.draw = () => {
    p5.background(255);
    layers.forEach((layer) => layer.move());
  };
});
