const fs = require('fs')

const map = fs.readFileSync('input.txt', 'utf-8').split(`\n`)

/**
 *  Part 1
 */

let position = 3

const part1Result = map.reduce((trees, curr, i) => {
	const row = curr.split``

	if (i == 0) return trees
	if (position >= row.length) position = position % row.length
	if (row[position] == '#') trees++

	position += 3
	return trees
}, 0)

console.log(part1Result)

/**
 *  Part 2
 */
const slopesAndDowns = ['1,1', '3,1', '5,1', '7,1', '1,2']

const part2Result = slopesAndDowns.reduce((total, slope) => {
	const [right, down] = slope.split`,`
	let position = +right

	const treesHit = map.reduce((trees, curr, i) => {
		const row = curr.split``

		if (i == 0 || i % +down !== 0) return trees
		if (position >= row.length) position = position % row.length
		if (row[position] == '#') trees++

		position += +right
		return trees
	}, 0)

	total *= treesHit
	return total
}, 1)

console.log(part2Result)
