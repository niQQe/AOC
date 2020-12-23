const fs = require('fs')

let seatMap = fs.readFileSync('input.txt', 'utf-8').split(`\n`).map(row => row.split``)

let mySeatMap = fs.readFileSync('mymap.txt', 'utf-8').split(`\n`).map(row => row.split``)

const emptySymbol = 'L'
const occupiedSymbol = '#'

function isOccupied() {
	// CHECK ABOVE ROW
	const CAR = (row, i) => row ? row[i] != occupiedSymbol && row[i - 1] != occupiedSymbol && row[i + 1] != occupiedSymbol : null
	// CHECK CURRENT ROW
	const CCR = (row, i) => row[i - 1] != occupiedSymbol && row[i + 1] != occupiedSymbol
	// CHECK BELOW ROW
	const CBR = (row, i) => row ? row[i] != occupiedSymbol && row[i - 1] != occupiedSymbol && row[i + 1] != occupiedSymbol : null

	for (let [rIdx, row] of seatMap.entries()) {
		for (let [i, _] of row.entries()) {
			if (row[i] == emptySymbol) {
				if (rIdx == 0) {
					if (CBR(seatMap[rIdx + 1], i) && CCR(row, i)) {
						mySeatMap[rIdx][i] = occupiedSymbol
					}
				}
				if (CCR(row, i) && CAR(seatMap[rIdx - 1], i) && CBR(seatMap[rIdx + 1], i)) {
					mySeatMap[rIdx][i] = occupiedSymbol
				}
				if (rIdx == seatMap.length - 1) {
					if (CAR(seatMap[rIdx - 1], i) && CCR(row, i)) {
						mySeatMap[rIdx][i] = occupiedSymbol
					}
				}
			}
		}
	}
	seatMap = JSON.parse(JSON.stringify(mySeatMap))
}

function isEmpty() {
	// CHECK ABOVE ROW
	const CAR = (row, i) => {
		let occupied = 0
		if (row) {
			if (row[i] == occupiedSymbol) occupied++
			if (row[i - 1] == occupiedSymbol) occupied++
			if (row[i + 1] == occupiedSymbol) occupied++
		}
		return occupied
	}
	// CHECK CURRENT ROW
	const CCR = (row, i) => {
		let occupied = 0
		if (row[i - 1] == occupiedSymbol) occupied++
		if (row[i + 1] == occupiedSymbol) occupied++
		return occupied
	}
	// CHECK BELOW ROW
	const CBR = (row, currentIndex) => {
		let occupied = 0
		if (row) {
			if (row[currentIndex] == occupiedSymbol) occupied++
			if (row[currentIndex - 1] == occupiedSymbol) occupied++
			if (row[currentIndex + 1] == occupiedSymbol) occupied++
		}
		return occupied
	}
	for (let [rIdx, row] of seatMap.entries()) {
		for (let [i, _] of row.entries()) {
			if (row[i] == occupiedSymbol) {
				// Ignore CheckAboveRow function if first row
				if (rIdx == 0) {
					if (CBR(seatMap[rIdx + 1], i) + CCR(row, i) >= 4) {
						mySeatMap[rIdx][i] = emptySymbol
					}
				}
				// Always check current row
				if (CCR(row, i) + CAR(seatMap[rIdx - 1], i) + CBR(seatMap[rIdx + 1], i) >= 4) {
					mySeatMap[rIdx][i] = emptySymbol
				}
				// Ignore CheckBelowRow function if last row
				if (rIdx == seatMap.length - 1) {
					if (CAR(seatMap[rIdx - 1], i) + CCR(row, i) >= 4) {
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