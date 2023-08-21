var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex.js')
router.get('/', controllerIndex.tela_principal);
router.get('/sobre', controllerIndex.sobre);
module.exports = router;