const isEmpty = require('lodash/isEmpty')
const jwt = require('jsonwebtoken')

const FUNCTIONS = require('../../../helpers/functions')

const Token = require('../model')
const User = require('../../user/model')

// 1 - admin
// 2 - basic (leitura, cadastro, relatorios)
// 3 - simple (leitura, relatorios)

module.exports = async (req, res) => {
	const body = req.body
	const condition = { 'email': body.email }

	// 1. Validar o usuario
	let user = await User.findOne(condition).exec()

	if (!isEmpty(user)) {
		// 2. Validar a senha
		const verifyPassword = FUNCTIONS.compareIt(body.password, user.password)

		if (verifyPassword == true) {
			// 3. Criar o token
			const body = {
				_id: user._id,
				email: user.email,
				roles: user.roles,
				createdAt: FUNCTIONS.getCurrentDateWithoutTimezone()
			}

			const token = jwt.sign(body, process.env.JWT_SECRET, { algorithm: 'HS256'})

			// 3.2 Salva o token no banco
			const bodyToken = {
				token: token,
				status: true,
				createdAt: FUNCTIONS.getCurrentDateWithoutTimezone()
			}

			await Token.create(bodyToken, (err, _t) => {
				if (err) {
					return res.status(200).json(FUNCTIONS.objectReturn('Error when trying to login', err, true, 200))
				}

				if (_t) {
					return res.status(201).json(FUNCTIONS.objectReturn('Successful login', _t, false, 201))
				}
			})
		} else {
			// 2.1 Senha invalida
			return res.status(200).json(FUNCTIONS.objectReturn('Invalid password', null, true, 401))
		}
	} else {
		// 1.1 Usuario invalido
		return res.status(200).json(FUNCTIONS.objectReturn('User not found', user, true, 200))
	}
}
