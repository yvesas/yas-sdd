# O método — o mapa que toda skill do fluxo segue

> Lido pelas skills que criam ou consomem artefatos. O que está aqui não
> depende de **qual** passo a skill conduz: é a ordem, o que cada passo exige
> e onde cada coisa mora.

## 1. A ordem, e o que cada passo exige

| Passo | Produz | Só começa se existir |
|---|---|---|
| começar | `specs/project/` | um repositório |
| constituição | `specs/constitution.md` | — |
| especificar | `specs/NNN-nome/spec.md` | a constituição |
| planejar | `specs/NNN-nome/plan.md` | a spec da feature |
| dividir em tarefas | `specs/NNN-nome/tasks.md` | o plano da feature |
| implementar | código e testes | as tarefas da feature |

A coluna da direita é a **guarda** de cada passo. Sem o arquivo, o passo não
começa: diga qual passo vem antes e pare.

Mudança pequena — até uns três arquivos, sem decisão nova — não precisa do
caminho inteiro. Mas continua valendo a constituição.

Conferir é um passo à parte, que pode rodar a qualquer momento depois que há
constituição ou código:

| Conferência | Pergunta | Só começa se existir |
|---|---|---|
| conformidade | as regras escritas na constituição estão sendo seguidas? | a constituição |
| segurança | alguém consegue fazer o que não deveria? | código para ler |

As duas só leem. Nenhuma corrige: mostram, e a pessoa decide.

## 2. A constituição manda

`specs/constitution.md` é lida antes de planejar e antes de implementar.

- Regra marcada **INEGOCIÁVEL** não se dispensa. Se o pedido da pessoa a
  contraria, pare e diga qual regra e por quê. O caminho é emendar a
  constituição de propósito, não contorná-la numa feature.
- Regra sem essa marca pode ter desvio, **escrito no plano**: o que desvia,
  por quê, e qual alternativa mais simples foi recusada.
- Na dúvida sobre o que a regra quer dizer, pergunte. Não interprete a seu
  favor.

## 3. Numeração de feature

Cada feature tem uma pasta `specs/NNN-nome/`: três dígitos, hífen, nome curto
em inglês e kebab-case (`004-password-reset`).

Para criar a próxima: liste as pastas de `specs/` que começam com três
dígitos, pegue o **maior** número e some um. Não existe nenhuma? Comece em
`001`. Pastas sem número (`project`, `canvas`, `design`) não contam.

**Nunca renumere e nunca reuse um número**, nem de feature abandonada.

## 4. Requisitos e decisões têm identificador

Requisito recebe `REQ-001`, decisão recebe `D-001`, numerados dentro da
feature. O plano e as tarefas citam o identificador de onde vieram. É o que
permite responder "por que isto existe?" seis meses depois.

## 5. `specs/` é o plano, `docs/` é o que existe

`specs/` muda o tempo todo. `docs/` descreve o sistema como ele é e muda
quando o sistema muda. Decisão que precisa sobreviver vira um registro em
`docs/adr/`, um por arquivo.

## 6. Os arquivos de `specs/project/`

| Arquivo | Responde | Teto |
|---|---|---|
| `STATE.md` | o que está **aberto** agora? | ~150 linhas |
| `HANDOFF.md` | como religar o ambiente, qual o próximo passo, o que aprendemos errando | curto |
| `ROADMAP.md` | o que vem e o que já saiu | médio |
| `PROJECT.md` | visão, objetivos, fora de escopo | curto |

O `STATE.md` guarda só o que está aberto. Quando um item fecha, ele sai de lá
e vai para o destino dele:

| Item fechado | Destino |
|---|---|
| feature entregue | uma linha em "Entregue", no `ROADMAP.md` |
| decisão que continua valendo | um registro em `docs/adr/` |
| decisão pequena | uma linha em `docs/decisions.md` |
| lição aprendida | `HANDOFF.md` |
| bloqueio resolvido, tarefa feita | removido |

Arquivo lido toda sessão custa contexto toda sessão. Passou do teto, avise.
