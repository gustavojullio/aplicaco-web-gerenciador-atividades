const atividades = require("../model/atividadeMongo.js");

exports.tela_principal = async function (req, res) {
  const atividadesLista = await atividades.lista();
  
  const atividadesRender = atividadesLista.map(atividade => {
    let prioridadeAlta = false;
    let prioridadeMedia = false;
    let prioridadeBaixa = false;

    if (atividade.prioridade === 'Alta') {
      prioridadeAlta = true;
    } else if (atividade.prioridade === 'Média') {
      prioridadeMedia = true;
    } else {
      prioridadeBaixa = true;
    }

    return {
      ...atividade,
      prioridadeAlta,
      prioridadeMedia,
      prioridadeBaixa
    };
  });

  const contexto = {
    titulo_pagina: "Aplicativo de Gestão de Atividades",
    atividades: atividadesRender,
  };

  res.render("index", contexto);
};


exports.sobre = async function(req, res){
  contexto = {
    titulo_pagina: "Sobre o Aplicativo",
  }
  res.render('sobre', contexto);
}
