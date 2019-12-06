const express = require('express'),
aplicacao = express(),
porta = process.env.PORT || 5000,
bodyParser = require('body-parser');
const path = require('path');

let BD =  require('./api/config/configBDMongo');
let InscricaoModel =  require('./api/models/InscricoesModel');
let UtilizadorModel =  require('./api/models/UtilizadoresModel');

const passport = require('passport'); 
require('./api/config/configPassport');

aplicacao.use(bodyParser.urlencoded({ extended:true }));
aplicacao.use(bodyParser.json());

aplicacao.use(passport.initialize());

aplicacao.use(express.static(path.join(__dirname, 'public')));
aplicacao.set('views', path.join(__dirname, 'public'));
aplicacao.engine('html', require('ejs').renderFile);
aplicacao.set('view engine', 'html');

const jwt = require('express-jwt'); 
const autenticacao = jwt({
      secret: 'esteEoSegredo',
      userProperty: 'payload'
      });

// error handlers
//    Catch unauthorised errors
aplicacao.use((err, req, res, next) => {
      if (err.name === 'UnauthorizedError') { 
      res
       .status(401) 
       .json({"message" : err.name + ": " + err.message});
      }
});

aplicacao.use('/', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
      res.header('Access-Control-Allow-Headers', 
                 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      next();
});

// importar rotas
var routesInsc =  require('./api/routes/inscricoesRoutes'); 
var routesAut =   require('./api/routes/autenticacaoRoutes'); 

// registar as rotas
routesAut(aplicacao);
routesInsc(autenticacao, aplicacao);  

aplicacao.listen(porta);

console.log('Inscrições RESTful API a executar em:' + porta);
