'use strict';
module.exports = function (auth, app) {
    var insc =
        require('../controllers/inscricoesController');

    // rotas definidas para a API Restful inscricoes
    
    // -- rota  /inscricoes    métodos: GET, POST
    app.route('/inscricoes')
        .get(insc.lista_todas_inscricoes)
        .post(auth, insc.nova_inscricao);

    // -- rota  /inscricoes/:id    métodos: GET,PUT,DELETE  params: :id
    app.route('/inscricoes/:id')
        .get(insc.obtem_uma_inscricao)
        .put(insc.alterar_uma_inscricao)
        .delete(insc.eliminar_uma_inscricao);
};