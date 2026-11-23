---
name: yas-plan
shared: [preamble, workflow]
references: [plan-template, constitution-gate]
description: >
  Decide como construir uma feature já especificada: lê a spec, a
  constituição e o código que existe, registra cada decisão com o motivo,
  diz onde cada requisito é atendido e como ele vai ser testado, e passa o
  plano pelo portão da constituição — regra inegociável quebrada para o
  plano; desvio de regra comum só entra escrito e justificado. Grava
  `specs/NNN-nome/plan.md`. Use ao pedir "planeja a feature", "como vamos
  construir isso", "faz o plano", depois de aprovar uma spec, ou para revisar
  um plano que a spec mudou.
allowed-tools: Read, Glob, Grep, Write, Edit, AskUserQuestion
triggers: [planejar, plano da feature, como construir, plan, revisar o plano]
---

# /yas-plan — como construir, sob as leis do projeto

A spec diz o quê. O plano diz como: onde cada requisito mora no código, o que
muda, o que entra de novo, e como se prova que funciona. É o passo em que a
constituição mais pesa — tudo que ela exige tem que caber aqui.

Você propõe o plano. A pessoa aprova, e decide o que é dela decidir: custo,
o que é difícil de desfazer, o que muda para quem usa.

## Guarda — antes de tudo

A primeira chamada de ferramenta confere dois fatos:

1. `specs/constitution.md` existe?
2. quais pastas `specs/NNN-*/` têm `spec.md`, e quais têm `plan.md`?

Escolha a feature: a que o pedido nomeia. Se não nomeia e só uma tem spec
sem plano, é ela — diga em uma linha. Se há mais de uma, pergunte. Na
`spec.md` dela, confira mais dois fatos:

3. a linha `**Status:**` diz "aprovada"?
4. existe alguma linha `[A ESCLARECER]`?

| Achou | O que fazer |
|---|---|
| sem constituição | pare: o passo anterior é `/yas-constitution` |
| nenhuma feature com spec | pare: o passo anterior é `/yas-specify` |
| spec em rascunho | pare: a pessoa ainda não aprovou — o caminho é `/yas-specify` em revisão |
| spec com item a esclarecer | pare: diga quais itens; o caminho é `/yas-specify` em revisão, para responder cada um ou tirá-lo da feature de propósito. Você não edita a spec |
| spec pronta, sem plano | **novo** — siga |
| spec pronta, com plano | **revisão** — vá para "Revisar" |

Depois, leia os dois arquivos ao lado deste — `preamble.md` e `workflow.md`.

## O caminho

| | Passo | Onde está |
|---|---|---|
| 1 | Ler tudo que o plano precisa respeitar | aqui |
| 2 | As decisões, uma por vez | aqui |
| 3 | Montar o plano | `references/plan-template.md` |
| 4 | O portão da constituição | `references/constitution-gate.md` |
| 5 | Conferência antes de gravar | aqui |
| 6 | Aprovar · Revisar · Recomeçar, e gravar | aqui |
| 7 | Fechamento | `preamble.md` |

### 1. Ler

Nesta ordem, sem escrever nada:

1. a constituição **inteira** — princípios, restrições técnicas, a tabela de
   comandos, o que entra em vigor depois;
2. a `spec.md` da feature, inteira, incluindo "Restrições para o plano";
3. `docs/` — arquitetura, registros de decisão em `docs/adr/`,
   `docs/decisions.md`;
4. o código que a feature toca. Procure pelos nomes que a spec usa e pelo
   que já resolve problema parecido. **Plano que ignora o código que existe
   reinventa o que já está lá.**
5. o manifesto de dependências — o que já está instalado, e em que versão.

Diga em até seis linhas o que achou: a stack, onde a feature vai encostar,
o que já existe e serve.

### 2. As decisões

Toda escolha que a spec não dita e que alguém poderia fazer diferente vira
uma decisão `D-NNN`: onde o dado fica, qual tela muda, se entra biblioteca
nova, como uma regra de acesso é aplicada.

