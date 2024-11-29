import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { GridLayout } from "./GridLayout.js";
import { Pattern } from "./Pattern.js";

new p5((p5) => {
  const layers = [
    {
      name: "red",
      layer: new Pattern(p5, 490, 490, "#d4097b").getPattern(),
      angle: 45,
    },
    {
      name: "blue",
      layer: new Pattern(p5, 490, 490, "#0c9ad5").getPattern(),
      angle: 15,
    },
    {
      name: "yellow",
      layer: new Pattern(p5, 490, 490, "#faef0f").getPattern(),
      angle: 90,
    },
    {
      name: "black",
      layer: new Pattern(p5, 490, 490, "#000000").getPattern(),
      angle: 165,
    },
  ];

  const reset = () => {
    const fieldSet = document.getElementById("fieldSet");
    const order = [];
    fieldSet.querySelectorAll(".isDraggable").forEach((block) => {
      if (block.hasAttribute("id")) {
        order.push(block.getAttribute("id"));
        block.querySelector("label").innerText =
          `${block.getAttribute("id")} angle (${p5.select(`input[name=${block.getAttribute("id")}_angle`).value()})`;
      }
    });
    layers.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
    layers.forEach((layer) => {
      layer.angle = p5.select(`input[name=${layer.name}_angle`).value();
    });
    const legend = fieldSet.querySelector("legend");
    legend.innerText = `Layer angles (draggable, bottom to top: ${layers.map((layer) => layer.name).join(", ")})`;
  };

  const createSlider = (angle, colour) => {
    const block = p5.createDiv();
    block.elt.classList.add("BlockWrapper");
    const div = p5.createDiv();
    div.elt.classList.add("isDraggable");
    div.elt.setAttribute("id", colour);
    div.style("padding", ".5rem");
    div.style("border", "1px solid #000");
    block.child(div);
    const input = p5.createSlider(0, 190, angle, 5);
    input.elt.setAttribute("name", `${colour}_angle`);
    const label = document.createElement("LABEL");
    label.setAttribute("for", `${colour}_angle`);
    label.classList.add("label");
    label.innerText = `${colour} angle (${angle})`;
    label.style.textTransform = "capitalize";
    label.style.cursor = "move";
    div.child(label);
    div.child(input);
    document.getElementById("fieldSet").appendChild(block.elt);
    input.input(reset);
    return input;
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(800, 800);
    canvas.style("display", "block");
    canvas.style("outline", "1px solid #000");
    p5.pixelDensity(1);
    const varForm = p5.createElement("form");
    const varFieldSet = p5.createElement("fieldset");
    varFieldSet.elt.setAttribute("id", "fieldSet");
    varFieldSet.style("display", "grid");
    varFieldSet.style("grid-template-columns", "1fr 1fr");
    varFieldSet.style("grid-gap", "10px");
    varFieldSet.style("margin", "1rem");
    const legend = p5.createElement("legend");
    legend.elt.innerText = `Layer angles (draggable, bottom to top: ${layers.map((layer) => layer.name).join(", ")})`;
    varForm.child(varFieldSet);
    varFieldSet.child(legend);
    layers.forEach((layer) => {
      createSlider(layer.angle, layer.name);
    });
    reset();
    const swappable = GridLayout();
    swappable.on("swappable:stop", () => {
      reset();
    });
  };

  p5.draw = () => {
    p5.background(255);
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
