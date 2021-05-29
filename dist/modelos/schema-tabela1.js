"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict'

var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
const Schema = _mongoose2.default.Schema

const Userdatacopy = new Schema(
  {
    contrato: {
      dados: [{
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
      }]
    },

    // empresa: { type: String, required: false, },
    // dias: { type: String, required: false, },
    // taxaMes: { type: String, required: false, },
    // vencimento: { type: String, required: false, },
    // Parc: { type: String, required: false, },
    // amortizacao: { type: String, required: false, },
    // juros: { type: String, required: false, },
    // prestacao: { type: String, required: false, },
    // saldo: { type: String, required: false, },
    // i: { type: Number, required: false, },
  },
  {
    timestamps: true
  }
)




exports. default = _mongoose2.default.model('teste', Userdatacopy)
