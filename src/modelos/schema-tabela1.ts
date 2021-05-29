'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Userdatacopy = new Schema(
  {
    modelContrato: String,
    modelEmpresa: String,
    modelValorFinanciado: String,
    modelBanco: String,
    modelModelo: String,
    modelBase: String,
    modelAmort: String,
    modelJuros: String,
    modelTaxa: String,
    prestacoesContrato: [
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
    ]
  },
  {
    timestamps: true
  }
)

export default mongoose.model('teste', Userdatacopy)
