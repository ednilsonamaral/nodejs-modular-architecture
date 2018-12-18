module.exports = (Model, Schema) => {
	const mongoose = require('mongoose')
	return mongoose.model(Model, Schema)
}
