const mongoose = require('mongoose')

let db_name = process.env.DB_NAME
let host = process.env.DB_HOST

mongoose.connect('mongodb://' + host + '/' + db_name)

let db = mongoose.connection

db.on('error', function (err) {
	console.log('Erro de conexao > ', err)
})

db.on('open', function () {
	console.log('Conexão aberta!')
})

db.on('connected', function (err) {
	console.log('Conectado no banco de dados: ', db_name)
})

db.on('disconnected', function (err) {
	console.log('Desconectado, bye bye!')
})
