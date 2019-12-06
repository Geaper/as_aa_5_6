'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    designation: {
        type: String,
        required: 'designation'
    },
    place: {
           type: String
    },
    capacity: {
        type: Number
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Event', eventSchema);