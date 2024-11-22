import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { Pattern } from "./Pattern.js";

new p5((p5) => {
  const blackLayer = new Pattern(p5, 500, 500, 0).getPattern();
  let blackAngle = 45;
  const redLayer = new Pattern(p5, 500, 500, "#d4097b").getPattern();
  let redAngle = 75;
  const blueLayer = new Pattern(p5, 500, 500, "#0c9ad5").getPattern();
  let blueAngle = 15;
  const yellowLayer = new Pattern(p5, 500, 500, "#faef0f").getPattern();
  let yellowAngle = 0;
  let varForm,
    varFieldSet,
    blackAngleInput,
    redAngleInput,
    blueAngleInput,
    yellowAngleInput;

  const reset = () => {
    blackAngle = blackAngleInput.value();
    redAngle = redAngleInput.value();
    blueAngle = blueAngleInput.value();
    yellowAngle = yellowAngleInput.value();
  };

  const createSlider = (angle, colour) => {
    const div = p5.createDiv();
    const input = p5.createSlider(0, 90, angle, 5);
    input.elt.setAttribute("name", `${colour}_angle`);
    const label = document.createElement("LABEL");
    label.setAttribute("for", `${colour}_angle`);
    label.innerText = `${colour} angle`;
    div.child(label);
    div.child(input);
    varFieldSet.child(div);
    input.input(reset);
    return input;
  };

  p5.setup = () => {
    p5.createCanvas(800, 800);
    p5.pixelDensity(1);
    varForm = p5.createElement("form");
    varFieldSet = p5.createElement("fieldset");
    varFieldSet.elt.setAttribute("id", "varFieldSet");
    const legend = p5.createElement("legend");
    legend.html("Editable values");
    varForm.child(varFieldSet);
    varFieldSet.child(legend);
    yellowAngleInput = createSlider(yellowAngle, "yellow");
    blueAngleInput = createSlider(blueAngle, "blue");
    redAngleInput = createSlider(redAngle, "red");
    blackAngleInput = createSlider(blackAngle, "black");
  };

  p5.draw = () => {
    p5.background(255);
    console.log(yellowAngle, blueAngle, redAngle, blackAngle);
    rotate_and_draw(yellowLayer, yellowAngle, 0, 0);
    rotate_and_draw(blueLayer, blueAngle, 0, 0);
    rotate_and_draw(redLayer, redAngle, 0, 0);
    rotate_and_draw(blackLayer, blackAngle, 0, 0);
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
