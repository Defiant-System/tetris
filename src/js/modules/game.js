

let Game = {
	init() {
		this.reset();
		// FPS start here
	},
	reset() {
		Player.nextPiece = Arena.randomPiece();
		Arena.matrix.forEach(row => row.fill(0));
		Player.reset();
		Player.score = 0;
		Player.heldPiece = Arena.randomPiece();
		dropCount = 0;
		linesCleared = 0;
		level = 0;
	}
};
