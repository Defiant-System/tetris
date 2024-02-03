

let Game = {
	init() {
		FX.init();
		Arena.init();
		this.reset();

		// FPS start here
		let Self = this;
		this.fpsControl = karaqu.FpsControl({
			fps: 60,
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
		let APP = tetris,
			currState = this._state;
		this._state = name;

		switch (this._state) {
			case "test":
				APP.content.data({ show: "playing" });
				Arena.level(level);
				this.fpsControl.start();
				this._state = "play";
				break;
			case "play":
				// playing view
				APP.content.data({ show: "playing" });
				// start cound down
				Arena.countdown(() => {
					// start loop
					this.fpsControl.start();
					Player.init();
				});
				break;
			case "pause":
				if (currState === "play") {
					// pause
					APP.content.data({ show: "pause" });
					// stop loop
					this.fpsControl.stop();
				} else {
					// resume
					APP.content.data({ show: "playing" });
					// start loop
					this.fpsControl.start();
					// set correct flag
					this._state = "play";
				}
				break;
			case "game-over":
				// stop loop
				this.fpsControl.stop();
				setTimeout(() => {
					// playing view
					APP.content.data({ show: "game-over" });
					
					if (Player.score > bestScore) {
						// save new score to settings
						window.settings.setItem("best-score", Player.score);
						// fireworks
						APP.content.addClass("show-fireworks");
						Player.score = Player.score;
					}
				}, 500);
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
