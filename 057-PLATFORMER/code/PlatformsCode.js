import { platforms } from "./Platforms.js";
import { platformNames } from "./PlatformNames.js";
import { platformLines } from "./PlatformLines.js";

export class AllPlatforms {
  constructor(p5) {
    this.maxHeightPlatform = 124;
    this.p5 = p5;
    this.platformActors = platforms.map((element) => {
      return {
        name: platformNames[element[0]],
        x: element[1],
        y: element[2],
      };
    });
    this.platformLineStrings = [];
    for (let i = 0; i < platforms.length; i++) {
      for (let j = 0; j < platformLines[platforms[i][0]].length; j++) {
        const point = [
          [
            platformLines[platforms[i][0]][j][0] + platforms[i][1],
            platformLines[platforms[i][0]][j][1] + platforms[i][2],
          ],
          ...platformLines[platforms[i][0]],
        ];
        this.platformLineStrings.push(point);
      }
    }
  }
  draw() {
    this.platformActors.forEach((platform) => {
      if (
        platform.y > -this.maxHeightPlatform / 2 &&
        platform.y < 600 + this.maxHeightPlatform / 2
      ) {
        this.p5.image(platform.image, platform.x, platform.y);
      }
    });
  }
  update(screenPosition) {
    platforms.forEach((platform, i) => {
      this.platformActors[i].x = platform[i][1];
      this.platformActors[i].y = platform[i][2] - screenPosition;
    });
  }
  getMaxScreenPosition() {
    return -platforms[platforms.length - 1][2] - this.maxHeightPlatform / 2;
  }
}
