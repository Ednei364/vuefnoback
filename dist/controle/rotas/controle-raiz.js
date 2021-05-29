"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict'

var _schematabela = require('../../modelos/schema-tabela'); var _schematabela2 = _interopRequireDefault(_schematabela); // esquema do banco de dados
const funcc = _schematabela2.default

class raiza {
   async put(req, res) {
    let requisicao = req.body
    const result_funcc = funcc(requisicao.empresa)
    result_funcc.Userdata.find(function (error, userdata) {
      if (error) {
        res.send(`erro ao requisitar daddos ${error}`)
      }
      res.json(userdata)
    })
  }
}


exports. default = new raiza()
