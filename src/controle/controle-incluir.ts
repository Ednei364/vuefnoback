'use strict'

import Userdata from '../modelos/schema-tabela1'
import func from '../funcoes/func'
import erro from '../funcoes/erro'

const funca = func.routes

class controleRota {
  async post(req, res) {
    let requisicao = req.body
    const modelContrato = requisicao.contrato

    let result = await erro.verifica(requisicao)
    if (typeof (result) === 'string') return res.status(400).json({ message: 'Contrato não incluso: ' + result })
    if (await Userdata.findOne({ modelContrato })) return res.status(400).send({ message: ' Contrato já cadastrado anteriormente' })
    const contratos = await Userdata.find({})//retorna todos os contratos já lançados
    console.log(contratos.length)
    let schema_contrato = {
      _id: contratos.length === 0 ? 0 : contratos[contratos.length - 1]._id + 1,
      modelContrato: requisicao.contrato,
      modelEmpresa: requisicao.empresa,
      modelValorFinanciado: requisicao.valorFinanciado,
      modelBanco: requisicao.banco,
      modelModelo: requisicao.modelo,
      modelBase: requisicao.base,
      modelAmort: requisicao.amortizacao,
      modelJuros: requisicao.juros,
      modelTaxa: requisicao.taxa,
      modelDatadoCred: requisicao.datadocred,
      prestacoesContrato: []
    }

    requisicao.i = 1
    requisicao.NovaData = new Date(requisicao.datadocred)
    requisicao.dyas = requisicao.NovaData.getTime()
    requisicao.dyas2 = await requisicao.NovaData.setMonth(requisicao.NovaData.getMonth() + 1)

    await Userdata.create(schema_contrato)

    for (let i = 0; i < requisicao.quantParc; i++) {
      requisicao._id = i
      requisicao = await funca.diasDaUltimaParcela(requisicao)
      requisicao = await funca.taxaDoMesProporcional(requisicao)
      requisicao = await funca.DataDoPagamento(requisicao)
      requisicao = await funca.numeroDaParcela(requisicao)
      requisicao = await funca.amortcal(requisicao)
      requisicao = await funca.taxacal(requisicao)
      requisicao = await funca.prestcal(requisicao)
      requisicao = await funca.saldocal(requisicao)
      let arr = {}
      arr = requisicao
      await Userdata.findOneAndUpdate({
        modelContrato: requisicao.contrato
      }, {
        $push: {
          prestacoesContrato: arr
        }
      })
    }
    return res.status(200).json({
      message: 'Contrato incluso com sucesso'
    })
  }
}

export default new controleRota()

