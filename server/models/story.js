const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

const STORY_STATUS_ENUM = [
  'backlog',
  'planning',
  'defined',
  'progress',
  'complete'
];

var StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    unique: false
  },
  description: {
    type: String,
    required: false,
    trim: true,
    unique: false
  },
  storySize: {
    type: Number,
    trim: true,
  },
  storyStatus: {
    type: String,
    enum: STORY_STATUS_ENUM,
    default: STORY_STATUS_ENUM[0]
  }
});

var Story = mongoose.model('Story', StorySchema);
module.exports = {Story, STORY_STATUS_ENUM};
