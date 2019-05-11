import Star from "./Star.js";

new p5(p5 => {

    const width = 1000;
    const height = Math.floor(width * 9 / 16);
    const drag = 0.71;
    const min_warp_factor = 0.1;
    //const bounds = p5.rect(0, 0, width, height);
    const center = p5.createVector(Math.floor(width / 2), Math.floor(height / 2));
    const stars = [];

    let accel = 1.0;
    let warp_factor = min_warp_factor;

    let key_counter = 0;


    p5.setup = () => {
        p5.createCanvas(width, height);
    };

    p5.draw = () => {

        p5.background(0);
        p5.textAlign(p5.CENTER);
        p5.textStyle(p5.BOLD);
        p5.textSize(40);
        p5.fill(180, 160, 0);
        p5.text(`||| Warp ${warp_factor.toFixed(1)} |||`, Math.floor(width / 2), height - 40);
        p5.textSize(30);
        p5.fill(90, 80, 0);
        p5.text("Hold SPACE to accelerate", Math.floor(width / 2), height - 4);
        if (p5.keyIsDown(32)) {
            warp_factor += accel * key_counter;
            key_counter += 0.001;
        } else {
            key_counter = 0;
        }
    };
});
