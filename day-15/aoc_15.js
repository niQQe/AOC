let turns = [2, 0, 6, 12, 1, 3]

while (turns.length != 2020) {
	const last = turns.slice(-1)[0]
	if (turns.slice(0, -1).includes(last)) turns.push(turns.length - 1 - turns.slice(0, -1).lastIndexOf(last))
	else turns.push(0)
}

console.log(turns.slice(-1)[0])