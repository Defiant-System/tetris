

let Game = {
	init() {
		Arena.init();
		this.reset();

		// FPS start here
		let Self = this;
		this.fpsControl = karaqu.FpsControl({
			callback(n) {
				Arena.draw();
				// Player.draw();
			}
		});
	},
	setState(name) {
		let currState = this._state;
		this._state = name;

		switch (this._state) {
			case "play":
				this.fpsControl.fps = 60;
				this.fpsControl.start();
				break;
			case "pause":
				this.fpsControl.stop();
				break;
			case "over":
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
