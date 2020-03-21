const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const SIDE_LENGTH = 20;
const H_DIST = 0.5 * SIDE_LENGTH;
const V_DIST = Math.sqrt(3) * 0.5 * SIDE_LENGTH;
let originPx;

const drawPoint = (x, y) => {
	ctx.fillRect(x, y, 1, 1);
}
// (3,1)h + (0,2)v
const drawGrid = () => {
	const horizontalNum = canvas.width / (3 * H_DIST) + 2;
	const verticalNum = canvas.height / (2 * V_DIST) + 2;
	const hMax = Math.floor(horizontalNum/2);
	const vMax = Math.floor(verticalNum/2);
	for (let h = -hMax; h < hMax + 1; h++) {
		const firstV = -vMax - Math.floor(h/2);
		for (let v = firstV; v < firstV + 2*vMax + 1 /**/; v++) {
			const centerX = H_DIST * (3 * h);
			const centerY = V_DIST * (h + 2 * v);
			// Draw center point
			drawPoint(originPx.x + centerX, originPx.y + centerY);
			// Draw upper half of hexagon edges
			ctx.moveTo(originPx.x + centerX - 2 * H_DIST, originPx.y + centerY);
			ctx.lineTo(originPx.x + centerX - H_DIST, originPx.y + centerY - V_DIST);
			ctx.lineTo(originPx.x + centerX + H_DIST, originPx.y + centerY - V_DIST);
			ctx.lineTo(originPx.x + centerX + 2 * H_DIST, originPx.y + centerY);
			ctx.stroke();
		}
	}
}
const render = () => {
	drawGrid();
};
const resizeCanvas = (e) => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	originPx = {x: canvas.width/2, y: canvas.height/2};
	render();
};
const init = (() => {
	ctx.fillStyle = '#000';
	window.onresize = resizeCanvas;
	// Resize and render on load
	resizeCanvas();
	render();
})();
