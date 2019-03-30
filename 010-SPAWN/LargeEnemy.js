import Enemy from "./Enemy.js";
import MediumEnemy from "./MediumEnemy.js";

export default class LargeEnemy extends Enemy {

    constructor(p5, x, y, img) {
        super(p5, x, y, img);
    }

    destroy() {
        return [
            new MediumEnemy(this.p5, this.x - 40, this.y - 40, 'images/medium_enemy.png'),
            new MediumEnemy(this.p5, this.x + 40, this.y + 40, 'images/medium_enemy.png')
        ];
    }

}