import express from 'express'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { generateToken } from '../utils.js'

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
   const user = await newUser.save();
   res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
   })
  })
)

export default userRouter
