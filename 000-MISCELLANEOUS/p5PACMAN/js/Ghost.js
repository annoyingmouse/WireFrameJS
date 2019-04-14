class Ghost {
    constructor(offsetX, offsetY, scale, name) {
        this.odd = 0;
        this.scale = scale;
        this.name = name;
        this.speed = [0, 0];
        switch (this.name) {
            case "BLINKY":
                this.colour = "#ff0000";
                this.x = (scale * 12) + offsetX;
                this.y = (scale * 11) + offsetY;
                this.direction = "RIGHT";
                this.intention = ["RIGHT", "RIGHT", "UP", "UP", "LEFT"];
                break;
            case "PINKY":
                this.colour = "#ffb8ff";
                this.x = (scale * 16) + offsetX;
                this.y = (scale * 11) + offsetY;
                this.direction = "LEFT";
                this.intention = ["LEFT", "LEFT", "UP", "UP", "RIGHT"];
                break;
            case "INKY":
                this.colour = "#00ffff";
                this.x = (scale * 12) + offsetX;
                this.y = (scale * 13) + offsetY;
                this.direction = "RIGHT";
                this.intention = ["RIGHT", "RIGHT", "UP", "UP", "UP", "UP", "RIGHT"];
                break;
            case "CLYDE":
                this.colour = "#ffb851";
                this.x = (scale * 16) + offsetX;
                this.y = (scale * 13) + offsetY;
                this.direction = "LEFT";
                this.intention = ["LEFT", "LEFT", "UP", "UP", "UP", "UP", "LEFT"];
                break;
        }
        this.Body = [[0, 0], [0, -8], [1, -8], [1, -11], [2, -11], [2, -12], [3, -12], [3, -13], [5, -13], [5, -14], [9, -14], [9, -13], [11, -13], [11, -12], [12, -12], [12, -11], [13, -11], [13, -8], [14, -8], [14, 0]];
        this.LegsOdd = [[13, 0], [13, -1], [12, -1], [12, -2], [11, -2], [11, -1], [10, -1], [10, 0], [8, 0], [8, -2], [6, -2], [6, 0], [4, 0], [4, -1], [3, -1], [3, -2], [2, -2], [2, -1], [1, -1], [1, 0]];
        this.LegsEven = [[11, 0], [11, -1], [10, -1], [10, -2], [9, -2], [9, -1], [8, -1], [8, 0], [6, 0], [6, -1], [5, -1], [5, -2], [4, -2], [4, -1], [3, -1], [3, 0]];
        this.LeftEye = [[1, -7], [1, -10], [2, -10], [2, -11], [4, -11], [4, -10], [5, -10], [5, -7], [4, -7], [4, -6], [2, -6], [2, -7]];
        this.RightEye = [[7, -7], [7, -10], [8, -10], [8, -11], [10, -11], [10, -10], [11, -10], [11, -7], [10, -7], [10, -6], [8, -6], [8, -7]];
        this.Eyes = {
            "LEFT": [0, 0, 0, 0],
            "RIGHT": [2, 0, 4, 0],
            "UP": [1, -2, 2, -4],
            "DOWN": [1, 1, 2, 2]
        };
        this.path = field.ask(this.x + (scale / 2), this.y - (scale / 2)).allowed;
    }

    draw() {
        noStroke();
        fill((pacman.frames) ? "#233e8b" : this.colour);
        beginShape();
        this.Body.forEach((p) => vertex((this.x + p[0]), (this.y + p[1])));
        if (this.odd < 0) {
            this.LegsOdd.forEach((p) => vertex((this.x + p[0]), (this.y + p[1])));
        } else {
            this.LegsEven.forEach((p) => vertex((this.x + p[0]), (this.y + p[1])));
        }
        endShape(CLOSE);
        if(pacman.frames){
            fill("#f1bd8b");
            rect(this.x + 4, this.y - 9, 2, 2);
            rect(this.x + 8, this.y - 9, 2, 2);
            rect(this.x + 2, this.y - 5, 2, 1);
            rect(this.x + 6, this.y - 5, 2, 1);
            rect(this.x + 10, this.y - 5, 2, 1);
            rect(this.x + 1, this.y - 4, 1, 1);
            rect(this.x + 4, this.y - 4, 2, 1);
            rect(this.x + 8, this.y - 4, 2, 1);
            rect(this.x + 12, this.y - 4, 1, 1);
        }else{
            fill("#dedeff");
            beginShape();
            this.LeftEye.forEach((p) => vertex(this.x + p[0] + this.Eyes[this.direction][0], this.y + p[1] + this.Eyes[this.direction][1]));
            endShape(CLOSE);
            beginShape();
            this.RightEye.forEach((p) => vertex(this.x + p[0] + this.Eyes[this.direction][0], this.y + p[1] + this.Eyes[this.direction][1]));
            endShape(CLOSE);
            fill("#2121ff");
            rect(this.x + 1 + this.Eyes[this.direction][2], this.y - 9 + this.Eyes[this.direction][3], 2, 2);
            rect(this.x + 7 + this.Eyes[this.direction][2], this.y - 9 + this.Eyes[this.direction][3], 2, 2);
            this.odd++;
            if (this.odd === 5) {
                this.odd = -5;
            }
        }
        this.update();
    }

    update() {
        const halfScale = this.scale / 2;
        if (!(this.x % halfScale) && !(this.y % halfScale)) {
            const portals = field.portal();
            const portalIndex = portals.findIndex((el) => el[0] === this.x + halfScale && el[1] === this.y - halfScale);
            if (!!~portalIndex) {
                const exitPortal = portals[Number(!portalIndex)];
                this.x = exitPortal[0] - halfScale;
                this.y = exitPortal[1] + halfScale;
            }else{
                if (this.intention.length) {
                    this.direction = this.intention.shift();
                } else {
                    const possibleDirections = field.ask(this.x + halfScale, this.y - halfScale).allowed;
                    if(this.x === 255 && this.y === 165){
                        console.log("Removing DOWN as an option");
                        possibleDirections.splice(possibleDirections.indexOf("DOWN"), 1);
                    }
                    switch (this.direction) {
                        case "RIGHT":
                            if (!!~possibleDirections.indexOf("LEFT")) {
                                possibleDirections.splice(possibleDirections.indexOf("LEFT"), 1);
                            }
                            break;
                        case "LEFT":
                            if (!!~possibleDirections.indexOf("RIGHT")) {
                                possibleDirections.splice(possibleDirections.indexOf("RIGHT"), 1);
                            }
                            break;
                        case "UP":
                            if (!!~possibleDirections.indexOf("DOWN")) {
                                possibleDirections.splice(possibleDirections.indexOf("DOWN"), 1);
                            }
                            break;
                        case "DOWN":
                            if (!!~possibleDirections.indexOf("UP")) {
                                possibleDirections.splice(possibleDirections.indexOf("UP"), 1);
                            }
                            break;
                    }
                    this.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                }
            }
            switch (this.direction) {
                case "UP":
                    this.speed = [0, -1];
                    break;
                case "DOWN":
                    this.speed = [0, 1];
                    break;
                case "RIGHT":
                    this.speed = [1, 0];
                    break;
                case "LEFT":
                    this.speed = [-1, 0];
                    break;
            }
        }
        this.x = this.x + this.speed[0];
        this.y = this.y + this.speed[1];
    }
}