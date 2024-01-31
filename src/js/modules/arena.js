
// Game information
let level = 0;
let linesCleared = 0;
let paused = false;
let pieceArray = ["T", "O", "I", "L", "J", "S", "Z"];

// Player Piece drop timer
let lastTime = 0;
let dropCount = 0;
let dropInterval = 500;

let Arena = {
	init() {
		// canvas reference
		this.cvs = window.find(".view-game .main canvas.arena");
		this.ctx = this.cvs[0].getContext("2d", { willReadFrequently: true });
		this.width = +this.cvs.attr("width");
		this.height = +this.cvs.attr("height");

		this.matrix = this.createMatrix(10, 20);
	},
	level(i) {
		levels[i].slice(1).map((row, y) =>
				row.split("").map((v, x) =>
					this.matrix[y][x] = +v));
		Player.level(i);
		// this.draw();
		// Player.draw();
	},
	reset() {
		// blank level
		this.matrix.forEach(row => row.fill(0));
	},
	draw(ctx) {
		// draw matrix
		this.drawMatrix(ctx, this.matrix, { x: 0, y: 0 });
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
			case "O": return [[1,1],[1,1]];
			case "T": return [[0,0,0],[2,2,2],[0,2,0]];
			case "L": return [[0,3,0],[0,3,0],[0,3,3]];
			case "I": return [[0,0,0,0],[4,4,4,4],[0,0,0,0],[0,0,0,0]];
			case "J": return [[0,5,0],[0,5,0],[5,5,0]];
			case "S": return [[0,6,6],[6,6,0],[0,0,0]];
			case "Z": return [[7,7,0],[0,7,7],[0,0,0]];
		}
	},
	randomPiece(type) {
		return this.createPiece(type || pieceArray[Math.floor(Math.random() * pieceArray.length)]);
	},
	drawMatrix(ctx, matrix, offset, color) {
		let scale = 26,
			sMap = [[25, 0], [50, 0], [75, 0], [0, 25], [25, 25], [50, 25], [75, 25], [0, 50], [0, 0]];

		matrix.forEach((row, y) => {
			row.forEach((v, x) => {
				if (v !== 0) {
					let c = color || v - 1;
					ctx.drawImage(sprite,
						sMap[c][0], sMap[c][1], 25, 25,
						(x + offset.x) * scale, (y + offset.y) * scale, scale-1, scale-1);
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
				// blast row with FX
				FX.blast(y, row);
				
				Arena.matrix.unshift(row.fill(0));
				Player.score += rowMultiplier * 50;
				Player.highscore = Math.max(Player.highscore, Player.score);
				rowMultiplier *= 2;
				y++; // Because of the splicing offset
				// Level
				level = Math.floor(linesCleared / 10);
			}
		}
	}
};
