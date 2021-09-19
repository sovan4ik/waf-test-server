const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const checkMiddleware = require('../middleware/checkMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', checkMiddleware.auth, userController.check)

module.exports = router