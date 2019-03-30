import LargeEnemy from "./LargeEnemy.js";

new p5(p5 => {

    const enemies = [];

    p5.setup = () => {
        p5.createCanvas(550, 550);
        enemies.push(new LargeEnemy(p5, 300, 150, 'images/large_enemy.png'))
        enemies.push(new LargeEnemy(p5, 150, 300, 'images/large_enemy.png'))
    };

    p5.draw = () => {
        p5.background(0);
        enemies.forEach(enemy => enemy.draw());
    };

    p5.keyPressed = (p5) => {
        if (p5.keyCode === 40 && enemies.length) {
            const newEnemies = enemies[0].destroy();
            if (newEnemies.length) {
                enemies.push(...newEnemies);
            }
            enemies.shift();
        }
    };
});