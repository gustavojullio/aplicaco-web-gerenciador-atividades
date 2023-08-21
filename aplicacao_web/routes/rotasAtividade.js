var express = require('express');
var router = express.Router();
var controllerAtividade = require('../controller/controllerAtividade.js')

router.get('/alteraPrioridade/:chave_atividade/:prioridade', controllerAtividade.alteraPrioridade);

router.get('/executada/:chave_atividade', controllerAtividade.executada);

router.get('/naoexecutada/:chave_atividade', controllerAtividade.naoexecutada);

router.get('/consulta/:chave_atividade', controllerAtividade.consulta);

router.get('/altera/:chave_atividade', controllerAtividade.altera_get);

router.post('/altera/:chave_atividade', controllerAtividade.altera_post);

router.get('/deleta/:chave_atividade', controllerAtividade.deleta);

router.get('/cria', controllerAtividade.cria_get);

router.post('/cria', controllerAtividade.cria_post);

module.exports = router;