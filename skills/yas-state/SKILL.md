---
name: yas-state
shared: [preamble, workflow]
description: >
  Mostra e arruma o estado do projeto: o que está em andamento, o que
  aguarda o aceite da pessoa, bloqueios e decisões pendentes — cruzando o
  `specs/project/STATE.md` com as pastas de feature para achar o que ficou
  desencontrado. Move o que fechou para o lugar certo e, ao pausar, deixa o
  próximo passo escrito no `HANDOFF.md`. Use ao pedir "onde paramos", "o que
  está aberto", "status do projeto", "arruma o estado", "vou parar por hoje",
  ou ao voltar ao projeto depois de uma pausa.
allowed-tools: Read, Glob, Grep, Write, Edit, AskUserQuestion
triggers: [onde paramos, o que está aberto, status do projeto, estado do projeto,
  arrumar o estado, vou parar por hoje, retomar o projeto]
---

# /yas-state — o que está aberto, e o que está esperando você

O `STATE.md` só é útil se for verdade. Esta skill lê o estado, confere com o
que as pastas de feature mostram, e diz o que está aberto — com uma atenção
especial ao que espera a pessoa: feature implementada e não conferida é
trabalho que ninguém sabe se serve.

## Guarda — antes de tudo

A primeira chamada de ferramenta confere um fato: `specs/project/STATE.md`
existe?

- **Não existe.** Pare: o projeto não foi preparado — rode `/yas-start`.
- **Existe.** Siga.

Depois, leia os dois arquivos ao lado deste — `preamble.md` e `workflow.md`.

## Três modos

| Pedido | Modo | Escreve? |
|---|---|---|
| "onde paramos", "o que está aberto", "status" | **ver** | não — responde na conversa |
| "arruma o estado", ou o modo ver achou desencontro | **arrumar** | sim, depois de mostrar |
| "vou parar", "fecha a sessão" | **pausar** | sim, depois de mostrar |

## Ver

1. Leia `specs/project/STATE.md`, `specs/project/HANDOFF.md` e
   `specs/project/ROADMAP.md`.
2. Liste as pastas `specs/NNN-*/` e, para cada uma, quais arquivos ela tem e
   quantas tarefas estão `[x]` e `[ ]`.
3. **Cruze.** Cada linha abaixo é um desencontro, e entra na resposta:

| O que as pastas mostram | O que o estado diz | Desencontro |
|---|---|---|
| todas as tarefas `[x]`, e a última rodada do `acceptance.md` não diz aceita nem dispensada (ou não há arquivo) | não está em "Aguardando aceite" | feature terminada que ninguém mandou conferir |
| feature em "Entregue" no roadmap | — | sem `acceptance.md`, ou com a última rodada dizendo outra coisa que aceita ou dispensada |
| tarefas abertas | não está em "Em andamento" **nem** em "Aguardando aceite" | trabalho sumido do estado |
| contagem de tarefas | a linha diz outro número | linha velha |
| última rodada do `acceptance.md` diz "não aceita" ou "em aberto" | a feature saiu de "Aguardando aceite" | aceite pulado |

Tarefa riscada não entra em contagem nenhuma. Feature em "Aguardando aceite"
com tarefas abertas **não** é desencontro: são as correções que o aceite
devolveu.

4. Responda, nesta ordem, em poucas linhas:
   - **aguardando você** — o que está em "Aguardando aceite", com a data; o
     mais antigo primeiro;
   - **em andamento** — feature e quantas tarefas faltam;
   - **bloqueios e decisões pendentes**;
   - **desencontros**, se houver;
   - o tamanho do `STATE.md`, se passou do teto da seção 6 do `workflow.md`.

**O aceite vem antes de começar coisa nova.** Se há feature aguardando e a
pessoa quer abrir outra, diga isso uma vez, com o motivo: feature não
conferida acumula, e a correção fica mais cara quanto mais tempo passa. Não
bloqueie.

## Arrumar

Siga a tabela de destinos da seção 6 do `workflow.md`. Para cada item que
muda de lugar, mostre: de onde sai, para onde vai, e o texto. Espere a
aprovação e só então grave.

Três limites:

- **Nada sai de "Aguardando aceite" sem o aceite.** Se a pessoa disser que
  já conferiu, o caminho é `/yas-accept`, que registra — não apagar a linha.
- **Desencontro se corrige para o lado do fato.** As pastas e os arquivos de
  feature são o fato; o `STATE.md` é que se ajusta. Se o fato é ambíguo,
  pergunte.
- **Não reconstrua histórico.** O que já saiu do estado não volta.

Atualize a data de "Atualizado em".

## Pausar

1. Faça o modo ver, em silêncio, para saber o que está aberto.
2. Proponha o texto de "Próximo passo" no `HANDOFF.md`: **uma** ação, que
   alguém executa sem contexto — "rodar `/yas-implement` na `004-password-reset`,
   a partir da T006".
3. Pergunte se houve lição nesta sessão — algo que deu errado e custou
   tempo. Se houver, proponha a linha para "O que aprendemos errando".
4. Mostre as mudanças, espere a aprovação, grave. Atualize a data do
   `STATE.md`.

## O que esta skill não faz

- Não escreve em `specs/NNN-*/` — spec, plano, tarefas e aceite têm as suas
  skills.
- Não dá aceite, não fecha feature, não apaga decisão pendente sem resposta.
- No modo ver, não grava nada.

## Fechamento

Como no `preamble.md`; no modo ver, "o que ficou gravado" é "nada". A tarefa
única segue esta ordem — a primeira que existir:

1. feature aguardando aceite — **rodar `/yas-accept`** nela; se ela tem
   tarefa de correção aberta, **rodar `/yas-implement`** primeiro;
2. desencontro — arrumar o estado;
3. bloqueio — o que o destrava;
4. feature em andamento — o próximo passo dela;
5. nada aberto — **rodar `/yas-specify`** para a próxima feature do roadmap.
