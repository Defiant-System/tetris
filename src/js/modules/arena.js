
// Game information
let level = 0;
let linesCleared = 0;
let paused = false;
let pieceMap = {
		O: [[2,2],[2,2]],
		T: [[0,0,0],[5,5,5],[0,5,0]],
		L: [[0,1,0],[0,1,0],[0,1,1]],
		I: [[0,0,0,0],[6,6,6,6],[0,0,0,0],[0,0,0,0]],
		J: [[0,4,0],[0,4,0],[4,4,0]],
		S: [[0,3,3],[3,3,0],[0,0,0]],
		Z: [[7,7,0],[0,7,7],[0,0,0]],
	};
let pieceArray = Object.keys(pieceMap);
let removeRows = [];

// Player Piece drop timer
let lastTime = 0;
let dropCount = 0;
let dropInterval = 500;

let Arena = {
	init() {
		// fast references
		this.els = {
			next: window.find(".side .next .shape"),
			hold: window.find(".side .hold .shape"),
			score: window.find(".side h2.score span"),
			highScore: window.find(".side h2.high-score span"),
			level: window.find(".side h2.level span"),
			lines: window.find(".side h2.lines span"),
		};
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
	randomPiece(opt={}) {
		let shape = opt.shape || pieceArray[Math.floor(Math.random() * pieceArray.length)];
		if (opt.loc) this.els[opt.loc].data({ shape });
		return pieceMap[shape];
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
	rowsRemove() {
		// remove rows and push down
		while (removeRows.length) {
			let [y, cells] = removeRows.pop(),
				row = this.matrix.splice(y, 1)[0];
			this.matrix.unshift(row.fill(0));
		}
		// reset stack
		removeRows = [];
	},
	lineCheck() {
		let rowMultiplier = 1;
		for (let y=this.matrix.length-1; y>0; y--) {
			let row = this.matrix[y];
			if (row.every(x => x > 0)) {
				/// add to remove stack
				removeRows.push([y, [...row]]);
				// blast row(s) with effect
				FX.blast(y, row);
				// empty cells
				row.fill(0);

				Player.score += rowMultiplier * 50;
				Player.highscore = Math.max(Player.highscore, Player.score);
				rowMultiplier *= 2;
				// Level
				linesCleared++;
				level = Math.floor(linesCleared / 10);
			}
		}
	}
};
