'use strict';
module.exports = function (auth, app) {
    var event = require('../controllers/eventController');

    app.route('/eventos')
        .get(event.getAllEvents)
        .post(auth, event.createEvent);
};