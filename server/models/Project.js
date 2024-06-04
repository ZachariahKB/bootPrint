const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const projectSchema = new Schema({
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  githubRepo: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  }

  // Possible feature we cna use for commenting on projects
  // comments: [
  //   {
  //     commentText: {
  //       type: String,
  //       required: true,
  //       minlength: 1,
  //       maxlength: 280,
  //     },
  //     commentAuthor: {
  //       type: String,
  //       required: true,
  //     },
  //     createdAt: {
  //       type: Date,
  //       default: Date.now,
  //       get: (timestamp) => dateFormat(timestamp),
  //     },
  //   },
  // ],
});

const Porject = model('Project', projectSchema);

module.exports = Project;
