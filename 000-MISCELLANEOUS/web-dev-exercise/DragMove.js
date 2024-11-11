/*
 * You can see it in action here: https://annoyingmouse.js.org/WireFrameJS/000-MISCELLANEOUS/web-dev-exercise/
 */

export const dragmove = (
	verticesA,
	verticesB,
	vertexSnap = 20,
	midpointSnap = 15,
	lineSnap = 10,
) => {
	// Utility function to calculate distance between points
	const getSimpleDistance = (x1, y1, x2, y2) =>
		Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

	// Utility function to calculate distance between a point and a line (needed some research for this one)
	// https://stackoverflow.com/a/6853926/592058
	const pDistance = (x, y, x1, y1, x2, y2) => {
		const A = x - x1;
		const B = y - y1;
		const C = x2 - x1;
		const D = y2 - y1;
		const dot = A * C + B * D;
		const len_sq = C * C + D * D;
		const param = len_sq !== 0 ? dot / len_sq : -1;
		const xx = param < 0 ? x1 : param > 1 ? x2 : x1 + param * C;
		const yy = param < 0 ? y1 : param > 1 ? y2 : y1 + param * D;
		const dx = x - xx;
		const dy = y - yy;
		return {
			distance: Math.sqrt(dx * dx + dy * dy),
			pointX: dx,
			pointY: dy,
		};
	};

	// Snaps all the vertices from verticesB to the appropriate place
	const snap = (vertexA, vertexB, verticesA, verticesB) => {
		const moveX = vertexA[0] - vertexB[0];
		const moveY = vertexA[1] - vertexB[1];
		verticesB.forEach((element, index) => {
			verticesB[index][0] += moveX;
			verticesB[index][1] += moveY;
		}, verticesB);
		return verticesB;
	};

	// Check the distance between all the vertices
	for (const a of verticesA) {
		for (const b of verticesB) {
			const distance = getSimpleDistance(b[0], b[1], a[0], a[1]);
			if (distance <= vertexSnap) {
				return {
					snapped: true,
					verticesBSnapped: snap(a, b, verticesA, verticesB),
					snapDetails: `Snapped on vertex at distance: ${distance}px, threshold was ${vertexSnap}px`,
				};
			}
		}
	}

	// We've not returned so generate the midpoints from verticesA
	const midpoints = verticesA.reduce((previousValue, element, index, array) => {
		if (index < array.length - 1) {
			previousValue.push([
				(element[0] + array[index + 1][0]) / 2,
				(element[1] + array[index + 1][1]) / 2,
			]);
		}
		return previousValue;
	}, []);

	// Check the distance between all the vertices in verticesB and the midpoints from verticesA
	for (const a of midpoints) {
		for (const b of verticesB) {
			const distance = getSimpleDistance(b[0], b[1], a[0], a[1]);
			if (distance <= midpointSnap) {
				return {
					snapped: true,
					verticesBSnapped: snap(a, b, midpoints, verticesB),
					snapDetails: `Snapped on midpoint at distance: ${distance}px, threshold was ${midpointSnap}px`,
				};
			}
		}
	}

	// We've not returned so generate all the lines between the vertices of verticesA
	const lines = verticesA.reduce((previousValue, element, index, array) => {
		if (index < array.length - 1) {
			previousValue.push([
				element[0],
				element[1],
				array[index + 1][0],
				array[index + 1][1],
			]);
		}
		return previousValue;
	}, []);

	// Check the distance between all the vertices in verticesB and the lines generated from verticesA
	for (const a of lines) {
		for (const b of verticesB) {
			const distance = pDistance(b[0], b[1], a[0], a[1], a[2], a[3]);
			if (distance.distance < lineSnap) {
				return {
					snapped: true,
					verticesBSnapped: snap(
						[b[0] - distance.pointX, b[1] - distance.pointY],
						b,
						verticesA,
						verticesB,
					),
					snapDetails: `Snapped on line at distance: ${distance.distance}px, threshold was ${lineSnap}px`,
				};
			}
		}
	}

	// We've not returned yet so we've not snapped
	return {
		snapped: false,
		verticesBSnapped: verticesB,
	};
};
