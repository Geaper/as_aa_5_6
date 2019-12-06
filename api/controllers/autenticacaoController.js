'use strict';
const passport = require('passport');
const mongoose = require('mongoose');
const Utilizador = mongoose.model('Utilizador');


const registar_utilizador = (req, res) => {
    const todosParams = (req.body.username && req.body.nome  
                            && req.body.email && req.body.password);
                            console.log(req.body);
    if (!todosParams) { 
        return res 
                .status(400) 
                .json({"message": "todos os campos são necessários."}); 
    } 
    const utilizador = new Utilizador(); 
    utilizador.username = req.body.username;
    utilizador.nome = req.body.nome; 
    utilizador.email = req.body.email; 
    utilizador.dadosPassword = {hash:'', salt:''};
    utilizador.setDadosPassword(req.body.password);
    // console.log('utilizador: ', utilizador);
    utilizador.save((err) => {
        if (err) {
                 res
                    .status(404)  
                    .json(err);
        } else {
             const token = utilizador.gerarJwt(); 
             res 
                 .status(200) 
                 .json({token}); 
        }
     });
    };

// login
const autenticar_credencias = (req, res) => {
    const todosParams = (req.body.username && req.body.password)
    if (!todosParams) { 
            return res 
            .status(400) // 400 Bad reques  An unsuccessful GET, POST, or PUT request, due to invalid content
            .json({"message": "todos os campos sao necessarios"}); 
    } 
    passport.authenticate('local', (err, utilizador, info) => { 
        let token;
        if (err) { 
        return res
                .status(404)
                .json(err);
        }
        if (utilizador) {
                token = utilizador.gerarJwt(); 
                res
                 .status(200) 
                 .json({token}); 
        } else { 
             res 
                .status(401) 
                .json(info); 
        }
        })(req, res); 
};



module.exports = {
    registar_utilizador, autenticar_credencias
    };
