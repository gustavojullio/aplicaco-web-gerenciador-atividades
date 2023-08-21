const atividades = require('../model/atividadeMongo.js')


exports.cria_get = async function (req, res) {
    contexto = {
        titulo_pagina: "Criação de Atividade",
    }
    res.render('criaAtividade', contexto);
}


exports.cria_post = async function (req, res) {
    var data = new Date().toLocaleDateString('pt-BR');


    var atividade = {
        prioridade: req.body.prioridade,
        titulo: req.body.titulo,
        texto: req.body.texto,
        data: data,
        executada: req.body.status === 'on' ? true : false
    };
    
    await atividades.cria(atividade);

    res.redirect('/');
}


exports.consulta = async function (req, res) {

    var _id = req.params.chave_atividade
    var atividade = await atividades.consulta(_id);

    contexto = {
        titulo_pagina:"Consulta a Atividade",
        atividade: atividade
    }
    res.render('consultaAtividade', contexto);
}

exports.altera_get = async function (req, res) {

    var _id = req.params.chave_atividade

    var atividade = await atividades.consulta(_id);

    var prioridadeAlta = false; 
    var prioridadeMedia = false; 
    var prioridadeBaixa = false;

    if(atividade.prioridade =="Alta"){
        prioridadeAlta = true;
    }
    if(atividade.prioridade =="Média"){
        prioridadeMedia = true;
    }
    if(atividade.prioridade =="Baixa"){
        prioridadeBaixa = true;
    }

    contexto = {
        titulo_pagina: "Altera a Atividade",
        atividade: atividade, 
        prioridadeAlta: prioridadeAlta,
        prioridadeMedia: prioridadeMedia,
        prioridadeBaixa: prioridadeBaixa,
    }
    res.render('alteraAtividade', contexto);
    
}

exports.altera_post = async function (req, res) {
    var atividade = req.body
    
    if (req.body.status === 'on'){
        atividade.executada = true
        delete atividade.status 
    }
    else
        atividade.executada = false

    await atividades.atualiza(atividade);

    res.redirect('/');
}


exports.deleta = async function (req, res) {
    var _id = req.params.chave_atividade

    await atividades.deleta(_id);

    res.redirect('/');
}


exports.executada = async function (req, res) {
    var _id = req.params.chave_atividade

    var atividade = await atividades.consulta(_id)

    atividade.executada = true

    res.redirect('/')

    await atividades.atualiza(atividade)
}

exports.naoexecutada = async function (req, res) {
    var _id = req.params.chave_atividade

    var atividade = await atividades.consulta(_id)

    atividade.executada = false

    await atividades.atualiza(atividade)

    res.redirect('/')
}


exports.alteraPrioridade = async function(req, res) {
    var _id = req.params.chave_atividade

    var prioridadeAtual = req.params.prioridade;
    
    var atividade = await atividades.consulta(_id);

    var novaPrioridade;

    if (prioridadeAtual === 'Alta') {
      novaPrioridade = 'Média';
    } else if (prioridadeAtual === 'Média') {
      novaPrioridade = 'Baixa';
    } else {
      novaPrioridade = 'Alta';
    }

    atividade.prioridade = novaPrioridade;

    await atividades.atualiza(atividade);
  
    res.redirect('/');
  }
  

