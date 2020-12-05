const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8')

const passports = input.split`\n\n`.map(pass => pass.replace(/[ ||\n]/g, ',').split`,`)

const requiredFieldsAndValidators = [
	{
		passField: "byr",
		valid: (field) => {
			const f = field.replace(/\D/g, '')
			return f >= 1920 && f <= 2002
		}
	},
	{
		passField: "iyr",
		valid: (field) => {
			const f = field.replace(/\D/g, '')
			return f >= 2010 && f <= 2020
		}
	},
	{
		passField: "eyr",
		valid: (field) => {
			const f = field.replace(/\D/g, '')
			return f >= 2020 && f <= 2030
		}
	},
	{
		passField: "hgt",
		valid: (field) => {
			if (field.includes('cm')) {
				const [height] = field.split`cm`
				return +height >= 150 && +height <= 193
			}
			if (field.includes('in')) {
				const [height] = field.split`in`
				return +height >= 59 && +height <= 75
			}
			return false
		}
	},
	{
		passField: "hcl",
		valid: (field) => {
			let f = null
			if (field[0] === '#') {
				f = field.replace(/#/, '')
				return /[0-9a-z]/i.test(f) && f.length === 6
			} else {
				return false
			}
		}
	},
	{
		passField: "ecl",
		valid: (field) => {
			const allowed = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
			return allowed.includes(field)
		}
	},
	{
		passField: "pid",
		valid: (field) => {
			return /[0-9]/.test(field) && field.length === 9
		}
	}
]

/**
 *  Part 1
 */

const validPassportsPart1 = passports.reduce((passports, row) => {
	const valid = row.reduce((valid, fieldRow) => {
		const [field] = fieldRow.split`:`
		requiredFieldsAndValidators.forEach(reqField => {
			if (field == reqField.passField) valid++
		})
		return valid
	}, 0)
	if (valid == requiredFieldsAndValidators.length) passports++
	return passports
}, 0)

console.log(validPassportsPart1)

/**
 *  Part 2
 */
const passportValidator = (field, value, callback) => {
	requiredFieldsAndValidators.forEach((reqField) => {
		if (reqField.passField == field) {
			callback(reqField.valid(value))
		}
	})
}

const validPassportsPart2 = passports.reduce((passports, row) => {
	const validFields = row.reduce((fields, fieldRow) => {
		const [field, value] = fieldRow.split`:`
		passportValidator(field, value, fieldIsValid => {
			if (fieldIsValid) fields++
		})
		return fields
	}, 0)
	if (validFields == requiredFieldsAndValidators.length)
		passports++
	return passports
}, 0)

console.log(validPassportsPart2)


