var mongoose = require('./../db/mongoose');
const _ = require('lodash');
var {ObjectID} = require('mongodb');

var {Story} = require('./../models/story');

module.exports.storiesGet = function(req, res) {
  Story.find({}).then((stories) => {
    res.send({stories});
  }, (e) => {
    res.status(400).send(e);
  }).catch((err) => res.status(400).send(err));
}

module.exports.storiesGetWithId = function(req, res) {
  var id = req.params.id;
  Story.findOne({
    _id: id
  }).then((story) => {
        console.log(story);
    res.send({story});
  }, (e) => {
    res.status(400).send(e);
  }).catch((err) => res.status(400).send(err));
}

module.exports.storiesPost = function (req, res) {
  console.log('post story');
  var story = new Story({
    title: req.body.title,
    description: req.body.description,
    storySize: req.body.storySize,
    storyStatus: req.body.storyStatus
  });
  story.save().then((story) => {
    res.send(story);
  }, (e) => {
    res.status(400).send(e);
  })
}



module.exports.storiesPatchWithId = function (req, res) {
  var id = req.params.id;
  var body = _.pick(req.body, ['title', 'description', 'storyStatus', 'storySize']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Story.findOneAndUpdate({
    _id: id,
  }, {$set: body}, {new: true}).then((story) => {
    if (!story) {
      return res.status(404).send();
    }
    res.send({story});
  }).catch((e) => {
    res.status(400).send();
  })
}

module.exports.storiesDeleteWithId = function (req, res) {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Todo id is invalid');
  }
  Story.findOneAndRemove({
    _id: id
  }).then((story) => {
    if (!story) {
      return res.status(404).send('Story not found');
    }
    return res.send({story});
  }).catch((e) => {
    return res.status(400).send('Could not delete story');
  })
}
