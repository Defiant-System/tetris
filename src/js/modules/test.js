
let Test = {
	init(APP) {
		// return;
		setTimeout(() => {
			Game.setState("test", 1);

			setTimeout(() => FX.explode([[4,10],[5,10],[6,10]]), 800);
		}, 500);
		// setTimeout(() => Game.setState("play"), 500);
		setTimeout(() => Game.setState("pause"), 10000);
	}
};
