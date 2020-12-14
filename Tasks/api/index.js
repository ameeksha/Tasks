const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const Task = require('./routes/tasks')
const activateAccount = require('./routes/activateAccount');
const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb+srv://ameeksha:oenYSqdvqpYcAXaL@cluster0.1j2uu.mongodb.net/node?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api', users);
app.use('/api/login', auth);
app.use('/api/activate-account', activateAccount);
app.use('/api', Task);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));