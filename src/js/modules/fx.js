
let FX = {
	particles: [],
	explode(list) {
		var particleCount = 30;
		while(particleCount--) {
			let x = 50,
				y = 50;
			this.particles.push(new Particle(this, x, y));
		}
	},
	add(item) {
		
	},
	remove(item) {
		
	},
	update() {
		let i = this.particles.length;
		while (i--) {
			this.particles[i].update(i);
		}
	},
	draw(ctx) {
		// update particles
		this.update();
		// draw particle
		this.particles.map(p => p.draw(ctx));
	}
};
