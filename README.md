# 🎲 Noite de Jogos

> *Qual jogo vai acabar com a sua amizade hoje?*

Site descontraído que ajuda grupos de amigos a escolher **o jogo certo para a noite**, filtrando pelo **número de pessoas**, pelo **tipo de jogo** e pelo **nível de caos** (de 1 a 5 dados).

Projeto Final da disciplina **Desenvolvimento de Interfaces**, CEUB, 2º semestre de 2026.
Prof. Dr. Felipe Batista da Silva.

---

## 📌 Status: entrega parcial

| Requisito | Status |
|---|---|
| Cartões (catálogo de jogos) | ✅ |
| Cartões explicativos (medidor de caos e regras de ouro) | ✅ |
| Abas de pesquisa (por número de pessoas) + busca + filtros | ✅ |
| Seção de contato com formulário validado | ✅ |
| Imagens (ilustrações SVG próprias) | ✅ |
| Rodapé | ✅ |
| WCAG e análise de contraste | ✅ |
| Layout responsivo (celular, tablet e desktop) | ✅ |
| Página de login | ⏳ entrega final |
| Carrossel de imagens | ⏳ entrega final |
| Aba de acessibilidade (fontes maiores etc.) | ⏳ entrega final |
| Modo escuro/claro | ⏳ entrega final (as cores já estão em variáveis CSS) |
| Framework CSS (Bootstrap 5.3) | ⏳ entrega final |

### 🔜 Plano para a entrega final: Bootstrap
Na parcial, o site foi escrito todo com código próprio, para mostrar os fundamentos (Grid, Flexbox, variáveis CSS e DOM). Na entrega final, o **Bootstrap 5.3** será integrado para os componentes mais complexos:

| Item | Recurso do Bootstrap |
|---|---|
| Carrossel de imagens | `carousel` |
| Página de login | `modal` + estilos de formulário |
| Modo escuro/claro | `data-bs-theme="dark"` |
| Aba de acessibilidade | `offcanvas` (painel lateral) |

As cores do Bootstrap (`--bs-primary` e outras) serão substituídas pela paleta do site, e o contraste será verificado novamente.

---

## 🗂️ Estrutura de pastas

```
noite-de-jogos/
├── index.html        → estrutura da página (HTML5 semântico)
├── css/
│   └── style.css     → estilos, paleta, responsividade
├── js/
│   └── script.js     → dados dos jogos, filtros, abas, menu e formulário
├── img/              → ilustrações SVG feitas para o projeto
└── README.md
```

---

## 🚀 Como rodar

Não precisa instalar nada.

**Opção 1:** abra o `index.html` no navegador.

**Opção 2 (recomendada):** use um servidor local.
- No VS Code: extensão **Live Server** → botão direito no `index.html` → *Open with Live Server*.
- Ou pelo terminal, dentro da pasta do projeto:
  ```
  python -m http.server 5500
  ```
  e acesse `http://localhost:5500`.

**Online:** GitHub Pages (link no Apêndice do relatório).

---

## 🛠️ Construção passo a passo

### 1. Definição do tema e do público
Público jovem e universitário que se reúne com os amigos e sempre trava na pergunta "vamos jogar o quê?". O tom é informal e bem-humorado: o "medidor de caos" e o "acaba com amizade" vêm daí.

### 2. Paleta de cores e verificação de contraste
A paleta foi escolhida pela psicologia das cores (detalhada na Parte A do relatório) e testada com a fórmula de contraste da WCAG 2.1:

| Cor | Hex | Papel | Psicologia |
|---|---|---|---|
| Azul | `#1D4ED8` | Cor principal, hero, botões | Confiança, foco, estratégia |
| Azul-escuro | `#1E3A8A` | Cabeçalho, rodapé, bordas | Estabilidade, base sólida |
| Amarelo | `#FACC15` | Destaques e chamadas para ação | Alegria, energia, diversão |
| Vermelho | `#B91C1C` | Caos, perigo, erros | Competição, urgência, emoção |
| Creme | `#FFFBEB` | Fundo | Acolhimento, aconchego |
| Grafite | `#1F2937` | Texto | Legibilidade |

**Contrastes medidos** (mínimo AA = 4.5:1 para texto normal; AAA = 7:1):

| Combinação | Razão | AA | AAA |
|---|---|---|---|
| Texto `#1F2937` sobre o creme | **14.16:1** | ✅ | ✅ |
| Texto suave `#4B5563` sobre o creme | **7.29:1** | ✅ | ✅ |
| Branco sobre o azul-escuro | **10.36:1** | ✅ | ✅ |
| Texto escuro sobre o amarelo | **9.59:1** | ✅ | ✅ |
| Branco sobre o azul | **6.70:1** | ✅ | — |
| Azul-escuro sobre o amarelo | **6.76:1** | ✅ | — |
| Branco sobre o vermelho `#B91C1C` | **6.47:1** | ✅ | — |
| ❌ Amarelo sobre o branco | 1.53:1 | reprova | — |
| ❌ Branco sobre o vermelho claro `#EF4444` | 3.76:1 | reprova | — |

