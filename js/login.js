document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("paciente-form");

    const campos = {
        cpf: {
            input: document.getElementById("idCpf"),
            mensagem: "Informe um CPF válido (formato: 000.000.000-00)."
        },
        idade: {
            input: document.getElementById("idIdade"),
            mensagem: "Informe uma idade válida (maior que zero)."
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

    form.addEventListener("submit", function (e) {
        let valido = true;

        let valorCpf = campos.cpf.input.value.trim();
        if (!valorCpf) {
            campos.cpf.erroDiv.textContent = campos.cpf.mensagem;
            campos.cpf.erroDiv.style.display = "block";
            valido = false;
        } else {
            valorCpf = valorCpf.replace(/\D/g, "");
            const cpfFormatado = formatarCPF(valorCpf);
            campos.cpf.input.value = cpfFormatado;

            if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpfFormatado)) {
                campos.cpf.erroDiv.textContent = campos.cpf.mensagem;
                campos.cpf.erroDiv.style.display = "block";
                valido = false;
            } else {
                campos.cpf.erroDiv.style.display = "none";
            }
        }

        let valorIdade = campos.idade.input.value.trim();
        if (!valorIdade || isNaN(valorIdade) || Number(valorIdade) <= 0) {
            campos.idade.erroDiv.textContent = campos.idade.mensagem;
            campos.idade.erroDiv.style.display = "block";
            valido = false;
        } else {
            campos.idade.erroDiv.style.display = "none";
        }

        if (!valido) {
            e.preventDefault();
        }
    });
});
