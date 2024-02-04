

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
				dropInterval = Math.max(dropInterval - 1, fastestInterval);
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
			case "start":
				// stop loop, if not stopped
				this.fpsControl.stop();
				// reset flag
				delete this._state;
				// remove timer
				clearTimeout(this.timer);
				// empty arena
				Arena.reset();
				// start view
				APP.content.data({ show: "start" });
				break;
			case "reset":
				// stop loop, if not stopped
				this.fpsControl.stop();
				// set correct flag
				this._state = "play";
				// empty arena
				Arena.reset();
				/* falls through */
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
				let msec = 5000;
				// stop loop
				this.fpsControl.stop();
				setTimeout(() => {
					// playing view
					APP.content.data({ show: "game-over" });
					
					if (Player.highscore > bestScore) {
						Player.score = Player.highscore;
						// save new score to settings
						window.settings.setItem("best-score", Player.score);
						// fireworks
						APP.content.addClass("show-fireworks");
						// DOM update
						Arena.els.score.html(Player.score);
						Arena.els.highScore.html(Player.highscore);
						// longer timer for fireworks
						msec = 10000;
					}
					// show start view after certain time
					this.timer = setTimeout(() => this.setState("start"), msec);
				}, 750);
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
