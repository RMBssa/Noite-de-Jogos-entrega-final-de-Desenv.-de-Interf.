/* =========================================================
   NOITE DE JOGOS – Script principal
   1. Dados dos jogos
   2. Renderização dos cartões
   3. Abas + busca + filtros
   4. Menu mobile
   5. Validação do formulário de contato
   ========================================================= */

/* ---------- 1. Dados ---------- */
// min/max = número de jogadores; caos = 1 a 5
const JOGOS = [
  { nome: "Uno", tipo: "cartas", min: 2, max: 10, tempo: "30 min", caos: 4,
    desc: "O clássico do +4 em cima do +4. Ninguém lembra de gritar \"Uno\" a tempo." },
  { nome: "Truco", tipo: "cartas", min: 2, max: 4, tempo: "30 min", caos: 5,
    desc: "Blefe, gritaria e \"seis, ladrão!\". Patrimônio nacional da treta." },
  { nome: "Exploding Kittens", tipo: "cartas", min: 2, max: 5, tempo: "15 min", caos: 5,
    desc: "Roleta-russa com gatinhos explosivos. Rápido, cruel e viciante." },
  { nome: "Jaipur", tipo: "cartas", min: 2, max: 2, tempo: "30 min", caos: 2,
    desc: "Duelo de comerciantes com camelos. Perfeito para o date de sábado." },
  { nome: "Catan", tipo: "tabuleiro", min: 3, max: 4, tempo: "90 min", caos: 4,
    desc: "\"Troco trigo por ovelha\". Começa amigável, termina em bloqueio de estrada." },
  { nome: "Ticket to Ride", tipo: "tabuleiro", min: 2, max: 5, tempo: "60 min", caos: 2,
    desc: "Construa rotas de trem pelo mapa. Tranquilo… até alguém roubar a sua rota." },
  { nome: "Dominó", tipo: "tabuleiro", min: 2, max: 4, tempo: "20 min", caos: 2,
    desc: "O jogo da praça. Bater a pedra na mesa com força é obrigatório." },
  { nome: "Patchwork", tipo: "tabuleiro", min: 2, max: 2, tempo: "30 min", caos: 1,
    desc: "Monte uma colcha de retalhos. O jogo mais fofo e pacífico do acervo." },
  { nome: "Lobisomem", tipo: "festa", min: 6, max: 20, tempo: "30 min", caos: 5,
    desc: "Mentir olhando nos olhos do seu melhor amigo. Confiança nunca mais." },
  { nome: "Mímica", tipo: "festa", min: 4, max: 20, tempo: "livre", caos: 4,
    desc: "Sem falar nada, faça o seu time adivinhar \"O Poderoso Chefão\". Boa sorte." },
  { nome: "Quem Sou Eu?", tipo: "festa", min: 3, max: 12, tempo: "20 min", caos: 3,
    desc: "Papel na testa e perguntas de sim ou não. Risada garantida." },
  { nome: "Codenames", tipo: "palavras", min: 4, max: 8, tempo: "15 min", caos: 3,
    desc: "Dê dicas de uma palavra só para o seu time. Ninguém entende as suas dicas." },
  { nome: "Dixit", tipo: "palavras", min: 3, max: 8, tempo: "30 min", caos: 2,
    desc: "Cartas com ilustrações lindas e dicas poéticas. O jogo mais criativo daqui." },
  { nome: "Adedonha (Stop)", tipo: "palavras", min: 2, max: 10, tempo: "20 min", caos: 3,
    desc: "Fruta com X? Vale ou não vale? A discussão dura mais que a rodada." }
];

const NOMES_TIPO = { cartas: "Cartas", tabuleiro: "Tabuleiro", festa: "Festa", palavras: "Palavras" };
const ROTULOS_CAOS = ["", "Paz e amor", "Tranquilo", "Tá esquentando", "Grito garantido", "Acaba com amizade"];

