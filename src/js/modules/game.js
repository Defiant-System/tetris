

let Game = {
	init() {
		FX.init();
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
				let cvs = Arena.cvs,
					ctx = Arena.ctx,
					width = Arena.width;
				// reset canvas
				cvs.attr({ width });
				// draw game
				Arena.draw(ctx);
				Player.draw(ctx);
				FX.draw(ctx);
			}
		});
	},
	setState(name, level) {
		let currState = this._state;
		this._state = name;

		switch (this._state) {
			case "test":
				Arena.level(level);
				/* falls through */
			case "play":
				this.fpsControl.fps = 60;
				this.fpsControl.start();

				Player.init();
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
		// Player.reset();
		dropCount = 0;
		linesCleared = 0;
		level = 0;
	}
};
