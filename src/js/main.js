
@import "./modules/arena.js"
@import "./modules/player.js"
@import "./modules/game.js"

@import "./modules/test.js"


const tetris = {
	init() {
		// fast references
		this.content = window.find("content");

		Arena.init();
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
			// custom events
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = tetris;
