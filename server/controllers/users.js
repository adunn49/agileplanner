var mongoose = require('./../db/mongoose');

var {User} = require('./../models/user');

module.exports.usersGet = function(req, res) {
  User.find({}).then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send(e);
  }).catch((err) => res.status(400).send(err));
}

module.exports.usersPost = function (req, res) {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    jobtitle: req.body.jobtitle
  });
  user.save().then((user) => {
    res.send(user);
  }, (e) => {
    res.status(400).send(e);
  })
}
