import express from 'express'
import data from './data.js'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// @desc   Get all products
// @access Public
app.get('/api/products', (req, res) => {
  res.send(data.products)
  // res.status(404).send({ message: 'Test Error' })
})
// @desc   Get single product
// @access Public
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug)
  if (product) {
    // res.send(product)
    res.status(404).send({ message: 'Product Not Found' })
  } else {
    res.status(404).send({ message: 'Product Not Found' })
  }
})

const port = process.env.PORT || 8000

app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
  )
)
