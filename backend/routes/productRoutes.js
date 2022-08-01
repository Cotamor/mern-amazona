import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const productRouter = express.Router()

// @desc   Get all products
// @access Public
productRouter.get('/', async (req, res) => {
  const products = await Product.find()
  res.send(products)
})

// @desc   Get products only with certain category
// @access Public
productRouter.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category')
    res.send(categories)
  })
)

// @desc   Get single product
// @access Public
productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Product Not Found' })
  }
})

// @desc   Get product by id
// @access Public
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Product Not Found' })
  }
})

export default productRouter
