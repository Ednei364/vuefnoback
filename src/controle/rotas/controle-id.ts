'use strict'

import Userdata from '../../modelos/schema-tabela1' // esquema do banco de dados
import func from '../../funcoes/funcAlterar'
import erro from '../../funcoes/erro'
const funcAlterar = func.routes

class id {
  public async get(req, res) {
    Userdata.findById(req.params.id, (error, userdata) => {
      if (error) {
        res.send(`erro ao requisitar saldo ${error}`)
      }
      res.json(userdata)
      // console.log(userdata.prestacoesContrato[0])
    })
  }

  public async put(req, res) {
    let ass = []
    let dados;

    await Userdata.findById(req.body.id, (error, userdata) => {
      if (error) {
        res.send(`erro ao requisitar saldo ${error}`)
      }
      dados = userdata
      ass = userdata.prestacoesContrato// retorna meu array do banco e atribui nesta let
    })




    /* INICIO - atualizando parcela atual. PARCELA ATUAL*/
    ass[req.body.i - 2].empresa = req.body.empresa
    ass[req.body.i - 2].vencimento = req.body.vencimento
    ass[req.body.i - 2].dias = await funcAlterar.quantDias(ass[req.body.i - 3].vencimento, ass[req.body.i - 2].vencimento)
    ass[req.body.i - 2].taxaMes = await funcAlterar.taxacal(dados.modelTaxa, ass[req.body.i - 2].dias)
    ass[req.body.i - 2].amortizacao = req.body.amortizacao
    ass[req.body.i - 2].juros = await funcAlterar.juros(ass[req.body.i - 3].saldo, ass[req.body.i - 2].taxaMes)
    ass[req.body.i - 2].i = req.body.i
    ass[req.body.i - 2].Parc = req.body.Parc
    ass[req.body.i - 2].saldo = req.body.saldo
    ass[req.body.i - 2].prestacao = await funcAlterar.somar(ass[req.body.i - 2].juros, ass[req.body.i - 2].amortizacao)
    /* FIM - atualizando parcela atual. PARCELA ATUAL*/



    await Userdata.findOneAndUpdate({
      modelContrato: dados.modelContrato// req.body.contrato//// procuro este contrato
    }, {
      prestacoesContrato: ass// e nesta propriedade atualizo com o array que usei local
    }, (error, data) => {
      if (error) {
        console.log(error)
      } else {
        console.log(data)
      }
    })



    //   res.json(userdata)
    //   console.log(userdata.prestacoesContrato[0])
    // })


    //   // userdata = req.body não funciona..
    //   userdata.dias = req.body.dias
    //   userdata.i = req.body.i

    //   userdata.save(error => {
    //     if (error) {
    //       res.send(`erro ao salvar dados ${error}`)
    //     }

    res.json(ass[req.body.i - 2])
    //res.json(new Date((ass[req.body.i - 2].vencimento).replace(/([0-9]{2})-([0-9]{2})-([0-9]{4})/,'$3-$2-$1')).getTime())
    //res.json({ mensagem: 'dados  atualizados com sucesso ' })


  }

  public async delete(req, res) {





    //  Userdata.deleteOne({
    //    _id: req.body.id
    //    //obj.prestacoesContrato[0]._id: req.body.id
    //  },
    //    error => {
    //      if (error) {
    //        res.send('erro ao requisitar saldo ' + error)
    //      }

    //      res.json({ mensagem: 'dados  excluido com sucesso ' })
    //    })
  }
}

export default new id()