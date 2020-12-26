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
		const [adress, value] = row.split` = `.map(v => v.replace(/\D/g,''))
		const binary = (+value).toString(2)
		const value36bit = [...new Array(36).fill(0)].join``.substr(binary.length) + binary
		acc[adress] = parseInt(applyMask([...value36bit]), 2)
	}
	return acc
}, {})).reduce((a, b) => a + b)


console.log(part1Result)
