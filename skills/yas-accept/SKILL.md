---
name: yas-accept
shared: [preamble, workflow]
references: [script]
description: >
  Conduz o aceite de uma feature implementada — em inglês, UAT, User
  Acceptance Testing: o momento em que a pessoa que pediu usa o produto e diz
  se é aquilo. Monta o roteiro a partir dos requisitos da spec, recolhe a
  resposta da pessoa item por item e grava `specs/NNN-nome/acceptance.md`.
  Aceita, a feature vai para "Entregue"; o que falhou volta como tarefa. O
  agente nunca dá o aceite sozinho. Use ao pedir "vamos conferir a feature",
  "quero testar o que foi feito", "aceite", "UAT", depois de terminar a
  implementação, ou para registrar uma mudança pequena como conferida.
allowed-tools: Read, Glob, Grep, Write, Edit, AskUserQuestion
triggers: [aceite, uat, conferir a feature, testar o que foi feito, accept,
  homologar, aprovar a entrega]
---

# /yas-accept — é isso que você pediu?

Teste automático confere que o código faz o que o código diz. O aceite
confere que o código faz o que **a pessoa** queria. Só ela responde isso, e
só usando o produto.

Seu papel é preparar o caminho — um roteiro claro, o produto aberto — e
registrar fielmente o que ela disser.

## A regra desta skill

**Você nunca dá o aceite.** Nem quando os testes passam, nem quando você
mesmo consegue abrir o produto e ver a tela certa, nem quando a pessoa
demora a responder. Item sem resposta dela fica sem resposta. Sem resposta,
a feature continua aguardando.

## Guarda — antes de tudo

A primeira chamada de ferramenta confere um fato: o que está em "Aguardando
aceite" no `specs/project/STATE.md`?

Escolha o item: o que o pedido nomeia; se não nomeia e só um aguarda, é ele;
se há mais de um, pergunte. Sendo uma feature, confira mais um fato: o
`tasks.md` dela ainda tem alguma linha `- [ ]`?

| Achou | O que fazer |
|---|---|
| sem `STATE.md` | pare: o passo anterior é `/yas-start` |
| a feature pedida não está em "Aguardando aceite" | pare: a implementação não foi fechada — o passo anterior é `/yas-implement` |
| feature aguardando, com tarefa aberta | pare: há correção por fazer — o passo anterior é `/yas-implement` |
| feature aguardando, com todas as tarefas feitas | **feature** — siga o caminho abaixo |
| linha que começa com `mudança:` | **mudança pequena** — vá para a seção dela |
| nada aguardando | diga isso, e mostre o que está em andamento; não invente um aceite |

Depois, leia os dois arquivos ao lado deste — `preamble.md` e `workflow.md`.
A seção 7 do `workflow.md` tem o modelo do registro.

## O caminho

| | Passo | Onde está |
|---|---|---|
| 1 | Ler a spec e o aceite anterior | aqui |
| 2 | Montar o roteiro | `references/script.md` |
| 3 | A pessoa abre o produto e confere | `references/script.md` |
| 4 | Registrar cada resposta | aqui |
| 5 | A decisão, e para onde a feature vai | aqui |
| 6 | Fechamento | `preamble.md` |

### 1. Ler

- a `spec.md` da feature — os requisitos e o "Como conferir" de cada um;
- `acceptance.md`, se já existir: é uma rodada nova, e o roteiro começa pelo
  que falhou antes;
- o `HANDOFF.md`, na parte de religar o ambiente — a pessoa vai precisar
  abrir o produto.

**Requisito sem "Como conferir"** — spec escrita antes desta regra, ou que
escapou — não se inventa na hora. Proponha os passos, diga que é proposta,
e a pessoa confirma antes de conferir.

### 2 e 3. Roteiro e conferência

Leia `references/script.md` e siga: como montar o roteiro, como ajudar a
pessoa a abrir o produto, como receber as respostas.

### 4. Registrar

Cada item recebe exatamente um resultado, **dito pela pessoa**:

| Resultado | Quando | O que vai na observação |
|---|---|---|
| `passou` | ela fez os passos e viu o que devia ver | nada, ou o comentário dela |
| `falhou` | viu outra coisa, ou não conseguiu fazer um passo | **o que ela viu**, com as palavras dela |
| `não conferido` | não deu para fazer agora | o motivo — falta dado, falta acesso, falta tempo |

"Funcionou mais ou menos" é `falhou`, com a observação. Pergunte o que faltou.

Comentário que não é sobre o requisito — "seria bom ter um filtro aqui" —
não reprova o item. Anote como ideia, separada, e diga que vira spec nova se
ela quiser.

### 5. A decisão

| Situação | Decisão |
|---|---|
| todo item do aceite `passou` | **aceita** |
| algum item `falhou` | **não aceita** |
| nada falhou, mas algum ficou `não conferido` | **em aberto** — continua aguardando |
| a pessoa pediu para pular o aceite | **dispensada** — com quem e por quê, nas palavras dela |

Mostre o registro e pergunte: **Aprovar · Revisar · Recomeçar**. Com a
aprovação, grave `specs/NNN-nome/acceptance.md` no modelo da seção 7 do
`workflow.md`. Rodada nova entra no fim do arquivo, com a data e quem
conferiu; a anterior nunca é apagada.

E leve a feature para onde ela vai:

- **aceita ou dispensada** — no `STATE.md`, tire a linha de "Aguardando
  aceite"; no `ROADMAP.md`, em "Entregue", acrescente
  `<AAAA-MM-DD> · NNN-nome`; mude o status da `spec.md` para "entregue".
- **não aceita** — para cada item que falhou, acrescente uma tarefa ao
  `tasks.md`, numa fase "Correções do aceite", com `origem: aceite de
  <AAAA-MM-DD>` e o que a pessoa viu. Mostre as tarefas antes de gravar. A
  feature continua em "Aguardando aceite".
- **em aberto** — nada muda de lugar. No `STATE.md`, a linha da feature diz o
  que ficou por conferir.

## Mudança pequena

Sem pasta e sem arquivo. A linha em "Aguardando aceite" diz o que mudou.
Pergunte à pessoa, uma vez, se ela conferiu e o que viu.

- **Passou** — tire a linha do `STATE.md` e diga que a resposta vai na
  mensagem do commit ou na descrição do pull request; sugira a frase.
- **Falhou** — a linha fica, com o que ela viu.

## O que esta skill não faz

- Não roda o produto nem comando nenhum. Explica como abrir, como criar um
  dado de teste pelo produto, o que um passo quer dizer.
- Não corrige o que falhou — cria a tarefa; corrigir é `/yas-implement`.
- Não muda requisito. Se a pessoa descobriu que pediu errado, isso é spec
  nova ou revisão da spec, com `/yas-specify`.

## Fechamento

Como no `preamble.md`. A tarefa única:

- **aceita** — juntar o trabalho na branch principal: a pessoa abre o pull
  request da feature, ou faz o merge se ele já existe. Esta skill não faz
  nenhum dos dois;
- **não aceita** — **rodar `/yas-implement`** para as tarefas de correção;
- **em aberto** — conferir o primeiro item que ficou de fora, e rodar esta
  skill de novo.
