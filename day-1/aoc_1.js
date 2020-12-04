const fs = require('fs')

const numberArr = fs.readFileSync('input.txt', 'utf-8')
	.toString()
	.split(`\n`)
	.map(v => +v)

/**
 *  Part 1
 */
const partOneResult = numberArr.reduce((acc, curr) => {
	numberArr.forEach(num => num + curr === 2020 ? acc = [num, curr] : null)
	return acc
}, []).reduce((a, b) => a * b)

/**
 *  Part 2
 */
const partTwoResult = numberArr.reduce((acc, curr) => {
	numberArr.forEach(num_1 => {
		numberArr.forEach(num_2 => {
			num_1 + num_2 + curr === 2020 ? acc = [num_1, num_2, curr] : null
		})
	})
	return acc
}, []).reduce((a, b) => a * b)

console.log(partOneResult)
console.log(partTwoResult)