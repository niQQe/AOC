const fs = require('fs')

const adapters = fs.readFileSync('input.txt', 'utf-8').split(`\n`).map(v => +v)

/**
 * Part 1
 */
const part1Result = adapters.sort((a, b) => a - b).reduce((acc, n, i) => {
	n + 1 == adapters[i + 1] ? acc[0]++ : acc[1]++
	return acc
}, [1,0]).reduce((acc, curr) => acc*curr)

console.log(part1Result)

