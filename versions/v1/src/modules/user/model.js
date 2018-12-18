const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const bcrypt = require('bcryptjs')
const moment = require('moment-timezone')

const _schema = {
	name: { type: String, required: true },

	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: true,
		match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
	},

	phone: { type: String },
	password: { type: String },
	roles: { type: Number }, // 1 - admin <> 2 - basic (leitura, cadastro, relatorios) <> 3 - simple (leitura, relatorios)
	status: { type: Boolean, required: true },
	createdAt: { type: Date  },
	updatedAt: { type: Date }
}

const UserSchema = new Schema(_schema)

module.exports = Mongoose.model('User', UserSchema)
