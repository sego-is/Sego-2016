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
    bookings_id: {
        _id: false,
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }
  }],
  comments: [String],
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
    type:    Schema.Types.ObjectId,
    require: true,
    ref:     'Company'
  },
  date: {
    type:    Date,
    require: true
  },
  bookings: [{
    customer_id: {
      type: Schema.Types.ObjectId,
      ref:  'Person'
    },
    staff_id: {
      type: Schema.Types.ObjectId,
      ref:  'Person'
    },
    startTime: Date,
    endTime: Date
  }]
});

bookingsSchema.index({company_id: 1, date: 1}, {unique: true});

const serviceSchema = Schema({
  company_id: {
    type:    Schema.Types.ObjectId,
    require: true,
    ref:     'Company'
  },
  pricelist: [{
    name: {
      type:    String,
      require: true,
      unique: true
    },
    price: Number
  }]
});

serviceSchema.index({ company_id: 1 }, { unique: true });

// CAST string to ObjectId //
function ObjectId(id_string) {
    return mongoose.Types.ObjectId(id_string);
};

module.exports = {
  Person:  mongoose.model('Person',   personaSchema),
  Company: mongoose.model('Company', companySchema),
  Booking: mongoose.model('Booking',  bookingsSchema),
  /* Staff:   mongoose.model('staffs', staffSchema), */
  Service: mongoose.model('Service',  serviceSchema),
  ObjectId: ObjectId
};
