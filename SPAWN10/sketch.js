/*global p5*/

import LargeEnemy from "./LargeEnemy.js";
import MediumEnemy from "./MediumEnemy.js";
import SmallEnemy from "./SmallEnemy.js";

new p5(p5 => {

    const enemies = [];

    p5.setup = () => {
        p5.createCanvas(550, 550);
        enemies.push(new LargeEnemy(300, 150, 'images/large_enemy.png', p5))
        enemies.push(new LargeEnemy(150, 300, 'images/large_enemy.png', p5))
    };

    p5.draw = () => {
        p5.background(0);
        enemies.forEach(enemy => enemy.draw());
    };

    p5.keyPressed = (p5) => {
        if (p5.keyCode === 40) {
            const newEnemies = enemies[0].destroy();
            if (newEnemies.length) {
                newEnemies.forEach(enemy => eval(enemies.push(new enemy.type(enemy.x, enemy.y, enemy.img, p5))))
            }

        }
    };
});