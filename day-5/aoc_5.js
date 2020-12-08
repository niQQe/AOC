const fs = require('fs')

const tickets = fs.readFileSync('input.txt', 'utf-8').split(`\n`)

/**
 *  Part 1
 */
const maxSeatId = Math.max(...tickets.reduce((ids, ticket) => {
	const rowChars = ticket.slice(0, -3).split``
	const colChars = ticket.substring(7).split``

	const rows = [...Array(128).keys()]
	const cols = [...Array(8).keys()]

	rowChars.forEach(char => {
		char == "F" ? rows.forEach(() => rows.pop()) : rows.forEach(() => rows.shift())
	})

	colChars.forEach(char =>{
		char == "R" ? cols.forEach(() => cols.shift()) : cols.forEach(() => cols.pop())
	})

	const [ row ] = rows
	const [ col ] = cols

	ids.push(row * 8 + col)

	return ids
}, []))

console.log(maxSeatId)




