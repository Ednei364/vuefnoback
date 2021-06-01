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
        res.send(`Erro ao localizar Contrato..: ${error}`)
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
    let antParc = req.body.id
    let atualParc = req.body.id + 1
    let proxParc = req.body.id + 2


    /* INICIO - atualizando parcela atual. PARCELA ATUAL*/

    ass[atualParc].empresa = req.body.empresa
    ass[atualParc].vencimento = req.body.vencimento
    ass[atualParc].dias = funcAlterar.quantDias(ass[antParc].vencimento, ass[atualParc].vencimento)
    ass[atualParc].taxaMes = funcAlterar.taxacal(dados.modelTaxa, ass[atualParc].dias)
    ass[atualParc].amortizacao = req.body.amortizacao
    ass[atualParc].juros = await funcAlterar.juros(ass[antParc].saldo, ass[atualParc].taxaMes)+ req.body.ajuste
    ass[atualParc].i = req.body.i
    ass[atualParc].Parc = req.body.Parc
    ass[atualParc].saldo = req.body.saldo
    ass[atualParc].prestacao = await funcAlterar.somar(ass[atualParc].juros, ass[atualParc].amortizacao)
    /* FIM - atualizando parcela atual. PARCELA ATUAL*/
    /* INICIO - atualizando parcela atual. PARCELA ATUAL*/
    ass[proxParc].empresa = ass[proxParc].empresa
    ass[proxParc].vencimento = ass[proxParc].vencimento
    ass[proxParc].dias = funcAlterar.quantDias(ass[atualParc].vencimento, ass[proxParc].vencimento)
    ass[proxParc].taxaMes = funcAlterar.taxacal(dados.modelTaxa, ass[proxParc].dias)
    ass[proxParc].amortizacao = ass[proxParc].amortizacao
    ass[proxParc].juros = await funcAlterar.juros(ass[atualParc].saldo, ass[proxParc].taxaMes)
    ass[proxParc].i = ass[proxParc].i
    ass[proxParc].Parc = ass[proxParc].Parc
    ass[proxParc].saldo = ass[proxParc].saldo
    ass[proxParc].prestacao = await funcAlterar.somar(ass[proxParc].juros, ass[proxParc].amortizacao)
    /* FIM - atualizando parcela atual. PARCELA ATUAL*/



    await Userdata.findOneAndUpdate({
      modelContrato: dados.modelContrato// req.body.contrato//// procuro este contrato
    }, {
      prestacoesContrato: ass// e nesta propriedade atualizo com o array que usei local
    })



    res.json(ass[atualParc])


  }

  public async delete(req, res) {




  }
}

export default new id()