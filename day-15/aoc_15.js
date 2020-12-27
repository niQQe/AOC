let turns = [2, 0, 6, 12, 1, 3, 0]

const target = 2020

const findTurnOfLastSpoken = (last) => {
	const sortedTurns = turns.reduce((acc, n, i) => {
		if (n == last) acc.push(i)
		return acc
	}, []).sort((a, b) => b - a)

	if (turns.slice(-2)[0] == last) return 1

	if (sortedTurns.length > 2) return sortedTurns[0] - sortedTurns[1]

	const [largest, ...rest] = sortedTurns

	return largest - rest.slice(-1)[0]
}

while (turns.length != target) {
	const last = turns.slice(-1)[0]
	turns.slice(0, -1).includes(last) ? turns.push(findTurnOfLastSpoken(last)) : turns.push(0)
}

console.log(turns.slice(-1)[0])
