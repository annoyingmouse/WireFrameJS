import Car from "./Car.js";

new p5((p5) => {
  const WIDTH = 540;
  const HEIGHT = 540;
  const c_grass = p5.color(0, 153, 76);
  const c_road = p5.color(204, 136, 0);
  const road = [];
  const queue = [];
  const block_size = 2;
  const min_turn = 200;
  const turn_gap = 50;
  const min_buffer = 50;

  const speed = 5;
  let car = null;

  let current = null;
  const stack = [];

  p5.setup = () => {
    p5.createCanvas(WIDTH, HEIGHT);
    car = new Car(p5, Math.round(WIDTH / 2) - 16, 390, "images/car.png");
    const buffer = Math.round(WIDTH / 4);
    for (let i = HEIGHT - block_size; i !== -block_size; i -= block_size) {
      road.push([buffer, i, Math.round(WIDTH / 2), block_size]);
    }
    for (let i = 0; i !== 200; i += block_size) {
      queue.push([buffer, 0, Math.round(WIDTH / 2), block_size]);
    }
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const scroll_road = () => {
    road.forEach((r) => {
      r[1] = r[1] + block_size;
    });
    road.push(queue.shift());
    road.shift();
    road[road.length - 1][1] = 0;
    if (queue.length < 5) {
      update_path();
    }
  };

  const clamp_road = (x) =>
    x < min_buffer
      ? min_buffer
      : x > Math.round(WIDTH / 2) - min_buffer
        ? Math.round(WIDTH / 2) - min_buffer
        : x;

  const update_path = () => {
    const choice = Math.round(Math.random());
    let current_pos_x = queue[queue.length - 1][0];
    let turn = null;
    let modifier = null;
    if (choice) {
      modifier = -1;
      turn =
        current_pos_x - min_turn > min_buffer
          ? getRandomInt(min_turn, current_pos_x - 5)
          : current_pos_x - min_buffer;
    } else {
      modifier = 1;
      turn =
        Math.floor(WIDTH / 2) - current_pos_x - min_buffer > min_turn
          ? getRandomInt(
              min_turn,
              Math.floor(WIDTH / 2) - current_pos_x - min_buffer,
            )
          : Math.floor(WIDTH / 2) - current_pos_x - min_buffer;
    }
    const height = getRandomInt(200, 400);
    for (let y = block_size; y < height; y += block_size) {
      const x = (turn / height) * y * modifier;
      queue.push([
        clamp_road(current_pos_x + x),
        0,
        Math.round(WIDTH / 2),
        block_size,
      ]);
    }
    current_pos_x = queue[queue.length - 1][0];
    for (let i = 0; i < turn_gap; i += block_size) {
      queue.push([current_pos_x, 0, Math.round(WIDTH / 2), block_size]);
    }
  };

  p5.draw = () => {
    scroll_road();

    let car_momentum = 0;
    if (p5.keyIsDown(37)) {
      car_momentum = -speed;
    }
    if (p5.keyIsDown(39)) {
      car_momentum = speed;
    }
    const new_pos = car.x + car_momentum;
    let collision = false;
    for (let i = 0; i < 16; i++) {
      if (
        new_pos > road[75 + i][0] &&
        new_pos + 16 < road[75 + i][1] + road[75 + i][3]
      ) {
        collision = true;
      }
    }
    if (collision) {
      car.x = new_pos;
    }

    p5.background(c_grass);
    p5.fill(c_road);
    p5.noStroke();
    road.forEach((r) => {
      p5.rect(...r);
    });
    car.draw();
  };
});
