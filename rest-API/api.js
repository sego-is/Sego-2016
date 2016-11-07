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
      } else {
        res.send(docs);
      }
    });
  });

  //DELETE PERSON
  api.delete('/persons/:id', (req, res) => {
    var id = req.body.id;
    model.Person.findByIdAndRemove(id, function(err, p) {
        var response = {
           messages: "Vona tókst að eyða honum",
           id: id
        };

        res.send(response);
    });

    /*model.Person.remove({"_id": id}, function (err, c) {
      if (err) {
        console.log("err ", c);
        res.status(500).send(err);
      } else {
        console.log("success ");
        res.send(c);
      }
    });*/
  });

  // POST PERSONS, EITHER STAFF OR CUSTOMER


  // GET ALL HAIRCUTTER WORKING FOR COMPANY WITH ID
  api.get('/persons/:company_id', (req, res) => {
     model.Company.findById(req.params.company_id).populate('staff.person_id').run( (err, doc) => {
         if (err) {
             res.status(500).send(err);
         }
         else {
             res.send(doc);
         }
     });
     
     
     
     
     
     /*
    model.Person.find({"company_id": req.params.company_id, "role": 1}, (err, p) => {
      if (!err) {
        res.send(p);
      } else {
        res.status(500).send(err);
      }
    });
 
*/
 });
 
  api.get('/bookings', (req, res) => {
      // RADA EFTIR TIMA OG NAFNI OG KLIPPARA
      // SAEKJA PERSONU OBJECT AF CUSTOMER
      // 
    res.status(201).json({
      svar: 'tippa svar'
    });
  });

  api.post('/bookings', bodyParser.json(), (req, res) => {
    let persona;
    model.Person.findOne({
      "company_id": req.company_id,
      "name": req.customer_name,
      "simi": req.customer_simi
    }, function (err, p) {
      if (!err) {
        persona = p;
        console.log("PERSONA P !err", p);
      } else {
        console.log("ERROR IN POST /bookings :", err);
        persona = null;
      }

    if (persona === null) {
      model.Person.create({
        company_id: req.company_id,
        name: req.customer_name,
        simi: req.customer_simi
      }, function (err, p) {
        if (err) {
          console.log("PERSONA P err");
          res.status(500).send(err);
        } else {
          persona = p;
          console.log("PERSONA P", p);
        }
      })}
    });
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
    //res.status(201).send(req.body);
  });

  api.get('/services', (req, res) => {
    model.Service.find({}, function (err, docs) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(docs);
      }
    });
  });

  api.get('/services/:company_id', (req, res) => {
    const id = req.params.company_id;
    model.Service.find({company_id: id}, function (err, docs) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(docs);
      }
    });
  });

  api.post('/services', bodyParser.json(), (req, res) => {
    //const s = new model.Service(req.body);
    model.Service.update({ '_id': req.body.company_id },
        { $push: { "pricelist": { name: req.body.name, price: req.body.price } } },
        { safe: true, upsert: true }, function (err, doc) {
          if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(doc);
        }
    });
  });

  api.post('/persons', bodyParser.json(), (req, res) => {
    const p = new model.Person(req.body);
    model.Person.create(p, function (err, doc) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        if (req.body.role === 1) {
          model.Company.update({'_id': req.body.company_id}, {
            $push: { "staff": {
                "person_id": doc._id,
                "name": doc.name
              }
            }}, function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.send(doc);
                }
          });
        }
        else {
            res.send("PERSONA BEEN ADDED");
        }

      }
    })
  });

  // DELETE SPECIFIC SERVICE WITH GIVEN _ID, WILL DELETE ALLE COLLECTION FOR COMPANY WITH GIVEN _ID
  // NOT WISE TO HAVE THIS REST CALL IN PRODUCTIN.. MORE TO CLEAN OUR DATABASE. E.A.
  api.delete('/services/:id', (req, res) => {
      var id = req.params.id;
       // model.Service.remove({ _id : model.ObjectId(req.params.id) }, function (err) {
      model.Service.findByIdAndRemove(id, function (err, c) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('BEEN DELETED');
        }
    });
  });

  api.post('/services/pricelist/', bodyParser.json(), (req, res) => {
      var data = req.body;
      model.Service.update({ '_id': data.cid },
        { $pull: { "pricelist": { _id: data.service._id } } },
        { safe: true, upsert: true }, function (err, doc) {
          if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('HAS BEEN DELETED')
        }
    });
  });

  api.post('/services/editPricelist/', bodyParser.json(), (req, res) => {
    var data = req.body;
    model.Service.findOneAndUpdate(
        { 'company_id': data.cid, 'pricelist._id': data.service._id },
        { $set: { 'name': data.service.name, 'pricelist': data.service.price } },
        { safe: true, upsert: true }, function (err, doc) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send('HAS BEEN UPDATEd ', doc);
            }
      });
  });

  api.post('/companies/staff/', bodyParser.json(), (req, res) => {
      var data = req.body;
      model.Company.update({ '_id': data.cid },
        { $pull: { "staff": { _id: data.staff._id } } },
        { safe: true, upsert: true }, function (err, doc) {
          if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('HAS BEEN DELETED')
        }
    });
  });


  api.get('/companies', (req, res) => {
    model.Company.find({}).select("_id name phone auth_id staff").find((err, doc) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(doc);
      }
    });
  });

  api.post('/companies', bodyParser.json(), (req, res) => {
    const c = new model.Company(req.body);
    c.save(function (err, doc) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(doc);
      }
    });
  });

  api.get('/companies/:id', (req, res) => {
    model.Company.find({auth_id: req.params.id}, function (err, c) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(c);
      }
    });
  });
  module.exports = api;
})();
