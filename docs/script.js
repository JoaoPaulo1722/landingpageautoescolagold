"use strict";

const WHATSAPP_NUMBER = "5511971529053";

const yearEl = document.getElementById("year");
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const navigationLinks = navigation?.querySelectorAll("a") ?? [];

const form = document.getElementById("form-contato");
const nomeEl = document.getElementById("nome");
const categoriaEl = document.getElementById("categoria");
const cursoEl = document.getElementById("curso");
const mensagemEl = document.getElementById("msg");
const semCategoriaEl = document.getElementById("semCategoria");
const semCursoEl = document.getElementById("semCurso");
const feedbackEl = document.getElementById("form-feedback");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

function updateHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

function setMenuState(isOpen) {
  if (!menuButton || !navigation) return;

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  navigation.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1040) setMenuState(false);
});

function toggleCategoria() {
  if (!categoriaEl || !semCategoriaEl) return;

  categoriaEl.disabled = semCategoriaEl.checked;

  if (semCategoriaEl.checked) {
    categoriaEl.dataset.previousValue = categoriaEl.value;
    categoriaEl.value = "";
  } else if (!categoriaEl.value) {
    categoriaEl.value = categoriaEl.dataset.previousValue || "B";
  }
}

function toggleCurso() {
  if (!cursoEl || !semCursoEl) return;

  cursoEl.disabled = semCursoEl.checked;

  if (semCursoEl.checked) {
    cursoEl.dataset.previousValue = cursoEl.value;
    cursoEl.value = "";
  } else if (!cursoEl.value && cursoEl.dataset.previousValue) {
    cursoEl.value = cursoEl.dataset.previousValue;
  }
}

semCategoriaEl?.addEventListener("change", toggleCategoria);
semCursoEl?.addEventListener("change", toggleCurso);

toggleCategoria();
toggleCurso();

function showFeedback(message) {
  if (!feedbackEl) {
    window.alert(message);
    return;
  }

  feedbackEl.textContent = message;
  feedbackEl.classList.add("is-visible");
}

function clearFeedback() {
  if (!feedbackEl) return;

  feedbackEl.textContent = "";
  feedbackEl.classList.remove("is-visible");
}

function sendWhatsApp(event) {
  event.preventDefault();
  clearFeedback();

  const nome = nomeEl?.value.trim() ?? "";
  const categoria = semCategoriaEl?.checked
    ? ""
    : (categoriaEl?.value.trim() ?? "");
  const curso = semCursoEl?.checked ? "" : (cursoEl?.value.trim() ?? "");
  const mensagem = mensagemEl?.value.trim() ?? "";

  if (!nome) {
    showFeedback("Informe seu nome para continuar.");
    nomeEl?.focus();
    return;
  }

  if (!categoria && !curso) {
    showFeedback(
      "Selecione uma categoria de CNH ou um curso profissionalizante.",
    );
    categoriaEl?.focus();
    return;
  }

  const linhas = [`Olá, meu nome é ${nome}, tudo bem?`];

  if (categoria) {
    linhas.push(
      `Tenho interesse em iniciar minha CNH – Categoria ${categoria}.`,
    );
  }

  if (curso) {
    linhas.push(`Tenho interesse no curso profissional: ${curso}.`);
  }

  if (mensagem) {
    linhas.push(`Mensagem adicional: ${mensagem}`);
  }

  linhas.push(
    "Poderia me enviar mais informações sobre valores, prazos e como iniciar o processo?",
    "Aguardo seu retorno. Obrigado(a)!",
  );

  const texto = linhas.join("\n\n");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

form?.addEventListener("submit", sendWhatsApp);

const muteButtons = document.querySelectorAll(".mute-btn");

muteButtons.forEach((button) => {
  const targetId = button.dataset.target;
  const video = targetId ? document.getElementById(targetId) : null;

  if (!(video instanceof HTMLVideoElement)) return;

  function updateMuteButton() {
    button.textContent = video.muted ? "🔇" : "🔊";
    button.setAttribute("aria-pressed", String(video.muted));
    button.setAttribute(
      "aria-label",
      video.muted ? "Ativar som" : "Desativar som",
    );
    button.title = video.muted ? "Ativar som" : "Desativar som";
  }

  updateMuteButton();

  button.addEventListener("click", async () => {
    video.muted = !video.muted;

    if (!video.muted) {
      try {
        await video.play();
      } catch (error) {
        video.muted = true;
      }
    }

    updateMuteButton();
  });
});

// Fallback visual do hero enquanto a imagem definitiva não for escolhida
const heroImage = document.getElementById("hero-image");
const heroImageCard = document.getElementById("hero-image-card");

function useHeroFallback() {
  heroImageCard?.classList.add("is-fallback");
}

if (heroImage instanceof HTMLImageElement) {
  heroImage.addEventListener("error", useHeroFallback);

  if (heroImage.complete && heroImage.naturalWidth === 0) {
    useHeroFallback();
  }
}

// Fecha o menu mobile com Escape ou ao clicar fora dele
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
    menuButton?.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!navigation?.classList.contains("is-open")) return;

  const target = event.target;
  if (!(target instanceof Node)) return;

  const clickedInsideNavigation = navigation.contains(target);
  const clickedMenuButton = menuButton?.contains(target) ?? false;

  if (!clickedInsideNavigation && !clickedMenuButton) {
    setMenuState(false);
  }
});
