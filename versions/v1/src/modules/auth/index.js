const express = require('express')
const router = express.Router()

const HANDLERS = {
	login: require('./handlers/login'),
	logout: require('./handlers/logout')
}

router.post('/login', HANDLERS.login)
router.delete('/logout', HANDLERS.logout)

module.exports = router
