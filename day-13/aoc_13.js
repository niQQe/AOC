

const fs = require('fs')

const [timestamp, ids] = fs.readFileSync('input.txt', 'utf-8').split(`\n`)
const notes = { timestamp: +timestamp, ids: ids.replace(/([x])/g, '').split`,`.filter(v => v!= "").map(v => +v) }

const part1Result =  Math.min(...notes.ids.reduce((acc,id) => {
	acc.push((Math.floor(((+timestamp + +Math.max(...notes.ids))/id)) * id - +timestamp) * id)
	return acc
},[]))

console.log(part1Result)
