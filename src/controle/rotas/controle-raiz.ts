'use strict'

import Userdata from '../../modelos/schema-tabela1' // esquema do banco de dados
import func from '../../funcoes/func'
import erro from '../../funcoes/erro'
const funca = func.routes

class raiza {
  public async get(req, res) {
    try {
      const contratos = await Userdata.find({})
     // console.log((contratos[contratos.length].prestacoesContrato).length)//[0])
      return res.status(200).send({
        quantidades: contratos.length,
        contratos
      })
    }
    catch (err) {
      return res.status(500).send({ err: 'Erro ao buscar todos os contratos!!' })
    }

  }
  public async put(req, res) {
    let requisicao = {}
    let ass = []

    await Userdata.findById(req.body.id, (error, userdata) => {
      if (error) {
        res.send(`erro ao requisitar saldo ${error}`)
      }
      ass = userdata.prestacoesContrato
    })

    for (let i = req.body.i - 1; i < ass.length; i++) {
      await Userdata.findOneAndUpdate({
        modelContrato: req.body.contrato
      }, {
        $pull: { //deleta tudo
          prestacoesContrato: ass[i]
        }
      })
    }
    requisicao = ass[req.body.i - 1]
    console.log(requisicao)

    for (let i = req.body.i - 1; i < ass.length; i++) {
      // requisicao = await funca.diasDaUltimaParcela(requisicao)
      // requisicao = await funca.taxaDoMesProporcional(requisicao)
      // requisicao = await funca.DataDoPagamento(requisicao)
      // requisicao = await funca.numeroDaParcela(requisicao)
      // requisicao = await funca.amortcal(requisicao)
      // requisicao = await funca.taxacal(requisicao)
      // requisicao = await funca.prestcal(requisicao)
      // requisicao = await funca.saldocal(requisicao)
      let arr = {
        // _id: 60af0370a791ab0f30714a02,
        empresa: 'viseraaaaaaaaaaaaaaia',
        amortizacao: '98.6aaaaaaaaaaaaaaaaaaaaaaaaaaa43,22',
        juros: '1.94aaaaaaaaaaaaaaaaaaaaa6,25',
        i: 3,
        dias: '3aaaaaaaaaaaaaaaaaaa0',
        taxaMes: '0.002aaaaaaaaaaaaaa4662697723036864',
        vencimento: '20aaaaaaaaaaaaaaaaaa-07-2021',
        Parc: '2aaaaaaaaaaaaaaaaaaª',
        saldo: '690.5sssssss02,56',
        prestacao: '10sssssssssssss0.589,47'
      }

      // arr = requisicao

      await Userdata.findOneAndUpdate({
        modelContrato: req.body.contrato
      }, {
        $push: { //push tudo
          prestacoesContrato: arr
        }
      })
    }

















    res.json('contratos')

  }

}

export default new raiza()