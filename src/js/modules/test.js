
let Test = {
	init(APP) {
		setTimeout(() => Game.setState("test", 1), 500);
		// setTimeout(() => Game.setState("play"), 500);
		setTimeout(() => Game.setState("pause"), 10000);
	}
};