/* ---------- Estado dos filtros ---------- */
const filtros = { pessoas: "todos", texto: "", tipo: "todos", soCaos: false };

/* ---------- Elementos ---------- */
const lista = document.getElementById("lista-jogos");
const vazio = document.getElementById("vazio");
const resultado = document.getElementById("resultado-busca");
const abas = document.querySelectorAll('[role="tab"]');
const inputBusca = document.getElementById("busca-texto");
const selectTipo = document.getElementById("busca-tipo");
const checkCaos = document.getElementById("busca-caos");

/* ---------- 2. Renderização ---------- */
function textoJogadores(j) {
  return j.min === j.max ? `${j.min} pessoas` : `${j.min} a ${j.max} pessoas`;
}

function criarCartao(jogo, indice) {
  const artigo = document.createElement("article");
  artigo.className = `cartao cartao--${jogo.tipo}`;
  artigo.style.animationDelay = `${indice * 40}ms`;

  const dados = Array.from({ length: 5 }, (_, i) =>
    `<span class="caos__dado${i < jogo.caos ? " caos__dado--on" : ""}"></span>`
  ).join("");

  artigo.innerHTML = `
    <div class="cartao__topo">
      <span class="cartao__tipo">${NOMES_TIPO[jogo.tipo]}</span>
      ${jogo.caos === 5 ? '<span class="cartao__selo">🔥 Perigo</span>' : ""}
      <img src="img/tipo-${jogo.tipo}.svg" alt="" width="96" height="96">
    </div>
    <div class="cartao__corpo">
      <h3>${jogo.nome}</h3>
      <p class="cartao__desc">${jogo.desc}</p>
      <ul class="cartao__info">
        <li>👥 ${textoJogadores(jogo)}</li>
        <li>⏱️ ${jogo.tempo}</li>
      </ul>
      <div class="caos">
        <span class="caos__dados" aria-hidden="true">${dados}</span>
        <span>Caos ${jogo.caos}/5 · ${ROTULOS_CAOS[jogo.caos]}</span>
      </div>
    </div>`;
  return artigo;
}

/* ---------- 3. Filtros ---------- */
// Remove acentos para a busca achar "domino" e "Dominó"
function normalizar(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function combinaPessoas(j) {
  switch (filtros.pessoas) {
    case "dupla":  return j.min <= 2 && j.max >= 2;
    case "turma":  return j.min <= 5 && j.max >= 3;
    case "galera": return j.max >= 6;
    default:       return true;
  }
}

function aplicarFiltros() {
  const termo = normalizar(filtros.texto);
  const encontrados = JOGOS.filter(j =>
    combinaPessoas(j) &&
    (filtros.tipo === "todos" || j.tipo === filtros.tipo) &&
    (!filtros.soCaos || j.caos === 5) &&
    (termo === "" || normalizar(j.nome + " " + j.desc).includes(termo))
  );

  lista.innerHTML = "";
  encontrados.forEach((j, i) => lista.appendChild(criarCartao(j, i)));

  vazio.hidden = encontrados.length > 0;
  resultado.textContent = encontrados.length === 1
    ? "1 jogo encontrado"
    : `${encontrados.length} jogos encontrados`;
}

// Abas: clique + navegação por setas (padrão WAI-ARIA)
function selecionarAba(aba) {
  abas.forEach(a => {
    const ativa = a === aba;
    a.setAttribute("aria-selected", ativa);
    a.tabIndex = ativa ? 0 : -1;
  });
  lista.setAttribute("aria-labelledby", aba.id);
  filtros.pessoas = aba.dataset.filtro;
  aplicarFiltros();
}

abas.forEach((aba, i) => {
  aba.addEventListener("click", () => selecionarAba(aba));
  aba.addEventListener("keydown", e => {
    let alvo = null;
    if (e.key === "ArrowRight") alvo = abas[(i + 1) % abas.length];
    if (e.key === "ArrowLeft")  alvo = abas[(i - 1 + abas.length) % abas.length];
    if (e.key === "Home")       alvo = abas[0];
    if (e.key === "End")        alvo = abas[abas.length - 1];
    if (alvo) { e.preventDefault(); alvo.focus(); selecionarAba(alvo); }
  });
});

inputBusca.addEventListener("input", e => { filtros.texto = e.target.value; aplicarFiltros(); });
selectTipo.addEventListener("change", e => { filtros.tipo = e.target.value; aplicarFiltros(); });
checkCaos.addEventListener("change", e => { filtros.soCaos = e.target.checked; aplicarFiltros(); });

/* ---------- Contador animado do hero ---------- */
function animarContador(el, fim) {
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduzir) { el.textContent = fim; return; }
  let atual = 0;
  const passo = () => {
    atual++;
    el.textContent = atual;
    if (atual < fim) setTimeout(passo, 60);
  };
  passo();
}

