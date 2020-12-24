const fs = require('fs')

const instructions = fs.readFileSync('test.txt', 'utf-8').split(`\n`)

let rotation = 0
let direction = 'east'

const compass = (dir, degree) => {
	if (dir == 'R') rotation += degree
	else rotation -= degree
	if (rotation >= 360) rotation = rotation - 360
	if (rotation <= -360) rotation = rotation + 360
	switch (rotation) {
		case 0: direction = 'east'; break 
		case -270:
		case 90: {
			direction = 'south'; break
		}
		case -180:
		case 180: {
			direction = 'west'; break
		} 
		case -90: 
		case 270:{
			direction = 'north'; break
		}
		default: direction = 'east';
	}
	
}

let x = 0, y = 0

for (let [dir, ...value] of instructions) {
	value = +value.join``
	switch (dir) {
		case 'N': y += value; break
		case 'S': y -= value; break
		case 'E': x += value; break
		case 'W': x -= value; break
		case 'L': compass('L', value); break
		case 'R': compass('R', value); break
		case 'F': {
			switch (direction) {
				case 'north': y += value; break
				case 'south': y -= value; break
				case 'east': x += value; break
				case 'west': x -= value; break
			}
			break
		}
	}
}

console.log(Math.abs(x) + Math.abs(y))



