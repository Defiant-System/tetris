
class Sparkle {
	constructor(parent, x, y, color) {

	}

	update() {
		
	}

	draw(ctx) {
		// test
		ctx.save();
		ctx.globalCompositeOperation = "screen";
		ctx.drawImage(sprite, 0, 275, 34, 34, 200, 240, 34, 34);
		ctx.restore();
	}
}
