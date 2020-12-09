const fs = require('fs')

const declarations = fs.readFileSync('input.txt', 'utf-8').split(`\n\n`)

/**
 *  Part 1
 */

const part1Declarations = declarations.map(v => v.replace(/[\n\r]/g, ''))

const totalYesAnswers = part1Declarations.reduce((yesAnswers, answer) => {
	yesAnswers += [...new Set(answer.split``)].length
	return yesAnswers
}, 0)

console.log(totalYesAnswers)

/**
 * Part 2
 */

const part2Declarations = declarations.map(v => v.split`\n`)

const onlyYesAnwers = part2Declarations.reduce((yesAnswers, group) => {
	Object.keys(char = group.join``.split``.reduce((charAmount, amount) => {
		charAmount[amount] = (charAmount[amount] || 0) + 1
		return charAmount
	}, {})).forEach(amount => char[amount] == group.length ? yesAnswers++ : null)
	return yesAnswers
}, 0)

console.log(onlyYesAnwers)

