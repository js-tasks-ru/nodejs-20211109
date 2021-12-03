const mongoose = require('mongoose');
const connection = require('../libs/connection');
const config = require('../config');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  token: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true, // createdAt, updatedAt
});


module.exports = connection.model('Session', schema);
