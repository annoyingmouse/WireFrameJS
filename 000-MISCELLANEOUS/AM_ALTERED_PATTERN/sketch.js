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

  let animate = true;

  const reset = () => {
    const checkBox = document.getElementById("animateCheckbox");
    animate = checkBox.checked;
    const angle = document.querySelector("input[name=angle]").value;
    layers[1].angle = Number(angle);
    document.getElementById("angleLabel").innerText =
      `Angle (${layers[1].angle.toFixed(1)})`;
  };

  const addCheckbox = () => {
    const fieldSet = document.getElementById("fieldSet");
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    fieldSet.append(div);
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", "animateCheckbox");
    checkBox.setAttribute("name", "animateCheckbox");
    checkBox.setAttribute("checked", animate);
    checkBox.addEventListener("change", reset);
    const label = document.createElement("label");
    label.setAttribute("for", "animateCheckbox");
    label.style.marginLeft = "1rem";
    label.innerText = "Automatic rotation";
    div.append(checkBox);
    div.append(label);
  };

  const addSlider = () => {
    const fieldSet = document.getElementById("fieldSet");
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    const input = document.createElement("input");
    input.setAttribute("type", "range");
    input.setAttribute("min", 0);
    input.setAttribute("max", 90);
    input.setAttribute("value", layers[1].angle);
    input.setAttribute("name", `angle`);
    input.addEventListener("input", reset);
    const label = document.createElement("label");
    label.setAttribute("for", `angle`);
    label.setAttribute("id", "angleLabel");
    label.innerText = `Angle (${layers[1].angle.toFixed(1)})`;
    label.style.marginLeft = "1rem";
    div.append(input);
    div.append(label);
    fieldSet.append(div);
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
    varFieldSet.style("grid-template-columns", "1fr");
    varFieldSet.style("grid-gap", "10px");
    varFieldSet.style("margin", "0");
    const legend = p5.createElement("legend");
    legend.elt.innerText = `Change angle`;
    varForm.child(varFieldSet);
    varFieldSet.child(legend);
    addCheckbox();
    addSlider();
  };

  p5.draw = () => {
    p5.background(255);
    if (animate) {
      layers[1].angle += 0.1;
      if (layers[1].angle > 90) layers[1].angle = 0;
    }
    layers.forEach((layer) => {
      rotate_and_draw(layer.layer, layer.angle, 0, 0);
    });
    document.getElementById("angleLabel").innerText =
      `Angle (${layers[1].angle.toFixed(1)})`;
    document.querySelector("input[name=angle]").value = layers[1].angle;
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
