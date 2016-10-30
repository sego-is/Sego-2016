(function () {
  'use strict';

  const express    = require('express');
  const jwt        = require('express-jwt');
  const bodyParser = require('body-parser');
  const model      = require('./model');
  const api        = express();

  const jwtCheck = jwt({
    secret: new Buffer('LjTXpHjzAIcCZCZ4gxZWkdyU82wBrYxA-eM2HJ1u8pIgO19YbV9BjpXHo3gI9eBv', 'base64'),
    audience: 'U4WvYHgktQuwoih8m9VVrqsPmEkxghJT'
  });

  api.use(jwtCheck);

  api.get('/', (req, res) => {
    res.status(201).json({
      hungang: 'thvag byfluga'
    });
  });

  api.get('/booking', (req, res) => {
    res.status(201).json({
      svar: 'tippa svar'
    });
  });

  api.get('/services', (req, res) => {
    model.Service.find({}, function (err, docs) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.send(docs);
      }
    });
  });

  api.post('/booking', bodyParser.json(), (req, res) => {
    console.log(req.body);
    /*
     const m = new model.Booking(req.body);
     m.save(function(err, doc) {
     if (err) {
     res.status(500).send(err);
     return;
     }
     else {
     res.status(201).send(doc);
     }
     });*/
    res.status(201).send(req.body);
  });

  api.post('/services', bodyParser.json(), (req, res) => {
    const s = new model.Service(req.body);
    s.save(function (err, doc) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.send(doc);
      }
    })
  });


  module.exports = api;
})();
