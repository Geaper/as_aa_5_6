'use strict';
var mongoose = require('mongoose'),
Event = mongoose.model('Event');
let Insc = mongoose.model('Inscricao');

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

exports.getAllEvents = function (req, res) {
    getUtilizador(req, res, 
        (req, res, utilizadorId) => {   
            Event.find({}, function (err, evento) {
                if (err)
                    res.send(err);
                res.json(evento);
            });
        });
};

exports.getEventById = function (req, res) {
    getUtilizador(req, res, 
        (req, res, utilizadorId) => {   
            Event.findById(req.params.id_evento, function (err, evento) {
                if (err)
                    res.send(err);
                res.json(evento);
            });
        });
};

exports.getInscritosByEventId = function (req, res) {
    getUtilizador(req, res, 
        (req, res, utilizadorId) => {   
            Event.findById(req.params.id_evento, function (err, evento) {

                if (err)
                    res.send(err);

                let inscricoes = [];
                
                if(evento.inscricoes.length == 0) res.send(inscricoes);
                               
                for(let i = 0; i < evento.inscricoes.length; i++) {

                    Insc.findById(evento.inscricoes[i], function (err, inscricao) {
                        if (err)
                            res.send(err);
                        
                        inscricoes.push(inscricao);

                        if(i == evento.inscricoes.length - 1) res.send(inscricoes);
                    });
                }
            });
        });
};

exports.changeInscricaoByeventId = function (req, res) {
    getUtilizador(req, res, 
        (req, res, utilizadorId) => {   

            Event.findById(req.params.id_evento, function (err, evento) {
                if (err)
                    res.send(err);
                
                Insc.findById(req.params.id, function (err, inscricao) {
                    if (err)
                        res.send(err);

                        evento.inscricoes.push(inscricao);
                    
                        Event.findOneAndUpdate({ _id: req.params.id_evento},
                            evento, { new: true }, function (err, inscricao) {
                            if (err)
                                res.send(err);
                            res.json(evento);
                        });
                });
            });
        });
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
