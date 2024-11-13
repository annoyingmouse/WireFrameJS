import Rectangle from "./Rectangle.js";
import Obstacle from "./Obstacle.js";

export default class Lane extends Rectangle {
  constructor(index, grid, colour, type, num, length, spacing, speed, p5Width) {
    super(0, index * grid, p5Width, grid);
    this.obstacles = [];
    this.type = type;
    const offset = Math.floor(Math.random() * 200);
    for (let i = 0; i < num; i++) {
      this.obstacles.push(
        new Obstacle(
          offset + spacing * i,
          index * grid,
          grid * length,
          grid,
          speed,
          grid,
          colour,
        ),
      );
    }
  }

  check(frog, p5) {
    if (this.type === "CAR") {
      this.obstacles.forEach((car) => {
        if (frog.intersects(car)) {
          p5.resetGame();
        }
      });
    } else {
      let ok = false;
      this.obstacles.forEach((log) => {
        if (frog.intersects(log)) {
          ok = true;
          frog.attach(log);
        }
      });
      if (!ok) {
        p5.resetGame();
      }
    }
  }

  run(p5) {
    this.obstacles.forEach((obstacle) => {
      obstacle.show(p5);
      obstacle.update(p5);
    });
  }
}
