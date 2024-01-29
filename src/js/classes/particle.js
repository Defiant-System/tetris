
class Particle {
	constructor(parent, x, y) {
		this.parent = parent;
		this.x = x;
		this.y = y;
		this.rotation = 0;
		this.rad = Math.PI / 180;

		// set a random angle in all possible directions, in radians
		this.angle = Utils.random(0, Math.PI * 2);
		this.speed = Utils.random(1, 10);
		this.moveRotation = Utils.random(-.5, .5);
		// friction will slow the particle down
		this.friction = 0.9;
		// gravity will be applied and pull the particle down
		this.gravity = 1;
		// set how fast the particle fades out
		this.decay = Utils.random(0.015, 0.03);
		this.alpha = 1;
	}

	update(index) {
		// slow down the particle
		this.speed *= this.friction;
		// apply velocity
		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed + this.gravity;
		// fade out the particle
		this.alpha -= this.decay;

		this.rotation += this.moveRotation;
		this.rotation %= 360;

		// remove the particle once the alpha is low enough, based on the passed in index
		if (this.alpha <= this.decay) {
			this.parent.particles.splice(index, 1);
		}
	}

	draw(ctx) {
		// ctx.save();
		// ctx.rotate(this.rotation * this.rad);
		ctx.fillStyle = `rgba(255,0,0,${this.alpha})`;
		ctx.fillRect(this.x, this.y, 5, 5);
		// ctx.restore();
	}
}
