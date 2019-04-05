import Shield from "./Shield.js";
import Shot from "./Shot.js";

new p5(p5 => {

    const width = 1180;
    const height = 700;
    const shields = [];
    const shots = [];

    p5.setup = () => {
        p5.createCanvas(width, height);
        p5.background(51);
        //p5.frameRate(1);
        shields.push(...Array.from(Array(4).keys(), n => new Shield(p5, (220 * n) + (60 * (n + 1)), 500)));
        setInterval(() => shots.push(new Shot(p5, Math.floor(p5.random(0, (((p5.width - 20) / 10)))) * 10)), 100);
    };

    const collision = (shot, shield) => {
        return (
            shot.x + shot.width > shield.x &&
            shot.x < shield.x + shield.width &&
            shot.y + shot.height > shield.y &&
            shot.y < shield.y + shield.height
        )
    }

    const drawShots = () => {
        let shotIndex = shots.length;
        while(shotIndex--){
            if(shots[shotIndex].y > p5.height){
                shots.splice(shotIndex, 1);
            }else{
                shots[shotIndex].draw();
            }
        }
    }

    p5.draw = () => {
        p5.clear()
        p5.background(51);

        shields.forEach(shield => {
            shots.forEach(shot => {
                if (collision(shield, shot)) {
                    console.log("Do something here");
                }
            })
        });
        shields.forEach(shield => shield.draw());
        drawShots();


        


        



    };

});