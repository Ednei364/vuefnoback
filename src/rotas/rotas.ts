'use strict'

import  express from 'express'
const  router = express.Router()    
import   controleRota  from '../controle/controle-incluir'
import  cont_id from '../controle/rotas/controle-id'
import  cont_raiz from '../controle/rotas/controle-raiz'
//console.log(controleRota)
//incluir na raiz
router.post('/', controleRota.post);

//Pela raiz 
router.get('/', cont_raiz.get);
router.put('/', cont_raiz.put);
router.delete('/', cont_raiz.delete);

//pelo ID
router.get('/:id', cont_id.get);
router.put('/:id', cont_id.put);
router.delete('/:id', cont_id.delete);

export default router