import express from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import { isAuth, isAdmin } from '../utils.js'

const orderRouter = express.Router()

// @desc   Get all orders
// @access Private / Admin
orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name')
    res.send(orders)
  })
)

// @desc   Create new order
// @access Private
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

// @desc   Get order summary for dashboard
// @access Private / Admin
orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ])

    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ])

    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ])

    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ])
    res.send({ users, orders, dailyOrders, productCategories })
  })
)

// @desc   Get current user's order
// @access Private
orderRouter.get(
  '/mine',
  isAuth,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.send(orders)
  })
)

// @desc   Get order by id
// @access Private
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

// @desc   Update order to be paid
// @access Private
orderRouter.put(
  '/:id/pay',
  isAuth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      }

      const updatedOrder = await order.save()
      res.send({ message: 'Order Paid', order: updatedOrder })
    } else {
      res.status(404).send({ message: 'Order Not Fount' })
    }
  })
)

// @desc   Update order to be delivered
// @access Private / Admin
orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()

      await order.save()
      res.send({ message: 'Order Delivered' })
    } else {
      res.status(404).send({ message: 'Order Not Fount' })
    }
  })
)

// @desc   Delete order
// @access Private / Admin
orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      await order.remove()
      res.send({ message: 'Order Deleted' })
    } else {
      res.status(404).send({ message: 'Order Not Fount' })
    }
  })
)

export default orderRouter
