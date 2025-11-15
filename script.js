// ✨ Encabezado animado (máquina de escribir)
document.addEventListener("DOMContentLoaded", () => {
  const text = "Bienvenidos al Proyecto CTS: Privacidad y Vigilancia Masiva";
  const typewriter = document.getElementById("typewriter");
  if (!typewriter) return;

  let i = 0;
  typewriter.textContent = ""; // aseguramos que arranca vacío

  function typing() {
    if (i < text.length) {
      typewriter.textContent += text.charAt(i);
      i++;
      setTimeout(typing, 60);
    }
  }

  typing();
});

// 💬 FAQ interactivo (abre una respuesta por vez)
const questions = document.querySelectorAll(".faq-question");
questions.forEach(q => {
  q.addEventListener("click", () => {
    const answer = q.nextElementSibling;
    const isOpen = answer.style.display === "block";
    document.querySelectorAll(".faq-answer").forEach(a => (a.style.display = "none"));
    answer.style.display = isOpen ? "none" : "block";
  });
});

// 🧠 Test: suma puntaje y muestra resultado (versión corregida)
const buttons = document.querySelectorAll(".quiz .btn");
const resultDiv = document.getElementById("result");
const answers = {}; // guarda la respuesta elegida por cada pregunta

// Función para identificar a qué pregunta pertenece cada botón
function getQuestionId(btn) {
  let prev = btn.previousElementSibling;
  while (prev && prev.tagName !== "P") {
    prev = prev.previousElementSibling;
  }
  return prev ? prev.textContent.trim() : "";
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!resultDiv) return;

    const questionId = getQuestionId(btn);
    if (!questionId) return;

    // 1) Sacar la selección anterior de esa misma pregunta
    buttons.forEach(b => {
      if (getQuestionId(b) === questionId) {
        b.classList.remove("selected");
      }
    });

    // 2) Marcar el botón actual
    btn.classList.add("selected");

    // 3) Guardar la respuesta elegida y recalcular el puntaje
    const value = parseInt(btn.dataset.value || "0", 10);
    answers[questionId] = Number.isNaN(value) ? 0 : value;

    let score = 0;
    Object.values(answers).forEach(v => score += v);

    // 4) Mostrar mensaje según el puntaje total
    if (score >= 5) {
      resultDiv.textContent = "💪 Sos muy consciente y cuidadosa con tu privacidad digital.";
    } else if (score >= 3) {
      resultDiv.textContent = "🧠 Mantenés un equilibrio entre libertad y seguridad digital.";
    } else {
      resultDiv.textContent = "😅 Compartís mucho... ¡Atención con tu huella digital!";
    }
  });
});

// 📚 Carrusel automático de libros
const carousel = document.querySelector(".carousel");
if (carousel) {
  let scrollAmount = 0;
  const scrollStep = 220;
  const scrollDelay = 12000;

  function autoScroll() {
    if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 5) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
      scrollAmount = 0;
    } else {
      scrollAmount += scrollStep;
      carousel.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  }

  let autoScrollInterval = setInterval(autoScroll, scrollDelay);

  // Pausa cuando el usuario interactúa
  carousel.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
  carousel.addEventListener("mouseleave", () => {
    autoScrollInterval = setInterval(autoScroll, scrollDelay);
  });
  carousel.addEventListener("wheel", () => {
    clearInterval(autoScrollInterval);
    setTimeout(() => {
      autoScrollInterval = setInterval(autoScroll, scrollDelay);
    }, 7000);
  });
}

// 🖼️ Fallback para imágenes de Casos (si alguna no carga)
const FALLBACK_IMG = "https://cdn.pixabay.com/photo/2021/04/06/19/42/surveillance-6155838_1280.png";

const casoImgs = document.querySelectorAll("#casos img");
casoImgs.forEach(img => {
  const setFallback = () => {
    if (img.src !== FALLBACK_IMG) {
      img.src = FALLBACK_IMG;
    }
  };

  img.addEventListener("error", setFallback);

  // Si ya cargó roto antes de que agreguemos el listener
  if (img.complete && img.naturalWidth === 0) {
    setFallback();
  }
});

// 🔍 Modal para ver más info de cada caso
const modal = document.getElementById("caso-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalClose = document.querySelector(".modal-close");

if (modal && modalImg && modalTitle && modalText && modalClose) {
  document.querySelectorAll("#casos .caso").forEach(caso => {
    const titleEl = caso.querySelector("h3");
    const textEl = caso.querySelector("p");
    const imgEl = caso.querySelector("img");

    if (!titleEl || !textEl || !imgEl) return;

    // Que se note que se puede clickear
    titleEl.style.cursor = "pointer";

    titleEl.addEventListener("click", () => {
      modalImg.src = imgEl.src || FALLBACK_IMG;
      modalTitle.textContent = titleEl.textContent;
      modalText.textContent = textEl.textContent;
      modal.style.display = "flex";
    });
  });

  const closeModal = () => {
    modal.style.display = "none";
  };

  modalClose.addEventListener("click", closeModal);

  // Cerrar si clickeás fuera del cuadro
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

// 📩 Formulario de contacto (mensaje de confirmación)
const contactForm = document.querySelector(".contact-form");
const responseMsg = document.getElementById("contact-response");

if (contactForm && responseMsg) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    responseMsg.textContent = "✔ Gracias por tu mensaje. Nos pondremos en contacto pronto.";
    contactForm.reset();
  });
}
