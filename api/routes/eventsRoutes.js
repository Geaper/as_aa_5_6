'use strict';
module.exports = function (auth, app) {
    var event = require('../controllers/eventController');

    app.route('/eventos')
        .get(auth, event.getAllEvents) // Lista todos os eventos
        .post(auth, event.createEvent); // Insere a designação de um novo evento

    app.route('/:id_evento')
        .get(auth, event.getEventById); // Detalhes do evento :id_evento

    app.route('/:id_evento/inscritos')
        .get(auth, event.getInscritosByEventId) // Lista dos inscritos no evento :id_evento

    app.route('/:id_evento/:id')
        .put(auth, event.changeInscricaoByeventId); // Altera a designação de um inscrito
};