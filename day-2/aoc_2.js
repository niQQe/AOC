const fs = require('fs')

const passwordObjects = fs.readFileSync('input.txt', 'utf-8')
	.toString()
	.split(`\n`)
	.reduce((acc, curr) => {
		const [rule, password] = curr.split`:`
		const [amount, letter] = rule.split` `
		acc.push({ amount, letter, password })
		return acc
	}, [])

const validPasswords = passwordObjects.reduce((valid, object) => {
	const [min, max] = object.amount.split`-`
	const letters = object.password.split``.filter(letter => letter === object.letter).length
	letters >= min && letters <= max ? valid++ : null
	return valid
}, 0)

console.log(validPasswords)