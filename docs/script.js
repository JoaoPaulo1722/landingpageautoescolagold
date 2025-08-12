// =========================
// Atualiza ano no rodapé
// =========================
document.getElementById("year").textContent = new Date().getFullYear();

// Número oficial (formato E.164: 55 + DDD + número)
const WHATSAPP_NUMBER = "5511971529053"; // número da Gold

// Conecta o formulário
const form = document.getElementById("form-contato");
if (form) form.addEventListener("submit", sendWhatsApp);

// =========================
// Envia a mensagem formatada no WhatsApp
// =========================
function sendWhatsApp(e) {
  e.preventDefault();

  const nome = (document.getElementById("nome")?.value || "").trim();
  const categoria = (document.getElementById("categoria")?.value || "").trim();
  const msg = (document.getElementById("msg")?.value || "").trim();

  let texto = `Olá, meu nome é ${nome}, tudo bem?\n`;
  texto += `Tenho interesse em iniciar minha CNH – Categoria ${categoria}.\n`;

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
