
const fs = require('fs')

const instructions = fs.readFileSync('input.txt', 'utf-8')
	.split`\n`
	.map(v => v = { cmd: v.split` `[0], value: +v.split` `[1].replace(/\+/g, '') })

/**
 * Part 1
 */
let visited = []
let index = 0
let acc = 0

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

/**
 * 	Part 2
 */
const commandExecuter = (input) => {
	let visited = []
	let index = 0
	let acc = 0
	while (index < input.length) {
		if (visited.includes(index)) return null
		visited.push(index)
		const { cmd, value } = input[index]
		switch (cmd) {
			case 'nop':
				index++
				break
			case 'acc':
				acc += value
				index++
				break
			case 'jmp':
				index += value
				break
		}
	}
	return acc
}

const part2Result = instructions.reduce((acc, _, i) => {
	if (instructions[i].cmd == 'jmp') {
		instructions[i].cmd = 'nop'

		const result = commandExecuter(instructions)
		if (result) acc = result

		instructions[i].cmd = 'jmp'
	} else if (instructions[i].cmd == 'nop') {
		instructions[i].cmd = 'jmp'

		const result = commandExecuter(instructions)
		if (result) acc = result

		instructions[i].cmd = 'nop'
	}
	return acc
}, 0)

console.log(part2Result)