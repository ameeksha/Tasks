const mongoose = require('mongoose');
const express = require('express');
const Task = require('../models/task')
const router = express.Router()

router.get('/tasks', function (req, res) {
    Task.find().then((data) => {
        res.json(data);
    })
});


router.get('/task-count', function (req, res) {
    Task.find().countDocuments().then((data) => {
        res.json(data);
    })
});

router.post('/task', (req, res) => {
    // console.warn(req.body)
    const task = new Task(req.body)
    task.save().then(res => {
        return res.send(task)
    })
        .catch(err => {
            return res.send(err)
        })
})

module.exports = router;