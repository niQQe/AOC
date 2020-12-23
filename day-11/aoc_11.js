const fs = require('fs')

let seatMap = fs.readFileSync('input.txt', 'utf-8').split(`\n`).map(row => row.split``)
let mySeatMap = fs.readFileSync('mymap.txt', 'utf-8').split(`\n`).map(row => row.split``)

const emptySymbol = 'L'
const occupiedSymbol = '#'

function isOccupied() {
	// CHECK ABOVE OR BELOW
	const checkAboveOrBelow = (row, i) => row ? row[i] != occupiedSymbol && row[i - 1] != occupiedSymbol && row[i + 1] != occupiedSymbol : null
	// CHECK CURRENT ROW
	const checkCurrentRow = (row, i) => row[i - 1] != occupiedSymbol && row[i + 1] != occupiedSymbol

	for (let [rIdx, row] of seatMap.entries()) {
		for (let [i, _] of row.entries()) {
			if (row[i] == emptySymbol) {
				if (rIdx == 0) {
					if (checkAboveOrBelow(seatMap[rIdx + 1], i) && checkCurrentRow(row, i)) {
						mySeatMap[rIdx][i] = occupiedSymbol
					}
				}
				if (checkCurrentRow(row, i) && checkAboveOrBelow(seatMap[rIdx - 1], i) && checkAboveOrBelow(seatMap[rIdx + 1], i)) {
					mySeatMap[rIdx][i] = occupiedSymbol
				}
				if (rIdx == seatMap.length - 1) {
					if (checkAboveOrBelow(seatMap[rIdx - 1], i) && checkCurrentRow(row, i)) {
						mySeatMap[rIdx][i] = occupiedSymbol
					}
				}
			}
		}
	}
	seatMap = JSON.parse(JSON.stringify(mySeatMap))
}

function isEmpty() {
	// CHECK ROWS
	const checkRows = ({ aboveRow = null, bellowRow = null, row, i }) => {
		let occupied = 0
		if (bellowRow) {
			if (bellowRow[i] == occupiedSymbol) occupied++
			if (bellowRow[i - 1] == occupiedSymbol) occupied++
			if (bellowRow[i + 1] == occupiedSymbol) occupied++
		}
		if (aboveRow) {
			if (aboveRow[i] == occupiedSymbol) occupied++
			if (aboveRow[i - 1] == occupiedSymbol) occupied++
			if (aboveRow[i + 1] == occupiedSymbol) occupied++
		}
		if (row) {
			if (row[i - 1] == occupiedSymbol) occupied++
			if (row[i + 1] == occupiedSymbol) occupied++
		}
		return occupied >= 4
	}
	for (let [rIdx, row] of seatMap.entries()) {
		for (let [i, _] of row.entries()) {
			if (row[i] == occupiedSymbol) {
				// Ignore Above row if first row
				if (rIdx == 0) {
					if (checkRows({ bellowRow: seatMap[rIdx + 1], row, i })) {
						mySeatMap[rIdx][i] = emptySymbol
					}
				}
				// Always check current row
				if (checkRows({ aboveRow: seatMap[rIdx - 1], bellowRow: seatMap[rIdx + 1], row, i })) {
					mySeatMap[rIdx][i] = emptySymbol
				}
				// Ignore bellow row if last row
				if (rIdx == seatMap.length - 1) {
					if (checkRows({ aboveRow: seatMap[rIdx - 1], row, i })) {
						mySeatMap[rIdx][i] = emptySymbol
					}
				}
			}
		}
	}
	seatMap = JSON.parse(JSON.stringify(mySeatMap))
}

let compareMap = null

// Run until map not changes
for (; ;) {
	isOccupied()
	compareMap = JSON.parse(JSON.stringify(seatMap))
	isEmpty()
	if (JSON.stringify(compareMap) == JSON.stringify(seatMap))
		break;
}

const occupied = seatMap.reduce((occupied, row) => {
	occupied += row.filter(char => char == '#').length
	return occupied
}, 0)

console.log(occupied)