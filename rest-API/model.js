'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const bookSchema = Schema({
    customer_id: {
      type: Schema.Types.ObjectId,
      ref:  'Person'
    },
    staff_id: {
      type: Schema.Types.ObjectId,
      ref:  'Person'
    },
    startTime: Date,
    endTime: Date,
    service: [{
        service_id: {
            type:    Schema.Types.ObjectId,
            require: true,
            ref:     'Service'
        },
        name: String,
        price: Number
    }]
});

const personSchema = Schema({
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
  history: [bookSchema],
  comments: [String],
  // 0:Customer 1:Staff
  role: {
    type:    Number,
    require: true,
    default: 0
  }
});

personSchema.index({company_id: 1, name: 1, phone: 1}, {unique: true});

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
  staff: [personSchema]
});

const serviceSchema = Schema({
  company_id: {
    type:    Schema.Types.ObjectId,
    require: true,
    unique: false,
    ref:     'Company'
  },
  name: {
      type:    String,
      require: true,
  },
  price: Number,
  timeLength: { /* 900 === 15 min // 60 = 1 min */
      type: Number,
      default: 1800
  },
  active: {
      type: Boolean,
      default: true
  }
});

serviceSchema.index({ _id: 1 }, { unique: true });


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
  bookings: [bookSchema]
});

bookingsSchema.static('findIdOfBooking', function(b, cb) {
    return this.findOne({ 
        'company_id' : b.company_id, 
        'bookings.customer_id': b.customer_id, 
        'bookings.staff_id': b.staff_id,
        'bookings.startTime': b.startTime }, 'bookings._id', cb); 
});

bookingsSchema.index({company_id: 1, date: 1}, {unique: true});



// CAST string to ObjectId //
/*function ObjectId(id_string) {
    return mongoose.Types.ObjectId(id_string);
};*/

module.exports = {
  Person:  mongoose.model('Person',   personSchema),
  Company: mongoose.model('Company', companySchema),
  Book: mongoose.model('Book', bookSchema),
  Booking: mongoose.model('Booking',  bookingsSchema),
  Service: mongoose.model('Service',  serviceSchema)
  //ObjectId: ObjectId
};
