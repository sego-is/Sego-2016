'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const personaSchema = Schema({
  company_id: {
    type:    Schema.Types.ObjectId,
    require: true,
    ref:     'Company'
  },
  name: {
    type: String,
    require:   true,
    maxlength: 50,
    minlength: 2
  },
  email:   String,
  address: String,
  phone: {
    type: Number,
    require:   true,
    minlength: 7,
    maxlength: 15
  },
  image_url: String,
  history: [{
    date: Date,
    text: String
  }],
  // 0:Customer 1:Staff
  role: {
    type:    Number,
    require: true,
    default: 0
  }
});

personaSchema.index({company_id: 1, name: 1, phone: 1}, {unique: true});
/*
 * Something Shitty that will never be used.. or whatever.
const staffSchema = Schema({
  _companyId: {
    type: String,
    ref:  'Company'
  },
  _personId: {
    type: Schema.Types.ObjectId,
    ref:  'Person'
  }
});
*/
const companySchema = Schema({
  auth_id: {
    type:    String,
    require: true,
    unique: true
  },
  name: {
    type:      String,
    require:   true,
    maxlength: 50,
    minlength: 1
  },
  phone: Number,
  address:  [String],
  logo_url: String,
  staff: [{
    person_id: {
      type: Schema.Types.ObjectId,
      ref:  "Person"
    },
    name: String
  }]
});

const bookingsSchema = Schema({
  company_id: {
    type:    String,
    require: true,
    ref:     'Company'
  },
  date: {
    type:    Date,
    require: true
  },
  bookings: [{
    person_id: {
      type: Schema.Types.ObjectId,
      ref:  'Person'
    },
    staff_id: {
      type: Schema.Types.ObjectId,
      ref:  'Person'
    },
    time: Date
  }]
});

bookingsSchema.index({company_id: 1, date: 1}, {unique: true});

const serviceSchema = Schema({
  company_id: String,
  pricelist: [{
    name: {
      type:    String,
      require: true
    },
    price: Number
  }]
});

serviceSchema.index({ company_id: 1, _id: 1 }, { unique: true });

module.exports = {
  Person:  mongoose.model('persons', personaSchema),
  Company: mongoose.model('companies', companySchema),
  Booking: mongoose.model('bookings', bookingsSchema),
  /* Staff:   mongoose.model('staffs', staffSchema), */
  Service: mongoose.model('services', serviceSchema),
  ObjectId: Schema.Types.ObjectId 
};
