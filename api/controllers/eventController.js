'use strict';
var mongoose = require('mongoose'),
Event = mongoose.model('Event');

exports.getAllEvents = function (req, res) {
    Evento.find({}, function (err, evento) {
        if (err)
            res.send(err);
        res.json(evento);
    });
};

const Utilizador = mongoose.model('Utilizador');
const getUtilizador = (req, res, callback) => {
    if (req.payload && req.payload.username) { 
        Utilizador
            .findOne({ username: req.payload.username }) 
            .exec((err, utilizador) => {
                if (!utilizador) {
                    return res
                        .status(404)
                        .json({ "message": "Utilizador não encontrado!" });
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }               
                callback(req, res, utilizador._id); 
            });
    } else {
        return res
            .status(404)
            .json({ "message": "Utilizador não encontrado!"  });
    }
};

// POST /eventos
exports.createEvent = function (req, res) {
   getUtilizador(req, res, 
        (req, res, utilizadorId) => {   
            const allFields = req.body.designation && req.body.place && req.body.capacity;
            if (!allFields) {
                         res.status(400).json({"message": "todos os campos sao necessarios"}); 
            } else { 
                const newEvent = new Event();
                newEvent.designation = req.body.designation;
                newEvent.place = req.body.place;
                newEvent.capacity = req.body.capacity;
                
                newEvent.save( (err, event) => {
                    if (err)
                        res.send(err);
                     res
                       .status(200)
                        .json(event);
                });
            }
        });
    };
