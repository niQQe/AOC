
const fs = require('fs')

const bagrules = fs.readFileSync('input.txt', 'utf-8').split`\n`

const bagList = bagrules.reduce((acc, curr) => {
	const [bag, bags] = curr.split(' bags contain ')
	acc[bag.trim()] = bags.replace(/\d|\.|bags?/g, '').split`,`.map(v => v.trim())
	return acc
}, {})

let bagColors = []

let colorCount = 0

const shinyGoldFinder = (colors) => {
	colors.forEach(color => {
		bagColors.push(color)
		colorCount++
		Object.keys(bagList).forEach(bagcolor => {
			if(bagList[bagcolor].includes(color) && !bagColors.includes(bagcolor))
				shinyGoldFinder([bagcolor])
		})
	}) 	
}

Object.keys(bagList).forEach(color => {
	if(bagList[color].includes('shiny gold'))
		shinyGoldFinder([color])
})

console.log(colorCount)