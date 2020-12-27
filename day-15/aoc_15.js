let spokenHistory = [2, 0, 6, 12, 1, 3, 0]

const target = 2020

const isLastUnique = (n) => {
	return !spokenHistory.slice(0, -1).includes(n)
}

const findTurnOfLastSpoken = (last) => {
	const sortedIndexes = spokenHistory.reduce((acc, n, i) => {
		if (n == last) acc.push(i)
		return acc
	}, []).sort((a, b) => b - a)

	if (spokenHistory.slice(-2)[0] == last) return 1

	if (sortedIndexes.length > 2) return sortedIndexes[0] - sortedIndexes[1]

	const [largest, ...rest] = sortedIndexes

	return largest - rest.slice(-1)[0]
}

for (let i = 0; i < spokenHistory.length; i++) {
	const last = spokenHistory.slice(-1)[0]

	if (!isLastUnique(last))
		spokenHistory.push(findTurnOfLastSpoken(last))
	else 
		spokenHistory.push(0)

	if (spokenHistory.length == target) break
}

console.log(spokenHistory.slice(-1)[0])


