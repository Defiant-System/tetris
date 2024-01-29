
// Game information
let level = 0;
let linesCleared = 0;
let paused = false;
let pieceArray = ["T", "O", "I", "L", "J", "S", "Z"];

// Player Piece drop timer
let lastTime = 0;
let dropCount = 0;
let dropInterval = 1000;

// Color palette for the blocks
let palette = ["#ffeb3b", "#9c27b0", "#ff9800", "#3f51b5", "#03a9f4", "#4caf50", "#f44336"];


let Arena = {
	init() {
		// canvas reference
		this.cvs = window.find(".view-game .main canvas");
		this.ctx = this.cvs[0].getContext("2d", { willReadFrequently: true });
		this.width = +this.cvs.attr("width");
		this.height = +this.cvs.attr("height");

		this.pos = { x: 10, y: 2 };
		this.matrix = this.createMatrix(10, 20);
	},
	draw() {
		this.drawMatrix(this.matrix, this.pos);
	},
	createMatrix(w, h) {
		let matrix = [];
		while (h--) {
			matrix.push(new Array(w).fill(0));
		}
		return matrix;
	},
	createPiece(type) {
		switch(type) {
			case 'O': return [[1,1],[1,1]];
			case 'T': return [[0,0,0],[2,2,2],[0,2,0]];
			case 'L': return [[0,3,0],[0,3,0],[0,3,3]];
			case 'J': return [[0,4,0],[0,4,0],[4,4,0]];
			case 'I': return [[0,5,0,0],[0,5,0,0],[0,5,0,0],[0,5,0,0]];
			case 'S': return [[0,6,6],[6,6,0],[0,0,0]];
			case 'Z': return [[7,7,0],[0,7,7],[0,0,0]];
		}
	},
	randomPiece() {
		return this.createPiece(pieceArray[Math.floor(Math.random() * pieceArray.length)]);
	},
	drawMatrix(matrix, offset, color) {
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value !== 0) {
					if (color) {
						ctx.fillStyle = paused ? "rgba(0,0,0,0)" : color;
					} else {
						ctx.fillStyle = paused ? "rgba(255,255,255,0.2)" : (palette[value - 1] || "white");
					}
					ctx.strokeStyle = "rgba(0,10,30,1)";
					ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
					ctx.strokeRect(x + offset.x, y + offset.y, 1, 1);
				}
			});
		});
	},
	lineCheck() {
		let rowMultiplier = 1;
		for (let y=Arena.matrix.length-1; y>0; y--) {
			// if (Arena.matrix[y].every(function(x) {return x > 0;})) {
			if (Arena.matrix[y].every(x => x > 0)) {
				linesCleared++;
				let row = Arena.matrix.splice(y, 1)[0];
				Arena.matrix.unshift(row.fill(0));
				player.score += rowMultiplier * 50;
				player.highscore = Math.max(player.highscore, player.score);
				rowMultiplier *= 2;
				y++; // Because of the splicing offset
				// Level
				level = Math.floor(linesCleared / 10);
			}
		}
	}
};
