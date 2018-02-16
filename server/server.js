require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
var router = express.Router();

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
router.get('/users', ctrlUsers.usersGet);
router.post('/users', ctrlUsers.usersPost);

router.post('/stories', ctrlStories.storiesPost);
router.get('/stories', ctrlStories.storiesGet);
router.get('/stories/:id', ctrlStories.storiesGetWithId);
router.patch('/stories/:id', ctrlStories.storiesPatchWithId);
router.delete('/stories/:id', ctrlStories.storiesDeleteWithId);

//Use our router configuration when we call /api
app.use('/api', router);

// Express only serves static assets in production
console.log('Mode:::' + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  let pathStr = path.join(__dirname, '/build');
  app.use(express.static(pathStr));
}

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
