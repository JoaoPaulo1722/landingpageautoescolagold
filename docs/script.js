// =========================
// Atualiza ano no rodapé
// =========================
document.getElementById("year").textContent = new Date().getFullYear();

// Número oficial (formato E.164: 55 + DDD + número)
const WHATSAPP_NUMBER = "5511955009362"; // ajuste se precisar

// Se seu form tiver id="form-contato", já conecta o submit
const form = document.getElementById("form-contato");
if (form) form.addEventListener("submit", sendWhatsApp);

// =========================
// Envia os dados do mini-form para o WhatsApp
// =========================
function sendWhatsApp(e) {
  if (e) e.preventDefault();

  const nome = (document.getElementById("nome")?.value || "").trim();
  const tel = (document.getElementById("tel")?.value || "").trim();
  const cat = (document.getElementById("categoria")?.value || "").trim();
  const msg = (document.getElementById("msg")?.value || "").trim();

  // só dígitos no telefone
  const telLimp = tel.replace(/\D/g, "");

  // use \n em vez de %0A
  let texto = `Olá, meu nome é ${nome}, tudo bem? \n`;
  texto += `Tenho interesse em iniciar minha CNH – Categoria ${cat}.\n`;

  if (msg) texto += `\nMensagem adicional:\n${msg}\n`;

  texto += `\nPoderia me enviar mais informações sobre valores, prazos e como iniciar o processo?\n`;
  texto += `Aguardo seu retorno. Obrigado(a)!`;

  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    texto
  )}`;
  window.open(link, "_blank", "noopener");

  return false;
}
