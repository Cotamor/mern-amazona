import express from 'express'
import data from './data.js'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/api/products', (req, res) => {
  res.send(data.products)
})

const port = process.env.PORT || 8000

app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
  )
)