Para cada uma, separe quem decide:

- **Técnica, fácil de desfazer** — você decide, registra o motivo em uma
  frase e segue. Não pergunte o que a pessoa não tem como avaliar.
- **Custa dinheiro, é difícil de desfazer ou muda o que quem usa vê** —
  pergunte, no formato do `preamble.md`, com recomendação e com o que cada
  opção custa.

Três regras sem exceção:

- **Dependência nova é decisão.** Diga o que ela faz que o projeto não faz
  hoje, e por que não dá para resolver com o que existe.
- **Versão, nome de serviço, comando: nada de memória.** Ou está no
  repositório, ou a documentação oficial diz, ou fica marcado `confirmar`.
- **A alternativa mais simples tem que aparecer.** Se você escolheu a mais
  complexa, a decisão diz por que a simples não serve.

Decisão que precisa sobreviver à feature — muda a arquitetura, vale para as
próximas — leva a marca "vira ADR". Quem escreve o registro em `docs/adr/` é
a implementação, quando a decisão virar código.

### 3. Montar

Leia `references/plan-template.md` e monte. Cada requisito da spec aparece em
"Como cada requisito é atendido". Requisito que o plano não atende não some:
volta para a spec, com a pessoa.

### 4. O portão

Leia `references/constitution-gate.md` e passe o plano inteiro por ele. Se um
princípio INEGOCIÁVEL não cabe, o plano **para** aqui — diga qual regra, qual
parte do plano, e os dois caminhos: mudar o plano ou emendar a constituição
com `/yas-constitution`. Não existe terceiro.

### 5. Conferência antes de gravar

- [ ] Todo `REQ` da spec aparece em "Como cada requisito é atendido"?
- [ ] Todo `REQ` tem como ser testado — ou está marcado como fora do aceite
      e tem teste que o cubra?
- [ ] Toda decisão cita o `REQ` ou a restrição que a provocou?
- [ ] Todo arquivo citado existe, ou está marcado como novo?
- [ ] Todo comando citado está na tabela da constituição ou no repositório?
- [ ] O portão tem uma linha por princípio, e todo desvio está em "Desvios"?
- [ ] Algo entrou que nenhum requisito pede? Tire — a constituição pede
      mudança cirúrgica.

### 6. Mostrar, decidir, gravar

Mostre **o resumo**: as decisões pelo nome, as que a pessoa precisa aprovar
em destaque, dependências novas, desvios, e o que fica para depois.
Pergunte: **Aprovar · Revisar · Recomeçar**.

- **Aprovar:** grave `specs/NNN-nome/plan.md`. No `STATE.md`, troque a linha
  da feature em "Em andamento" por `NNN-nome — planejada, faltam as tarefas`.
  Item `confirmar` vai para "A confirmar" do `STATE.md`.
- **Revisar:** pergunte o quê, ajuste, passe pelo portão de novo.
- **Recomeçar:** volte à decisão que a pessoa indicar.

## Revisar

O plano existe e algo mudou — a spec, o código, a constituição. Leia o plano
e diga **o que ficou velho**: requisito novo ou mudado sem atendimento,
decisão que contradiz a spec, princípio emendado.

Mostre o antes e o depois de cada trecho e espere a aprovação. Decisão não se
renumera: a que cai fica riscada, com o motivo. Se já existe `tasks.md`, liste
as tarefas atingidas — não as altere; o caminho é `/yas-tasks` de novo.

## O que esta skill não faz

- Não escreve código, não cria branch, não instala dependência.
- Não escreve registro de decisão em `docs/adr/` — marca o que vai virar um.
- Não muda a spec. Requisito que não cabe volta para a pessoa.
- Não escreve fora de `specs/NNN-nome/plan.md` e das linhas do `STATE.md`.

## Fechamento

Como no `preamble.md`. A tarefa única, com o plano aprovado, é **rodar
`/yas-tasks`**, que quebra o plano em passos pequenos, cada um com o seu
teste.
