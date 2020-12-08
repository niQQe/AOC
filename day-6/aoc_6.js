const fs = require('fs')

const declarations = fs.readFileSync('input.txt', 'utf-8').split(`\n\n`).map(v => v.replace(/[\n\r]/g, ''))

/**
 *  Part 1
 */
const totalYesAnswers = declarations.reduce((yesAnwsers, answer) => {
	yesAnwsers += [...new Set(answer.split``)].length
	return yesAnwsers
}, 0)

console.log(totalYesAnswers)