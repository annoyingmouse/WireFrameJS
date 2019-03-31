import Player from "./Player.js";
import Platform from "./Platform.js";

new p5(p5 => {

    const platforms = [];
    const width = 800;
    const height = 800;

    const gravity = 0.2;
    let velocity = 0;
    let jump_velocity = -7;
    let player_on_ground = false;


    let player = null

    p5.setup = () => {
        p5.createCanvas(width, height);
        p5.noStroke();
        platforms.push(new Platform(p5, 0, 780, 800, 20));
        platforms.push(new Platform(p5, 200, 700, 100, 100));
        platforms.push(new Platform(p5, 400, 650, 100, 20));
        platforms.push(new Platform(p5, 600, 600, 100, 20));
        player = new Player(p5, 750, 610, platforms);
    };

    p5.draw = () => {
        p5.background(0);
        platforms.forEach((platform) => {
            platform.draw();
        });
        if (p5.keyIsDown(37)) {
            collisionX({ x: -2, y: 0 });
        }
        if (p5.keyIsDown(39)) {
            collisionX({ x: 2, y: 0 });
        }
        velocity += gravity;
        collisionY({ x: 0, y: velocity });

        player.draw();
    };

    p5.keyPressed = () => {
        if (p5.keyCode === 32 && player_on_ground) {
            velocity = jump_velocity;
            player_on_ground = false;
        }
    }

    const collision = (moving, stationary, x, y) => {
        return (
            moving.x + moving.width + x > stationary.x &&
            moving.x + x < stationary.x + stationary.width &&
            moving.y + moving.height + y > stationary.y &&
            moving.y + y < stationary.y + stationary.height
        )
    }

    const within = (moving, x) => moving.x + x >= 0 && moving.x + moving.width + x <= width;

    const collisionX = (obj) => {
        let safe = within(player, obj.x);
        platforms.forEach((platform) => {
            if (collision(player, platform, obj.x, obj.y)) {
                safe = false;
            }
        });
        if (safe) {
            player.move({ x: player.x += obj.x, y: player.y += obj.y });
        }
    }
    const collisionY = (obj) => {
        let safe = within(player, obj.x);
        platforms.forEach((platform) => {
            if (collision(player, platform, obj.x, obj.y)) {
                safe = false;
            }
        });
        if (safe) {
            player.move({ x: player.x += obj.x, y: player.y += obj.y });
        } else {
            velocity = 0;
            player_on_ground = true;
        }
    }
});