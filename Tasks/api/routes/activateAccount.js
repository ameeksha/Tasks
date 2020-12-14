const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    const { token } = req.body;
    // console.warn('tokn');
    // console.warn(token)

    if (token) {
        jwt.verify(token, config.get('jwtPrivateKey'), function (err, decodeToken) {
            if (err) {
                return res.status(400).json({ error: 'Incorrect or expired link' })
            }
            const { name, email, password } = decodeToken;

            User.findOne({ email }).exec((err, user) => {
                if (user) return res.status(400).send('User already registered.');

                let newUser = new User({ name, email, password });
                //   const salt = bcrypt.genSalt(10);
                //   newUser.password =  bcrypt.hash(newUser.password);
                newUser.save((err, success) => {
                    if (err) {
                        return res.status(400).send(error.details[0].message);
                    }
                    res.json({
                        message: "Signup Successfully"
                    });
                })
            })
        })
    }
});

module.exports = router;

