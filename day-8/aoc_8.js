const fs = require('fs')

const instructions = fs.readFileSync('input.txt', 'utf-8')
	.split`\n`
	.map(v => v = { cmd: v.split` `[0], value: +v.split` `[1].replace(/\+/g, '') })


let acc = 0
let index = 0
let visited = []

while(index < instructions.length){
	if(visited.includes(index)) break;
	visited.push(index)
	const { cmd, value } = instructions[index]
	switch(cmd){
		case 'nop':
			index++
			break
		case 'acc':
			acc += value
			index++
			break
		case 'jmp':
			index  += value
			break
	}
}

console.log(acc)
