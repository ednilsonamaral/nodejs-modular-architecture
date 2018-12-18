const isEmpty = require('lodash/isEmpty')

const FUNCTIONS = require('../../../helpers/functions')

const Token = require('../model')

module.exports = async (req, res) => {
	const body = req.body
	const authorization = req.headers['authorization']
	const split = authorization.split(' ')
	const token = split[1]

	// 1. Valida o token
	if (!isEmpty(authorization)) {
		// 1.1 Quando vem o token no header faz a validacao
		let check = await FUNCTIONS.tokenValidation(authorization)
		console.log('check: ', check)

		if (check == true) {
			// 1.1.1 Token valido
			const query = { 'token': token }

			await Token.findOne(query, (err, _t) => {
				if (err) {
					return res.status(200).json(FUNCTIONS.objectReturn('Error when trying to find user', err, true, 200))
				}

				if (!isEmpty(_t)) {
					// Pode destruir o token
					const bodyUpdate = {
						status: false,
						updatedAt: FUNCTIONS.getCurrentDateWithoutTimezone()
					}

					Token.update({ token: token }, bodyUpdate, { multi: false }, (err, _u) => {
						if (err) {
							return res.status(200).json(FUNCTIONS.objectReturn('Error when trying to update user', err, true, 200))
						}

						if (_u) {
							return res.status(200).json(FUNCTIONS.objectReturn('User successfully logout', null, false, 200))
						}
					})
				} else {
					return res.status(200).json(FUNCTIONS.objectReturn('User not found', null, true, 200))
				}
			})
		} else {
			// 1.1.2 Token invalido
			return res.status(200).json(FUNCTIONS.objectReturn('Invalid token', null, true, 401))
		}
	} else {
		// 1.2 Quando nao vem o token no header
		return res.status(200).json(FUNCTIONS.objectReturn('Needs token', null, true, 401))
	}
}
