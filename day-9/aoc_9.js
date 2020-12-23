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


/**
 *  Part 2
 */

const numbers2 = fs.readFileSync('input.txt', 'utf-8').split(`\n`).map(n => +n)

let end = []

function findEnd(arr) {
	let sum = 0
	for (let i = 0; i < arr.length; i++) {
		sum += numbers[i]
		if (sum > notFollowingRule) {
			numbers.shift()
			sum = 0
			findEnd(numbers)
		} else if (sum == notFollowingRule) {
			if(end.length == 0)
				end.push(numbers[i])
		}
	}
}

findEnd(numbers)

let sum = 0

let numArr = []

for (var i = numbers2.indexOf(end[0]) + 1 - 1; i >= 0; i--) {
	sum += numbers2[i]
	numArr.push(numbers2[i])
	if(sum == notFollowingRule)
		break;
}

const [first, ...rest] = numArr.sort((a,b) => a-b)

const result = first + rest[rest.length-1]

console.log(result)

