---
name: yas
shared: [preamble, workflow]
description: >
  Diz qual é o próximo passo do método neste projeto, olhando os arquivos
  que existem — sem escrever nada. Se a pessoa disse o que quer, aponta a
  skill que faz aquilo e diz se falta um passo antes. Use ao pedir "yas",
  "qual o próximo passo", "o que eu faço agora", "por onde sigo", "como
  funciona o yas-sdd", ou quando não souber qual skill rodar.
allowed-tools: Read, Glob, Grep
triggers: [yas, próximo passo, o que eu faço agora, por onde sigo,
  qual skill usar, como funciona o yas-sdd]
---

# /yas — qual é o próximo passo?

O método tem uma ordem, e cada passo tem uma skill. Esta aqui só olha onde o
projeto está e aponta a próxima. Ela não escreve nada e não roda outra skill
no lugar da pessoa.

## Guarda — antes de tudo

A primeira chamada de ferramenta confere os fatos que decidem a resposta:

1. existem `specs/project/STATE.md` e `specs/constitution.md`?
2. quais pastas `specs/NNN-*/` existem, e quais destes arquivos cada uma
   tem: `spec.md`, `plan.md`, `tasks.md`, `acceptance.md`?

Se a pasta atual não parece um projeto — sem `.git`, sem código, sem
`specs/` —, diga isso e pergunte se é a pasta certa.

Depois, leia os dois arquivos ao lado deste — `preamble.md` e `workflow.md`.

## Sem pedido: o próximo passo

Percorra a tabela de cima para baixo. A **primeira** linha verdadeira é a
resposta.

| Se | Próximo passo |
|---|---|
| não há `specs/project/` | `/yas-start` — prepara o projeto |
| não há constituição | `/yas-constitution` — escreve as leis do projeto |
| há feature em "Aguardando aceite" no `STATE.md`, sem tarefa `[ ]` | `/yas-accept` — conferir o que já foi feito vem antes de começar outra coisa |
| há mudança pequena em "Aguardando aceite" (linha que começa com `mudança:`) | `/yas-accept` |
| há feature com `tasks.md` e alguma tarefa `[ ]` | `/yas-implement` — inclusive correções que o aceite devolveu |
| há feature com tarefas todas `[x]`, fora de "Aguardando aceite" e sem aceite na última rodada do `acceptance.md` | `/yas-implement` — falta o fechamento: o gate completo e levar a feature para o aceite |
| há feature com `plan.md` e sem `tasks.md` | `/yas-tasks` |
| há feature com `spec.md` com `[A ESCLARECER]` | `/yas-specify` — responder o que ficou em aberto |
| há feature com `spec.md` e sem `plan.md` | `/yas-plan` |
| nada aberto | `/yas-specify` — a próxima feature; o `ROADMAP.md` diz qual |

Para conferir as tarefas, procure as linhas `- [ ]` e `- [x]` do `tasks.md`;
tarefa riscada não conta. Feature com `acceptance.md` cuja última rodada diz
aceita ou dispensada está entregue e não entra na tabela.
Para o aceite, leia só a seção "Aguardando aceite" do `STATE.md`.

Mais de uma feature aberta no mesmo passo? Diga quais, e aponte a mais
antiga — o número menor.

## Com pedido: a skill certa

| A pessoa quer | Skill | Precisa antes |
|---|---|---|
| construir algo novo | `/yas-specify` | constituição |
| decidir como construir | `/yas-plan` | spec sem item a esclarecer |
| a lista de passos | `/yas-tasks` | plano |
| escrever o código | `/yas-implement` | tarefas |
| conferir o que foi feito | `/yas-accept` | tarefas todas feitas |
| saber onde parou, ou pausar | `/yas-state` | projeto preparado |
| mudar uma regra do projeto | `/yas-constitution` | — |
| saber se as regras estão sendo seguidas | `/yas-audit` | constituição |
| saber se o código tem falha de segurança | `/yas-security` | código |

Se falta o passo de antes, diga qual — não aponte a skill que vai parar na
guarda. Se o pedido é uma mudança pequena, diga que ela não precisa do
caminho inteiro (`workflow.md`, seção 1).

## "Como funciona?"

Se a pessoa pergunta pelo método, explique em até oito linhas: a
constituição manda; cada feature passa por spec, plano, tarefas,
implementação e aceite; o estado guarda o que está aberto; conferir regras e
segurança é à parte e só lê. Termine com o próximo passo do projeto dela.

## O que esta skill não faz

Não escreve arquivo nenhum, não roda outra skill, não avalia a qualidade do
que existe — só diz onde está e para onde vai.

## Fechamento

Como no `preamble.md`, com "o que ficou gravado" dizendo "nada". A tarefa
única é rodar a skill da resposta, numa frase que diga o que ela vai fazer.
