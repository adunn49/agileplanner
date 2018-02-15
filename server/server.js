require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Required Controllers
var ctrlUsers = require('./controllers/users');
var ctrlStories = require('./controllers/stories');

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

// Routes
app.get('/users', ctrlUsers.usersGet);
app.post('/users', ctrlUsers.usersPost);

app.post('/stories', ctrlStories.storiesPost);
app.get('/stories', ctrlStories.storiesGet);
app.get('/stories/:id', ctrlStories.storiesGetWithId);
app.patch('/stories/:id', ctrlStories.storiesPatchWithId);
app.delete('/stories/:id', ctrlStories.storiesDeleteWithId);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
