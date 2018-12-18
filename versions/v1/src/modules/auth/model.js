const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const _schema = {
	token: { type: String, required: true },
	status: { type: Boolean, required: true },
	createdAt: { type: Date },
	updatedAt: { type: Date }
}

const TokenSchema = new Schema(_schema)

module.exports = Mongoose.model('Token', TokenSchema)
