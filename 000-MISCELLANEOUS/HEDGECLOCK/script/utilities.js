export function checkDirection(grid, row, col) {
	let directions = [];
	// Get the dimensions of the 2D array
	const numRows = grid.length;
	const numCols = grid[0].length;
	// Check UP (above the current element)
	if (row > 0 && grid[row - 1][col]) {
		directions.push("up");
	}
	// Check DOWN (below the current element)
	if (row < numRows - 1 && grid[row + 1][col]) {
		directions.push("down");
	}
	// Check LEFT (left of the current element)
	if (col > 0 && grid[row][col - 1]) {
		directions.push("left");
	}
	// Check RIGHT (right of the current element)
	if (col < numCols - 1 && grid[row][col + 1]) {
		directions.push("right");
	}
	// Check TOP-LEFT (diagonal up-left)
	if (row > 0 && col > 0 && grid[row - 1][col - 1] === true) {
		directions.push("top-left");
	}
	// Check TOP-RIGHT (diagonal up-right)
	if (row > 0 && col < numCols - 1 && grid[row - 1][col + 1] === true) {
		directions.push("top-right");
	}
	// Check BOTTOM-LEFT (diagonal down-left)
	if (row < numRows - 1 && col > 0 && grid[row + 1][col - 1] === true) {
		directions.push("bottom-left");
	}
	// Check BOTTOM-RIGHT (diagonal down-right)
	if (
		row < numRows - 1 &&
		col < numCols - 1 &&
		grid[row + 1][col + 1] === true
	) {
		directions.push("bottom-right");
	}
	return directions;
}

export const getLevel = (index, increment) => {
	if (index === 1) {
		return increment * 2;
	}
	if (index === 2) {
		return increment * 3;
	}
	if (index === 3) {
		return increment * 5;
	}
	if (index === 4) {
		return increment * 6;
	}
	return 0;
};

const getNumerals = (n) =>
	n.length === 1 ? [0, Number(n[0])] : [Number(n[0]), Number(n[1])];

export const getTimeArray = () => {
	const date = new Date();
	const hour = getNumerals(date.getHours().toString().split(""));
	const minutes = getNumerals(date.getMinutes().toString().split(""));
	const seconds = getNumerals(date.getSeconds().toString().split(""));
	return [...hour, ...minutes, ...seconds];
};
