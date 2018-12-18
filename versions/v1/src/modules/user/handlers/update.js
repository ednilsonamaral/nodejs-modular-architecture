const isEmpty = require('lodash/isEmpty')

const FUNCTIONS = require('../../../helpers/functions')

const User = require('../model')

module.exports = async (req, res) => {
	const body = req.body
	const id = req.params.id
	const authorization = req.headers['authorization']

	// 1. Valida o token
	if (!isEmpty(authorization)) {
		// 1.1 Quando vem o token no header faz a validacao
		let check = await FUNCTIONS.tokenValidation(authorization)
		// console.log('check: ', check)

		if (check == true) {
			// 1.1.1 Token valido
			User.findById(id, (err, user) => {
				if (err) {
					return res.status(200).json(FUNCTIONS.objectReturn('Error when trying to find user', err, true, 200))
				}

				if (!isEmpty(user)) {
					// Pode atualizar
					const bodyUpdate = {
						name: !body.name ? user.name : body.name,
						email: !body.email ? user.email : body.email,
						password: !body.password ? user.password : FUNCTIONS.encryptIt(body.password),
						phone: !body.phone ? user.phone : body.phone,
						roles: !body.roles ? user.roles : body.roles,
						updatedAt: FUNCTIONS.getCurrentDateWithoutTimezone()
					}

					User.update({ _id: id }, bodyUpdate, { multi: false }, (err, _u) => {
						if (err) {
							return res.status(200).json(FUNCTIONS.objectReturn('Error when trying to update user', err, true, 200))
						}

						if (_u) {
							return res.status(200).json(FUNCTIONS.objectReturn('User successfully updated', null, false, 200))
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
		// 1.3 Quando nao vem o token no header
		return res.status(200).json(FUNCTIONS.objectReturn('Needs token', null, true, 401))
	}
}
