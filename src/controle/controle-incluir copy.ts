'use strict'

import Userdata from '../modelos/schema-tabela' 
import func from '../funcoes/func'
import erro from '../funcoes/erro'
let teste = 'ij'
const funcc =Userdata
const funca =func.routes
//console.log(Userdata)

class controleRota {
  async post(req, res) {
    let requisicao = req.body

    const result_funcc = funcc(requisicao.empresa)
    let arr = {}
    let result = await erro.verifica(requisicao)

    if (typeof (result) === 'string') {
      return res.status(400).json({
        message: 'Contrato não incluso: ' + result
      })
    }
    else {
      requisicao.i = 1
      requisicao.NovaData = new Date(requisicao.datadocred)
      requisicao.dyas= requisicao.NovaData
      requisicao.dyas2= requisicao.NovaData.setMonth(requisicao.NovaData.getMonth() + 1)

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
          result_funcc.Userdata.create(arr[i])
      }

      return res.status(200).json({
          message: 'Contrato incluso com sucesso'
      })

    }
  }
}

export default {
  controleRota: new controleRota(),
  teste
}