document.addEventListener("DOMContentLoaded", () => {

  const chatToggle = document.getElementById("chat-toggle");
  const chatbot = document.getElementById("chatbot");
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const quickActions = document.getElementById("quick-actions");

  let welcomeSent = false;

  if (!chatToggle || !chatbot || !chatMessages || !userInput || !sendBtn) {
    console.error("❌ Elementos do chatbot não encontrados");
    return;
  }

  // 🔹 ADD MESSAGE
  function addMessage(sender, text) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.innerText = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // 🔹 SUGESTÕES
  function showSuggestions(list) {
    quickActions.innerHTML = "";

    list.forEach(text => {
      const btn = document.createElement("button");
      btn.textContent = text;
      btn.onclick = () => {
        addMessage("user", text);
        botReply(text);
      };
      quickActions.appendChild(btn);
    });
  }

  // 🔹 RESPOSTAS
  function botReply(message) {
    const msg = message.toLowerCase();
    let reply = "";
    let suggestions = [];

    if (
      msg === "oi" ||
      msg === "olá" ||
      msg === "ola" ||
      msg.includes("bom dia") ||
      msg.includes("boa tarde") ||
      msg.includes("boa noite")
    ) {
      reply =
        "Olá! 👋 Eu sou o GuissoBot 🤖\n" +
        "Estou aqui para te ajudar a conhecer melhor o Caetano.";

      suggestions = [
        "Quem é Caetano?",
        "Sou recrutador",
        "Stack",
        "Projetos",
        "Contato"
      ];
    }

    else if (msg.includes("recrutador")) {
      reply =
        "👔 Perfeito!\n\n" +
        "Caetano é desenvolvedor Backend focado em Python, automação, bots e construção de sistemas sólidos.";

      suggestions = [
        "Stack técnica",
        "Projetos relevantes",
        "Contato"
      ];
    }

    else if (msg.includes("quem é caetano")) {
      reply =
        "Caetano Guisso é desenvolvedor Backend.\n\n" +
        "Trabalha com Python, automação, bots e lógica de sistemas.";

      suggestions = [
        "Stack",
        "Projetos",
        "Contato"
      ];
    }

    else if (msg.includes("stack")) {
      reply =
        "🧠 Stack principal:\n" +
        "• Python\n• Java\n• JavaScript\n• HTML & CSS\n• SQLite\n\n" +
        "Foco total em backend.";

      suggestions = ["Projetos", "Contato"];
    }

    else if (msg.includes("projeto")) {
      reply =
        "📂 O Caetano desenvolve projetos próprios focados em backend e automação.\n\n" +
        "Todos disponíveis no GitHub.";

      suggestions = ["Stack", "Contato"];
    }

    else if (msg.includes("contato")) {
      reply =
        "📞 Você pode entrar em contato pelo GitHub, LinkedIn ou Instagram.";

      suggestions = ["Projetos"];
    }

    else {
      reply =
        "Não entendi muito bem 🤔\n" +
        "Tente algo como:";

      suggestions = [
        "Quem é Caetano?",
        "Sou recrutador",
        "Stack",
        "Projetos",
        "Contato"
      ];
    }

    setTimeout(() => {
      addMessage("bot", reply);
      showSuggestions(suggestions);
    }, 400);
  }

  // 🔹 TOGGLE CHAT + MENSAGEM AUTOMÁTICA
  chatToggle.addEventListener("click", () => {
    chatbot.classList.toggle("hidden");

    if (!chatbot.classList.contains("hidden") && !welcomeSent) {
      welcomeSent = true;

      setTimeout(() => {
        addMessage(
          "bot",
          "Olá! 👋 Eu sou o chatbot do portfólio.\n" +
          "Se precisar de ajuda, digite *oi* ou use os botões abaixo 👇"
        );

        showSuggestions([
          "Quem é Caetano?",
          "Sou recrutador",
          "Stack",
          "Projetos",
          "Contato"
        ]);
      }, 300);
    }
  });

  // 🔹 ENVIAR
  sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage("user", text);
    userInput.value = "";
    botReply(text);
  });

  userInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendBtn.click();
  });

});
