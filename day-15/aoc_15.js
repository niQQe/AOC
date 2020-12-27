let turns = [2, 0, 6, 12, 1, 3, 0]

const target = 2020

const isLastUnique = (n) => {
	return !turns.slice(0, -1).includes(n)
}

const findTurnOfLastSpoken = (last) => {
	const sortedIndexes = turns.reduce((acc, n, i) => {
		if (n == last) acc.push(i)
		return acc
	}, []).sort((a, b) => b - a)

	if (turns.slice(-2)[0] == last) return 1

	if (sortedIndexes.length > 2) return sortedIndexes[0] - sortedIndexes[1]

	const [largest, ...rest] = sortedIndexes

	return largest - rest.slice(-1)[0]
}

while(turns.length != target) {
	const last = turns.slice(-1)[0]

	if (!isLastUnique(last))
		turns.push(findTurnOfLastSpoken(last))
	else 
		turns.push(0)
}

console.log(turns.slice(-1)[0])


