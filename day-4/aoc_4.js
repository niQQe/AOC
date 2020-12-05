const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8')

const passports = input.split('\n\n').map(pass => pass.replace(/ /g, '\n').replace(/\n/g, ',').split`,`)

const validPasswords = passports.reduce((fields, curr) => {
	const fieldsArr = curr.reduce((acc, field) => {
		[field] = field.split`:`
		if (field != 'cid')
			acc.push(field)
		return acc
	}, [])
	if(fieldsArr.length == 7) fields++
	return fields
}, 0)

console.log(validPasswords)