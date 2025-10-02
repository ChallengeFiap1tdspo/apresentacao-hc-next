// ajuda.js - JavaScript para a Página de Ajuda

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    inicializarAcessibilidade();
    inicializarGuiaInterativo();
    inicializarAssistenteVirtual();
    inicializarSolucionadorProblemas();
    inicializarRecursosMultimidia();
    inicializarControlesContato();
    inicializarEfeitosVisuais();
});

// ===== SISTEMA DE ACESSIBILIDADE =====
function inicializarAcessibilidade() {
    // Controle de tamanho da fonte
    const btnFonteMaior = document.getElementById('btnFonteMaior');
    const btnAltoContraste = document.getElementById('btnAltoContraste');
    const btnLeitorTela = document.getElementById('btnLeitorTela');

    if (btnFonteMaior) {
        btnFonteMaior.addEventListener('click', aumentarFonte);
    }

    if (btnAltoContraste) {
        btnAltoContraste.addEventListener('click', alternarAltoContraste);
    }

    if (btnLeitorTela) {
        btnLeitorTela.addEventListener('click', ativarLeitorTela);
    }
}

function aumentarFonte() {
    const body = document.body;
    const tamanhoAtual = parseInt(getComputedStyle(body).fontSize);
    
    if (tamanhoAtual < 22) {
        body.style.fontSize = (tamanhoAtual + 2) + 'px';
        
        // Feedback visual
        this.style.background = '#28a745';
        setTimeout(() => {
            this.style.background = '';
        }, 1000);
    } else {
        // Feedback quando atingir o limite
        this.style.background = '#dc3545';
        setTimeout(() => {
            this.style.background = '';
        }, 1000);
    }
}

function alternarAltoContraste() {
    document.body.classList.toggle('alto-contraste');
    
    // Feedback visual
    const btn = document.getElementById('btnAltoContraste');
    if (document.body.classList.contains('alto-contraste')) {
        btn.style.background = '#ffc107';
        btn.style.color = '#000';
    } else {
        btn.style.background = '';
        btn.style.color = '';
    }
}

function ativarLeitorTela() {
    // Simulação de leitor de tela
    const textoPrincipal = document.querySelector('.hero-conteudo h1').textContent + '. ' +
                          document.querySelector('.hero-descricao').textContent;
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textoPrincipal);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
        
        // Feedback visual
        const btn = document.getElementById('btnLeitorTela');
        btn.style.background = '#dc3545';
        setTimeout(() => {
            btn.style.background = '';
        }, 2000);
    } else {
        alert('Seu navegador não suporta leitura de tela. Recomendamos usar Chrome ou Edge.');
    }
}

