'use strict'

import Userdata from '../../modelos/schema-tabela1' // esquema do banco de dados
import func from '../../funcoes/funcAlterar'
import erro from '../../funcoes/erro'
import { deleteModel } from 'mongoose'
const funcAlterar = func.routes

class id {
  /* 
  Retorna todos os contrato com suas parcelas
  */
  public async get(req, res) {
    try {
      Userdata.findById(req.params.id, (error, userdata) => {
        if (error) {
          res.send(`Erro ao localizar Contrato..: ${error}`)
        }
        res.json(userdata)
      })
    }
    catch (err) {
      return res.status(500).send({ err: 'Erro ao buscar o contrato!!' })
    }
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

    let atualParc = req.body._id + 1
    let antParc = atualParc === 1 ? dados.datadocred : atualParc - 1

    /* INICIO - atualizando parcela atual. PARCELA ATUAL*/

    ass[atualParc].empresa = req.body.empresa
    ass[atualParc].vencimento = req.body.vencimento
    ass[atualParc].dias = await funcAlterar.quantDias(ass[antParc].vencimento, ass[atualParc].vencimento)
    ass[atualParc].taxaMes = await funcAlterar.taxacal(dados.modelTaxa, ass[atualParc].dias)
    ass[atualParc].amortizacao = req.body.amortizacao
    ass[atualParc].juros = await funcAlterar.juros(ass[antParc].saldo, ass[atualParc].taxaMes)// + req.body.ajuste
    ass[atualParc].i = req.body.i
    ass[atualParc].Parc = req.body.Parc
    ass[atualParc].saldo = req.body.saldo
    ass[atualParc].prestacao = await funcAlterar.somar(ass[atualParc].juros, ass[atualParc].amortizacao)
    /* FIM - atualizando parcela atual. PARCELA ATUAL*/

    for (let i = 2; i < ass.length - 1; i++) {
      /* INICIO - atualizando parcela atual. PARCELA ATUAL*/
      ass[i].dias = await funcAlterar.quantDias(ass[atualParc].vencimento, ass[i].vencimento)
      ass[i].taxaMes = await funcAlterar.taxacal(dados.modelTaxa, ass[i].dias)
      ass[i].juros = await funcAlterar.juros(ass[atualParc].saldo, ass[i].taxaMes)
      ass[i].prestacao = await funcAlterar.somar(ass[i].juros, ass[i].amortizacao)
      /* FIM - atualizando parcela atual. PARCELA ATUAL*/
      atualParc++

    }




    await Userdata.findOneAndUpdate({
      modelContrato: dados.modelContrato// req.body.contrato//// procuro este contrato
    }, {
      prestacoesContrato: ass
    })



    res.json('ass')


  }

  public async delete(req, res) {
    try {
      Userdata.findById(req.params.id, (error, userdata) => {
        if (error) {
          res.send(`Erro ao localizar Contrato..: ${error}`)
        }
        userdata.remove()
        res.status(200).send('Contrato excluiido com sucesso')
      })
    }
    catch (err) {
      return res.status(500).send({ err: 'Erro ao buscar o contrato para deletar!!' })
    }
  }
}

export default new id()