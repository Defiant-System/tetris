
let frags = [...Array(7)].map(r => []),
	shards = [
		{ w: 13, h: 15, x: 3, y: 101 },
		{ w: 14, h: 16, x: 20, y: 101 },
		{ w: 15, h: 19, x: 38, y: 101 },
		{ w: 17, h: 22, x: 56, y: 101 },
		{ w: 21, h: 23, x: 77, y: 101 },
	];

let sprite = new Image;
sprite.onload = () => {
	frags.map((f, i) => {
		shards.map(dim => {
			let shard = Utils.createCanvas(dim.w, dim.h);
			shard.ctx.drawImage(sprite, -dim.x, -dim.y);
			frags[i].push({ ...dim, img: shard.cvs[0] });
		});
	});
};

sprite.src = "~/img/sprite.png";
