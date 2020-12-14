const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');

router.get('/users', function (req, res) {
  User.find().then((data) => {
    res.json(data);
  })
});

router.get('/user-count', function (req, res) {
  User.find().countDocuments().then((data) => {
    res.json(data);
  })
});


router.post('/signup', async (req, res) => {
  const email = req.body.email;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  //   user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  //   user.password = await bcrypt.hash(user.password, salt);
  //   await user.save();
  const token = jwt.sign({ name: req.body.name, email: req.body.email, password: await bcrypt.hash(req.body.password, salt) }, config.get('jwtPrivateKey'));
  //   const token = user.generateAuthToken();
  var transport = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'sender email',
      pass: 'password'
    }
  });
  var mailOptions = {
    from: 'sender email',
    to: email,
    subject: 'Account Activation',
    html: `<h2>Please click on the below link to activate your account</h2>
   <p>http://localhost:3000/activateEmail/${token}</p> `
  }
  transport.sendMail(mailOptions, function (error, info) {

    if (error) {
      console.warn(error);
    }
    return res.json({ message: "Email has been sent" })
  })
  // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;

