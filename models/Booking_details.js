const { string, required } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Listing=require("./listing.js")
const User=require("./user.js")

const bookingSchema = new Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  listingId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true 
  },
   name:{
    type: String,
    required:true
   },
  startDate: { 
    type: Date,
    required: true 
  },
  endDate: { 
    type: Date,
    required: true 
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;