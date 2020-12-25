

const fs = require('fs')

const [timestamp, rawIds] = fs.readFileSync('input.txt', 'utf-8').split(`\n`)

const ids = rawIds.split `,`.filter(v=> +v).map(v => +v)

const part1Result =  Math.min(...ids.reduce((acc,id) => {
	acc.push((Math.floor(((+timestamp + Math.max(...ids))/id)) * id - +timestamp) * id)
	return acc
},[]))

console.log(part1Result)