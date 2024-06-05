const { Schema, model } = require('mongoose');

const resourcesSchema = new Schema({
  topic:{
    type:String,
    required: true,
  },
  content:{
    type:String,
    required: true,
  },
});

const Resources = model('Resources', resourcesSchema);

module.exports = Resources;