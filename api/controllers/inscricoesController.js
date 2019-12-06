'use strict';
var mongoose = require('mongoose'),
    Insc = mongoose.model('Inscricao');

exports.lista_todas_inscricoes = function (req, res) {
    Insc.find({}, function (err, inscricao) {
        if (err)
            res.send(err);
        res.json(inscricao);
    });
};

// ---------------------------------
// nova versão do controller "nova_inscricao" registar o _id do utilizador 
// que está realizar a inscrição

const Utilizador = mongoose.model('Utilizador');
// função auxiliar para obter o _id do utilizador a partir do JWT enviado no pedido
const getUtilizador = (req, res, callback) => {
    if (req.payload && req.payload.username) { // validar que os dados do JWT estão no request
        Utilizador
            .findOne({ username: req.payload.username }) // procurar um utilizador pelo seu "username"
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
                // executar o "callback", indicando qual é o utilizador
                callback(req, res, utilizador._id); 
            });
    } else {
        return res
            .status(404)
            .json({ "message": "Utilizador não encontrado!"  });
    }
};

// especificação do controlador "nova_inscrição"
exports.nova_inscricao = function (req, res) {
   getUtilizador(req, res, 
        (req, res, utilizadorId) => {   
            const nomeInscrito = req.body.nome;
            if (!nomeInscrito) {
                         res 
                            .status(400) 
                            .json({"message": "todos os campos sao necessarios"}); 
            } else { 
                const novaInscricao = new Insc();
                novaInscricao.nome = nomeInscrito;
                novaInscricao.inscritoPor = utilizadorId;
                novaInscricao.save( (err, inscricao) => {
                    if (err)
                        res.send(err);
                     res
                       .status(200)
                        .json(inscricao);
                    });
            }
        });
    };

// ------------------------------------

exports.obtem_uma_inscricao = function (req, res) {
    Insc.findById(req.params.id, function (err, inscricao) {
        if (err)
            res.send(err);
        res.json(inscricao);
    });
};

exports.alterar_uma_inscricao = function (req, res) {
    Insc.findOneAndUpdate({ _id: req.params.id },
        req.body, { new: true }, function (err, inscricao) {
            if (err)
                res.send(err);
            res.json(inscricao);
        });
};

exports.eliminar_uma_inscricao = function (req, res) {
    Insc.remove({
        _id: req.params.id
    }, function (err, inscricao) {
        if (err)
            res.send(err);
        res.json({ message: 'inscricao eliminada' });
    });
};