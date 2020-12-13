
const fs = require('fs')

const bagrules = fs.readFileSync('input.txt', 'utf-8').split`\n`

const bagList = bagrules.reduce((acc, curr) => {
	const [bag, bags] = curr.split(' bags contain ')
	acc[bag.trim()] = bags.replace(/\d|\.|bags?/g, '').split`,`.map(v => v.trim())
	return acc
}, {})

let bagColorsCounted = []

const totalOuterColors = Object.keys(bagList).reduce((total, color) => {
	const shinyGoldFinder = (colors) => {
		colors.forEach(color => {
			bagColorsCounted.push(color)
			total++
			Object.keys(bagList).forEach(bagcolor => {
				if(bagList[bagcolor].includes(color) && !bagColorsCounted.includes(bagcolor))
					shinyGoldFinder([bagcolor])
			})
		}) 	
	}
	if(bagList[color].includes('shiny gold')){
		shinyGoldFinder([color])
	}
	return total
},0)

console.log(totalOuterColors)