// =========================
// Atualiza ano no rodapé
// =========================
document.getElementById("year").textContent = new Date().getFullYear();

// Número oficial (formato E.164: 55 + DDD + número)
const WHATSAPP_NUMBER = "5511971529053"; // número da Gold

// Referências de campos
const form = document.getElementById("form-contato");
const nomeEl = document.getElementById("nome");
const catEl = document.getElementById("categoria");
const msgEl = document.getElementById("msg");
const cursoEl = document.getElementById("curso");
const semCursoEl = document.getElementById("semCurso");

// Liga/desliga o select de curso quando marca "não tenho interesse"
function toggleCurso() {
  if (!cursoEl || !semCursoEl) return;
  cursoEl.disabled = semCursoEl.checked;
  if (semCursoEl.checked) cursoEl.value = "";
}
if (cursoEl && semCursoEl) {
  semCursoEl.addEventListener("change", toggleCurso);
  toggleCurso(); // garante estado inicial correto
}

// =========================
// Envia a mensagem formatada no WhatsApp
// =========================
function sendWhatsApp(e) {
  e.preventDefault();

  const nome = (nomeEl?.value || "").trim();
  const categoria = (catEl?.value || "").trim();
  const msg = (msgEl?.value || "").trim();

  // curso só entra se existir select e NÃO estiver marcado "sem curso"
  const semCursoMarcado = !!semCursoEl?.checked;
  const curso = !semCursoMarcado ? (cursoEl?.value || "").trim() : "";

  // (Opcional) validação simples
  if (!nome) {
    nomeEl?.focus();
    return;
  }

  let texto = `Olá, meu nome é ${nome}, tudo bem?\n`;
  texto += `Tenho interesse em iniciar minha CNH – Categoria ${categoria}.\n`;

  // Só menciona curso se um curso foi escolhido e NÃO marcou "sem curso"
  if (curso) {
    texto += `\nTenho interesse também no curso profissional: ${curso}.\n`;
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

// Conecta o formulário
if (form) form.addEventListener("submit", sendWhatsApp);
