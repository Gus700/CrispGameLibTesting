title = "Moon jump";

description = `
`;

characters = [
`
  cc  
cccccc
  cc
cc  cc
`
];
const G = {
	WIDTH: 150,
	HEIGHT: 100,
	STAR_SPEED_MIN: 0.5,
	STAR_SPEED_MAX: 1.0,
	MAX_JUMP_HEIGHT: 30
};

options = { 
	viewSize: {x:G.WIDTH, y:G.HEIGHT},
	theme: "dark"
};

/**
* @typedef {{
* pos: Vector,
* speed: number
* }} Star
*/

/**
* @type { Star [] }
*/
let stars;

/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

/** 
 * @type { Player }
*/
let player;

let jump_charge = 0;
let jumping = false;
function update() {
	// The init function running at startup
	if (!ticks) {
		//initialize the stars
		stars = times(20, () => {
			const posX = rnd(0, G.WIDTH);
			const posY = rnd(0, G.HEIGHT);
			return {
				pos: vec(posX, posY),
				speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
			};
		});
		//initialize the player
		player = {
			pos: vec(G.WIDTH * 0.4, G.HEIGHT * 0.7)
		};

	}

	// update for the stars that were created above
	stars.forEach((s) => {
		s.pos.x -= s.speed;
		s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
		color("yellow");
		box(s.pos, 1);
	});
	// draw floor
	color("blue");
	box (G.WIDTH * 0.5, G.HEIGHT * 0.9, G.WIDTH, 20);
	// draw the player
	color("cyan");
    char("a", player.pos);
	// jump when pressing the button
	if (input.isJustPressed) {
		jumping = true;
	}
	// hold to jump higher
	if (input.isPressed) {
		if (player.pos.y > (G.HEIGHT * 0.7 - G.MAX_JUMP_HEIGHT) && jumping == true) {
			player.pos.y -= 3;
		} else { // if reached max jumping height then signal jump is over
		jumping = false;
		}
	}
	// if button is release early, signal jump over
	if (input.isJustReleased){
		jumping = false;
	}
	// makes sure the player is brought down
	if (!(char("a", player.pos).isColliding.rect.blue) && jumping == false) {
		if (char("a", player.pos).isColliding.rect.blue) {
			console.log("this is a coolision")
		}
		player.pos.y += 3;
	}
	player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
}
