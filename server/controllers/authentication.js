const _ = require('lodash');
var {User} = require('./../models/user');

module.exports.login = function (req, res) {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
    res.send(user);
  }).catch((error) => {
    console.log(error, 'ERROR!');
    res.status(400).send({
      message: error.message
    });
  });
};
