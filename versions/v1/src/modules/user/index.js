const express = require('express')
const router = express.Router()

const HANDLERS = {
	create: require('./handlers/create'),
	getById: require('./handlers/getById'),
	update: require('./handlers/update'),
	delete: require('./handlers/delete')
}

router.post('/create', HANDLERS.create)
router.get('/by-id/:id', HANDLERS.getById)
router.put('/update/:id', HANDLERS.update)
router.delete('/delete/:id', HANDLERS.delete)

module.exports = router
