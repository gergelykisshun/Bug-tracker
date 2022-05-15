const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  description: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  assignedTo: {
    type: mongoose.SchemaTypes.Array,
    of: Object,
    default: []
  },
  tickets: {
    type: mongoose.SchemaTypes.Array,
    of: Object,
    default: []
  }
})

module.exports = mongoose.model('project', projectSchema);