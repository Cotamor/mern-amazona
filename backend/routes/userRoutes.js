import express from 'express'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { generateToken, isAuth } from '../utils.js'

const userRouter = express.Router()
// User Sign in
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
// User Sign up
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

export default userRouter
