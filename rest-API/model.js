'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personaSchema = mongoose.Schema({
  _personaId: Schema.Types.ObjectId,
  company_id: {
      type: String,
      require: true,
      ref: 'Company'
  },
  name: {
    type:      String,
    require:   true,
    maxlength: 50,
    minlength: 2
  },
  address:   String,
  phone: {
      type: Number,
      require: true,
      minlength: 7,
      maxlength: 15
  },
  image_url: String,
  history: [{
    date: Date,
    text: String
  }],
  role: {
    type: Number,
    require: true
  }
});

personaSchema.index({ company_id: 1, name: 1, phone: 1 }, { unique: true });

const staffSchema = mongoose.Schema({
    _companyId: {
      type: String,
      ref: 'Company'  
    }, 
    _personaId: {
      type: Schema.Types.ObjectId,
      ref: 'Person'
    }
});

const companySchema = mongoose.Schema({
  auth_id: {
      type: String,
      require: true
  },
  name: {
    type:      String,
    require:   true,
    maxlength: 50,
    minlength: 1
  },
  phone:    Number,
  address:  [String],
  logo_url: String,
  staff: [{
    persona_id: String,
    role:       Number
  }]
});

const bookingsSchema = mongoose.Schema({
  company_id: {
      type:    String,
      require: true,
      ref: 'Company'
  },
  date: {
    type:    Date,
    require: true
  },
  bookings: [{
    persona_id: {
        type: Schema.Type.ObjectId,
        ref: 'Person'
    },
    staff_id: {
        type: Schema.Type.ObjectId,
        ref: 'Staff'
    },
    time:   Date
  }]
});

bookingsSchema.index({ company_id: 1, date: 1 }, { unique: true });

const serviceSchema = mongoose.Schema({
  company_id: String,
  pricelist: [{
    name: {
      type:    String,
      require: true
    },
    price: Number
  }]
});

module.exports = {
  Person:   mongoose.model('persons', personaSchema),
  Company:  mongoose.model('companies', companySchema),
  Booking:  mongoose.model('bookings', bookingsSchema),
  Staff:    mongoose.model('staffs', staffSchema),
  Service:  mongoose.model('services', serviceSchema)
};
