const isEmpty = require('lodash/isEmpty')

const FUNCTIONS = require('../../../helpers/functions')

const User = require('../model')

module.exports = async (req, res) => {
	let body = req.body
	body.password = FUNCTIONS.encryptIt(body.password)
	body.createdAt = FUNCTIONS.getCurrentDateWithoutTimezone()
	body.status = true

	let user = await User.find({ email: body.email }).exec()

	if (!isEmpty(user)) {
		return res.status(200).json(FUNCTIONS.objectReturn('User already registered with this email', user, true, 200))
	} else {
		if (!body.roles) {
			body.roles = 1

			User.create(body, (err, data) => {
				if (err) {
					return res.status(200).json(FUNCTIONS.objectReturn('Error when trying to create', err, true, 200))
				}

				if (data) {
					return res.status(201).json(FUNCTIONS.objectReturn('User successfully registered', data, false, 201))
				}
			})
		} else {
			User.create(body, (err, data) => {
				if (err) {
					return res.status(200).json(FUNCTIONS.objectReturn('Error when trying to create', err, true, 200))
				}

				if (data) {
					return res.status(201).json(FUNCTIONS.objectReturn('User successfully registered', data, false, 201))
				}
			})
		}
	}
}
