'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inscricaoSchema = new Schema({
    nome: {
        type: String,
        required: 'nome da pessoa a inscrever'
    },
    inscritoPor: { // registar o utilizador (autenticado) responsável pela inscrição 
           type: mongoose.Schema.Types.ObjectId,
            ref: 'Utilizador'
    },
    estado: {
        type: String,
        enum: ['pendente', 'confirmada', 'cancelada'],
        default: 'pendente'
    },
    Created_date: {
        type: Date,
        default: Date.now
    }
}, {collection: 'InscricoesCollection'}   );
module.exports = mongoose.model('Inscricao', inscricaoSchema);