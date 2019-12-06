'use strict';
module.exports = function (app) {
    var autentCtrl =
        require('../controllers/autenticacaoController');

    // rotas definidas para a API Restful utilizadores
    
    // -- rota  /registar  métodos: GET
    app.route('/registar')
        .post(autentCtrl.registar_utilizador);

    // -- rota  /login    métodos: POST  params: :username :password
    app.route('/login') // autenticar
        .post(autentCtrl.autenticar_credencias);
       
};