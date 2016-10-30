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
  // TMP GET CALL
  api.get('/persons', (req, res) => {
      model.Person.find({}, function (err, docs) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.send(docs);
      }
    });
  });
  
  api.post('/persons', bodyParser.json(), (req, res) => {
    const p = new model.Person(req.body);
    p.save(function (err, doc) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.send(doc);
      }
    })
  });
  
  api.get('/bookings', (req, res) => {
    res.status(201).json({
      svar: 'tippa svar'
    });
  });

api.post('/bookings', bodyParser.json(), (req, res) => {
    let persona;
    model.Person.findOne({"company_id": req.company_id, "name": req.customer_name, "simi": req.customer_simi}, function(err, p) {
            if (err) {
                console.log(err);
                persona = null;
            }
            else {
                persona = p;
            }
    });
    if (persona === null) {
        model.Person.create({ company_id: req.company_id, name: req.customer_name, simi: req.customer_simi }, function(err, p) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            else {
                persona = p;
            }
        });
    }
    
    
    /*
    model.Booking.update( {"company_id":req.company_id,"date":req.date },
        {$push: {
            "bookings": {
                "customer_id": persona._personaId,
                "staff_id":    req.staff_id,
                "time":        req.   
            }
        }
    })*/
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

  api.post('/companies', bodyParser.json(), (req, res) => {
    
    const c = new model.Company(req.body);
    c.save(function (err, doc) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.send(doc);
      }
    });

  });
  
  api.get('/companies/:id', (req, res) => {
      
      const id = req.params.id;
      
      model.Company.find({ "auth_id": id }, function(err, c) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(c);
        }
      });
  });
  
  module.exports = api;
  
})();