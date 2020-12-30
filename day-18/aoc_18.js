
const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8').split`\n`

const evalMath = (string) => {
	const fixedStr = string.split``.reduce((acc, char) => {
		char == '+' ? acc += ' + ' : char == '*' ? acc += ' * ' : acc += char
		return acc
	}, '').split` `

	const sum = fixedStr.reduce((acc, char, i) => {
		if (char == '+') acc += +fixedStr[i + 1]
		if (char == '*') acc *= +fixedStr[i + 1]
		return acc
	}, +fixedStr[0])

	return sum
}

const findPriority = (input) => {
	const regex = /(\(([^()]+)\))/gm
	let str = input.replace(/ /g, '')
	let m;
	let arr = []

	while ((m = regex.exec(str)) !== null) {
		if (m.index === regex.lastIndex) regex.lastIndex++
		arr.push(m[2])
	}

	return arr
}

const processExpression = (input) => {

	let str = input.replace(/ /g, '');
	const prioArr = findPriority(input)

	for (let [index, string] of prioArr.entries())
		str = str.replace('(' + string + ')', 'X' + index)

	for (let [index, row] of prioArr.entries())
		prioArr[index] = evalMath(row)

	for (let [index, string] of prioArr.entries())
		str = str.replace('X' + index, string)

	return str
}

const result = input.reduce((sum, string) => {
	let expressionString = processExpression(string)

	if (expressionString.includes('('))
		expressionString = processExpression(expressionString)

	if (!expressionString.includes('('))
		sum += evalMath(expressionString)

	return sum
}, 0)

console.log(result)


