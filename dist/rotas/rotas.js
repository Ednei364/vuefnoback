"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict'

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
const  router = _express2.default.Router()    
var _controleincluir = require('../controle/controle-incluir'); var _controleincluir2 = _interopRequireDefault(_controleincluir);
var _controleid = require('../controle/rotas/controle-id'); var _controleid2 = _interopRequireDefault(_controleid);
var _controleraiz = require('../controle/rotas/controle-raiz'); var _controleraiz2 = _interopRequireDefault(_controleraiz);
//console.log(controleRota)
//incluir na raiz
router.post('/', _controleincluir2.default.controleRota.post);

//Pela raiz 
router.put('/', _controleraiz2.default.put);

//pelo ID
router.get('/:id', _controleid2.default.get);
router.put('/:id', _controleid2.default.put);
router.delete('/:id', _controleid2.default.delete);


exports. default = router