const fs = require('fs')

let seatMap = fs.readFileSync('input.txt', 'utf-8').split(`\n`).map(row => row.split``)

let mySeatMap = fs.readFileSync('mymap.txt', 'utf-8').split(`\n`).map(row => row.split``)

function isOccupied() {
	// CHECK ABOVE ROW
	function CAR(row, currentIndex) {
		if (row) {
			return row[currentIndex] != '#' && row[currentIndex - 1] != '#' && row[currentIndex + 1] != '#'
		}
	}
	// CHECK CURRENT ROW
	function CCR(row, currentIndex) {
		return row[currentIndex - 1] != '#' && row[currentIndex + 1] != '#'
	}
	// CHECK BELOW ROW
	function CBR(row, currentIndex) {
		if (row) {
			return row[currentIndex] != '#' && row[currentIndex - 1] != '#' && row[currentIndex + 1] != '#'
		}
	}

	for (let [rowIndex, row] of seatMap.entries()) {
		for (let i = 0; i < row.length; i++) {
			if (row[i] == 'L') {
				if (rowIndex == 0) {
					if (CBR(seatMap[rowIndex + 1], i) && CCR(row, i)) {
						mySeatMap[rowIndex][i] = '#'
					}
				}
				if (CCR(row, i) && CAR(seatMap[rowIndex - 1], i) && CBR(seatMap[rowIndex + 1], i)) {
					mySeatMap[rowIndex][i] = '#'
				}
				if (rowIndex == seatMap.length - 1) {
					if (CAR(seatMap[rowIndex - 1], i) && CCR(row, i)) {
						mySeatMap[rowIndex][i] = '#'
					}
				}
			}
		}
	}
	seatMap = JSON.parse(JSON.stringify(mySeatMap))
}

function isAvailable() {
	// CHECK ABOVE ROW
	function CAR(row, currentIndex) {
		let occupied = 0
		if (row) {
			if (row[currentIndex] == '#')
				occupied++
			if (row[currentIndex - 1] == '#')
				occupied++
			if (row[currentIndex + 1] == '#')
				occupied++
		}
		return occupied
	}
	// CHECK CURRENT ROW
	function CCR(row, currentIndex) {
		let occupied = 0
		if (row[currentIndex - 1] == '#')
			occupied++
		if (row[currentIndex + 1] == '#')
			occupied++
		return occupied
	}
	// CHECK BELOW ROW
	function CBR(row, currentIndex) {
		let occupied = 0
		if (row) {
			if (row[currentIndex] == '#')
				occupied++
			if (row[currentIndex - 1] == '#')
				occupied++
			if (row[currentIndex + 1] == '#')
				occupied++
		}
		return occupied
	}
	for (let [rowIndex, row] of seatMap.entries()) {
		for (let i = 0; i < row.length; i++) {
			if (row[i] == '#') {
				// Ignore CheckAboveRow function if first row
				if (rowIndex == 0) {
					if (CBR(seatMap[rowIndex + 1], i) + CCR(row, i) >= 4) {
						mySeatMap[rowIndex][i] = 'L'
					}
				}
				// Always check current row
				if (CCR(row, i) + CAR(seatMap[rowIndex - 1], i) + CBR(seatMap[rowIndex + 1], i) >= 4) {
					mySeatMap[rowIndex][i] = 'L'
				}
				// Ignore CheckBelowRow function if last row
				if (rowIndex == seatMap.length - 1) {
					if (CAR(seatMap[rowIndex - 1], i) + CCR(row, i) >= 4) {
						mySeatMap[rowIndex][i] = 'L'
					}
				}
			}
		}
	}
	seatMap = JSON.parse(JSON.stringify(mySeatMap))
}


let compareMap = null


// Run until map not changes
for(;;){
	isOccupied()
	compareMap = JSON.parse(JSON.stringify(seatMap))
	isAvailable()
	if(JSON.stringify(compareMap) == JSON.stringify(seatMap))
		break;
}

let occupied = 0

// Count occupied seats
for(let row of seatMap){
	for(seat of row){
		if(seat == '#')
			occupied++
	}
}

console.log(occupied)