// ===== GUIA INTERATIVO PASSO A PASSO =====
function inicializarGuiaInterativo() {
    const btnAnterior = document.getElementById('btnAnterior');
    const btnProximo = document.getElementById('btnProximo');
    const passoAtualElement = document.getElementById('passoAtual');
    const passos = document.querySelectorAll('.passo-guia');
    let passoAtual = 1;
    const totalPassos = passos.length;

    // Acesso rápido pelos cards
    const cardsAcesso = document.querySelectorAll('.card-acesso');
    cardsAcesso.forEach(card => {
        card.addEventListener('click', function() {
            const passoAlvo = this.getAttribute('data-passo');
            if (passoAlvo) {
                irParaPasso(parseInt(passoAlvo));
            }
            
            const problema = this.getAttribute('data-problema');
            if (problema) {
                // Se for um problema, abrir o modal correspondente
                const botaoSolucao = document.querySelector(`.card-problema[data-problema="${problema}"] .btn-solucao`);
                if (botaoSolucao) {
                    botaoSolucao.click();
                }
            }
        });
    });

    // Navegação principal
    if (btnAnterior && btnProximo) {
        btnAnterior.addEventListener('click', function() {
            if (passoAtual > 1) {
                irParaPasso(passoAtual - 1);
            }
        });

        btnProximo.addEventListener('click', function() {
            if (passoAtual < totalPassos) {
                irParaPasso(passoAtual + 1);
            }
        });
    }

    function irParaPasso(numeroPasso) {
        // Esconder todos os passos
        passos.forEach(passo => {
            passo.classList.remove('ativo');
        });
        
        // Mostrar novo passo
        const passoAlvo = document.querySelector(`.passo-guia[data-passo="${numeroPasso}"]`);
        if (passoAlvo) {
            passoAlvo.classList.add('ativo');
            
            // Atualizar contador
            passoAtual = numeroPasso;
            if (passoAtualElement) {
                passoAtualElement.textContent = passoAtual;
            }
            
            // Atualizar estado dos botões
            if (btnAnterior && btnProximo) {
                btnAnterior.disabled = passoAtual === 1;
                btnProximo.disabled = passoAtual === totalPassos;
            }
            
            // Rolar para o topo do passo
            passoAlvo.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }

    // Inicializar primeiro passo
    irParaPasso(1);
}

// ===== ASSISTENTE VIRTUAL =====
function inicializarAssistenteVirtual() {
    const assistente = document.getElementById('assistenteVirtual');
    const bolhaChat = document.getElementById('bolhaChat');

    if (assistente && bolhaChat) {
        assistente.addEventListener('click', function() {
            // Alternar entre mensagens
            const mensagens = [
                "Olá! Posso ajudar com a teleconsulta?",
                "Precisa de ajuda com login?",
                "Problemas com áudio ou vídeo?",
                "Clique em qualquer card para ajuda rápida!",
                "Use o guia passo a passo acima 👆"
            ];
            
            const mensagemAtual = bolhaChat.querySelector('p').textContent;
            let proximaMensagem = mensagens[0];
            
            // Encontrar próxima mensagem
            const indexAtual = mensagens.indexOf(mensagemAtual);
            if (indexAtual !== -1 && indexAtual < mensagens.length - 1) {
                proximaMensagem = mensagens[indexAtual + 1];
            } else {
                // Voltar para a primeira mensagem
                proximaMensagem = mensagens[0];
            }
            
            bolhaChat.querySelector('p').textContent = proximaMensagem;
            
            // Animação de feedback
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    }
}

// ===== SOLUCIONADOR DE PROBLEMAS =====
let streamCamera = null;
let faceDetector = null;
let detectionInterval = null;
let verificationInterval = null;
let detectionAttempts = 0;
const MAX_DETECTION_ATTEMPTS = 50;

function inicializarSolucionadorProblemas() {
    const botoesSolucao = document.querySelectorAll('.btn-solucao');
    const modal = document.getElementById('modalSolucao');
    const fecharModal = document.querySelector('.fechar-modal');

    // Abrir modal com solução
    botoesSolucao.forEach(botao => {
        botao.addEventListener('click', function() {
            const problema = this.closest('.card-problema').getAttribute('data-problema');
            const solucao = solucoes[problema];
            
            if (solucao) {
                abrirModalSolucao(solucao);
            }
        });
    });

    // Fechar modal
    if (fecharModal) {
        fecharModal.addEventListener('click', function() {
            fecharModalSolucao();
        });
    }

    // Fechar modal clicando fora
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                fecharModalSolucao();
            }
        });
    }
}

