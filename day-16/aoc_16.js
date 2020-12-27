const fs = require('fs')

const input = fs.readFileSync('input2.txt', 'utf-8').split`\n\n`


const notes = input.reduce((acc, curr) => {
	const [name, ...values] = curr.split`:`
	const fixedValues = values.map(v => v.split`or`.join``.split`\n`.filter(v => v != '').join`  `.split`  `)
	acc[name.replace(/ /g, '')] = fixedValues[0]
	return acc
}, {})

console.log(notes)

const validNumbers = new Set(numbers = Object.keys(notes).reduce((acc, curr) => {
	notes[curr].forEach(v => {
		const [min, max] = v.split`-`
		for (let i = +min; i < +max + 1; i++) acc.push(i)
	})
	return acc
}, []))

const errorRate = notes.nearbytickets.reduce((errors, ticket) => {
	ticket.split`,`.forEach(n => {
		if (!validNumbers.has(+n))
			errors += +n
	})
	return errors
}, 0)

console.log(errorRate)