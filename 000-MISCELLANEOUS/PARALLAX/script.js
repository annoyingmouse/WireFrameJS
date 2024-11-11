const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const loading_screen = document.getElementById("loading");
let loaded = false;
let load_counter = 0;

const layer_list = Array(10)
	.fill()
	.map((_, i) => ({
		image: new Image(),
		src: "./images/layer_1_1.png",
		z_index: i * 0.1,
		position: {
			x: 0,
			y: 0,
		},
		opacity: i * 0.1 + 0.1,
	}));

layer_list.forEach(function (layer, index) {
	layer.image.onload = function () {
		load_counter += 1;
		if (load_counter >= layer_list.length) {
			loading_screen.classList.add("hidden");
			requestAnimationFrame(drawCanvas);
		}
	};
	layer.image.src = layer.src;
});

function drawCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	TWEEN.update();
	var rotate_x = pointer.y * -0.15 + motion.y * 1.2;
	var rotate_y = pointer.x * 0.15 + motion.x * 1.2;
	canvas.style.transform =
		"rotateX(" + rotate_x + "deg) rotateY(" + rotate_y + "deg)";
	layer_list.forEach(function (layer, index) {
		layer.position = getOffset(layer);
		context.globalAlpha = layer.opacity;
		context.drawImage(layer.image, layer.position.x, layer.position.y);
	});
	requestAnimationFrame(drawCanvas);
}

const getOffset = (layer) => {
	const touch_multiplier = 0.3;
	const touch_offset_x = pointer.x * layer.z_index * touch_multiplier;
	const touch_offset_y = pointer.y * layer.z_index * touch_multiplier;
	const motion_multiplier = 2.5;
	const motion_offset_x = motion.x * layer.z_index * motion_multiplier;
	const motion_offset_y = motion.y * layer.z_index * motion_multiplier;
	return {
		x: touch_offset_x + motion_offset_x,
		y: touch_offset_y + motion_offset_y,
	};
};

let moving = false;

const pointer_initial = {
	x: 0,
	y: 0,
};
const pointer = {
	x: 0,
	y: 0,
};

const pointerStart = (event) => {
	moving = true;
	if (event.type === "touchstart") {
		pointer_initial.x = event.touches[0].clientX;
		pointer_initial.y = event.touches[0].clientY;
	} else if (event.type === "mousedown") {
		pointer_initial.x = event.clientX;
		pointer_initial.y = event.clientY;
	}
};

const pointerMove = (event) => {
	event.preventDefault();
	if (moving === true) {
		var current_x = 0;
		var current_y = 0;
		if (event.type === "touchmove") {
			current_x = event.touches[0].clientX;
			current_y = event.touches[0].clientY;
		} else if (event.type === "mousemove") {
			current_x = event.clientX;
			current_y = event.clientY;
		}
		pointer.x = current_x - pointer_initial.x;
		pointer.y = current_y - pointer_initial.y;
	}
};

canvas.addEventListener("touchstart", pointerStart);
canvas.addEventListener("mousedown", pointerStart);
window.addEventListener("mousemove", pointerMove);
window.addEventListener("touchmove", pointerMove);

// Listen to any time you move your finger in the canvas element
canvas.addEventListener("touchmove", function (event) {
	// Don't scroll the screen
	event.preventDefault();
});
// Listen to any time you move your mouse in the canvas element
canvas.addEventListener("mousemove", function (event) {
	// Don't do whatever would normally happen when you click and drag
	event.preventDefault();
});

// Listen for when you stop touching the screen
window.addEventListener("touchend", function (event) {
	// Run the endGesture function (below)
	endGesture();
});
// Listen for when you release the mouse button anywhere on the screen
window.addEventListener("mouseup", function (event) {
	// Run the endGesture function (below)
	endGesture();
});

const endGesture = () => {
	moving = false;
	TWEEN.removeAll();
	const pointer_tween = new TWEEN.Tween(pointer)
		.to(
			{
				x: 0,
				y: 0,
			},
			300,
		)
		.easing(TWEEN.Easing.Back.Out)
		.start();
};

const motion_initial = {
	x: null,
	y: null,
};
const motion = {
	x: 0,
	y: 0,
};

window.addEventListener("deviceorientation", (event) => {
	if (!motion_initial.x && !motion_initial.y) {
		motion_initial.x = event.beta;
		motion_initial.y = event.gamma;
	}
	if (window.orientation === 0) {
		motion.x = event.gamma - motion_initial.y;
		motion.y = event.beta - motion_initial.x;
	} else if (window.orientation === 90) {
		motion.x = event.beta - motion_initial.x;
		motion.y = -event.gamma + motion_initial.y;
	} else if (window.orientation === -90) {
		motion.x = -event.beta + motion_initial.x;
		motion.y = event.gamma - motion_initial.y;
	} else {
		motion.x = -event.gamma + motion_initial.y;
		motion.y = -event.beta + motion_initial.x;
	}
	const max_offset = 23;
	if (Math.abs(motion.x) > max_offset) {
		if (motion.x < 0) {
			motion.x = -max_offset;
		} else {
			motion.x = max_offset;
		}
	}
	if (Math.abs(motion.y) > max_offset) {
		if (motion.y < 0) {
			motion.y = -max_offset;
		} else {
			motion.y = max_offset;
		}
	}
});

window.addEventListener("orientationchange", () => {
	motion_initial.x = 0;
	motion_initial.y = 0;
});