/* ---------- 4. Menu mobile ---------- */
const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu-principal");

botaoMenu.addEventListener("click", () => {
  const aberto = botaoMenu.getAttribute("aria-expanded") === "true";
  botaoMenu.setAttribute("aria-expanded", !aberto);
  botaoMenu.querySelector(".sr-only").textContent = aberto ? "Abrir menu" : "Fechar menu";
  menu.classList.toggle("aberto", !aberto);
});

// Fecha o menu ao clicar em um link ou apertar Esc
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", fecharMenu));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && menu.classList.contains("aberto")) { fecharMenu(); botaoMenu.focus(); }
});
function fecharMenu() {
  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.querySelector(".sr-only").textContent = "Abrir menu";
  menu.classList.remove("aberto");
}

/* ---------- 5. Formulário de contato ---------- */
const form = document.getElementById("form-contato");
const statusForm = document.getElementById("form-status");

const regras = {
  nome:     v => v.trim().length >= 2 || "Diga seu nome (pelo menos 2 letras).",
  email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Digite um e-mail válido, como nome@exemplo.com.",
  assunto:  v => v !== "" || "Escolha um assunto.",
  mensagem: v => v.trim().length >= 10 || "A mensagem precisa ter pelo menos 10 caracteres."
};

function validarCampo(campo) {
  const res = regras[campo.name](campo.value);
  const erro = document.getElementById(`erro-${campo.name}`);
  if (res === true) {
    campo.removeAttribute("aria-invalid");
    erro.textContent = "";
    return true;
  }
  campo.setAttribute("aria-invalid", "true");
  erro.textContent = res;
  return false;
}

// Valida ao sair do campo (sem incomodar enquanto a pessoa digita)
Object.keys(regras).forEach(nome => {
  const campo = form.elements[nome];
  campo.addEventListener("blur", () => { if (campo.value) validarCampo(campo); });
  campo.addEventListener("input", () => { if (campo.getAttribute("aria-invalid")) validarCampo(campo); });
});

form.addEventListener("submit", e => {
  e.preventDefault();
  statusForm.className = "formulario__status";

  const campos = Object.keys(regras).map(n => form.elements[n]);
  const invalidos = campos.filter(c => !validarCampo(c));

  if (invalidos.length) {
    statusForm.textContent = `Corrija ${invalidos.length === 1 ? "1 campo" : invalidos.length + " campos"} antes de enviar.`;
    invalidos[0].focus(); // leva o foco ao primeiro erro (WCAG 3.3.1)
    return;
  }

  // Na entrega parcial não há back-end: simulamos o envio
  const nome = form.elements.nome.value.trim().split(" ")[0];
  statusForm.textContent = `Valeu, ${nome}! Sua mensagem chegou na mesa. 🎲`;
  statusForm.classList.add("formulario__status--ok");
  form.reset();
});

/* ---------- Inicialização ---------- */
document.getElementById("ano").textContent = new Date().getFullYear();
animarContador(document.querySelector('[data-contador="jogos"]'), JOGOS.length);
aplicarFiltros();
