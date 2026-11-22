---
name: yas-specify
shared: [preamble, workflow]
references: [clarify, spec-template]
description: >
  Escreve a especificação de uma feature — o que vai ser construído, para
  quem e por quê, antes de qualquer código — por conversa. Cria a pasta
  numerada `specs/NNN-nome/` e grava `spec.md`, com requisitos numerados e,
  para cada um, como a pessoa confere que ele foi cumprido. Não escolhe
  tecnologia: isso é o plano. Use ao pedir "quero uma feature nova",
  "especifica isto", "escreve a spec de", "vamos construir X", ou para
  revisar a spec de uma feature que ainda não foi planejada.
allowed-tools: Read, Glob, Grep, Write, Edit, AskUserQuestion
triggers: [especificar, nova feature, escrever a spec, specify, quero construir,
  revisar a spec]
---

# /yas-specify — o que vai ser construído, e por quê

A spec descreve a feature do ponto de vista de quem usa: o problema, o que a
pessoa passa a conseguir fazer e como ela confere que funcionou. Ela não diz
**como** construir — banco, biblioteca, tela por tela é assunto do plano.

Quem decide o que entra é a pessoa. Você pergunta, organiza e aponta o que
está vago.

## Guarda — antes de tudo

A primeira chamada de ferramenta confere dois fatos:

1. `specs/constitution.md` existe?
2. quais pastas de `specs/` começam com três dígitos?

- **Sem constituição.** Pare. A spec é escrita sob as leis do projeto, e elas
  ainda não existem: o passo anterior é rodar `/yas-constitution`.
- **Com constituição.** Siga. A lista de pastas serve para a numeração e para
  saber se o pedido é de uma feature que já existe.

Depois, leia os dois arquivos ao lado deste — `preamble.md` e `workflow.md`.

## Nova ou revisão?

| O pedido | Modo |
|---|---|
| uma feature que ainda não tem pasta | **nova** — siga o caminho abaixo |
| mudar a spec de uma feature que já tem pasta | **revisão** — vá para "Revisar" |

Não deu para saber? Mostre as pastas que existem e pergunte uma vez.

## O caminho

| | Passo | Onde está |
|---|---|---|
| 1 | Entender o pedido e o contexto | aqui |
| 2 | É mesmo uma feature? | aqui |
| 3 | A conversa, um assunto por vez | `references/clarify.md` |
| 4 | Nome e número da pasta | `workflow.md`, seção 3 |
| 5 | Montar a spec | `references/spec-template.md` |
| 6 | Conferência antes de gravar | aqui |
| 7 | Aprovar · Revisar · Recomeçar, e gravar | aqui |
| 8 | Fechamento | `preamble.md` |

### 1. O pedido e o contexto

Leia, sem perguntar:

- a constituição inteira — a regra de ouro e o estágio do produto mudam o
  que cabe numa feature;
- `specs/project/PROJECT.md`, se existir — principalmente "Fora de escopo";
- `specs/project/STATE.md` — há feature em andamento ou aguardando aceite?
- `specs/canvas/`, se existir — o que já foi decidido sobre o produto.

Diga em até três linhas o que entendeu do pedido, nas palavras da pessoa.

**Tome posição cedo.** Se o pedido bate de frente com "Fora de escopo", com a
regra de ouro ou com um princípio INEGOCIÁVEL, diga isso agora, antes da
conversa: qual texto, e o caminho — mudar o pedido ou emendar o documento.

**Feature aguardando aceite** é sinal de trabalho entregue e não conferido.
Diga em uma linha; não bloqueie.

### 2. É mesmo uma feature?

Duas situações em que a spec não é o caminho:

- **Mudança pequena** — até uns três arquivos, sem decisão nova. Diga que ela
  não precisa de spec: dá para pedir direto ao agente, e a constituição e o
  aceite de uma linha continuam valendo (`workflow.md`, seção 7). A pessoa
  decide; se ela quiser a spec mesmo assim, siga.
- **Grande demais** — mais de um fluxo que alguém usaria sozinho, ou mais de
  uns sete requisitos. Proponha dividir em features, cada uma com a sua pasta,
  e comece pela que entrega algo usável primeiro. Feature que só funciona
  quando a próxima ficar pronta não é fatia: é metade.

### 3. A conversa

Leia `references/clarify.md` e conduza. O objetivo é chegar a requisitos que
a pessoa consegue conferir sozinha, usando o produto.

Pergunta de tecnologia ("que banco?", "React ou não?") **não** é desta
conversa. Se a pessoa trouxer, anote como restrição para o plano e siga.

### 4. Nome e número

Siga a seção 3 do `workflow.md`. Proponha o nome curto em inglês, com o
número, e confirme junto com o resumo do passo 7 — não abra uma pergunta só
para isso.

### 5. Montar

Leia `references/spec-template.md` e monte. O que a pessoa não respondeu fica
em "A esclarecer" — **nunca** preenchido com suposição sua.

### 6. Conferência antes de gravar

- [ ] Todo requisito tem `REQ-NNN`, e diz o que o sistema faz, não como?
- [ ] Todo requisito tem "Como conferir" com passos que a pessoa segue no
      produto e um "Deve ver" concreto — ou está marcado, com motivo, como
      fora do aceite?
- [ ] Algum nome de biblioteca, banco ou linguagem entrou no texto? Tire, e
      leve para a seção de restrições se a pessoa exigiu.
- [ ] "Fora desta feature" tem pelo menos um item?
- [ ] Algum número, prazo ou volume foi escrito sem a pessoa ter dito?
- [ ] O que ficou sem resposta está em "A esclarecer"?

### 7. Mostrar, decidir, gravar

Mostre **o resumo**: o problema em uma linha, os requisitos pelo nome, o que
ficou fora, o que está a esclarecer, e a pasta que vai ser criada. Pergunte:
**Aprovar · Revisar · Recomeçar**.

- **Aprovar:** crie `specs/NNN-nome/spec.md`, com status "aprovada". Em
  `specs/project/STATE.md`, em "Em andamento", acrescente
  `NNN-nome — especificada, falta o plano`. Se sobrou item a esclarecer, diga
  que o plano não começa enquanto ele existir.
- **Revisar:** pergunte o quê, ajuste, mostre de novo.
- **Recomeçar:** volte ao assunto que a pessoa indicar.

## Revisar

A feature já tem pasta. Leia a `spec.md` inteira e pergunte **o que mudou** —
no produto, no que a pessoa aprendeu, no pedido.

1. **Mostre o antes e o depois** de cada trecho, e espere a aprovação.
2. **Requisito não se renumera.** Requisito que sai fica no arquivo, riscado,
   com uma linha dizendo por quê; requisito novo pega o próximo número.
   Plano e tarefas citam esses números.
3. **Se já existe `plan.md`**, diga que o plano foi escrito para a spec antiga
   e liste os requisitos que mudaram. Não altere o plano: o caminho é rodar
   `/yas-plan` de novo, em modo de revisão.
4. **Se a feature já tem código**, diga que a mudança vira trabalho novo:
   requisito novo, tarefa nova. Nada de reescrever a história.

## O que esta skill não faz

- Não escolhe tecnologia, não desenha tela, não estima prazo.
- Não cria branch, não escreve código, não commita.
- Não escreve fora de `specs/NNN-nome/spec.md` e da linha do `STATE.md`.

## Fechamento

Como no `preamble.md`. A tarefa única:

- spec aprovada e sem item a esclarecer — **rodar `/yas-plan`**, que lê a spec
  e a constituição e decide como construir;
- com item a esclarecer — responder o primeiro deles, e rodar esta skill de
  novo para registrar.