Os dois últimos casos mostram **por que** o amarelo nunca é usado como texto sobre fundo claro e por que o vermelho escolhido é o tom mais escuro (`#B91C1C`).

### 3. HTML semântico
- Usei `header`, `nav`, `main`, `section`, `article` e `footer`, cada seção com `aria-labelledby`.
- Há um link "Pular para o conteúdo", para quem navega pelo teclado.
- A hierarquia de títulos é correta (um único `h1`, depois `h2` e `h3`).
- Imagens decorativas usam `alt=""` e imagens informativas têm `alt` descritivo.

### 4. CSS
- **Variáveis CSS** (`:root`) para todas as cores. Isso prepara o terreno para o modo escuro: basta redefinir as variáveis.
- O layout usa **CSS Grid** (cartões, hero, rodapé) e **Flexbox** (menu, abas, informações dos cartões).
- Responsivo com `clamp()`, `auto-fill/minmax` e *media queries* (900px e 860px).
- Visual "de jogo de tabuleiro": bordas grossas, sombras sólidas e leves rotações no *hover*.
- O CSS respeita `prefers-reduced-motion` para quem é sensível a animações.

### 5. JavaScript
- **Dados:** os 14 jogos ficam num array de objetos (`JOGOS`) e os cartões são gerados dinamicamente.
- **Abas:** seguem o padrão WAI-ARIA *Tabs* (`role="tablist"`, `aria-selected`, setas ← →, Home e End).
- **Busca:** ignora acentos ("domino" encontra "Dominó"). O resultado é anunciado a leitores de tela com `aria-live`.
- **Filtros combinados:** número de pessoas, tipo de jogo e "só os que acabam com amizade".
- **Menu mobile:** botão com `aria-expanded`, que fecha com Esc.
- **Formulário:** validação própria com mensagens claras, `aria-invalid` e foco levado ao primeiro erro. Na entrega parcial o envio é simulado, porque ainda não há *back-end*.

### 6. Testes
- Testei no navegador as abas, a busca, os filtros, o estado vazio e o formulário (com erros e com sucesso).
- Conferi o layout em larguras de tablet e celular.
- A fazer antes da entrega: percorrer a página só com o teclado (Tab, Shift+Tab, setas nas abas) e rodar o Lighthouse (Acessibilidade) no Chrome.

---

## ♿ Critérios WCAG aplicados

| Critério | Como foi atendido |
|---|---|
| 1.1.1 Conteúdo não textual | `alt` nas imagens; as decorativas usam `alt=""` |
| 1.3.1 Informação e relações | HTML semântico, `label` em todos os campos, `fieldset`/`legend` |
| 1.4.3 Contraste mínimo | Todas as combinações de texto ≥ 4.5:1 |
| 1.4.11 Contraste não textual | Bordas dos campos `#6B7280` (4.83:1) |
| 2.1.1 Teclado | Tudo funciona sem mouse |
| 2.3.3 Animação por interação | `prefers-reduced-motion` |
| 2.4.1 Ignorar blocos | Link "Pular para o conteúdo" |
| 2.4.7 Foco visível | Contorno azul de 3px em `:focus-visible` |
| 2.5.5 Tamanho do alvo | Botões e campos com no mínimo 44px |
| 3.3.1 Identificação de erros | Mensagem de erro em texto, junto ao campo |
| 3.3.2 Rótulos ou instruções | Rótulos visíveis e dicas de preenchimento |
| 4.1.3 Mensagens de status | `role="status"` / `aria-live` no resultado da busca e no envio |

---

## 🧰 Ferramentas e tecnologias
- HTML5, CSS3 e JavaScript com código próprio (entrega parcial)
- Bootstrap 5.3 (planejado para a entrega final)
- Google Fonts: **Baloo 2** (títulos) e **Nunito** (texto)
- Ilustrações em SVG feitas à mão para o projeto
- VS Code, Git e GitHub, GitHub Pages
- IA: Claude (Anthropic), usada como apoio na estruturação do código e da documentação

---

## 📚 Referências
- W3C. *Web Content Accessibility Guidelines (WCAG) 2.1*. https://www.w3.org/TR/WCAG21/
- W3C. *ARIA Authoring Practices Guide: Tabs Pattern*. https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- WebAIM. *Contrast Checker*. https://webaim.org/resources/contrastchecker/
- NIELSEN, J. *10 Usability Heuristics for User Interface Design*. Nielsen Norman Group. https://www.nngroup.com/articles/ten-usability-heuristics/
- MDN Web Docs. https://developer.mozilla.org/
- HELLER, E. *A Psicologia das Cores*. São Paulo: Gustavo Gili, 2013.
