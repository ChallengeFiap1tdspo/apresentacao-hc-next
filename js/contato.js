document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contatoForm");

  const campos = {
    nome: {
      input: document.getElementById("nome"),
      mensagem: "O nome é obrigatório."
    },
    email: {
      input: document.getElementById("email"),
      mensagem: "Informe um e-mail válido."
    },
    telefone: {
      input: document.getElementById("telefone"),
      mensagem: "Informe um telefone válido (opcional, formato: (00)00000-0000).",
      opcional: true
    },
    assunto: {
      input: document.getElementById("assunto"),
      mensagem: "Selecione um assunto."
    },
    mensagem: {
      input: document.getElementById("mensagem"),
      mensagem: "A mensagem não pode estar vazia."
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

  const formatarTelefone = (tel) => {
    return tel.replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1)$2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valido = true;

    for (let campo in campos) {
      let valor = campos[campo].input.value.trim();
      const erroDiv = campos[campo].erroDiv;
      const opcional = campos[campo].opcional || false;

      if (!valor && !opcional) {
        erroDiv.textContent = campos[campo].mensagem;
        erroDiv.style.display = "block";
        valido = false;
        continue;
      }

      if (campo === "email" && valor) {
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
        if (!emailValido) {
          erroDiv.textContent = campos[campo].mensagem;
          erroDiv.style.display = "block";
          valido = false;
          continue;
        }
      }

      if (campo === "telefone" && valor) {
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

      if (campo === "assunto" && valor === "") {
        erroDiv.textContent = campos[campo].mensagem;
        erroDiv.style.display = "block";
        valido = false;
        continue;
      }

      erroDiv.style.display = "none";
    }

    const sucessoDiv = document.getElementById("mensagemSucesso");

    if (valido) {
      if (sucessoDiv) {
        sucessoDiv.style.display = "block";
      }
      alert("Mensagem enviada!");
      form.reset();
    } else {
      if (sucessoDiv) {
        sucessoDiv.style.display = "none";
      }
    }
  });
});
