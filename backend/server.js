import express from 'express'
import data from './data.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/api/products', (req, res) => {
  res.send(data.products)
})

const port = process.env.PORT || 8000

app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
  )
)
