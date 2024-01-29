
let FX = {
	particles: [],
	explode(list) {
		list.map(cell => {
			var particleCount = 4,
				x = (cell[0] * 26) + 13,
				y = (cell[1] * 26) + 13;
			while(particleCount--) {
				this.particles.push(new Particle(this, x, y));
			}
		});
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
