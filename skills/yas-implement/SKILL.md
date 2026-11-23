---
name: yas-implement
shared: [preamble, workflow]
references: [stop-rules]
description: >
  Implementa uma feature seguindo a lista de tarefas, uma por vez e na
  ordem: escreve o código e o teste de cada tarefa, roda os comandos de
  verificação da constituição, e só marca a tarefa como feita quando o
  "pronto quando" foi conferido. Para quando o plano não basta, em vez de
  improvisar. Ao terminar, deixa a feature aguardando o aceite da pessoa —
  nunca a dá por entregue. Use ao pedir "implementa", "começa a feature",
  "faz as tarefas", "continua de onde parou", depois de aprovar as tarefas,
  ou para corrigir o que o aceite devolveu.
allowed-tools: Read, Glob, Grep, Write, Edit, Bash, AskUserQuestion
triggers: [implementar, começar a feature, fazer as tarefas, implement,
  continuar a feature, corrigir o aceite]
---

# /yas-implement — as tarefas, uma por vez, conferidas

Aqui o método vira código. A lista de tarefas diz o que fazer e em que
ordem; a constituição diz como; o plano diz onde. Você executa, prova que
cada passo funciona, e para quando algo não está escrito.

**Implementar não é entregar.** Quando a última tarefa fecha, a feature vai
para o aceite: quem diz se é aquilo é a pessoa.

## Guarda — antes de tudo

A primeira chamada de ferramenta confere dois fatos:

1. quais pastas `specs/NNN-*/` têm `tasks.md` com alguma linha `- [ ]`?
2. em que branch o repositório está? Pergunte ao git o nome da branch atual.

| Achou | O que fazer |
|---|---|
| nenhuma feature com tarefa aberta, nem por fechar | pare: o passo anterior é `/yas-tasks` |
| feature com todas as tarefas `[x]` e fora de "Aguardando aceite" | **falta o fechamento** — vá direto para "Quando a última tarefa fecha" |
| feature com todas as tarefas `[x]` e já em "Aguardando aceite" | pare: o próximo passo é `/yas-accept` |
| a branch atual é a principal | pare antes de escrever qualquer arquivo: proponha criar `feat/NNN-nome` e espere a pessoa dizer sim |
| não deu para saber a branch | diga que não deu e pergunte; não presuma |
| tarefa aberta, numa branch de trabalho | siga |

Qual feature? A que o pedido nomeia; se não nomeia e só uma tem tarefa
aberta, é ela; se há mais de uma, pergunte.

Depois, leia os dois arquivos ao lado deste — `preamble.md` e `workflow.md`.

## Antes da primeira tarefa

1. **Leia** a constituição (a tabela de comandos principalmente), a
   `spec.md`, o `plan.md` e o `tasks.md` da feature, e o `HANDOFF.md`.
2. **Rode o gate da constituição uma vez**, antes de mexer em nada. Se ele já
   falha, diga: o que quebrou antes de você não é culpa da feature, mas
   precisa ser dito, senão vai parecer que foi.
3. **Combine duas coisas**, numa pergunta só:

> Como você quer acompanhar? **RECOMENDAÇÃO: A na primeira feature, para
> você ver como cada passo fica.**
>
> A) Uma tarefa por vez: eu paro ao fim de cada uma e mostro o que mudou.
> B) Fase por fase: eu paro ao fim de cada fase, ou antes se algo travar.
>
> E os commits? A) eu commito ao fim de cada tarefa · B) eu só sugiro a
> mensagem, e você commita.

A resposta vale para esta sessão. Na próxima, pergunte de novo.

## O ciclo de uma tarefa

Para a próxima tarefa `- [ ]`, na ordem do arquivo:

1. **Diga qual é**, em uma linha: o número, o que faz, os arquivos.
2. **Faça só ela.** O código e o teste que a tarefa pede, nos arquivos que
   ela cita. Código vizinho que funciona não é "melhorado" de passagem — se
   algo incomoda, anote e siga.
3. **Rode** os comandos da tabela da constituição que a tarefa afeta — no
   mínimo, os testes. Confira o código de saída, não a aparência da saída.
4. **Confira o "pronto quando".** É um fato: o teste passou, a tela mostra, o
   comando saiu com zero.
5. **Marque `- [x]`** no `tasks.md` — só depois dos passos 3 e 4.
6. **Atualize** a linha da feature em "Em andamento" no `STATE.md`:
   `NNN-nome — K de N tarefas`. Tarefa riscada não conta.
7. **Commit**, se foi combinado: uma tarefa, um commit, no padrão de
   mensagem da constituição, sem nenhuma atribuição de IA. Se não foi
   combinado, mostre a mensagem sugerida.

Se o passo 3 ou o 4 falha, a tarefa **não** é marcada. Corrija dentro do que
a tarefa permite; se não der, leia `references/stop-rules.md`.

## Quando parar

Leia `references/stop-rules.md` **antes da primeira tarefa** e volte a ele
sempre que algo não sair como o plano diz. Ele lista quando parar, o que
dizer e o que nunca fazer para a suíte passar.

## Quando a última tarefa fecha

1. **Rode o gate completo** da constituição — o comando que vem antes de
   commitar. Saída zero, ou a feature não terminou.
2. **Leve a feature para o aceite.** No `STATE.md`, tire a linha de "Em
   andamento" e acrescente em "Aguardando aceite":
   `NNN-nome — implementada em <AAAA-MM-DD>, falta o aceite`.
3. **Não escreva "Entregue"** no `ROADMAP.md`, não diga que a feature está
   pronta, nem que "está tudo funcionando". O que você pode dizer: "as N
   tarefas estão feitas, e o gate passou".
4. **Decisão marcada "vira ADR"** que entrou no código e ainda não tem
   registro em `docs/adr/`: diga quais.

## Corrigir o que o aceite devolveu

As tarefas novas vêm com `origem: aceite`. O ciclo é o mesmo, com duas
diferenças:

- **O teste da tarefa precisa falhar antes** da correção e passar depois — é
  a prova de que ele pega o que a pessoa viu.
- **A feature não muda de seção.** Ela já está em "Aguardando aceite" e fica
  lá. No passo 6 do ciclo, atualize **essa** linha: `NNN-nome — não aceita em
  <AAAA-MM-DD>, K de N correções`. Ao fim, rode o gate completo e troque a
  linha por `NNN-nome — correções feitas em <AAAA-MM-DD>, falta reconferir`;
  não crie linha em "Em andamento".

## O que esta skill não faz

- Não dá o aceite, não marca a feature como entregue, não abre pull request.
- Não muda spec, plano nem a constituição.
- Não faz tarefa fora da lista, nem "aproveita" para refatorar.
- Não faz push para a branch principal, nunca.

## Fechamento

Como no `preamble.md`, com uma linha a mais: quantas tarefas fecharam nesta
sessão, e quantas faltam. A tarefa única:

- faltam tarefas — a próxima, pelo número, ou a pergunta que travou;
- todas feitas — **rodar `/yas-accept`**: "ela monta o roteiro a partir da
  spec, e você confere no produto se é o que pediu".
