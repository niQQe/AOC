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


/**
 * Part 1
 */
const validPasswordsPart1 = passwordObjects.reduce((valid, object) => {
	const [min, max] = object.amount.split`-`
	const letters = object.password.split``.filter(letter => letter === object.letter).length
	letters >= min && letters <= max ? valid++ : null
	return valid
}, 0)

console.log(validPasswordsPart1)

/**
 * Part 2
 */
const validPasswordsPart2 = passwordObjects.reduce((valid, object) => {
	const [pos1, pos2] = object.amount.split`-`
	const letters = object.password.split``	
	const letter1 = letters[pos1]
	const letter2 = letters[pos2]
	if(letter1 !== letter2 && (letter1 == object.letter || letter2 == object.letter))
		valid++
	return valid
}, 0)

console.log(validPasswordsPart2)
