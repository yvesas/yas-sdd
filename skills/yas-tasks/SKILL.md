---
name: yas-tasks
shared: [preamble, workflow]
references: [tasks-template]
description: >
  Quebra o plano de uma feature em tarefas pequenas e ordenadas, cada uma com
  o que muda, o requisito ou a decisão de onde veio e um "pronto quando" que
  se confere. Antes de gravar, cruza spec, plano e tarefas: requisito sem
  tarefa, tarefa sem origem e decisão esquecida aparecem. Grava
  `specs/NNN-nome/tasks.md`. Use ao pedir "divide em tarefas", "quebra o
  plano", "faz a lista de tarefas", depois de aprovar um plano, ou quando o
  plano mudou e as tarefas ficaram velhas.
allowed-tools: Read, Glob, Grep, Write, Edit, AskUserQuestion
triggers: [dividir em tarefas, lista de tarefas, quebrar o plano, tasks,
  revisar as tarefas]
---

# /yas-tasks — o plano em passos que se conferem

Cada tarefa é um passo que um agente faz numa sentada e que alguém confere
sem adivinhar: diz o que muda, de onde veio e como se sabe que acabou. A
lista também é o termômetro da feature — quantas faltam está nela.

## Guarda — antes de tudo

A primeira chamada de ferramenta confere dois fatos:

1. quais pastas `specs/NNN-*/` têm `plan.md`, e quais têm `tasks.md`?
2. o `plan.md` da feature escolhida tem a seção "Portão da constituição"?

| Achou | O que fazer |
|---|---|
| nenhuma feature com plano | pare: o passo anterior é `/yas-plan` |
| plano sem o portão | pare: o plano não passou pela constituição — rode `/yas-plan` de novo |
| plano pronto, sem tarefas | **novo** — siga |
| plano pronto, com tarefas | **revisão** — vá para "Revisar" |

Qual feature? A que o pedido nomeia; se não nomeia e só uma serve, é ela —
diga em uma linha; se há mais de uma, pergunte.

Depois, leia os dois arquivos ao lado deste — `preamble.md` e `workflow.md`.

## O caminho

| | Passo | Onde está |
|---|---|---|
| 1 | Ler spec e plano | aqui |
| 2 | Quebrar em tarefas | `references/tasks-template.md` |
| 3 | Ordenar: a primeira fatia usável vem primeiro | aqui |
| 4 | Cruzar spec, plano e tarefas | aqui |
| 5 | Aprovar · Revisar · Recomeçar, e gravar | aqui |
| 6 | Fechamento | `preamble.md` |

### 1. Ler

A `spec.md` e o `plan.md` da feature, inteiros, e a tabela de comandos da
constituição. Não precisa reler o código: o plano já diz o que muda.

### 2. Quebrar

Leia `references/tasks-template.md`. Quatro regras de tamanho e de conteúdo:

- **Uma tarefa, um assunto, um commit.** Se a descrição precisa de "e
  também", são duas.
- **O teste vem na mesma tarefa** que o código que ele cobre. Tarefa "escrever
  os testes" no fim da lista é o que a constituição proíbe.
- **Todo arquivo citado vem do plano.** Arquivo que o plano não lista é sinal
  de que o plano está incompleto — anote no passo 4, não invente.
- **"Pronto quando" é um fato**: um teste que passa, uma tela que mostra algo,
  um comando com saída zero. "Implementado" não é fato.

Decisão marcada "vira ADR" no plano ganha uma tarefa própria: escrever o
registro em `docs/adr/`, junto da tarefa que a põe no código.

### 3. Ordenar

A ordem é a de dependência, com uma preferência por cima: **a primeira fase
entrega algo que alguém consegue usar**, de ponta a ponta, mesmo que pequeno.
Fazer todo o banco, depois toda a lógica, depois toda a tela deixa a feature
inteira inútil até a última tarefa.

Divida em fases quando houver mais de umas oito tarefas. Cada fase termina
num ponto em que o produto funciona.

### 4. Cruzar

Antes de mostrar, confira e anote o que achar:

| Conferência | Se falhar |
|---|---|
| todo `REQ` da spec tem pelo menos uma tarefa | requisito esquecido: crie a tarefa, ou diga que o plano não o atende |
| toda tarefa cita um `REQ` ou um `D` | tarefa sem origem: tire, ou diga o que falta no plano |
| toda decisão do plano aparece em alguma tarefa | decisão esquecida |
| todo arquivo de "O que muda no código" aparece em alguma tarefa | arquivo esquecido |
| nenhuma tarefa mexe em arquivo que o plano não lista | o plano está incompleto |

Furo que se resolve **dentro** do plano, você resolve e diz. Furo que pede
decisão nova — ou requisito novo — volta para a pessoa: o caminho é
`/yas-plan` ou `/yas-specify` em revisão. Não tape com tarefa inventada.

### 5. Mostrar, decidir, gravar

Mostre **o resumo**: quantas tarefas, as fases com o que cada uma entrega, e
os furos do passo 4. Pergunte: **Aprovar · Revisar · Recomeçar**.

- **Aprovar:** grave `specs/NNN-nome/tasks.md`. No `STATE.md`, troque a linha
  da feature por `NNN-nome — 0 de N tarefas`.
- **Revisar:** pergunte o quê, ajuste, cruze de novo.
- **Recomeçar:** volte ao passo que a pessoa indicar.

## Revisar

As tarefas existem e o plano mudou. Leia as duas coisas e mostre o que
muda. (As correções que o aceite devolve são escritas pelo próprio aceite;
esta skill não as reescreve.)

- **Tarefa feita (`[x]`) nunca é desmarcada nem apagada.** Se o plano mudou o
  que ela fez, entra tarefa nova que corrige.
- **Tarefa não feita** que perdeu a origem fica riscada, com o motivo.
- **Número não se reusa.** Tarefa nova pega o próximo.

Mostre o antes e o depois e espere a aprovação.

## O que esta skill não faz

- Não escreve código, não estima horas, não distribui tarefa entre pessoas.
- Não muda spec nem plano — aponta o furo e devolve.
- Não escreve fora de `specs/NNN-nome/tasks.md` e da linha do `STATE.md`.

## Fechamento

Como no `preamble.md`. A tarefa única, com a lista aprovada, é **rodar
`/yas-implement`**, que faz as tarefas na ordem, roda os testes de cada uma e
marca o que ficou pronto.
