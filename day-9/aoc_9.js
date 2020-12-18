const fs = require('fs')

const numbers = fs.readFileSync('input.txt', 'utf-8').split(`\n`).map(n => +n)

const range = (start, end) => {
	return Array.from({ length: end - start }).map((_, i) => i + start);
}

const validNumbers = new Set(numbers.reduce((acc, _, i) => {
	if (numbers[i + 25]) {
		const arr = [...range(i, i + 25)].reduce((values, index) => {
			values.push(numbers[index])
			return values
		}, [])

		for (let n_1 of arr) {
			for (let n_2 of arr) {
				if (n_1 + n_2 == numbers[i + 25]) {
					acc.push(numbers[i + 25])
				}
			}
		}
	}
	return acc
}, []))

const notFollowingRule = numbers.reduce((acc, n) => {
	if (!validNumbers.has(n))
		acc = n
	return acc
}, 0)

console.log(notFollowingRule)


