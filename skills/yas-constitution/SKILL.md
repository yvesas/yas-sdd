---
name: yas-constitution
shared: [preamble, workflow]
references: [interview, adoption, template, base, stack-node, module-ai]
description: >
  Cria ou emenda a constituição do projeto — as leis que todo plano e todo
  código precisam respeitar — por entrevista: estágio do produto, stack,
  dados, IA dentro do produto, operação e regra de ouro. Monta o arquivo em
  camadas (base, stack, módulos) e grava em `specs/constitution.md`. Em
  projeto existente, reconhece as regras que ele já pratica, citando a fonte.
  Use ao pedir "cria a constituição", "define as regras do projeto", "quais
  princípios este projeto segue", "muda uma regra da constituição", ou ao
  começar um projeto que ainda não tem `specs/constitution.md`.
allowed-tools: Read, Glob, Grep, Write, Edit, AskUserQuestion
triggers: [constituição, constitution, regras do projeto, princípios do projeto,
  regra de ouro, emendar a constituição]
---

# /yas-constitution — as leis do projeto

A constituição é um arquivo curto que diz **como este produto é construído**:
o que nunca se faz, o que sempre se faz e quem confere. Todo plano passa por
ela. As respostas vêm da pessoa e do repositório dela — nunca de você.

## Guarda — antes de tudo

A primeira chamada de ferramenta confere dois fatos, e só eles:

1. `specs/constitution.md` existe?
2. `specs/canvas/` existe?

| Achou | Modo |
|---|---|
| a constituição | **emenda** — vá para "Emendar" |
| nenhuma constituição | **criação** — siga abaixo |

Não leia mais nada antes disso. Depois, leia os dois arquivos ao lado deste —
`preamble.md` e `workflow.md` — e siga.

## Criação — o caminho

| | Passo | Onde está |
|---|---|---|
| 1 | Ponto de partida: canvas, projeto existente ou do zero | aqui |
| 2 | Entrevista, um bloco por vez | `references/interview.md` |
| 3 | Resumo das escolhas, e a pessoa libera a montagem | `references/interview.md` |
| 4 | Montagem em camadas | `references/template.md` e as camadas |
| 5 | Conferência antes de gravar | aqui |
| 6 | Aprovar · Revisar · Recomeçar, e gravar | aqui |
| 7 | Fechamento | `preamble.md` |

### 1. Ponto de partida

Descubra lendo, sem perguntar — e diga em uma linha qual foi:

- **Há `specs/canvas/`.** Leia o que estiver lá. O estágio, o público e as
  decisões técnicas já respondidos **não são perguntados de novo**: confirme
  cada um em uma linha. O que estiver marcado como pendente ou como proposta
  de quem conduziu a sessão não é resposta da pessoa.
- **O repositório já tem regras ou código.** Leia `references/adoption.md` e
  siga o que ele diz antes da entrevista. A entrevista pergunta só o que a
  leitura não respondeu.
- **Nada disso.** Entrevista completa.

### 2. Entrevista

Leia `references/interview.md` ao começar, e conduza **um bloco por vez**. Ao
fechar cada bloco, diga em uma linha o que ele decidiu ("estágio MVP: as
regras marcadas para clientes pagando ficam para depois").

Se a pessoa se impacientar, não pule o bloco 1 nem o 6: o estágio calibra
tudo, e a regra de ouro é o que mais se usa depois.

### 4. Montagem

Leia `references/template.md`, depois `references/base.md`, depois **só** as
camadas que a entrevista escolheu — hoje, `references/stack-node.md` e
`references/module-ai.md`. Não leia camada que não entra.

Monte segundo as regras do modelo. Três cuidados que ele não cobre:

- **"Verificado por" é o que existe.** Troque a sugestão da camada pelo que o
  projeto tem de verdade. Regra INEGOCIÁVEL cuja única verificação é
  "revisão" entra numa lista que você mostra à pessoa: **"sem trava"**.
- **"Por quê" do projeto vence o da camada.** Se a pessoa contou o caso que
  justifica a regra, use as palavras dela.
- **Nada inventado.** Comando, versão, nome de serviço: ou está no
  repositório, ou a pessoa disse, ou fica como `confirmar` na lista do fim.

### 5. Conferência antes de gravar

- [ ] Todo princípio tem "Verificado por" e "Por quê"?
- [ ] Sobrou algum `<…>` ou marca de estágio (`[MVP+]`, `[pagantes+]`)?
- [ ] A regra de ouro tem um teste que se responde sozinho?
- [ ] A tabela de comandos tem só comandos que existem?
- [ ] O arquivo passou de ~450 linhas? Corte explicação, nunca regra.
- [ ] Alguma regra apareceu duas vezes, vinda de camadas diferentes?

### 6. Mostrar, decidir, gravar

Mostre **o resumo**, não o arquivo inteiro: os princípios pelo nome, quais são
inegociáveis, o que ficou para depois, o que está sem trava e o que está por
confirmar. Pergunte: **Aprovar · Revisar · Recomeçar**.

- **Aprovar:** grave `specs/constitution.md`. Se `specs/project/STATE.md`
  existe, acrescente os itens "confirmar" e "sem trava" como pendências. Em
  projeto que já tem código, diga em uma linha que `/yas-audit` mostra a
  distância entre a constituição e o repositório.
- **Revisar:** pergunte o quê, ajuste, mostre de novo.
- **Recomeçar:** volte ao bloco que a pessoa indicar.

## Emendar

A constituição existe. Leia-a inteira, e pergunte **o que mudou no projeto**
— não "o que você quer mudar no texto".

1. **Classifique** a mudança e diga a nova versão: MAJOR remove ou redefine um
   princípio; MINOR acrescenta; PATCH só esclarece.
2. **Mostre o antes e o depois** do trecho, e espere a aprovação.
3. **Procure o que a emenda atinge**: planos em `specs/` ainda em andamento
   que dependiam do texto antigo. Liste-os; não os altere.
4. **Grave**, atualizando a versão e a data da última emenda. O relato do que
   mudou vai na sua resposta e na mensagem de commit que você sugere — nunca
   num bloco dentro do arquivo.

Pedido para remover uma regra INEGOCIÁVEL é legítimo, e é MAJOR. Pergunte o
que substitui a proteção que ela dava; grave a resposta no "Por quê" do que
entrar no lugar, ou diga com clareza que nada entra.

Emenda nunca reescreve o arquivo inteiro. Se as camadas do pack mudaram desde
a criação (a primeira linha do arquivo diz a versão), **ofereça** comparar;
não aplique sozinho.

## O que esta skill não faz

- Não cria hook, workflow nem configuração. Ela registra o que **deve** valer
  e aponta o que está sem trava; instalar a trava é outro trabalho.
- Não decide a regra de ouro pela pessoa.
- Não escreve fora de `specs/constitution.md` e, quando existe, das
  pendências do `specs/project/STATE.md`.

## Fechamento

Como no `preamble.md`. A tarefa única, quando a constituição acabou de
nascer, é **ler o arquivo inteiro e commitá-lo sozinho**, numa branch — é a
primeira lei do projeto, e merece um commit só dela. Sugira a mensagem:
`docs(constitution): ratify version 1.0.0`.
