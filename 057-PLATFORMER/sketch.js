import { AllPlatforms } from "./code/PlatformsCode.js";
import { BackgroundColour } from "./code/BackgroundColour.js";

new p5((p5) => {
  const allPlatforms = new AllPlatforms(p5);
  const backgroundColour = new BackgroundColour();
  const screenPosition = 0;
  const maxScreenPosition = allPlatforms.getMaxScreenPosition();
  const levelClear = false;

  p5.preload = () => {
    allPlatforms.platformActors.forEach(
      (platform) =>
        (platform.image = p5.loadImage(`./images/${platform.name}.png`)),
    );
  };

  p5.setup = () => {
    p5.createCanvas(800, 600);
    p5.imageMode(p5.CENTER);
  };

  p5.draw = () => {
    p5.background(
      backgroundColour.getBackgroundColour(screenPosition, maxScreenPosition),
    );
    allPlatforms.draw();
  };

  const update = () => {};

  p5.keyPressed = () => {};
});
