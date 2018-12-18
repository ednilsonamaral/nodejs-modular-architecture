module.exports = (app) => {
	let uri = '/api/' + process.env.API_VERSION

	app.use(uri + '/auth/', require('./src/modules/auth'))
  app.use(uri + '/users/', require('./src/modules/user'))

	app.route('/*').get(function (req, res) {
		res.json({ message: 'Rota não encontrada!', rota: uri })
	})
}
