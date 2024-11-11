import { Polygon } from "./Polygon.js";
// import {dragmove as _dragmove} from './DragMove.js'

export class DraggablePolygon extends Polygon {
	/*
	 * Adapted from Draggable (https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88)
	 */
	constructor(p5, colour, vertices, drawLines, drawBoundingBox) {
		super(p5, colour, vertices, drawLines, drawBoundingBox);
		this.dragging = false;
		this.rollover = false;
		this.snapped = false;
	}

	reset(nVertices) {
		this.vertices = nVertices;
		this.midpoints = nVertices.reduce(
			(previousValue, element, index, array) => {
				if (index < array.length - 1) {
					previousValue.push([
						(element[0] + array[index + 1][0]) / 2,
						(element[1] + array[index + 1][1]) / 2,
					]);
				}
				return previousValue;
			},
			[],
		);
		this.bb = this.calculateBoundingBox(nVertices);
		this.snapped = false;
	}

	over() {
		// https://github.com/substack/point-in-polygon
		const x = this.p5.mouseX;
		const y = this.p5.mouseY;
		let inside = false;
		for (
			let i = 0, j = this.vertices.length - 1;
			i < this.vertices.length;
			j = i++
		) {
			const xi = this.vertices[i][0];
			const yi = this.vertices[i][1];
			const xj = this.vertices[j][0];
			const yj = this.vertices[j][1];
			const intersect =
				yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
			if (intersect) inside = !inside;
			this.rollover = inside;
		}
	}

	update() {
		if (this.dragging) {
			this.vertices.forEach((element, index) => {
				this.vertices[index][0] = this.p5.mouseX + this.vOffsets[index][0];
				this.vertices[index][1] = this.p5.mouseY + this.vOffsets[index][1];
			}, this.vertices);
			this.midpoints.forEach((element, index) => {
				this.midpoints[index][0] = this.p5.mouseX + this.mpOffsets[index][0];
				this.midpoints[index][1] = this.p5.mouseY + this.mpOffsets[index][1];
			}, this.midpoints);
			this.bb = this.calculateBoundingBox(this.vertices);
		}
	}

	pressed() {
		if (this.rollover && !this.snapped) {
			this.dragging = true;
			this.vOffsets = this.vertices.map((vertex) => {
				return [vertex[0] - this.p5.mouseX, vertex[1] - this.p5.mouseY];
			});
			this.mpOffsets = this.midpoints.map((midpoint) => {
				return [midpoint[0] - this.p5.mouseX, midpoint[1] - this.p5.mouseY];
			});
		}
	}

	snap(source, end) {
		const moveX = source[0] - end[0];
		const moveY = source[1] - end[1];
		this.vertices.forEach((element, index) => {
			this.vertices[index][0] += moveX;
			this.vertices[index][1] += moveY;
		}, this.vertices);
		this.midpoints.forEach((element, index) => {
			this.midpoints[index][0] += moveX;
			this.midpoints[index][1] += moveY;
		}, this.midpoints);
		this.bb = this.calculateBoundingBox(this.vertices);
		this.snapped = true;
	}

	pDistance(x, y, x1, y1, x2, y2) {
		// https://stackoverflow.com/a/6853926/592058
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
	}

