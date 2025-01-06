import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { HextileLattice } from "./HextileLattice.js";
import { GridLayout } from "./GridLayout.js";

new p5((p5) => {
  const w = p5.min(p5.windowWidth, p5.windowHeight);
  const tenth = w / 10;
  const layers = [];

  function rotate_and_draw(img, angle, left, right) {
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate((p5.PI / 180) * angle);
    p5.imageMode(p5.CENTER);
    p5.image(img, left, right);
    p5.pop();
  }

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
    legend.innerText = `Layer angles`;
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
    const input = p5.createSlider(0, 90, angle, 5);
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
    const canvas = p5.createCanvas(
      p5.min(p5.windowWidth, p5.windowHeight),
      p5.min(p5.windowWidth, p5.windowHeight),
    );
    layers.push({
      name: "red",
      layer: new HextileLattice(p5, w, w, tenth, "#ff00ff").getPattern(),
      angle: 75,
    });
    layers.push({
      name: "blue",
      layer: new HextileLattice(p5, w, w, tenth, "#0c9ad5").getPattern(),
      angle: 15,
    });
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
});
