const mongoose = require('mongoose');
const express = require('express');
const Task = require('../models/task')
const router = express.Router();
const nodeMailer = require('nodemailer');

router.get('/tasks', function (req, res) {
    Task.find().then((data) => {
        res.json(data);
    })
});

router.get('/tasks/:user_id', function (req, res) {
    Task.find(req.params).then((data) => {
        res.json(data);
    })
});


router.get('/task-count', function (req, res) {
    Task.find().countDocuments().then((data) => {
        res.json(data);
    })
});

router.post('/tasks', (req, res) => {
    // console.warn(req.body)
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
            to: req.body.user_email,
            subject: 'New Task',
            html: `<p>New task assigned</p>`
          }
    const task = new Task(req.body)
    task.save().then(res => {
        
          transport.sendMail(mailOptions, function (error, info) {
        
            if (error) {
              console.warn(error);
            }
            return res.json({ message: "Email has been sent" })
          })
        return res.json({message:"Task Assigned"})
    })
        .catch(err => {
            return res.send(err)
        })
})

module.exports = router;