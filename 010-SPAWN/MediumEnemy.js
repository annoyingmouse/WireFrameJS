import Enemy from "./Enemy.js";
import SmallEnemy from "./SmallEnemy.js";

export default class MediumEnemy extends Enemy {
  constructor(p5, x, y, img) {
    super(p5, x, y, img);
  }

  destroy() {
    return [
      new SmallEnemy(
        this.p5,
        this.x - 20,
        this.y - 20,
        "images/small_enemy.png",
      ),
      new SmallEnemy(
        this.p5,
        this.x + 20,
        this.y + 20,
        "images/small_enemy.png",
      ),
    ];
  }
}
