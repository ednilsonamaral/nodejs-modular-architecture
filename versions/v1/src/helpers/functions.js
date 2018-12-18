// const	moment = require('moment')
const moment = require('moment-timezone')
const	bcrypt = require('bcryptjs')
const isEmpty = require('lodash/isEmpty')
const jwt = require('jsonwebtoken')

const Token = require('../modules/auth/model')

// Formated Dates
const getCurrentDateWithoutTimezone = () => moment().tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')
const getCurrentOnlyDate = () => moment().format('YYYY-MM-DD')
const convertDate = (date) => moment(date).format('YYYY-MM-DDTHH:mm:ss')

// BcryptsJS Functions
const encryptIt = (textToEncrypt) => bcrypt.hashSync(textToEncrypt, bcrypt.genSaltSync(10))
const compareIt = (textToCompare, originText) => bcrypt.compareSync(textToCompare, originText)

// Default Object to Return in Response
const objectReturn = (message, data, error, statusCode) => ({
	message: message,
	data: data,
	error: !error ? false : true,
	statusText: !error ? 'OK' : 'NOK',
	statusCode: statusCode
})

// Token Validation
const tokenValidation = async (value) => {
	const split = value.split(' ')
	const token = split[1]
	const condition = { 'token': token }

	let verify = await Token.findOne(condition).exec()

	if (!isEmpty(verify)) {
		if (verify.status === true) {
			return true
		} else {
			return false
		}
	} else {
		return false
	}
}

// Token Decode
const tokenDecode = (value) => {
	const split = value.split(' ')
	const token = split[1]

	const decoded = jwt.decode(token)
	return decoded
}

const functions = {
	getCurrentDateWithoutTimezone,
	getCurrentOnlyDate,
	convertDate,
	encryptIt,
	compareIt,
	objectReturn,
	tokenValidation,
	tokenDecode
}

module.exports = functions
