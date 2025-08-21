const express = require('express');
const router = express.Router();
const User = require('../Schema/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Joi = require('joi');

//---------------SIGNIN & SIGNUP SCHEMA FOR VALIDATION --------------------------------//

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required()
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

//-------------------SIGNUP--------------------------------//

router.post('/signup', async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Error" });
    }

    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashPassword
    });

    await newUser.save();

    res.status(200).json({
      message: "User created"
    });

  } catch (error) {
    res.status(500).json({
      message: "Some error occurred"
    });
  }
});

//-------------------SIGNIN--------------------------------//

router.post('/signin', async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found. Please sign up first."
      });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Wrong credentials"
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email
      },
      JWT_SECRET
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      user:{
        id : existingUser._id
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Some error occurred"
    });
  }
});

module.exports = router;
