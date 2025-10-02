document.addEventListener('DOMContentLoaded', function () {

    
    const perguntasFAQ = document.querySelectorAll('.faq-question');


    function alternarResposta(event) {
        const perguntaClicada = event.currentTarget;

     
        perguntasFAQ.forEach(pergunta => {
            if (pergunta !== perguntaClicada) {
                pergunta.classList.remove('active');
                pergunta.nextElementSibling.classList.remove('show');
            }
        });

     
        perguntaClicada.classList.toggle('active');
        const resposta = perguntaClicada.nextElementSibling;
        resposta.classList.toggle('show');

        console.log("Pergunta clicada: ", perguntaClicada.textContent);
    }

  
    perguntasFAQ.forEach(pergunta => {
        pergunta.addEventListener('click', alternarResposta);
    });

});
