
let frags = [...Array(7)].map(r => []),
	tiles = [[-25, 0], [-50, 0], [-75, 0], [0, -25], [-25, -25], [-50, -25], [-75, -25]],
	masks = [
		[12, 13, -25, -50],
		[9, 10, -25, -65],
		[12, 12, -38, -50],
		[14, 13, -36, 62]
	];

let sprite = new Image;
sprite.onload = () => {
	frags.map((f, i) => {
		masks.map(mask => {
			let [tX, tY] = tiles[i],
				[width, height, x, y] = mask,
				shard = Utils.createCanvas(width, height);
			shard.ctx.drawImage(sprite, tX, tY);
			shard.ctx.globalCompositeOperation = "destination-in";
			shard.ctx.drawImage(sprite, x, y);
			frags[i].push({ width, height, args: [shard.cvs[0], 0, 0] });
		});
	});
};

sprite.src = "~/img/sprite.png";
