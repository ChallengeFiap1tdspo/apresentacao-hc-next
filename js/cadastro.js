document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cadastroForm");

    const campos = {
        nome: {
            input: document.getElementById("nome"),
            mensagem: "O nome completo é obrigatório."
        },
        cpf: {
            input: document.getElementById("cpf"),
            mensagem: "Informe um CPF válido (formato: 000.000.000-00)."
        },
        dataNasc: {
            input: document.getElementById("dataNasc"),
            mensagem: "A data de nascimento é obrigatória."
        },
        email: {
            input: document.getElementById("email"),
            mensagem: "Informe um e-mail válido."
        },
        telefone: {
            input: document.getElementById("telefone"),
            mensagem: "Informe um telefone válido (formato: (00)00000-0000)."
        }
    };

    for (let campo in campos) {
        const erroDiv = document.createElement("div");
        erroDiv.className = "erro-msg";
        erroDiv.style.color = "red";
        erroDiv.style.fontSize = "0.9em";
        erroDiv.style.display = "none";
        campos[campo].input.parentElement.appendChild(erroDiv);
        campos[campo].erroDiv = erroDiv;
    }

   
    const formatarCPF = (cpf) => {
        return cpf.replace(/\D/g, "")
                  .replace(/(\d{3})(\d)/, "$1.$2")
                  .replace(/(\d{3})(\d)/, "$1.$2")
                  .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const formatarTelefone = (tel) => {
        return tel.replace(/\D/g, "")
                  .replace(/(\d{2})(\d)/, "($1)$2")
                  .replace(/(\d{5})(\d{4})$/, "$1-$2");
    };

    form.addEventListener("submit", function (e) {
        let valido = true;

        for (let campo in campos) {
            let valor = campos[campo].input.value.trim();
            const erroDiv = campos[campo].erroDiv;

            if (!valor) {
                erroDiv.textContent = campos[campo].mensagem;
                erroDiv.style.display = "block";
                valido = false;
                continue;
            }

           
            if (campo === "cpf") {
                valor = valor.replace(/\D/g, "");
                const cpfFormatado = formatarCPF(valor);
                campos[campo].input.value = cpfFormatado;

                if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpfFormatado)) {
                    erroDiv.textContent = campos[campo].mensagem;
                    erroDiv.style.display = "block";
                    valido = false;
                    continue;
                }
            }

            if (campo === "telefone") {
                valor = valor.replace(/\D/g, "");
                const telefoneFormatado = formatarTelefone(valor);
                campos[campo].input.value = telefoneFormatado;

                if (!/^\(\d{2}\)\d{5}-\d{4}$/.test(telefoneFormatado)) {
                    erroDiv.textContent = campos[campo].mensagem;
                    erroDiv.style.display = "block";
                    valido = false;
                    continue;
                }
            }

            if (campo === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                erroDiv.textContent = campos[campo].mensagem;
                erroDiv.style.display = "block";
                valido = false;
                continue;
            }

            erroDiv.style.display = "none";
        }

        if (!valido) {
            e.preventDefault();
        }
    });
});
