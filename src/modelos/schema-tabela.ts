'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema
let teste = '1'

class routes {
  contra

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
    Userdata: mongoose.model(teste, Userdata),
    routes: new routes(_contra)
  }
}

export default main