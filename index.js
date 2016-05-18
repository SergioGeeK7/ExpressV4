var express = require('express');
var server  = require('./server');
var models  = require('./models');
var app     = express();
var dataMock  = require("./dataMock.js")
// initialize the controllers
app = require('./controllers')(app);

function loadModels(fn) {
  models
      .sequelize
      .sync({force: true})
      .then(dataMock.bind(null,models))
      .then(fn)
}

function startServer() {
  
  var port = process.env.PORT || 3000;

  server.use(express.static('./public'));
  server.use('/api', app);
  server.use(errorHandler);
  server.use(notFoundHandler);

  if (!module.parent) {
    server.listen(port);
    console.log('Server has started on port ' + port + '.');
  }
}

function errorHandler(err, req, res, next) {
  if (err.message.indexOf('not found') !== -1) return next();
  console.error(err.stack);
  res.status(500).send('An error has occurred.');
}

function notFoundHandler(req, res, next) {
  res.status(404).send('Not found');
}

loadModels(startServer);
//startServer();
