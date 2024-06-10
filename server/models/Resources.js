const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const resourcesSchema = new Schema({
  topic:{
    type:String,
    required: true,
  },
  content:{
    type:String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Resources = model('Resources', resourcesSchema);

module.exports = Resources;