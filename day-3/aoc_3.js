const fs = require('fs')

const map = fs.readFileSync('input.txt', 'utf-8').split(`\n`)


/**
 *  Part 1
 */
let position = 3

const treesHit = map.reduce((trees, curr, i) => {
	if (i == 0) return trees
	const row = curr.split``
	position >= row.length ? position = position % row.length : null
	row[position] == '#' ? trees++ : null
	position += 3
	return trees
}, 0)

console.log(treesHit)