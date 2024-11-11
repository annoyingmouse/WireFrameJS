let pacman = null;
let field = null;
const Ghosts = [];
let Blinky = null; // #ff0000/#2121ff
let Pinky = null; // #ffb8ff/#2121ff
let Inky = null; // #00ffff/#2121ff
let Clyde = null; // #ffb851/#2121ff
const scale = 15;
const offsetX = 45;
const offsetY = 15;
let frames = 20;
function setup() {
	createCanvas(600, 400);
	angleMode(DEGREES);
	frameRate(frames);
	pacman = new Pacman(offsetX, offsetY, scale);
	field = new Field(
		offsetX,
		offsetY,
		`
╔════════════╦════════════╗
║••••••••••••║••••••••••••║
║•╔═╗•╔═╦═══•║•═══╦═╗•╔═╗•║
║*║ ║•║ ║•••••••••║ ║•║ ║*║
║•╚═╝•╚═╝•═══╦═══•╚═╝•╚═╝•║
║••••••••••••║••••••••••••║
║•═══•══╦═══•║•═══╦══•═══•║
║••••• •║         ║• •••••║
╠═════╗•║ ╔══ ══╗ ║•╔═════╣
╚═════╝•║ ║     ║ ║•╚═════╝
X      •  ║     ║  •      X
╔═════╗•║ ║     ║ ║•╔═════╗
╠═════╝•║ ╚══╦══╝ ║•╚═════╣
║••••••••••••║••••••••••••║
║*══╗•══════•║•══════•╔══*║
║•••║•••••••• ••••••••║•••║
╠══•╚══•║•═══╦═══•║•══╝•══╣
║•••••••║••••║••••║•••••••║
║•══════╩═══•║•═══╩══════•║
║•••••••••••••••••••••••••║
╚═════════════════════════╝
`,
		scale,
	);
	Ghosts.push(new Ghost(offsetX, offsetY, scale, "BLINKY"));
	// Ghosts.push(new Ghost(offsetX, offsetY, scale, "PINKY"));
	// Ghosts.push(new Ghost(offsetX, offsetY, scale, "INKY"));
	// Ghosts.push(new Ghost(offsetX, offsetY, scale, "CLYDE"));
}
function draw() {
	background("#030002");
	field.draw();
	pacman.draw();
	Ghosts.forEach((ghost) => ghost.draw());
}
function keyPressed() {
	if (keyCode === UP_ARROW) {
		pacman.dir("UP");
	} else if (keyCode === DOWN_ARROW) {
		pacman.dir("DOWN");
	} else if (keyCode === RIGHT_ARROW) {
		pacman.dir("RIGHT");
	} else if (keyCode === LEFT_ARROW) {
		pacman.dir("LEFT");
	}
}
