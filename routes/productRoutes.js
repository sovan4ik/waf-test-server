const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkMiddleware = require('../middleware/checkMiddleware')

router.post('/', checkMiddleware.role('ADMIN'), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.put('/update/:id', checkMiddleware.role('ADMIN'), productController.update)
router.delete('/delete/:id', checkMiddleware.role('ADMIN'), productController.delete)

module.exports = router