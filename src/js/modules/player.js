
let Player = {
	// Props
	active: {
		shape: null,
		matrix: [],
	},
	next: null,
	held: null,
	pos: { x: 0, y: 0 },
	score: 0,
	highscore: 0,
	init() {
		this.score = 0;
		if (!this.next) this.next = Arena.randomPiece({ loc: "next" });
		if (!this.held) this.held = Arena.randomPiece({ loc: "hold" });
		this.reset();
	},
	// Methods
	collisionCheck(pos) {
		let m = this.active.matrix,
			o = pos || this.pos;
		for(let y=0, yl=m.length; y<yl; ++y) {
			for(let x=0, xl=m[y].length; x<xl; ++x) {
				if (m[y][x] !== 0 && (Arena.matrix[y + o.y] && Arena.matrix[y + o.y][x + o.x]) !== 0) {
					return true;
				}
			}
		}
		return false;
	},
	draw(ctx) {
		Arena.drawMatrix(ctx, this.active.matrix, { x: this.pos.x, y: this.pos.y });
		// Ghost piece
		for(let y=0; y<20; y++) {
			if (this.collisionCheck({ x: this.pos.x, y: y }) && y >= this.pos.y) {
				Arena.drawMatrix(ctx, this.active.matrix, { x: this.pos.x, y: y - 1 }, 7);
				return false;
			}
		}
	},
	drop() { 
		this.pos.y++; 
		if (removeRows.length) {
			Arena.rowsRemove();
		}
		if (this.collisionCheck()) {
			this.pos.y--;
			this.merge();
			Arena.lineCheck();
			this.reset();
		}
		dropCount = 0; 
	},
	hardDrop() {
		let count = 0;
		while ((!this.collisionCheck()) && count < 20) {
			this.pos.y++;
			count++;
		}
		this.pos.y--;
		this.score += Math.max(count-1, 0) * 2;
		Arena.els.score.html(this.score); // DOM update
		
		if (this.highscore > this.score) {
			this.highscore = this.score;
			Arena.els.highScore.html(this.highscore); // DOM update
		}
		this.drop();
	},
	merge() { 
		this.active.matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					Arena.matrix[y + this.pos.y][x + this.pos.x] = value;
				}
			}); 
		});
	},
	level(i) {
		let data = levels[i][0];
		this.next = Arena.randomPiece({ loc: "next", shape: data.shape });
		this.active = this.next;
		this.pos = data.pos;
	},
	reset() {
		this.active = this.next;
		this.next = Arena.randomPiece({ loc: "next" });
		this.pos.y = 0;
		this.pos.x = (Arena.matrix[0].length - this.active.matrix[0].length) >> 1;

		// Game Over check
		if (this.collisionCheck()) {
			Game.setState("game-over");
		}
	},
	rotate(dir) {
		for(let y=0; y<this.active.matrix.length; ++y) {
			for(let x=0; x<y; ++x) {
				[
					this.active.matrix[x][y],
					this.active.matrix[y][x],
				] = [
					this.active.matrix[y][x],
					this.active.matrix[x][y],
				];
			}
		}
		
		if (dir > 0) {
			this.active.matrix.forEach(row => row.reverse());
		} else {
			this.active.matrix.reverse();
		}
		
		// collision check in case we rotate into the wall/another piece
		let pos = this.pos.x;
		let offset = 1;
		while (this.collisionCheck()) {
			this.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));
			if (offset > this.active.matrix[0].length) {
				this.rotate(-dir);
				this.pos.x = pos;
				return;
			}
		}
	},
	shift(dir) {
		this.pos.x += dir;
		if (this.collisionCheck()) {
			this.pos.x -= dir;
		}
	},
	switchPiece() {
		[this.held, this.matrix] = [this.matrix, this.held];

		// update UI
		let shape = Arena.els.hold.data("shape");
		Arena.els.hold.data({ shape: this.active.shape });
		this.active.shape = shape;
		this.active.matrix = pieceMap[shape];

		// collision check in case we rotate into the wall/another piece
		let pos = this.pos.x;
		let offset = 1;
		while (this.collisionCheck()) {
			this.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));
			if (offset > this.matrix[0].length) {
				this.switchPiece();
				this.pos.x = pos;
				return;
			}
		}
	}
};
