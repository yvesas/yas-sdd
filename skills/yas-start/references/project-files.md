# Modelos de `specs/project/`

> Lido no passo que cria os arquivos. Cada modelo é o arquivo **inteiro**.
> `_pendente_` marca o que ninguém respondeu ainda — deixe a marca; não
> preencha com suposição.

## `STATE.md`

```markdown
# Estado

> Só o que está **aberto**. O que fecha sai daqui: feature entregue vai para
> o ROADMAP, decisão vira registro em `docs/adr/`, lição vai para o HANDOFF.

**Atualizado em:** <AAAA-MM-DD>

## Em andamento

_nada ainda_

## Bloqueios

_nenhum_

## Decisões pendentes

_nenhuma_

## A confirmar

_nada_
```

## `HANDOFF.md`

```markdown
# Retomada

> Para quem volta depois de uma pausa — você mesmo, ou um agente numa sessão
> nova. Este arquivo **não repete o estado**: o que está aberto mora no
> STATE.md.

## Religar o ambiente

_pendente — os comandos para subir o projeto do zero_

## Próximo passo

_pendente_

## O que aprendemos errando

> Uma linha por lição, com o que ela custou. É a parte mais valiosa deste
> arquivo: cada item aqui já aconteceu uma vez.

_nada ainda_
```

## `ROADMAP.md`

```markdown
# Roadmap

## Agora

_pendente_

## Depois

_pendente_

## Entregue

> Uma linha por feature, com a data e a pasta: `2026-01-15 · 003-password-reset`.

_nada ainda_
```

## `PROJECT.md`

```markdown
# <nome do projeto>

## O que é

_pendente — duas ou três linhas: o que faz, para quem_

## Objetivos

_pendente_

## Fora de escopo

_pendente — o que este produto decidiu **não** ser_
```

## O que preencher com o que você leu

| Campo | De onde pode vir |
|---|---|
| nome e "O que é" | arquivo de instruções do agente, README, canvas |
| "Fora de escopo" | canvas, ou uma frase explícita nas instruções |
| "Religar o ambiente" | README, instruções do agente, guias de operação |
| "Entregue" | **não reconstrua** o histórico; começa vazio |

Tudo que entrar leva, no fechamento, o caminho de onde saiu. Se a fonte for
uma proposta — e não algo que a pessoa afirmou —, continua `_pendente_`.
