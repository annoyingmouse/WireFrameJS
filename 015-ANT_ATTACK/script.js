new p5(p5 => {
    
    const width = 600;
    const height = 400;
    let mapPositionX = 268;
    let mapPositionY = -100;
    const mapWidth = 20;
    const mapHeight = 20;
    let block = null;
    const mapBlocks = [];

    p5.preload = () => {
        block = p5.loadImage("./images/block.png");
        for(let i = 0; i < mapWidth; i++){
            mapBlocks[i] = []
            for(let j = 0; j < mapWidth; j++){
                mapBlocks[i][j] = new Array(3).fill(0);
            }
        }
    }

    const makeArch = (x, y) => {
        for(let z = 0; z < 3; z++){
            mapBlocks[x][y][z] = 1
            mapBlocks[x][y + 2][z] = 1;
        }
        mapBlocks[x][y + 1][2] = 1;
    }

    const makePyramid = (x, y) => {
        for(let px = 0; px < 5; px++){
            for(let py = 0; py < 5; py++){
                mapBlocks[px+x][py+y][0] = 1
            }
        }
        for(let px = 1; px < 4; px++){
            for(let py = 1; py < 4; py++){
                mapBlocks[px+x][py+y][1] = 1
            }
        }
        mapBlocks[x+2][y+2][2] = 1
    }

    p5.setup = () => {
        p5.createCanvas(width, height);
        for(let x = 0; x < mapWidth; x++){
            for(let y = 0; y < mapHeight; y++){
                if(x === 0 || x === mapWidth - 1 || y === 0 || y === mapHeight - 1){
                    mapBlocks[x][y][0] = 1;
                }
                if(x === 5 && (y === 4 || y === 13)){
                    makeArch(x, y);
                }
                if(x === 12 && y === 14){
                    makeArch(x, y);
                }
                if((x === 4 || x === 12) && y === 7){
                    makePyramid(x, y);
                }
            }
        }
    };

    const drawMap = () => {
        for(let z = 0; z < 3; z++){
            for(let x = 0; x < mapWidth; x++){
                for(let y = 0; y < mapHeight; y++){
                    const bx = (x*32) - (y*32) + mapPositionX;
                    const by = (y*16) + (x*16) - (z*32) + mapPositionY;
                    if(-64 <= bx < width && -64 <= by < height + 32){
                        if(mapBlocks[x][y][z] === 1){
                            p5.image(block, bx, by);
                        }
                    }
                }
            }
        }
    }

    p5.draw = () => {
        p5.background(150, 255, 255);
        drawMap();
        if(p5.keyIsDown(p5.LEFT_ARROW)){
            mapPositionX += 4;
        }
        if(p5.keyIsDown(p5.RIGHT_ARROW)){
            mapPositionX -= 4;
        }
        if(p5.keyIsDown(p5.UP_ARROW)){
            mapPositionY += 4;
        }
        if(p5.keyIsDown(p5.DOWN_ARROW)){
            mapPositionY -= 4;
        }
    };

});