// Soluções pré-definidas
const solucoes = {
    login: {
        titulo: "Não consigo fazer login",
        solucao: `
            <div class="solucao-detalhada">
                <h4>Soluções possíveis:</h4>
                <ol>
                    <li><strong>Verifique seu CPF:</strong> Digite apenas números, sem pontos ou traços</li>
                    <li><strong>Esqueci a senha:</strong> Clique em "Recuperar Senha" na tela de login</li>
                    <li><strong>Primeiro acesso:</strong> Você precisa se cadastrar antes do primeiro uso</li>
                    <li><strong>Bloqueio temporário:</strong> Após 3 tentativas, aguarde 30 minutos</li>
                </ol>
                <div class="contato-urgente">
                    <p><strong>Precisa de ajuda urgente?</strong></p>
                    <button class="btn-contato telefone">
                        <i class="fas fa-phone"></i> Ligar para Suporte
                    </button>
                </div>
            </div>
        `
    },
    audio: {
        titulo: "Não escuto o médico",
        solucao: `
            <div class="solucao-detalhada">
                <h4>Verifique passo a passo:</h4>
                <ol>
                    <li><strong>Volume do dispositivo:</strong> Aumente o volume do seu computador/celular</li>
                    <li><strong>Permissões do navegador:</strong> Permita o uso do microfone quando solicitado</li>
                    <li><strong>Fones de ouvido:</strong> Conecte fones para melhor qualidade</li>
                    <li><strong>Teste de áudio:</strong> Use nosso teste abaixo para verificar</li>
                </ol>
                <div class="teste-audio">
                    <button class="btn-teste" onclick="iniciarTesteAudio()">
                        <i class="fas fa-volume-up"></i> Testar Meu Áudio
                    </button>
                    <div id="statusAudio" class="status-teste"></div>
                </div>
            </div>
        `
    },
    video: {
        titulo: "Câmera não funciona",
        solucao: `
            <div class="solucao-detalhada">
                <h4>Soluções para problemas de câmera:</h4>
                <ol>
                    <li><strong>Permissões:</strong> Permita o acesso à câmera no seu navegador</li>
                    <li><strong>Outros programas:</strong> Feche outros apps que usam câmera (Zoom, Teams)</li>
                    <li><strong>Reiniciar navegador:</strong> Às vezes um simples reinício resolve</li>
                    <li><strong>Navegador alternativo:</strong> Tente usar Chrome ou Firefox</li>
                </ol>
                
                <div class="instrucoes-teste">
                    <h5>📋 Como fazer o teste corretamente:</h5>
                    <ol>
                        <li>Sente-se em um local bem iluminado</li>
                        <li>Posicione seu rosto no centro da imagem</li>
                        <li>Remova qualquer objeto da frente da câmera</li>
                        <li>Mantenha uma distância de 50-100cm da câmera</li>
                    </ol>
                </div>
                
                <div class="teste-camera">
                    <button class="btn-teste" onclick="iniciarTesteCamera()">
                        <i class="fas fa-camera"></i> Iniciar Teste de Câmera
                    </button>
                    <div id="videoContainer" class="video-container-teste"></div>
                    <div id="statusCamera" class="status-teste"></div>
                    <div id="controlesManuais" class="controles-manuais" style="display: none;">
                        <div class="pergunta-verificacao">
                            <p>✅ <strong>Verificação Manual</strong></p>
                            <p>Você consegue se ver na imagem acima?</p>
                            <div class="botoes-verificacao">
                                <button class="btn-confirmar" onclick="confirmarCameraFuncionando()">
                                    <i class="fas fa-check"></i> Sim, estou vendo minha imagem
                                </button>
                                <button class="btn-negar" onclick="negarCameraFuncionando()">
                                    <i class="fas fa-times"></i> Não, não consigo me ver
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    conexao: {
        titulo: "Problemas de conexão",
        solucao: `
            <div class="solucao-detalhada">
                <h4>Melhore sua conexão:</h4>
                <ol>
                    <li><strong>Wi-Fi vs Dados:</strong> Use Wi-Fi sempre que possível</li>
                    <li><strong>Posicionamento:</strong> Fique mais perto do roteador</li>
                    <li><strong>Dispositivos:</strong> Desconecte outros dispositivos da rede</li>
                    <li><strong>Reinício:</strong> Reinicie o roteador e modem</li>
                </ol>
                <div class="dica-importante">
                    <i class="fas fa-lightbulb"></i>
                    <strong>Velocidade mínima recomendada:</strong> 5 Mbps para vídeo
                </div>
            </div>
        `
    }
};

function abrirModalSolucao(solucao) {
    const modal = document.getElementById('modalSolucao');
    const tituloProblema = document.getElementById('tituloProblema');
    const corpoSolucao = document.getElementById('corpoSolucao');
    
    if (modal && tituloProblema && corpoSolucao) {
        tituloProblema.textContent = solucao.titulo;
        corpoSolucao.innerHTML = solucao.solucao;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Re-inicializar controles de contato dentro do modal
        inicializarControlesContato();
    }
}

function fecharModalSolucao() {
    const modal = document.getElementById('modalSolucao');
    if (modal) {
        pararTesteCamera();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== TESTE DE ÁUDIO COM WEB SPEECH API =====
function iniciarTesteAudio() {
    const statusAudio = document.getElementById('statusAudio');
    
    if (!statusAudio) return;
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        statusAudio.innerHTML = '<span class="erro">⚠️ Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.</span>';
        return;
    }

    statusAudio.innerHTML = '<span class="processando">🎤 Escutando... Fale agora!</span>';
    
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.start();
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        statusAudio.innerHTML = `<span class="sucesso">✅ Áudio funcionando! Você disse: "${transcript}"</span>`;
    };
    
    recognition.onerror = function(event) {
        if (event.error === 'not-allowed') {
            statusAudio.innerHTML = '<span class="erro">❌ Permissão de microfone negada. Clique no ícone de câmera/microfone na barra de endereços.</span>';
        } else {
            statusAudio.innerHTML = `<span class="erro">❌ Erro no áudio: ${event.error}</span>`;
        }
    };
    
    recognition.onend = function() {
        // Se não houve resultado nem erro, significa que não captou áudio
        if (statusAudio && !statusAudio.querySelector('.sucesso') && !statusAudio.querySelector('.erro')) {
            statusAudio.innerHTML = '<span class="erro">❌ Não detectei sua voz. Verifique se o microfone está conectado e habilitado.</span>';
        }
    };
}

// ===== TESTE DE CÂMERA COM VERIFICAÇÃO MANUAL =====
async function iniciarTesteCamera() {
    const videoContainer = document.getElementById('videoContainer');
    const statusCamera = document.getElementById('statusCamera');
    const controlesManuais = document.getElementById('controlesManuais');
    
    if (!videoContainer || !statusCamera) return;
    
    statusCamera.innerHTML = '<span class="processando">📷 Acessando câmera...</span>';
    
    // Limpar container anterior
    videoContainer.innerHTML = '';
    if (controlesManuais) {
        controlesManuais.style.display = 'none';
    }
    
    try {
        // Solicitar acesso à câmera
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user'
            },
            audio: false 
        });
        
        streamCamera = stream;
        
        // Criar elemento de vídeo
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.playsinline = true;
        video.style.width = '100%';
        video.style.borderRadius = '10px';
        video.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        video.id = 'cameraTestVideo';
        
        videoContainer.appendChild(video);
        
        // Aguardar o vídeo começar a rodar
        video.addEventListener('loadeddata', async function() {
            // Tentar carregar detecção facial primeiro
            try {
                await carregarModeloFaceDetection();
                statusCamera.innerHTML = '<span class="processando">🔍 Analisando imagem... Posicione seu rosto na câmera</span>';
                iniciarDetecaoFacial(video, statusCamera);
            } catch (error) {
                console.log('Detecção facial não disponível, usando verificação manual');
                iniciarVerificacaoManual(video, statusCamera);
            }
        });
        
        // Adicionar botão para parar a câmera
        const btnParar = document.createElement('button');
        btnParar.innerHTML = '<i class="fas fa-stop"></i> Parar Teste';
        btnParar.className = 'btn-teste parar';
        btnParar.onclick = pararTesteCamera;
        videoContainer.appendChild(btnParar);
        
    } catch (error) {
        console.error('Erro ao acessar câmera:', error);
        tratarErroCamera(error, statusCamera);
    }
}

async function carregarModeloFaceDetection() {
    try {
        // Carregar TensorFlow.js
        await tf.ready();
        
        // Carregar modelo de detecção facial
        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig = {
            runtime: 'tfjs',
            refineLandmarks: true,
            maxFaces: 1
        };
        
        faceDetector = await faceLandmarksDetection.createDetector(model, detectorConfig);
        console.log('Modelo de detecção facial carregado com sucesso');
        return true;
        
    } catch (error) {
        console.warn('Não foi possível carregar detecção facial:', error);
        throw new Error('Detecção facial não disponível');
    }
}

function iniciarDetecaoFacial(video, statusCamera) {
    detectionAttempts = 0;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    detectionInterval = setInterval(async () => {
        if (!faceDetector) {
            // Se não carregou o detector, usar verificação manual
            clearInterval(detectionInterval);
            iniciarVerificacaoManual(video, statusCamera);
            return;
        }
        
        try {
            // Configurar canvas com as dimensões do vídeo
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Detectar rostos
            const faces = await faceDetector.estimateFaces(video, {
                flipHorizontal: false
            });
            
            detectionAttempts++;
            
            if (faces.length > 0) {
                // Rosto detectado!
                clearInterval(detectionInterval);
                
                const face = faces[0];
                const bbox = face.box;
                
                statusCamera.innerHTML = `
                    <span class="sucesso">
                        ✅ Câmera funcionando perfeitamente!<br>
                        <small>Rosto detectado - ${Math.round(bbox.width)}x${Math.round(bbox.height)} pixels</small>
                    </span>
                `;
                
            } else if (detectionAttempts > MAX_DETECTION_ATTEMPTS) {
                // Tempo esgotado sem detectar rosto
                clearInterval(detectionInterval);
                iniciarVerificacaoManual(video, statusCamera);
            } else {
                // Ainda tentando detectar...
                const progresso = Math.min(100, (detectionAttempts / MAX_DETECTION_ATTEMPTS) * 100);
                statusCamera.innerHTML = `
                    <span class="processando">
                        🔍 Procurando rosto... ${Math.round(progresso)}%<br>
                        <small>Posicione seu rosto no centro da imagem</small>
                    </span>
                `;
            }
            
        } catch (error) {
            console.error('Erro na detecção facial:', error);
            clearInterval(detectionInterval);
            iniciarVerificacaoManual(video, statusCamera);
        }
    }, 200);
}

function iniciarVerificacaoManual(video, statusCamera) {
    const controlesManuais = document.getElementById('controlesManuais');
    
    statusCamera.innerHTML = `
        <span class="aviso">
            ⚠️ Câmera funcionando (detecção facial não disponível)<br>
            <small>Verifique manualmente se sua imagem está aparecendo</small>
        </span>
    `;
    
    if (controlesManuais) {
        controlesManuais.style.display = 'block';
    }
    
    // Verificar automaticamente se a câmera está mostrando algo útil
    verificationInterval = setInterval(() => {
        verificarQualidadeCamera(video, statusCamera);
    }, 1000);
}

function verificarQualidadeCamera(video, statusCamera) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    try {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const isCameraWorking = verificarSeCameraEstaFuncionando(imageData);
        
        if (!isCameraWorking) {
            statusCamera.innerHTML = `
                <span class="erro">
                    ❌ Possível problema detectado<br>
                    <small>A câmera pode estar tampada ou com problemas</small>
                </span>
            `;
        }
        
    } catch (error) {
        console.error('Erro na verificação da câmera:', error);
    }
}

function confirmarCameraFuncionando() {
    const statusCamera = document.getElementById('statusCamera');
    const controlesManuais = document.getElementById('controlesManuais');
    
    if (statusCamera) {
        statusCamera.innerHTML = `
            <span class="sucesso">
                ✅ Câmera funcionando perfeitamente!<br>
                <small>Verificação manual confirmada</small>
            </span>
        `;
    }
    
    if (controlesManuais) {
        controlesManuais.style.display = 'none';
    }
    
    if (verificationInterval) {
        clearInterval(verificationInterval);
    }
}

function negarCameraFuncionando() {
    const statusCamera = document.getElementById('statusCamera');
    
    if (statusCamera) {
        statusCamera.innerHTML = `
            <span class="erro">
                ❌ Problema na câmera confirmado<br>
                <small>Verifique se:</small><br>
                <small>• Não há tampa na câmera</small><br>
                <small>• A lente está limpa</small><br>
                <small>• As permissões estão concedidas</small>
            </span>
        `;
    }
    
    if (verificationInterval) {
        clearInterval(verificationInterval);
    }
}

function verificarSeCameraEstaFuncionando(imageData) {
    const data = imageData.data;
    let totalPixels = data.length / 4;
    let darkPixels = 0;
    let uniformPixels = 0;
    
    // Verificar se a imagem é muito escura ou uniforme (possível tampa)
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Contar pixels escuros
        if (r < 30 && g < 30 && b < 30) {
            darkPixels++;
        }
        
        // Verificar uniformidade (pixels muito similares)
        if (Math.abs(r - g) < 10 && Math.abs(r - b) < 10 && Math.abs(g - b) < 10) {
            uniformPixels++;
        }
    }
    
    const percentDark = (darkPixels / totalPixels) * 100;
    const percentUniform = (uniformPixels / totalPixels) * 100;
    
    // Se mais de 80% da imagem é escura ou uniforme, provavelmente há um problema
    return percentDark < 80 && percentUniform < 80;
}

function tratarErroCamera(error, statusCamera) {
    let mensagemErro = '❌ Erro ao acessar a câmera. ';
    
    if (error.name === 'NotAllowedError') {
        mensagemErro += 'Permissão negada. ';
        mensagemErro += 'Clique no ícone de câmera 🔒 na barra de endereços e permita o acesso.';
    } else if (error.name === 'NotFoundError') {
        mensagemErro += 'Nenhuma câmera encontrada. ';
        mensagemErro += 'Verifique se sua câmera está conectada e funcionando.';
    } else if (error.name === 'NotSupportedError') {
        mensagemErro += 'Seu navegador não suporta acesso à câmera. ';
        mensagemErro += 'Recomendamos usar Chrome, Edge ou Firefox.';
    } else if (error.name === 'NotReadableError') {
        mensagemErro += 'Câmera já está em uso por outro aplicativo. ';
        mensagemErro += 'Feche outros programas como Zoom, Teams ou Skype.';
    } else {
        mensagemErro += error.message || 'Erro desconhecido.';
    }
    
    statusCamera.innerHTML = `<span class="erro">${mensagemErro}</span>`;
}

function pararTesteCamera() {
    if (detectionInterval) {
        clearInterval(detectionInterval);
        detectionInterval = null;
    }
    
    if (verificationInterval) {
        clearInterval(verificationInterval);
        verificationInterval = null;
    }
    
    if (streamCamera) {
        streamCamera.getTracks().forEach(track => track.stop());
        streamCamera = null;
    }
    
    if (faceDetector) {
        faceDetector.dispose();
        faceDetector = null;
    }
    
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
        videoContainer.innerHTML = '';
    }
    
    const controlesManuais = document.getElementById('controlesManuais');
    if (controlesManuais) {
        controlesManuais.style.display = 'none';
    }
    
    const statusCamera = document.getElementById('statusCamera');
    if (statusCamera) {
        statusCamera.innerHTML = '<span class="info">📷 Teste de câmera finalizado</span>';
    }
}

// ===== RECURSOS MULTIMÍDIA =====
function inicializarRecursosMultimidia() {
    // Carrossel de guia visual
    const btnCarrosselAnterior = document.querySelector('.btn-carrossel:nth-child(1)');
    const btnCarrosselProximo = document.querySelector('.btn-carrossel:nth-child(3)');
    const slides = document.querySelectorAll('.slide-carrossel');
    let slideAtual = 0;

    if (btnCarrosselAnterior && btnCarrosselProximo && slides.length > 0) {
        btnCarrosselAnterior.addEventListener('click', function() {
            if (slideAtual > 0) {
                slides[slideAtual].classList.remove('ativo');
                slideAtual--;
                slides[slideAtual].classList.add('ativo');
                atualizarContadorCarrossel();
            }
        });

        btnCarrosselProximo.addEventListener('click', function() {
            if (slideAtual < slides.length - 1) {
                slides[slideAtual].classList.remove('ativo');
                slideAtual++;
                slides[slideAtual].classList.add('ativo');
                atualizarContadorCarrossel();
            }
        });

        function atualizarContadorCarrossel() {
            const contador = document.querySelector('.navegacao-carrossel span');
            if (contador) {
                contador.textContent = `${slideAtual + 1}/${slides.length}`;
            }
        }

        // Inicializar carrossel
        atualizarContadorCarrossel();
    }

    // Player de vídeo simulado
    const btnPlay = document.querySelector('.btn-play');
    const barraProgresso = document.querySelector('.progresso');

    if (btnPlay && barraProgresso) {
        btnPlay.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-play')) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                // Simular progresso do vídeo
                simularProgressoVideo();
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });

        function simularProgressoVideo() {
            let progresso = 35;
            const intervalo = setInterval(() => {
                if (progresso < 100) {
                    progresso += 5;
                    barraProgresso.style.width = progresso + '%';
                } else {
                    clearInterval(intervalo);
                    const btn = document.querySelector('.btn-play');
                    if (btn) {
                        btn.querySelector('i').classList.remove('fa-pause');
                        btn.querySelector('i').classList.add('fa-play');
                    }
                }
            }, 500);
        }
    }
}

// ===== CONTROLES DE CONTATO =====
function inicializarControlesContato() {
    document.querySelectorAll('.btn-contato').forEach(botao => {
        botao.addEventListener('click', function() {
            const tipo = this.classList[1]; // telefone, whatsapp ou chat
            
            switch(tipo) {
                case 'telefone':
                    window.location.href = 'tel:+5511999999999';
                    break;
                case 'whatsapp':
                    window.open('https://wa.me/5511999999999', '_blank');
                    break;
                case 'chat':
                    // Simular abertura de chat
                    const assistente = document.getElementById('assistenteVirtual');
                    if (assistente) {
                        assistente.click();
                    }
                    break;
            }
        });
    });
}

// ===== EFEITOS VISUAIS =====
function inicializarEfeitosVisuais() {
    // Efeitos de hover nos cards
    document.querySelectorAll('.card-acesso, .card-problema, .recurso-box').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Feedback de interação
    document.querySelectorAll('button, .btn-recurso, .botao-mockup').forEach(botao => {
        botao.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}