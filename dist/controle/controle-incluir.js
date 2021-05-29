"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict'

var _schematabela1 = require('../modelos/schema-tabela1'); var _schematabela12 = _interopRequireDefault(_schematabela1);
var _func = require('../funcoes/func'); var _func2 = _interopRequireDefault(_func);
var _erro = require('../funcoes/erro'); var _erro2 = _interopRequireDefault(_erro);

//const funcc =Userdata
const funca = _func2.default.routes
console.log(_schematabela12.default)

class controleRota {
  async post(req, res) {
    let requisicao = req.body

    //const result_funcc = funcc(requisicao.empresa)
    let arr = {}
    let result = await _erro2.default.verifica(requisicao)

    if (typeof (result) === 'string') {
      return res.status(400).json({
        message: 'Contrato não incluso: ' + result
      })
    }
    else {
      requisicao.i = 1
      requisicao.NovaData = new Date(requisicao.datadocred)
      requisicao.dyas = requisicao.NovaData
      requisicao.dyas2 = requisicao.NovaData.setMonth(requisicao.NovaData.getMonth() + 1)

      for (let i = 0; i < requisicao.quantParc; i++) {
        requisicao = await funca.diasDaUltimaParcela(requisicao)
        requisicao = await funca.taxaDoMesProporcional(requisicao)
        requisicao = await funca.DataDoPagamento(requisicao)
        requisicao = await funca.numeroDaParcela(requisicao)
        requisicao = await funca.amortcal(requisicao)
        requisicao = await funca.taxacal(requisicao)
        requisicao = await funca.prestcal(requisicao)
        requisicao = await funca.saldocal(requisicao)
        arr[i] = requisicao
        //result_funcc.Userdata.create(arr[i])
        _schematabela12.default.create(arr[i])
      }

      return res.status(200).json({
        message: 'Contrato incluso com sucesso'
      })

    }
  }
}

exports. default = new controleRota()

