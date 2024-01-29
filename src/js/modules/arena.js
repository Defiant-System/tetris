
// Game information
let level = 0;
let linesCleared = 0;
let paused = false;
let pieceArray = ["T", "O", "I", "L", "J", "S", "Z"];

// Player Piece drop timer
let lastTime = 0;
let dropCount = 0;
let dropInterval = 1000;

let sprite = new Image;
sprite.onload = () => {};
sprite.src = "~/img/sprite.png";


let Arena = {
	init() {
		// canvas reference
		this.cvs = window.find(".view-game .main canvas");
		this.ctx = this.cvs[0].getContext("2d", { willReadFrequently: true });
		this.width = +this.cvs.attr("width");
		this.height = +this.cvs.attr("height");

		this.matrix = this.createMatrix(10, 20);
	},
	reset() {
		this.matrix.forEach(row => row.fill(0));
		// temp
		this.matrix[16][0] = 0;
		this.matrix[16][1] = 1;
		this.matrix[16][2] = 2;
		this.matrix[16][3] = 3;
		this.matrix[16][4] = 4;
		this.matrix[16][5] = 5;
		this.matrix[16][6] = 6;
	},
	draw() {
		// reset canvas
		this.cvs.attr({ width: this.width });

		// draw matrix
		this.drawMatrix(this.matrix, { x: 0, y: 0 });
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
			case "J": return [[0,4,0],[0,4,0],[4,4,0]];
			case "I": return [[0,5,0,0],[0,5,0,0],[0,5,0,0],[0,5,0,0]];
			case "S": return [[0,6,6],[6,6,0],[0,0,0]];
			case "Z": return [[7,7,0],[0,7,7],[0,0,0]];
		}
	},
	randomPiece() {
		return this.createPiece(pieceArray[Math.floor(Math.random() * pieceArray.length)]);
	},
	drawMatrix(matrix, offset, color) {
		let ctx = this.ctx,
			scale = 26,
			sMap = [[25, 0], [50, 0], [75, 0], [0, 25], [25, 25], [50, 25], [75, 25]];

		matrix.forEach((row, y) => {
			row.forEach((v, x) => {
				if (v !== 0) {
					ctx.drawImage(sprite,
						sMap[v][0], sMap[v][1], 25, 25,
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
