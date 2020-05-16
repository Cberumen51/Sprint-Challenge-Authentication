const express = require("express")
const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../users/users-model')
const restrict = require("../auth/authenticate-middleware")


router.post('/register', async (req, res, next) => {
  // implement registration
  try {
    const {username} = req.body
    const user = await db.findBy({ username}).first()
    if (user) {
      return res.status(409).json({
        message: "username is already taken"
      })
    }
    res.status(201).json(await db.add(req.body))
  } catch(err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  // implement login
  const authError = {
    message: "Invalid Credentials",
  }
  try {
    const user = await db.findBy ({ username: req.body.username}).first()
    if(!user) {
      return res.status(401).json(authError)
    }
    const passwordValid = await bcrypt.compare(req.body.password, user.password)
    if (!passwordValid) {
        return res.status(401).json(authError)
    }
    const tokenPayload = {
      userId: user.id,
      userRole: "user",
    }
    res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET))
    res.json({
      message: `Welcome ${user.username}! :)`,
    })
  } catch(err) {
    next(err)
  }
});

module.exports = router;
