const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8')

const passports = input.split`\n\n`.map(pass => pass.replace(/[ ||\n]/g, ',').split`,`)

const requiredFieldsAndValidators = [
	{
		passField: "byr",
		valid: (value) => {
			const v = value.replace(/\D/g, '')
			return v >= 1920 && v <= 2002
		}
	},
	{
		passField: "iyr",
		valid: (value) => {
			const v = value.replace(/\D/g, '')
			return v >= 2010 && v <= 2020
		}
	},
	{
		passField: "eyr",
		valid: (value) => {
			const v = value.replace(/\D/g, '')
			return v >= 2020 && v <= 2030
		}
	},
	{
		passField: "hgt",
		valid: (value) => {
				if(!value.match((/(\d{2,3})(cm|in)/))) return false
				const [, height, metric] = value.match((/(\d{2,3})(cm|in)/))
				if (metric == 'cm') {
					return +height >= 150 && +height <= 193
				}
				if (metric == 'in') {
					return +height >= 59 && +height <= 75
				}
		}
	},
	{
		passField: "hcl",
		valid: (value) => {
			let v = null
			if (value[0] === '#') {
				v = value.replace(/#/, '')
				return /[0-9a-z]/i.test(v) && v.length === 6
			} else {
				return false
			}
		}
	},
	{
		passField: "ecl",
		valid: (value) => {
			const allowed = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
			return allowed.includes(value)
		}
	},
	{
		passField: "pid",
		valid: (value) => {
			return /[0-9]/.test(value) && value.length === 9
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
const fieldValidator = (field, value, callback) => {
	requiredFieldsAndValidators.forEach((reqField) => {
		if (reqField.passField == field) {
			callback(reqField.valid(value))
		}
	})
}

const validPassportsPart2 = passports.reduce((passports, row) => {
	const validFields = row.reduce((fields, fieldRow) => {
		const [field, value] = fieldRow.split`:`
		fieldValidator(field, value, fieldIsValid => {
			if (fieldIsValid) fields++
		})
		return fields
	}, 0)
	if (validFields == requiredFieldsAndValidators.length)
		passports++
	return passports
}, 0)

console.log(validPassportsPart2)


