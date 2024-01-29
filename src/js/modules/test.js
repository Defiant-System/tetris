
let Test = {
	init(APP) {
		setTimeout(() => {
			Game.setState("test", 1);

			setTimeout(() => FX.explode([[5,18],[6,18]]), 300);
		}, 500);
		// setTimeout(() => Game.setState("play"), 500);
		setTimeout(() => Game.setState("pause"), 7000);
	}
};
