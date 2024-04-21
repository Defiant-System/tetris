
@import "./classes/fog.js"
@import "./classes/shard.js"
@import "./classes/sparkle.js"

@import "./modules/utils.js"
@import "./modules/fragments.js"
@import "./modules/arena.js"
@import "./modules/player.js"
@import "./modules/fx.js"
@import "./modules/game.js"
@import "./modules/levels.js"

@import "./modules/test.js"


let bestScore = window.settings.getItem("best-score") || 0;

const tetris = {
	init() {
		// fast references
		this.content = window.find("content");
		// set high score, if any
		Player.highscore = bestScore;
		this.content.find(".side h2.high-score span").html(bestScore);
		// init game engine
		Game.init();

		// DEV-ONLY-START
		Test.init(this);
		// DEV-ONLY-END
	},
	dispatch(event) {
		// console.log(event);
		switch (event.type) {
			// system events
			case "window.init":
				break;
			case "window.keystroke":
				switch (event.char) {
					case "w":
					case "up":    if (Game._state === "play") Player.rotate(); break;
					case "s":
					case "down":  if (Game._state === "play") Player.drop(); break;
					case "a":
					case "left":  if (Game._state === "play") Player.shift(-1); break;
					case "d":
					case "right": if (Game._state === "play") Player.shift(1); break;
					case "space": if (Game._state === "play") Player.hardDrop(); break;
					case "shift": if (Game._state === "play") Player.switchPiece(); break;
					case "esc":
						if (Game._state === "play") Game.setState("start");
						else Game.setState("reset");
						break;
					case "p": Game.setState("pause"); break;
				}
				break;
			// custom events
			case "goto-start":
				Game.setState("start");
				break;
			case "new-game":
				Game.setState("play");
				break;
			case "pause-game":
				Game.setState("pause");
				break;
			case "reset-game":
				Game.setState("start");
				break;
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = tetris;
