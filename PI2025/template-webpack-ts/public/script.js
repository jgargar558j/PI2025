window.addEventListener("DOMContentLoaded", () => {
  // BOTON FULLSCREEN CONFIG
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const gameContainer = document.getElementById("game-container");

  fullscreenBtn.addEventListener("click", () => {
    if (gameContainer.requestFullscreen) {
      gameContainer.requestFullscreen();
    } else if (gameContainer.webkitRequestFullscreen) {
      gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {
      gameContainer.msRequestFullscreen();
    }
  });

  // ANIMACION DE PANELES
  const panels = document.querySelectorAll(".info-panel");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  panels.forEach((panel) => {
    observer.observe(panel);
  });

  const chatWindow = document.getElementById("chat-window");
  const chatToggle = document.getElementById("chat-toggle");

  chatToggle.addEventListener("click", () => {
    const isVisible = chatWindow.style.display === "flex";
    chatWindow.style.display = isVisible ? "none" : "flex";
  });

  // PROGRAMACIÓN DE IA CON GEMINI

  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  const systemPrompt = `
Eres el desarrollador de FrogAlone, un juego hecho con Phaser y TypeScript. Si alguien
quiere ver detalles técnicos, puede ir al enlace de GitHub que está al final de la página del juego. En 
FrogAlone controlas a Héctor, una rana que ha perdido el contacto con otras ranas y ahora salta por los 
niveles, pisa enemigos y recoge fruta (le flipa). También le encantan los trofeos brillantes. Se mueve con
A y D o con las flechas izquierda y derecha, y salta con W, flecha arriba o espacio.
Responde siempre en español, de forma clara, muy corta y solo a lo que te pregunten. Usa un tono informal,
como si hablaras con colegas.
Recuerda lo que el usuario te ha dicho antes y responde teniendo en cuenta el contexto de la conversación.
Si el usuario dice "hola", responde con: "¡Qué pasa bala!"
Si el usuario dice "qué pasa bala" o "que pasa bala", responde con: "¡Qué pasa bala!"
`;

  let conversationHistory = [{ role: "system", content: systemPrompt }];

  chatInput.addEventListener("keypress", async function (e) {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
      const userPrompt = chatInput.value;
      appendMessage("👤", userPrompt);
      chatInput.value = "";

      conversationHistory.push({ role: "user", content: userPrompt });

      // Crear elemento con animación de puntos
      const typingMessage = document.createElement("div");
      typingMessage.innerHTML = `🤖 <span class="typing">escribiendo</span><span class="dots">.</span>`;
      chatMessages.appendChild(typingMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Iniciar animación de puntos
      let dotCount = 1;
      const dotsSpan = typingMessage.querySelector(".dots");
      const dotInterval = setInterval(() => {
        dotCount = (dotCount % 3) + 1;
        dotsSpan.textContent = ".".repeat(dotCount);
      }, 400);

      try {
        const response = await fetch(
          "https://frogaloneiaserver.onrender.com/api/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: conversationHistory,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }

        const data = await response.json();
        const aiMessage =
          data.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta";

        conversationHistory.push({ role: "assistant", content: aiMessage });

        clearInterval(dotInterval); // detener animación de puntos
        typingMessage.textContent = `🤖 ${aiMessage}`;
      } catch (error) {
        console.error("Error:", error);
        clearInterval(dotInterval);
        typingMessage.textContent = "🤖 Ocurrió un error al procesar tu mensaje.";
      }
    }
  });

  function appendMessage(sender, text) {
    const message = document.createElement("div");
    message.textContent = `${sender} ${text}`;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return message;
  }
});
