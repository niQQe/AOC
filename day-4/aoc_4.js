const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8')

const passports = input.split('\n\n').map(pass => pass.replace(/ /g, '\n').replace(/\n/g, ',').split`,`)

const validPassports = passports.reduce((fields, curr) => {
	const fieldList = curr.reduce((acc, field) => {
		[field] = field.split`:`
		if (field != 'cid') acc.push(field)
		return acc
	}, [])
	if (fieldList.length == 7) fields++
	return fields
}, 0)

console.log(validPassports)