	getVertexDistance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}

	checkBoundingBox(target) {
		const left = this.bb.x + this.bb.width < target.bb.y;
		const right = target.bb.x + target.bb.width < this.bb.x;
		const bottom = target.bb.y + target.bb.height < this.bb.y;
		const top = this.bb.y + this.bb.height < target.bb.y;
		if (top && left)
			return this.getVertexDistance(
				this.bb.x + this.bb.width,
				this.bb.y + this.bb.height,
				target.bb.x,
				target.bb.y,
			);
		if (left && bottom)
			return this.getVertexDistance(
				this.bb.x + this.bb.width,
				this.bb.y,
				target.bb.x,
				target.bb.y + target.bb.height,
			);
		if (bottom && right)
			return this.getVertexDistance(
				this.bb.x,
				this.bb.y,
				target.bb.x + target.bb.width,
				target.bb.y + target.bb.height,
			);
		if (right && top)
			return this.getVertexDistance(
				this.bb.x,
				this.bb.y + this.bb.height,
				target.bb.x + target.bb.width,
				target.bb.y,
			);
		if (left) return target.bb.x - (this.bb.x + this.bb.width);
		if (right) return this.bb.x - (target.bb.x + target.bb.width);
		if (top) return target.bb.y - (this.bb.y + this.bb.height);
		if (bottom) return this.bb.y - (target.bb.y + target.bb.height);
		return 0;
	}

	checkVertices(target) {
		for (let i = 0; i < target.vertices.length; i++) {
			for (let j = 0; j < this.vertices.length; j++) {
				const distance = this.getVertexDistance(
					this.vertices[j][0],
					this.vertices[j][1],
					target.vertices[i][0],
					target.vertices[i][1],
				);
				if (distance <= 20) {
					return {
						targetNode: [...target.vertices[i]],
						sourceNode: [...this.vertices[j]],
					};
				}
			}
		}
	}

	checkMidpoints(target) {
		for (let i = 0; i < target.midpoints.length; i++) {
			for (let j = 0; j < this.vertices.length; j++) {
				const distance = this.getVertexDistance(
					this.vertices[j][0],
					this.vertices[j][1],
					target.midpoints[i][0],
					target.midpoints[i][1],
				);
				if (distance <= 15) {
					return {
						targetNode: [...target.midpoints[i]],
						sourceNode: [...this.vertices[j]],
					};
				}
			}
		}
	}

	checkLines(target) {
		for (let i = 0; i < target.lines.length; i++) {
			for (let j = 0; j < this.vertices.length; j++) {
				const distance = this.pDistance(
					this.vertices[j][0],
					this.vertices[j][1],
					target.lines[i][0],
					target.lines[i][1],
					target.lines[i][2],
					target.lines[i][3],
				);
				if (distance.distance < 10) {
					return {
						targetNode: [
							this.vertices[j][0] - distance.pointX,
							this.vertices[j][1] - distance.pointY,
						],
						sourceNode: [...this.vertices[j]],
					};
				}
			}
		}
	}

	dragmove(target) {
		if (this.dragging) {
			// console.log(_dragmove([...target.vertices], [...this.vertices]))
			const checkBoundingBox = this.checkBoundingBox(target);
			if (checkBoundingBox < 25) {
				const checkVertices = this.checkVertices(target);
				if (checkVertices) {
					this.dragging = false;
					this.snap(checkVertices.targetNode, checkVertices.sourceNode);
					return;
				}
				const checkMidpoints = this.checkMidpoints(target);
				if (checkMidpoints) {
					this.dragging = false;
					this.snap(checkMidpoints.targetNode, checkMidpoints.sourceNode);
					return;
				}
				const checkLines = this.checkLines(target);
				if (checkLines) {
					this.dragging = false;
					this.snap(checkLines.targetNode, checkLines.sourceNode);
					return;
				}
			}
		}
	}

	// _dragmove(verticesA, verticesB, vertexSnap = 20, midpointSnap = 15, lineSnap = 10){
	//
	//   const getSimpleDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
	//
	//   const pDistance = (x, y, x1, y1, x2, y2) => {
	//     // https://stackoverflow.com/a/6853926/592058
	//     const A = x - x1
	//     const B = y - y1
	//     const C = x2 - x1
	//     const D = y2 - y1
	//     const dot = A * C + B * D
	//     const len_sq = C * C + D * D
	//     const param = (len_sq !== 0) ? dot / len_sq : -1
	//     const xx = (param < 0) ? x1 : (param > 1) ? x2 : x1 + param * C
	//     const yy = (param < 0) ? y1 : (param > 1) ? y2 : y1 + param * D
	//     const dx = x - xx
	//     const dy = y - yy
	//     return {
	//       distance: Math.sqrt(dx * dx + dy * dy),
	//       pointX: dx,
	//       pointY: dy
	//     }
	//   }
	//
	//   const snap = (vertexA, vertexB, verticesA, verticesB) => {
	//     const moveX = vertexA[0] - vertexB[0]
	//     const moveY = vertexA[1] - vertexB[1]
	//     verticesB.forEach((element, index) => {
	//       verticesB[index][0] += moveX
	//       verticesB[index][1] += moveY
	//     }, verticesB);
	//     return verticesB
	//   }
	//
	//   for(const a of verticesA){
	//     for(const b of verticesB){
	//       const distance = getSimpleDistance(b[0], b[1], a[0], a[1])
	//       if(distance <= vertexSnap){
	//         return {
	//           snapped: true,
	//           verticesBSnapped: snap(a, b, verticesA, verticesB),
	//           snapDetails: `Snapped on vertex at distance: ${distance}px, threshold was ${vertexSnap}px`
	//         }
	//       }
	//     }
	//   }
	//
	//   const midpoints = verticesA.reduce((previousValue, element, index, array) => {
	//     if(index < array.length - 1){
	//       previousValue.push([(element[0] + array[index + 1][0]) / 2, (element[1] + array[index + 1][1]) / 2 ])
	//     }
	//     return previousValue
	//   }, [])
	//
	//   for(const a of midpoints){
	//     for(const b of verticesB){
	//       const distance = getSimpleDistance(b[0], b[1], a[0], a[1])
	//       if(distance <= midpointSnap){
	//         return {
	//           snapped: true,
	//           verticesBSnapped: snap(a, b, midpoints, verticesB),
	//           snapDetails: `Snapped on midpoint at distance: ${distance}px, threshold was ${midpointSnap}px`
	//         }
	//       }
	//     }
	//   }
	//
	//   const lines = verticesA.reduce((previousValue, element, index, array) => {
	//     if(index < array.length - 1){
	//       previousValue.push([element[0], element[1], array[index + 1][0], array[index + 1][1]])
	//     }
	//     return previousValue
	//   }, [])
	//
	//   for(const a of lines){
	//     for(const b of verticesB){
	//       const distance = pDistance(b[0], b[1], a[0], a[1], a[2], a[3])
	//       if(distance.distance < lineSnap) {
	//         return {
	//           snapped: true,
	//           verticesBSnapped: snap([b[0] - distance.pointX, b[1] - distance.pointY], b, verticesA, verticesB),
	//           snapDetails: `Snapped on line at distance: ${distance.distance}px, threshold was ${lineSnap}px`
	//         }
	//       }
	//     }
	//   }
	//
	//   return {
	//     snapped: false,
	//     verticesBSnapped: verticesB
	//   }
	//
	// }

	released() {
		this.dragging = false;
	}
}
