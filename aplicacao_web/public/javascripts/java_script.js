document.getElementById("forms_atividade").addEventListener("submit", function(event) {
    var prioridadeSelecionada = document.getElementById("prioridade").value;
    
    if (prioridadeSelecionada === "") {
        event.preventDefault();
    }
});


