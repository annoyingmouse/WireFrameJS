import { enemies } from "./Enemies.js";

const enemyHalfSize = 12;
const enemyAccelerationDown = 0.5;
const enemyTerminalSpeed = 8;
const enemyLateralSpeed = 2;
const enemyFlyingVerticalSpeed = 1;

class Enemy {
  constructor(p5, centreX, centreY, indexEnemy, directionX) {
    this.centre = [centreX, centreY];
    this.centredLineString = [
      [-enemyHalfSize, -enemyHalfSize],
      [-enemyHalfSize, enemyHalfSize],
      [enemyHalfSize, enemyHalfSize],
      [enemyHalfSize, -enemyHalfSize],
    ];
    this.lineString = p5.translate(
      this.centredLineString,
      this.centre[0],
      this.centre[1],
    );
  }
}

export class AllEnemies {
  constructor(p5) {
    this.p5 = p5;
    this.restart();
  }
  restart() {
    this.enemies = enemies.map(
      (enemy) => new Enemy(this.p5, enemy[2], enemy[3], enemy[0], enemy[1]),
    );
  }
}
