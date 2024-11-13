import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";
import { SliderNumeral } from "./SliderNumeral.js";

new p5((p5) => {
  const verticalHeight = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0,
  );
  const unitHeight = Math.floor(verticalHeight / 26 / 10) * 10 - 10;
  const unitWidth = unitHeight + 10;
  const Numerals = [];
  const backGroundColour = 30;

  p5.setup = () => {
    p5.createCanvas(unitWidth * 25, unitHeight * 24);
    p5.background(backGroundColour);
    Numerals.push(
      new SliderNumeral(
        p5,
        backGroundColour,
        unitWidth / 2,
        0,
        unitWidth,
        unitHeight,
        "#F70D1A",
      ),
    );
    Numerals.push(
      new SliderNumeral(
        p5,
        backGroundColour,
        4.5 * unitWidth,
        0,
        unitWidth,
        unitHeight,
        "#F70D1A",
      ),
    );
    Numerals.push(
      new SliderNumeral(
        p5,
        backGroundColour,
        8.5 * unitWidth,
        0,
        unitWidth,
        unitHeight,
        "#F70D1A",
      ),
    );
    Numerals.push(
      new SliderNumeral(
        p5,
        backGroundColour,
        12.5 * unitWidth,
        0,
        unitWidth,
        unitHeight,
        "#F70D1A",
      ),
    );
    Numerals.push(
      new SliderNumeral(
        p5,
        backGroundColour,
        16.5 * unitWidth,
        0,
        unitWidth,
        unitHeight,
        "#F70D1A",
      ),
    );
    Numerals.push(
      new SliderNumeral(
        p5,
        backGroundColour,
        20.5 * unitWidth,
        0,
        unitWidth,
        unitHeight,
        "#F70D1A",
        null,
        null,
        true,
      ),
    );
  };
  p5.draw = () => {
    const date = new Date();
    const hour = date.getHours().toString().split("");
    const minutes = date.getMinutes().toString().split("");
    const seconds = date.getSeconds().toString().split("");
    Numerals[0].update(hour.length === 1 ? 0 : Number(hour[0]));
    Numerals[1].update(hour.length === 1 ? Number(hour[0]) : Number(hour[1]));
    Numerals[2].update(minutes.length === 1 ? 0 : Number(minutes[0]));
    Numerals[3].update(
      minutes.length === 1 ? Number(minutes[0]) : Number(minutes[1]),
    );
    Numerals[4].update(seconds.length === 1 ? 0 : Number(seconds[0]));
    Numerals[5].update(
      seconds.length === 1 ? Number(seconds[0]) : Number(seconds[1]),
    );
  };
});
