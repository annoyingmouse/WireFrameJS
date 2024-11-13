import Enemy from "./Enemy.js";

export default class SmallEnemy extends Enemy {
  constructor(p5, x, y, img) {
    super(p5, x, y, img);
  }

  destroy() {
    return [];
  }
}
