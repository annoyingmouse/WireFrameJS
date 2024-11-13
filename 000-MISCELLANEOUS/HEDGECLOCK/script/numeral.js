import { sketch } from "https://cdn.skypack.dev/p5js-wrapper";
import "https://cdn.skypack.dev/p5js-wrapper/sound";
import { numerals as numberMaps, imageTiles, evaluatable } from "./numerals.js";
import { MP3s } from "./sounds.js";
import { checkDirection, getLevel } from "./utilities.js";

let images = {},
  rustles = [];

sketch.preload = function () {
  for (let i = 0; i < imageTiles.length; i++) {
    images[imageTiles[i]] = loadImage(`./image/${imageTiles[i]}.png`);
  }
  for (let i = 0; i < MP3s.length; i++) {
    rustles.push(loadSound(MP3s[i]));
  }
};

function drawHedge(hedgeMap, x, y) {
  for (let i = 0; i < hedgeMap.length; i++) {
    for (let j = 0; j < hedgeMap[i].length; j++) {
      if (hedgeMap[i][j] === 1) {
        const directions = checkDirection(hedgeMap, i, j).sort().join("_");
        if (!evaluatable.includes(directions)) {
          if (directions === "down_up") {
            if (i % 2 === 0) {
              image(images["vertical"], x + j * 16, y + getLevel(i, 16));
              image(images["vertical"], x + j * 16, y + getLevel(i, 16) + 16);
            } else {
              image(images["vertical"], x + j * 16, y + getLevel(i, 16));
            }
          }
          if (directions === "up") {
            image(images["vertical"], x + j * 16, y + getLevel(i, 16));
            image(images["down"], x + j * 16, y + getLevel(i, 16) + 16);
          }
          if (directions === "down") {
            image(images["top"], x + j * 16, y + getLevel(i, 16));
            image(images["vertical"], x + j * 16, y + getLevel(i, 16) + 16);
          }
        } else {
          image(images[directions], x + j * 16, y + getLevel(i, 16));
        }
      }
    }
  }
}

export function drawNumeral(num, x, y, sound) {
  if (num === ":") {
    image(images["dot"], x + 8, y + 24);
    image(images["dot"], x + 8, y + 64);
  } else {
    rustles[num].play();
    drawHedge(numberMaps[num], x, y);
  }
}
