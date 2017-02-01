(function () {
  'use strict';

  const express =  require('express');
  const mongoose = require('mongoose');
  const cors =     require('cors');
  const api =      require('./api');

  const app =  express();
  const port = 6969;

  var allowCrossDomain = function (req, res, next) {
    const allowedOrigins = ['http://127.0.0.1:80', 'http://sego.is', 'http://localhost:9000', 'http://www.sego.is', 'http://www.sego.is/home', 'http://192.241.158.205:6969'];
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  };

  app.use(allowCrossDomain);
  app.use('/api', api);

  /*app.use(cors({
   'origin': '*',
   'methods': 'GET,PUT,POST,DELETE',
   'preflightContinue': true
   }));*/
  mongoose.Promise = global.Promise;

  mongoose.connect('mongodb://mongo.sego.is:27017/app');
  mongoose.connection.once('open', function () {
    console.log('Mongoose is connected');
    app.listen(port, () => {
      console.log('server is up and running... ', port);
    });
  });
})();
