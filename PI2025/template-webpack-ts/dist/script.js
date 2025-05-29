import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
window.addEventListener("DOMContentLoaded", () => {
  // BOTON MODO CLARO/OSCURO
  const modoToggle = document.getElementById("modo-toggle");

  if (localStorage.getItem("modoOscuro") === "true") {
    document.body.classList.add("dark-mode");
    modoToggle.textContent = "☀️ Modo claro";
  }

  modoToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const esOscuro = document.body.classList.contains("dark-mode");
    modoToggle.textContent = esOscuro ? "🌙 Modo oscuro" : "☀️ Modo claro";

    localStorage.setItem("modoOscuro", esOscuro);
  });

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

  // DESPLEGABLE RANKING
  const toggleBtn = document.getElementById("ranking-toggle");
  const content = document.getElementById("ranking-content");
  const section = document.getElementById("ranking-section");

  content.classList.remove("expanded");
  toggleBtn.textContent = "Ranking ▼";

  const firebaseConfig = {
    apiKey: "AIzaSyB44_8D563uv-utz8sSSd7E-ap5ukDNP9o",
    authDomain: "frogalone-77.firebaseapp.com",
    databaseURL:
      "https://frogalone-77-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "frogalone-77",
    storageBucket: "frogalone-77.firebasestorage.app",
    messagingSenderId: "1051677992729",
    appId: "1:1051677992729:web:3e14cdeb237608863e4788",
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const rankingContent = document.getElementById("ranking-content");

  async function cargarRanking() {
    rankingContent.innerHTML = "<p>Cargando ranking...</p>";

    const dbRef = ref(database);
    try {
      const snapshot = await get(child(dbRef, "jugadores"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const jugadores = Object.values(data);

        jugadores.sort((a, b) => b.puntuacionTotal - a.puntuacionTotal);

        rankingContent.innerHTML = "";

        jugadores.forEach((jugador, index) => {
          if(index === 3){
            return;
          }
          const card = document.createElement("div");
          card.className = "ranking-card";
          let medallaSrc = "";
          if (index === 0) medallaSrc = "./assets/imagenes/medallas/oro.png";
          else if (index === 1)
            medallaSrc = "./assets/imagenes/medallas/plata.png";
          else if (index === 2)
            medallaSrc = "./assets/imagenes/medallas/bronce.png";

          card.innerHTML = `
            ${
              medallaSrc
                ? `<img src="${medallaSrc}" alt="Medalla" class="medalla" />`
                : ""
            }
            <div>
              <h3>${index + 1}. ${jugador.nombre}</h3>
              <p>Puntos: ${jugador.puntuacionTotal}</p>
            </div>
          `;
          rankingContent.appendChild(card);
        });
      } else {
        rankingContent.innerHTML =
          "<p>No hay datos de ranking disponibles.</p>";
      }
    } catch (error) {
      console.error("Error al cargar el ranking:", error);
      rankingContent.innerHTML = "<p>Error al cargar el ranking.</p>";
    }
  }

  toggleBtn.addEventListener("click", async () => {
    const isExpanded = content.classList.contains("expanded");

    if (!isExpanded) {
      await cargarRanking();
    }

    content.classList.toggle("expanded", !isExpanded);
    toggleBtn.textContent = isExpanded ? "Ranking ▼" : "Ranking ▲";

    if (!isExpanded) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
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

  // COMENTARIOS DE JUGADORES
  const comentarioForm = document.getElementById("comentario-form");
  const comentarioTexto = document.getElementById("comentario-texto");
  const comentarioNombre = document.getElementById("comentario-nombre");
  const comentariosLista = document.getElementById("comentarios-lista");

  comentarioForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const texto = comentarioTexto.value.trim();
    const nombre = comentarioNombre.value.trim();
    if (texto && nombre) {
      const nuevoComentario = {
        nombre,
        texto,
        fecha: new Date().toISOString(),
      };
      await push(ref(database, "comentarios"), nuevoComentario);
      comentarioTexto.value = "";
      comentarioNombre.value = "";
    }
  });

  // PROGRAMACIÓN DE IA CON GEMINI
  const chatWindow = document.getElementById("chat-window");
  const chatToggle = document.getElementById("chat-toggle");

  chatToggle.addEventListener("click", () => {
    const isVisible = chatWindow.style.display === "flex";
    chatWindow.style.display = isVisible ? "none" : "flex";
  });

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

        clearInterval(dotInterval);
        typingMessage.textContent = `🤖 ${aiMessage}`;
      } catch (error) {
        console.error("Error:", error);
        clearInterval(dotInterval);
        typingMessage.textContent =
          "🤖 Ocurrió un error al procesar tu mensaje.";
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

  // Mostrar comentarios

  onValue(ref(database, "comentarios"), (snapshot) => {
    comentariosLista.innerHTML = "";
    const data = snapshot.val();
    if (data) {
      const comentarios = Object.values(data).reverse();
      comentarios.forEach((comentario) => {
        const div = document.createElement("div");
        div.className = "comentario";
        div.innerHTML = `<strong>${comentario.nombre}:</strong> ${comentario.texto}`;
        comentariosLista.appendChild(div);
      });
    }
  });
});
