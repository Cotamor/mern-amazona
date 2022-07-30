import express from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import { isAuth } from '../utils.js'

const orderRouter = express.Router()

orderRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req, res) => {
    const newOrder = new Order({
      user: req.user._id,
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
    })

    const order = await newOrder.save()
    res.status(201).send({ message: 'New order created', order })
  })
)

orderRouter.get(
  '/:id',
  isAuth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      res.send(order)
    } else {
      res.status(404).send({ message: 'Order Not Found' })
    }
  })
)

export default orderRouter
