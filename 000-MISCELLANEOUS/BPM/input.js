import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { DSEG14 } from "./DSEG14.js";
import { characters, filterString } from "./utilities.js";

new p5((p5) => {
  const numerals = [];
  let textInput = null;

  let text = "Hello World!";
  let rotatedText = filterString(text.toUpperCase(), characters).padEnd(9, " ");

  const increment = () => {
    rotatedText = rotatedText.slice(1) + rotatedText[0];
  };

  const addTextInput = () => {
    const fieldSet = document.getElementById("fieldSet");
    const div = document.createElement("div");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", text);
    input.setAttribute("name", "text");
    const label = document.createElement("label");
    label.setAttribute("for", "text");
    label.innerText = "Text to show";
    label.setAttribute("id", "textLabel");
    div.append(label);
    div.append(input);
    fieldSet.append(div);
    textInput = document.querySelector("input[name=text]");
    textInput.addEventListener("keyup", (event) => {
      event.preventDefault();
      textInput.value = filterString(textInput.value.toUpperCase(), characters);
      rotatedText = filterString(textInput.value, characters).padEnd(9, " ");
    });
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(1144, 164);
    for (let i = 0; i < 9; i++) {
      numerals.push(new DSEG14(p5, i * (1144 / 9), 0, 0.1, null, null, " "));
    }
    const varForm = p5.createElement("form");
    const varFieldSet = p5.createElement("fieldset");
    varFieldSet.elt.setAttribute("id", "fieldSet");
    const legend = p5.createElement("legend");
    legend.elt.innerText = `Your own text`;
    varForm.child(varFieldSet);
    varFieldSet.child(legend);
    addTextInput();
    setInterval(increment, 500);
  };

  p5.draw = () => {
    p5.background("rgba(0, 0, 0, 0)");
    for (let i = 0; i < numerals.length; i++) {
      numerals[i].setState(rotatedText[i]);
      numerals[i].draw();
    }
  };
});
