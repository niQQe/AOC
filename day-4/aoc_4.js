const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8')

const passports = input.split('\n\n').map(pass => pass.replace(/[ ||\n]/g, ',').split`,`)

const validFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

const validPassports = passports.reduce((fields, curr) => {
	const fieldList = curr.reduce((acc, field) => {
		const [ field ] = field.split`:`
		if (field != 'cid') acc.push(field)
		return acc
	}, [])
	if (fieldList.length == validFields.length) fields++
	return fields
}, 0)

console.log(validPassports)