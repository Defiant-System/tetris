
let Test = {
	init(APP) {

		// return setTimeout(() => window.el.cssSequence("tremble", "animationend", el => el.removeClass("tremble")), 1000);

		return;
		setTimeout(() => {
			// Game.setState("start");
			// Game.setState("play");
			Game.setState("test", 1);

			// setTimeout(() => FX.explode([[0,10,2],[1,10,3],[2,10,4]]), 300);
		}, 500);
		// setTimeout(() => Game.setState("play"), 500);
		setTimeout(() => Game.fpsControl.stop(), 5000);
	}
};
