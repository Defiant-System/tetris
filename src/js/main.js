
@import "./modules/arena.js"
@import "./modules/player.js"
@import "./modules/game.js"

@import "./modules/test.js"


const tetris = {
	init() {
		// fast references
		this.content = window.find("content");

		Game.init();

		// DEV-ONLY-START
		Test.init(this);
		// DEV-ONLY-END
	},
	dispatch(event) {
		switch (event.type) {
			// system events
			case "window.init":
				break;
			case "window.keydown":
				switch (event.char) {
					case "w":
					case "up": Player.rotate(); break;
					case "s":
					case "down": Player.drop(); break;
					case "a":
					case "left": Player.shift(-1); break;
					case "d":
					case "right": Player.shift(1); break;

					case "space": Player.hardDrop(); break;
					case "shift": Player.switchPiece(); break;
					
					case "esc": Game.setState("new"); break;
					case "p": Game.setState("pause"); break;
				}
				break;
			// custom events
			case "new-game":
				Game.setState("new");
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