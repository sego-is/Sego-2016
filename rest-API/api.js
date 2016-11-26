(function () {

  'use strict';

  const express    = require('express');
  const jwt        = require('express-jwt');
  const bodyParser = require('body-parser');
  const _          = require('underscore');
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
    var id = req.params.id;
    model.Person.findByIdAndRemove(id, function(err, p) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(p);
        }
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
 });
 // GET ALL CUSTOMER FOR GIVEN COMPANY
 api.get('/persons/:company_id/customers', (req, res) => {
    model.Person.find({'company_id': req.params.company_id, 'role': 0}, (err, p) => {
      if (err) {
          res.status(500).send(err);
      } else {
        res.send(p);
      }
    });
 });

  api.post('/persons', bodyParser.json(), (req, res) => {
    const data = req.body;
    const p = new model.Person(req.body);
    if (data._id === undefined) {
      model.Person.create(p, function (err, doc) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          if (data.role === 1) {
            model.Company.findOne({'_id': data.company_id }, function(err1, doc1) {
                if (err1) {
                    console.log('error: post(/persons), err1:', err1);
                    res.status(500).send(err1);
                }
                else {
                    console.log("doc1:", doc1);
                    doc1.staff.push(doc);
                    doc1.save((err2, doc2) => {
                        if (err2) {
                            console.log("HER ER ERROR i api->post('/bookings/.findOne, err2:", err2);
                            res.status(500).send(err2);
                        }
                        else {
                            res.send(doc);
                        }
                    });
                }
            });  
          }
          else {
            res.send(doc);
          }
        }
      });
    }
    else {
      model.Person.update({ '_id': { $eq: data._id }}, { '$set': {
        'name':    data.name,
        'email':   data.email,
        'phone':   parseInt(data.phone),
        'address': data.address
      }}, (err, doc) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.send(doc);
        }
      });
    }
  });

  // FOR ADMIN IF WE ARE GOING TO USE THIS ONE, MAYBE WE NEVER WANT TO GET ALL BOOKINGS IN SYSTEM
  api.get('/bookings/', (req, res) => {
    model.Booking.find({}, function (err, docs) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(docs);
      }
    });
  });
  // GET ALL BOOKINGS BY ID FOR GIVEN COMPANY
  api.get('/bookings/:cid', (req, res) => {
      model.Booking.find({ company_id: req.params.cid }).sort('date').populate("bookings.staff_id bookings.customer_id").exec(function (err, docs) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(docs);
      }
    });
  });
  // GET BOOKING BY DATE AND ID BY GIVEN COMPANY
  api.get('/bookings/:date/:id', (req, res) => {
     model.Booking.find({ company_id: req.params.id, date: req.params.date}).populate('bookings.customer_id bookings.staff_id').exec(function (err, docs) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (docs.length === 0) {
                res.send([]);
            }
            else {
                let b = _.sortBy(docs[0].bookings, 'staff_id');
                b =     _.sortBy(b, 'startTime');
                res.send(b);
            }
        }
    });
  });
  
  // THARF EF TIL VILL AD IHUGA HVERNIG VERDUR HAEGT AD UPDATE BOKUN OG/EDA HAETTA VID BOKUN
  api.post('/bookings/', bodyParser.json(), (req, res) => {
    const data = req.body;
    // Create object for model.Book
    const currBook = {
        staff_id: data.staff_id,
        startTime: data.startTime,
        endTime: data.endTime,
        service: data.customer_service
    };
    // Athuga hvort nafn, simi persónu tilheyri vidkomandi company
    model.Person.findOne({
      "company_id": data.company_id,
      "name":       data.customer_name,
      "phone":      data.customer_phone
    }, function (err0, p) {
      if (err0) {
        res.status(500).send(err0);
      } else {
          if (p === null) {
            model.Person.create({
                company_id: data.company_id,
                name:       data.customer_name,
                phone:      data.customer_phone
            }, function (err1, p1) {
                if (err1) {
                    res.status(500).send(err1);
                } else {
                    currBook.customer_id = p1._id;
                    model.Booking.findOne( {"company_id": data.company_id, "date": data.date }, (err2, b) => {
                        if (err2) {
                            res.status(500).send(err2);
                        }
                        else {
                            const modelBook = new model.Book(currBook);
                            p1.history.push(modelBook);
                            p1.save((err3, data1) => {
                                if (err3) {
                                    res.status(500).send(err3);
                                }
                                else {
                                    if (b === null) {
                                        const b1 = new model.Booking({ 'company_id': data.company_id, 'date': data.date })
                                        b1.bookings.push(modelBook);
                                        b1.save((err4, data2) => {
                                            if (err4) {
                                                res.status(500).send(err4);
                                            }
                                            else {
                                                res.send(modelBook);
                                            }
                                        });
                                    }
                                    else {
                                        b.bookings.push(modelBook);
                                        b.save((err4, data2) => {
                                            if (err4) {
                                                res.status(500).send(err3);
                                            }
                                            else {
                                                res.send(modelBook);
                                            }
                                        });
                                    }  
                                }
                            });
                            
                        }
                    });
                }
            });
            }
            else {
                currBook.customer_id = p._id;
                model.Booking.findOne( {"company_id": data.company_id, "date": data.date }, (err2, b) => {
                        if (err2) {
                            res.status(500).send(err2);
                        }
                        else {
                            const modelBook = new model.Book(currBook);
                            p.history.push(modelBook);
                            p.save((err3, data1) => {
                                if (err3) {
                                    res.status(500).send(err3);
                                }
                                else {
                                    if (b === null) {
                                        const b1 = new model.Booking({ 'company_id': data.company_id, 'date': data.date })
                                        b1.bookings.push(modelBook);
                                        b1.save((err4, data2) => {
                                            if (err4) {
                                                res.status(500).send(err4);
                                            }
                                            else {
                                                res.send(modelBook);
                                            }
                                        });
                                    }
                                    else {
                                        b.bookings.push(modelBook);
                                        b.save((err4, data2) => {
                                            if (err4) {
                                                res.status(500).send(err3);
                                            }
                                            else {
                                                res.send(modelBook);
                                            }
                                        });
                                    }  
                                }
                            });
                            
                        }
                    });
            }
      }});
  });

  // REMOVE ALL BOOKINGS FOR THAT DAY WHO HAVE THIS ID->bid
  api.delete('/bookings/:bid', (req, res) => {
      model.Booking.findByIdAndRemove(req.params.bid, function (err, c) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(c);
        }
    });
  });
  /*
   * 
   */
  // GET ALL SERVICES IN Service COLLECTION ::: {{ ADMIN }}
  api.get('/services', (req, res) => {
    model.Service.find({}, function (err, docs) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(docs);
      }
    });
  });
  
  // GET ALL SERVICES FOR GIVEN COMPANY, active and inactive
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
    console.log("POST SERVICE req.body:", req.body);
    const s = new model.Service(req.body);
    s.save((err, doc) => {
       if (err) {
           
       } 
       else {
           
       }
    });
  });

  api.put('/services/pricelist/', bodyParser.json(), (req, res) => {
    var data = req.body;
    console.log("UPDATE PRICE data: ", data);
    model.Service.update({ 'company_id': { $eq: data.company_id }, 'pricelist._id': { $eq: data._id }}, {
      '$set': {
        'pricelist.$.name':       data.name,
        'pricelist.$.price':      data.price,
        'pricelist.$.timeLength': data.timeLength
      }}, (err, doc) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.send(doc);
      }
    });
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

  // De-activate specific service with price in services.pricelist //
  api.post('/services/pricelist/', bodyParser.json(), (req, res) => {
      var data = req.body;
      console.log("DATA", data);
      model.Service.update({ 
          'company_id': { $eq: data.service.cid }, 
          'pricelist._id': { $eq: data.service._id 
      }},
        { $set: { "pricelist.$.active": false } },
        { safe: true, upsert: true }, function (err, doc) {
          if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('HAS BEEN DE-ACTIVATED')
        }
    });
  });

  // REMOVE PERSON FROM COMPANY STAFF
  api.post('/companies/staff/', bodyParser.json(), (req, res) => {
      const data = req.body;
      model.Company.update({ '_id': data.cid },
        { $pull: { "staff": { _id: data.staff._id } } },
        { safe: true, upsert: true }, function (err, doc) {
          if (err) {
            res.status(500).send(err);
          }
          else {
            model.Person.update({ '_id': data.staff.person_id }, { $set: { 'role' : 0 }}, function(e, d) {
                if (e) {
                    res.status(500).send(err);
                }
                else {
                    res.send(d);
                }
            });
        }
    });
  });

  api.put('/companies/staff/', bodyParser.json(), (req, res) => {
      const data = req.body;
      console.log("DATA:", data);
      model.Company.update({
        '_id': { $eq: data.cid },
        'staff.person_id': { $eq: data.person_id }},
        { '$set': {
            'staff.$.name': data.name
        }}, (e, doc) => {
            if (e) {
                res.status(500).send(e);
            }
            else {
                model.Person.update({'company_id': { $eq: data.cid }, '_id': { $eq: data.person_id }},  {
                    '$set': {
                        'name' :  data.name,
                        'email':  data.email,
                        'phone' : parseInt(data.phone)
                    }}, (er, docc) => {
                        if (er) {
                            res.status(500).send(er);
                        }
                        else {
                            res.send(docc);
                        }
                    });
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

// FIND COMPANY BY AUTH_ID
  api.get('/companies/:id', (req, res) => {
    model.Company.find({ auth_id: req.params.id }).populate('staff').exec(function (err, c) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(c);
      }
    });
  });
  module.exports = api;
})();
