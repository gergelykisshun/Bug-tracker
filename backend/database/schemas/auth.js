const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  role: {
    type: mongoose.SchemaTypes.String,
    required: true
  }
})

module.exports = mongoose.model('userAuth', authSchema);