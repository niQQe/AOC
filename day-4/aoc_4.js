const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8')

const passports = input.split`\n\n`.map(pass => pass.replace(/[ ||\n]/g, ',').split`,`)

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

const validPassports = passports.reduce((passports, row) => {
	const valid = row.reduce((valid, fieldRow) => {
		const [field] = fieldRow.split`:`
		if (requiredFields.includes(field)) valid++
		return valid
	}, 0)
	if (valid == requiredFields.length) passports++
	return passports
}, 0)

console.log(validPassports)