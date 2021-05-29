"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict'

var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
const Schema = _mongoose2.default.Schema
let teste = '1'

class routes {
  

  constructor(contra) {
    this.contra = contra
  }

  contrato(obj) {
    return this.contra = obj
  }
}

const main = (_contra) => {
  teste = _contra
  const Userdata = new Schema(
    {
      empresa: { type: String, required: false, },
      dias: { type: String, required: false, },
      taxaMes: { type: String, required: false, },
      vencimento: { type: String, required: false, },
      Parc: { type: String, required: false, },
      amortizacao: { type: String, required: false, },
      juros: { type: String, required: false, },
      prestacao: { type: String, required: false, },
      saldo: { type: String, required: false, },
      i: { type: Number, required: false, },
    },
    {
      timestamps: true
    }
  )

  return {
    Userdata: _mongoose2.default.model(teste, Userdata),
    routes: new routes(_contra)
  }
}

exports. default = main