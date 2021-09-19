const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/models')

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, description} = req.body;
            const {image} = req.files;
            let imageFileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', imageFileName))
            const product = await Product.create({name, price, description, image: imageFileName});
            return res.json(product)
        } catch (e) {
            next(res.status(400).json({message: e.message}))
        }
    }

    async update(req, res, next) {
        const {id} = req.params;
        try {
            let data = req.body;
            if (req.files !== null) {
                const {image} = req.files;
                let imageFileName = uuid.v4() + ".jpg"
                image.mv(path.resolve(__dirname, '..', 'static', imageFileName))
                data.image = imageFileName;
            }
            const product = await Product.update(data, {where: {id}})
            if (product[0] === 0) {
                return res.status(404).json({message: `Product with id ${id} is not in the database`})
            }
            return res.json({message: `Product with id ${id} updated`})
        } catch (e) {
            next(res.status(400).json({message: e.message}))
        }
    }

    async delete(req, res, next) {
        const {id} = req.params;
        try {
            const product = await Product.destroy({where: {id}})
            if (product === 0) {
                return res.status(404).json({message: `Product with id ${id} is not in the database`})
            }
            return res.json({message: `Product with id ${id} deleted`})
        } catch (e) {
            next(res.status(400).json({message: e.message}))
        }
    }

    async getAll(req, res) {
        const products = await Product.findAll()
        if (products.length == 0) {
            return res.status(404).json({message: 'There are no products in the database'})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne({where: {id}})
        if (product == null) {
            return res.status(404).json({message: `Item with id ${id} is not in the database`})
        }
        return res.json(product)
    }
}
module.exports = new ProductController()