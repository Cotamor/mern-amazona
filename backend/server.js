import express from 'express'
import data from './data.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'
import seedRouter from './routes/seederRoutes.js'

dotenv.config()

// Connect to database
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// Only using for creating sample data
app.use('/api/seed', seedRouter)
// routes
app.use('/api/products', productRouter)

const port = process.env.PORT || 8000

app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
  )
)
