const one = [
	[0, 1, 0],
	[0, 1, 0],
	[0, 1, 0],
	[0, 1, 0],
	[0, 1, 0],
];
const two = [
	[1, 1, 1],
	[0, 0, 1],
	[1, 1, 1],
	[1, 0, 0],
	[1, 1, 1],
];
const three = [
	[1, 1, 1],
	[0, 0, 1],
	[0, 1, 1],
	[0, 0, 1],
	[1, 1, 1],
];
const four = [
	[1, 0, 1],
	[1, 0, 1],
	[1, 1, 1],
	[0, 0, 1],
	[0, 0, 1],
];
const five = [
	[1, 1, 1],
	[1, 0, 0],
	[1, 1, 1],
	[0, 0, 1],
	[1, 1, 1],
];
const six = [
	[1, 1, 1],
	[1, 0, 0],
	[1, 1, 1],
	[1, 0, 1],
	[1, 1, 1],
];
const seven = [
	[1, 1, 1],
	[0, 0, 1],
	[0, 0, 1],
	[0, 0, 1],
	[0, 0, 1],
];
const eight = [
	[1, 1, 1],
	[1, 0, 1],
	[1, 1, 1],
	[1, 0, 1],
	[1, 1, 1],
];
const nine = [
	[1, 1, 1],
	[1, 0, 1],
	[1, 1, 1],
	[0, 0, 1],
	[1, 1, 1],
];
const zero = [
	[1, 1, 1],
	[1, 0, 1],
	[1, 0, 1],
	[1, 0, 1],
	[1, 1, 1],
];

export const numerals = [
	structuredClone(zero),
	structuredClone(one),
	structuredClone(two),
	structuredClone(three),
	structuredClone(four),
	structuredClone(five),
	structuredClone(six),
	structuredClone(seven),
	structuredClone(eight),
	structuredClone(nine),
];

export const imageTiles = [
	"dot",
	"down",
	"down_left",
	"down_left_up",
	"down_right",
	"down_right_up",
	"left",
	"left_right",
	"left_up",
	"right",
	"right_up",
	"top",
	"vertical",
];

export const evaluatable = [
	"down_left",
	"down_left_up",
	"down_right",
	"down_right_up",
	"left",
	"left_right",
	"left_up",
	"right",
	"right_up",
];
