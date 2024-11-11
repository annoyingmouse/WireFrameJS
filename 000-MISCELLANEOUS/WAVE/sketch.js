let xspacing = 1; // Distance between each horizontal location
let w; // Width of entire wave
let maxwaves = 6; // total # of waves to add together
let theta = 0.0;
let amplitude = new Array(maxwaves); // Height of wave
// Value for incrementing X, to be calculated
// as a function of period and xspacing
let dx = new Array(maxwaves);
// Using an array to store height values
// for the wave (not entirely necessary)
let yvalues;

function setup() {
	createCanvas(400, 400);
	colorMode(RGB, 255, 255, 255, 100);
	w = width + 16;
	for (let i = 0; i < maxwaves; i++) {
		amplitude[i] = random(10, 30);
		let period = random(100, 300); // Num pixels before wave repeats
		dx[i] = (TWO_PI / period) * xspacing;
	}
	yvalues = new Array(floor(w / xspacing));
}

function draw() {
	background(0);
	calcWave();
	renderWave();
}

function calcWave() {
	// Increment theta (try different values
	// for 'angular velocity' here
	theta += 0.01;
	// Set all height values to zero
	for (let i = 0; i < yvalues.length; i++) {
		yvalues[i] = 0;
	}
	// Accumulate wave height values
	for (let j = 0; j < maxwaves; j++) {
		let x = theta;
		for (let i = 0; i < yvalues.length; i++) {
			// Every other wave is cosine instead of sine
			if (j % 2 == 0) yvalues[i] += sin(x) * amplitude[j];
			else yvalues[i] += cos(x) * amplitude[j];
			x += dx[j];
		}
	}
}

function renderWave() {
	// A simple way to draw the wave with an ellipse at each location
	noStroke();
	ellipseMode(CENTER);
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] - 200, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] - 180, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] - 160, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] - 140, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] - 120, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] - 100, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] - 80, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] - 60, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] - 40, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] - 20, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x], x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 20, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 40, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 60, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 80, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 100, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 120, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 140, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 160, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 180, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 200, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 220, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 240, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 260, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 280, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 300, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 320, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 340, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 360, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 400, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 420, x * xspacing, 200, 16);
	}
	fill(0, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 440, x * xspacing, 200, 16);
	}
	fill(255, 50);
	for (let x = 0; x < yvalues.length; x++) {
		ellipse(height / 2 + yvalues[x] + 460, x * xspacing, 200, 16);
	}
}
