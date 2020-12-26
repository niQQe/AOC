const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf-8').split`\n`

let mask

const applyMask = (value) => {
	for (let [index, char] of mask.entries()) {
		if (char != 'X') {
			value[index] = char
		}
	}
	return value.join``
}

const part1Result = Object.values(input.reduce((acc, row) => {
	if (row.includes('mask')) {
		mask = row.split(' = ')[1].split``
	} else {
		const [rawMem, rawValue] = row.split` = `
		const mem = +rawMem.replace(/\D/g, '')
		const value = [...new Array(36).fill(0)].join``.substr((+rawValue).toString(2).length) + (+rawValue).toString(2)
		const result = parseInt(applyMask([...value]), 2)
		acc[mem] = result
	}
	return acc
}, {})).reduce((a, b) => a + b)

console.log(part1Result)
