'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const personaSchema = mongoose.Schema({
  persona_id: String,
  name: {
    type: String,
    require: true,
    maxlength: 50,
    minlength: 3
  },
  address: String,
  phone: Number,
  image_url: String
});

const companySchema = mongoose.Schema({
  company_id: String,
  name: {
    type: String,
    require: true,
    maxlength: 50,
    minlength: 1
  },
  phone: Number,
  address: [String],
  logo_url: String,
  staff: [{
    persona_id: String,
    role: Number
  }]
});

const bookingsSchema = mongoose.Schema({
  company_id: String,
  date: {
    type: Date,
    require: true
  },
  bookings: [{
    customer_id: String,
    staff_id: String,
    time: Date
  }]
});

const customerSchema = mongoose.Schema({
  persona_id: String,
  company_id: String,
  history: [{
    String
  }]
});

const serviceSchema = mongoose.Schema({
  company_id: String,
  pricelist: [{
    name: {
      type: String,
      require: true
    },
    price: Number
  }]
});

module.exports = {
  Person: mongoose.model('persons', personaSchema),
  Company: mongoose.model('companies', companySchema),
  Booking: mongoose.model('bookings', bookingsSchema),
  Customer: mongoose.model('customers', customerSchema),
  Service: mongoose.model('services', serviceSchema)
};
