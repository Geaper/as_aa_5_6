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
    },
    inscricoes: [{ type: Schema.Types.ObjectId, ref: 'Inscricao' }]
}, {collection: 'EventsCollection'});
module.exports = mongoose.model('Event', eventSchema);