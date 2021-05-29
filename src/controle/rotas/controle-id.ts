'use strict'

import Userdata from '../../modelos/schema-tabela1' // esquema do banco de dados
import func from '../../funcoes/funcAlterar'
import erro from '../../funcoes/erro'
const funcAlterar = func.routes

class id {
  /* 
  Retorna todos os contrato com suas parcelas
  */
  public async get(req, res) {
    Userdata.findById(req.params.id, (error, userdata) => {
      if (error) {
        res.send(`erro ao requisitar saldo ${error}`)
      }
      res.json(userdata)
    })
  }
  /* 
  Altera a parcela atual e a proxima parcela apenas
  */  
  public async put(req, res) {
    let ass = []
    let dados;
    /*  Retorna o contrato pelo id*/
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
    ass[req.body.i - 2].dias = funcAlterar.quantDias(ass[req.body.i - 3].vencimento, ass[req.body.i - 2].vencimento)
    ass[req.body.i - 2].taxaMes = funcAlterar.taxacal(dados.modelTaxa, ass[req.body.i - 2].dias)
    ass[req.body.i - 2].amortizacao = req.body.amortizacao
    ass[req.body.i - 2].juros = await funcAlterar.juros(ass[req.body.i - 3].saldo, ass[req.body.i - 2].taxaMes)
    ass[req.body.i - 2].i = req.body.i
    ass[req.body.i - 2].Parc = req.body.Parc
    ass[req.body.i - 2].saldo = req.body.saldo
    ass[req.body.i - 2].prestacao = await funcAlterar.somar(ass[req.body.i - 2].juros, ass[req.body.i - 2].amortizacao)
    /* FIM - atualizando parcela atual. PARCELA ATUAL*/
    /* INICIO - atualizando parcela atual. PARCELA ATUAL*/
    ass[req.body.i - 1].empresa = ass[req.body.i - 1].empresa
    ass[req.body.i - 1].vencimento = ass[req.body.i - 1].vencimento
    ass[req.body.i - 1].dias = funcAlterar.quantDias(ass[req.body.i - 2].vencimento, ass[req.body.i - 1].vencimento)
    ass[req.body.i - 1].taxaMes = funcAlterar.taxacal(dados.modelTaxa, ass[req.body.i - 1].dias)
    ass[req.body.i - 1].amortizacao = ass[req.body.i - 1].amortizacao
    ass[req.body.i - 1].juros = await funcAlterar.juros(ass[req.body.i - 2].saldo, ass[req.body.i - 1].taxaMes)
    ass[req.body.i - 1].i = ass[req.body.i - 1].i
    ass[req.body.i - 1].Parc = ass[req.body.i - 1].Parc
    ass[req.body.i - 1].saldo = ass[req.body.i - 1].saldo
    ass[req.body.i - 1].prestacao = await funcAlterar.somar(ass[req.body.i - 1].juros, ass[req.body.i - 1].amortizacao)
    /* FIM - atualizando parcela atual. PARCELA ATUAL*/



    await Userdata.findOneAndUpdate({
      modelContrato: dados.modelContrato// req.body.contrato//// procuro este contrato
    }, {
      prestacoesContrato: ass// e nesta propriedade atualizo com o array que usei local
    })



    res.json(ass[req.body.i - 2])


  }

  public async delete(req, res) {




  }
}

export default new id()