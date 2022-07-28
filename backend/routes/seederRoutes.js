import express from 'express'
import Product from '../models/productModel.js'
import data from '../data.js'

const seedRouter = express.Router()

seedRouter.get('/', async (_, res) => {
  await Product.remove({})
  const createdProducts = await Product.insertMany(data.products)
  res.send({ createdProducts })
})

export default seedRouter
