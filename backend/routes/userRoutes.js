import express from 'express'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { generateToken, isAuth, isAdmin } from '../utils.js'

const userRouter = express.Router()

// @desc   Get all users
// @access Private / Admin
userRouter.get(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.send(users)
  })
)

// @desc   Sign in user
// @access Public
userRouter.post(
  '/signin',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      // Compare plain text password from user and bcrypted password from db
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        })
      }
    }
    res.status(401).send({ message: 'Invalid email or password' })
  })
)
// @desc   Sign up user
// @access Public
userRouter.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    })
    const user = await newUser.save()
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    })
  })
)
// @desc   Update user profile
// @access Private
userRouter.put(
  '/profile',
  isAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password)
      }

      const updatedUser = await user.save()
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      })
    } else {
      res.status(404).send({ message: 'User Not Found' })
    }
  })
)

// @desc   Delete user
// @access Private / Admin
userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' })
        return
      }
      await user.remove()
      res.send({ message: 'User is deleted successfully' })
    } else {
      res.status(404).send({ message: 'User Not Found' })
    }
  })
)
// @desc   Get single user
// @access Private / Admin
userRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
      res.send(user)
    } else {
      res.status(404).send({ message: 'User Not Found' })
    }
  })
)

// @desc   Update user info
// @access Private / Admin
userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      // @fix How to prevent admin from editting his or her own isAdmin
      user.isAdmin = Boolean(req.body.isAdmin)
      const updatedUser = await user.save()
      res.send({ message: 'User Updated', user: updatedUser })
    } else {
      res.status(404).send({ message: 'User Not Found' })
    }
  })
)

export default userRouter
