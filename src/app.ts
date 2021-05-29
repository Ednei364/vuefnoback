'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import rotas from './rotas/rotas' // todas as rotas sendo tratada

class App {
  express: express.Application

  constructor() {
    this.express = express()

    this.middleWars()
    this.routes()
  }

  private middleWars() {

    //resolve a parte de pegar os dados do back pelo local host
    this.express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
    const url = 'mongodb+srv://alinei:162014@clusterapi.9htbc.mongodb.net/test'
    const options = {
      //reconnecTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true, 
      useUnifiedTopology: true,
      useNewUrlParser: true
    }

    mongoose.connect(url, options)

    mongoose.Promise = global.Promise // era pra não retornar erro ao deletar algon no banco

    this.express.use(bodyParser.json()) // faz parte do bodyParser, esta na documentação
    this.express.use(bodyParser.urlencoded({ extended: false })) // faz parte do bodyParser, esta na documentação
  }

  private routes() {
    this.express.use('/criando', rotas) // todas as rotas sendo tratada

  }
}

export default new App().express