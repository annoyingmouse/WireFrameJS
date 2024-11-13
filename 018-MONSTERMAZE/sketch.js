new p5((p5) => {
  const width = 600;
  const height = 600;
  const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let playerX = 1;
  let playerY = 4;
  let playerDir = 2;
  let dirX = [-1, 0, 1, 0];
  let dirY = [0, 1, 0, -1];
  const images = {
    back: null,
    left: [],
    mid: [],
    right: [],
  };

  p5.preload = () => {
    images.back = p5.loadImage("images/back.png");
    for (var i = 0; i < 5; i++) {
      images.left[i] = p5.loadImage("./images/left" + i + ".png");
      images.mid[i] = p5.loadImage("./images/mid" + i + ".png");
      images.right[i] = p5.loadImage("./images/right" + i + ".png");
    }
  };

  p5.setup = () => {
    p5.createCanvas(width, height);
    p5.frameRate(1);
  };

  const drawMaze = () => {
    const dm = playerDir === 1 || playerDir === 3 ? -1 : 1;
    for (let l = 4; l > 0; l--) {
      const x = playerX + l * dirX[playerDir];
      const y = playerY + l * dirY[playerDir];
      if (x >= 0 && x < 10 && y >= 0 && y < 10) {
        const xl = x + dirY[playerDir] * dm;
        const yl = y + dirX[playerDir] * dm;
        if (maze[xl][yl]) {
          p5.image(images.left[l], 0, 0);
        }
        const xr = x - dirY[playerDir] * dm;
        const yr = y - dirX[playerDir] * dm;
        if (maze[xr][yr]) {
          p5.image(images.right[l], 0, 0);
        }
        if (maze[x][y]) {
          p5.image(images.mid[l], 0, 0);
        }
      }
    }
  };

  p5.draw = () => {
    p5.background(255, 255, 255);
    p5.image(images.back, 0, 0);
    drawMaze();
  };

  p5.keyPressed = () => {
    if (p5.keyCode === p5.UP_ARROW) {
      const newX = playerX + dirX[playerDir];
      const newY = playerY + dirY[playerDir];
      if (!maze[newX][newY]) {
        playerX = newX;
        playerY = newY;
      }
    }
    if (p5.keyCode === p5.DOWN_ARROW) {
      const newX = playerX - dirX[playerDir];
      const newY = playerY - dirY[playerDir];
      if (!maze[newX][newY]) {
        playerX = newX;
        playerY = newY;
      }
    }
    if (p5.keyCode === p5.LEFT_ARROW) {
      playerDir -= 1;
      if (playerDir-- < 0) {
        playerDir = 3;
      }
    }
    if (p5.keyCode === p5.RIGHT_ARROW) {
      playerDir += 1;
      if (playerDir > 3) {
        playerDir = 0;
      }
    }
  };
});
