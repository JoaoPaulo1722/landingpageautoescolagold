// =========================
// Atualiza ano no rodapé
// =========================
document.getElementById("year").textContent = new Date().getFullYear();

// Número oficial (formato E.164: 55 + DDD + número)
const WHATSAPP_NUMBER = "5511971529053"; // número da Gold

// Referências
const form = document.getElementById("form-contato");
const nomeEl = document.getElementById("nome");
const catEl = document.getElementById("categoria");
const msgEl = document.getElementById("msg");
const cursoEl = document.getElementById("curso");
const semCursoEl = document.getElementById("semCurso");
const semCategoriaEl = document.getElementById("semCategoria");

// Habilita/desabilita campos conforme checkboxes
function toggleCategoria() {
  if (!catEl || !semCategoriaEl) return;
  catEl.disabled = semCategoriaEl.checked;
  if (semCategoriaEl.checked) catEl.value = "";
}
function toggleCurso() {
  if (!cursoEl || !semCursoEl) return;
  cursoEl.disabled = semCursoEl.checked;
  if (semCursoEl.checked) cursoEl.value = "";
}

// Liga os toggles uma vez
semCategoriaEl?.addEventListener("change", toggleCategoria);
semCursoEl?.addEventListener("change", toggleCurso);
toggleCategoria();
toggleCurso();

// =========================
// Envia a mensagem formatada no WhatsApp
// =========================
function sendWhatsApp(e) {
  e.preventDefault();

  const nome = (nomeEl?.value || "").trim();
  const categoria = semCategoriaEl?.checked ? "" : (catEl?.value || "").trim();
  const curso = semCursoEl?.checked ? "" : (cursoEl?.value || "").trim();
  const msg = (msgEl?.value || "").trim();

  // Validações básicas
  if (!nome) {
    nomeEl?.focus();
    return;
  }

  // Requisito do cliente: a pessoa pode escolher só curso OU só CNH OU ambos,
  // mas não pode enviar sem nenhum dos dois.
  if (!categoria && !curso) {
    // Mostre a mensagem que preferir (alert simples para ser direto)
    alert("Selecione uma categoria de CNH ou um curso profissionalizante.");
    return;
  }

  // Monta o texto
  let texto = `Olá, meu nome é ${nome}, tudo bem?\n`;

  if (categoria) {
    texto += `Tenho interesse em iniciar minha CNH – Categoria ${categoria}.\n`;
  }
  if (curso) {
    texto += `\nTenho interesse no curso profissional: ${curso}.\n`;
  }

  if (msg) {
    texto += `\nMensagem adicional:\n${msg}\n`;
  }

  texto +=
    `\nPoderia me enviar mais informações sobre valores, prazos e como iniciar o processo?\n` +
    `Aguardo seu retorno. Obrigado(a)!`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    texto
  )}`;
  window.open(url, "_blank", "noopener");
  return false;
}

form?.addEventListener("submit", sendWhatsApp);
