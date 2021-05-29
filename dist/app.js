"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict'

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _rotas = require('./rotas/rotas'); var _rotas2 = _interopRequireDefault(_rotas); // todas as rotas sendo tratada

class App {
  

  constructor() {
    this.express = _express2.default.call(void 0, )

    this.middleWars()
    this.routes()
  }

   middleWars() {

    //resolve a parte de pegar os dados do back pelo local host
    this.express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
    const url = 'mongodb+srv://alinei:162014@clusterapi.9htbc.mongodb.net/test'
    const options = {
      //reconnecTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true, 
      useUnifiedTopology: true,
      useNewUrlParser: true
    }

    _mongoose2.default.connect(url, options)

    _mongoose2.default.Promise = global.Promise // era pra não retornar erro ao deletar algon no banco

    this.express.use(_bodyparser2.default.json()) // faz parte do bodyParser, esta na documentação
    this.express.use(_bodyparser2.default.urlencoded({ extended: false })) // faz parte do bodyParser, esta na documentação
  }

   routes() {
    this.express.use('/criando', _rotas2.default) // todas as rotas sendo tratada

  }
}

exports. default = new App().express