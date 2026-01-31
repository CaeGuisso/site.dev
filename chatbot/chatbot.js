// ---------- Elementos ----------
const chatToggle = document.getElementById("chat-toggle");
const chatbot = document.getElementById("chatbot");
const chatMessages = document.getElementById("chat-messages");
const quickActions = document.getElementById("quick-actions");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// ---------- Abrir / Fechar chat ----------
chatToggle.addEventListener("click", () => {
  chatbot.classList.toggle("hidden");
});

// ---------- Função para adicionar mensagem ----------
function appendMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ---------- Função de resposta do bot ----------
function botResponse(msg) {
  let response = "";

  // Lógica do bot
  switch(msg.toLowerCase()) {
    case "recrutador":
      response = "Ótimo! Você quer saber mais sobre oportunidades ou parcerias?";
      break;
    case "stack":
      response = "Minha stack principal é Python, JavaScript e algumas libs de AI e backend.";
      break;
    case "projetos":
      response = "Você pode conferir meus projetos no GitHub: https://github.com/caeguisso";
      break;
    case "contato":
      response = "Pode me contatar pelo e-mail: caetano@example.com";
      break;
    default:
      response = "Não entendi, mas estou aprendendo!";
  }

  // Delay para parecer mais natural
  setTimeout(() => appendMessage("Bot", response), 500);
}

// ---------- Enviar mensagem pelo input ----------
sendBtn.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("Você", text);
  userInput.value = "";
  botResponse(text);
});

// ---------- Enviar mensagem ao pressionar Enter ----------
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// ---------- Botões de quick-action ----------
quickActions.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const msg = btn.getAttribute("data-msg");
    appendMessage("Você", msg);
    botResponse(msg);
  });
});
