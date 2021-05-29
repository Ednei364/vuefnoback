"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict'

var _schematabela = require('../../modelos/schema-tabela'); var _schematabela2 = _interopRequireDefault(_schematabela); // esquema do banco de dados
const funcc = _schematabela2.default
class id {
   async get(req, res) {
    let result_funcc = funcc(req.body.empresa)
    result_funcc.Userdata.findById(req.params.id, (error, userdata) => {
      if (error) {
        res.send(`erro ao requisitar saldo ${error}`)
      }

      res.json(userdata)
    })
  }

   async put(req, res) {
    let result_funcc = funcc(req.body.empresa)
    console.log(result_funcc.Userdata)

    result_funcc.Userdata.findById(req.params.id, (error, userdata) => {
      if (error) {
        res.send(`erro ao requisitar saldo ${error}`)
      }
      // userdata = req.body não funciona..
      userdata.dias = req.body.dias
      userdata.i = req.body.i

      userdata.save(error => {
        if (error) {
          res.send(`erro ao salvar dados ${error}`)
        }

        res.json({ mensagem: 'dados  atualizados com sucesso ' })
      })
    })
  }

   async delete(req, res) {
    let result_funcc = funcc(req.body.empresa)
    result_funcc.Userdata.remove({
      _id: req.params.id
    },
      error => {
        if (error) {
          res.send('erro ao requisitar saldo ' + error)
        }

        res.json({ mensagem: 'dados  excluido com sucesso ' })
      })
  }
}

exports. default = new id()