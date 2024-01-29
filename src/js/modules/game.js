

let Game = {
	init() {
		Arena.init();
		this.reset();

		// FPS start here
		let Self = this;
		this.fpsControl = karaqu.FpsControl({
			callback(time, delta) {
				dropCount += delta;
				if (dropCount > Math.max((dropInterval - (level * 60)), 60)) {
					Player.drop();
				}
				Arena.draw();
				Player.draw();
			}
		});
	},
	setState(name, level) {
		let currState = this._state;
		this._state = name;

		switch (this._state) {
			case "test":
				Arena.level(level);
				Player.level(level);

				Arena.draw();
				Player.draw();
				break;
			case "play":
				this.fpsControl.fps = 60;
				this.fpsControl.start();
				break;
			case "pause":
				this.fpsControl.stop();
				break;
			case "game-over":
				break;
		}
	},
	reset() {
		Arena.reset();
		Player.reset();
		dropCount = 0;
		linesCleared = 0;
		level = 0;
	}
};
