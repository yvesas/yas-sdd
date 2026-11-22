---
name: yas-start
shared: [preamble, workflow]
references: [project-files, agent-context]
description: >
  Prepara um repositório para o método yas-sdd: descobre o ponto de partida
  (projeto vazio, projeto que já existe ou material de canvas), cria
  `specs/project/` com os arquivos de estado, retomada, roadmap e visão, e
  aponta o arquivo de instruções do agente para o método. Use logo depois de
  instalar o pack, ao pedir "começar com o yas-sdd", "prepara este projeto",
  "por onde eu começo", ou quando o projeto ainda não tem `specs/project/`.
allowed-tools: Read, Glob, Grep, Write, Edit, AskUserQuestion
triggers: [começar com yas-sdd, yas start, prepara este projeto, por onde eu começo,
  iniciar o método]
---

# /yas-start — preparar o projeto

Deixa o repositório pronto para trabalhar por especificação. É o primeiro
passo depois de instalar, e leva poucos minutos: quase tudo aqui é leitura.

## Guarda — antes de tudo

A primeira chamada de ferramenta confere **um fato**: a pasta atual é a raiz
de um repositório git? Procure `.git` na raiz — pode ser pasta ou arquivo.

- **É.** Siga.
- **Não é, ou não deu para conferir.** Pare e pergunte se a pessoa quer criar
  o repositório primeiro. Sem controle de versão não há branch, não há
  histórico e o método não se sustenta. Não crie o repositório sozinho.

Depois da guarda, leia os dois arquivos ao lado deste — `preamble.md` e
`workflow.md`.

## O caminho

| | Passo |
|---|---|
| 1 | Ler o repositório e dizer o que achou |
| 2 | Confirmar o ponto de partida — **uma** pergunta |
| 3 | Criar o que falta em `specs/project/` |
| 4 | Apontar o arquivo de instruções do agente para o método |
| 5 | Fechamento, com a tarefa única |

### 1. Ler, sem escrever nada

Procure, e anote o que existe:

- `specs/constitution.md` e `specs/project/` — o método já foi iniciado?
- `specs/canvas/` — há material de descoberta de produto?
- outras pastas em `specs/` — numeradas, ou em outro formato?
- arquivos de instrução para agentes, na raiz;
- `docs/`, registros de decisão, arquivos de workflow de CI;
- manifesto e trava de dependências — qual é a stack?

Diga o que achou em **até oito linhas**, com os caminhos. Nada de avaliar o
projeto aqui: é um inventário.

**Se `specs/project/` e `specs/constitution.md` já existem**, o projeto já
começou. Diga isso, mostre o que está aberto no `STATE.md`, e encerre — não
recrie nada.

### 2. O ponto de partida

Uma pergunta só, com a sua leitura como recomendação:

> Como você quer começar? **RECOMENDAÇÃO: <a letra que a leitura indica>,
> porque <o que você viu>.**
>
> A) **Projeto novo** — quase nada escrito ainda.
> B) **Projeto que já existe** — tem código e regras; quero trazer o método
>    sem mexer no que funciona.
> C) **Vim de um canvas** — as respostas de produto já estão em `specs/canvas/`.

A resposta não muda o que este passo cria; muda o que você diz no fechamento
e o que a constituição vai ler depois.

### 3. `specs/project/`

Leia `references/project-files.md` e crie **só o que não existe**: `STATE.md`,
`HANDOFF.md`, `ROADMAP.md`, `PROJECT.md`.

- Arquivo que já existe **não é tocado**, mesmo que esteja em outro formato.
  Diga em uma linha que ele ficou como estava.
- Preencha apenas o que você **leu** no repositório ou no canvas. O resto fica
  com a marca de pendente do modelo — não invente visão, objetivo nem roadmap.
- Em projeto que já existe, o `HANDOFF.md` recebe os comandos de subir o
  ambiente que estiverem escritos em algum lugar, com o caminho de onde saíram.

### 4. O arquivo de instruções do agente

O método só funciona se o agente souber que ele existe em toda sessão. Leia
`references/agent-context.md`.

Isto **edita um arquivo da pessoa**, então pergunte antes — uma vez, mostrando
o bloco exato que vai entrar:

> Posso acrescentar este bloco ao seu arquivo de instruções do agente?
> **RECOMENDAÇÃO: A, porque sem ele uma sessão nova não sabe do método.**
>
> A) Sim, acrescente.
> B) Não — eu coloco à mão.

Se ela disser não, mostre o bloco e siga. Se não existir arquivo de
instruções nenhum, ofereça criar um só com o bloco.

## O que esta skill não faz

- Não cria a constituição — isso é uma conversa própria, o próximo passo.
- Não cria branch, não commita, não instala nada.
- Não move nem converte specs que já existem em outro formato.
- Não escreve em `specs/canvas/`.

## Fechamento

Como no `preamble.md`. A tarefa única é **rodar `/yas-constitution`**, e você
diz por quê em uma frase, conforme o ponto de partida:

- projeto novo — "ela vai te entrevistar sobre o produto e escrever as regras
  que todo plano segue";
- projeto que já existe — "ela vai ler as regras que você já tem e propor a
  constituição a partir delas, citando de onde tirou cada uma";
- vindo de canvas — "ela vai aproveitar o que você já respondeu e perguntar só
  o que falta".
