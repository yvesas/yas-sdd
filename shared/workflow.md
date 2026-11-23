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
| aceitar | `specs/NNN-nome/acceptance.md` | a feature implementada |

A coluna da direita é a **guarda** de cada passo. Sem o arquivo, o passo não
começa: diga qual passo vem antes e pare.

Feature só vai para "Entregue" com o aceite registrado — ver a seção 7.

Mudança pequena — até uns três arquivos, sem decisão nova — não precisa do
caminho inteiro. Mas continua valendo a constituição, e continua valendo o
aceite, numa linha só.

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

Todo requisito diz também **como a pessoa confere** que ele foi cumprido:
passos que ela segue usando o produto, sem ler código, e o que ela deve ver
no fim. É disso que o aceite é feito — ver a seção 7. Requisito que ninguém
consegue conferir ainda não está escrito.

Requisito que sai da feature não é apagado nem renumerado: fica riscado na
spec, com o motivo. **Requisito riscado não conta** — não pede linha no plano,
tarefa nem item no aceite.

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
| feature aceita | uma linha em "Entregue", no `ROADMAP.md` |
| decisão que continua valendo | um registro em `docs/adr/` |
| decisão pequena | uma linha em `docs/decisions.md` |
| lição aprendida | `HANDOFF.md` |
| bloqueio resolvido, tarefa feita | removido |

Feature implementada e ainda não aceita **não fechou**: fica em "Aguardando
aceite", no `STATE.md`, até a pessoa conferir.

Arquivo lido toda sessão custa contexto toda sessão. Passou do teto, avise.

## 7. O aceite

Aceite — em inglês, UAT, *User Acceptance Testing* — é o momento em que a
**pessoa que pediu** usa o que foi feito e diz se é aquilo. Teste automático
confere que o código faz o que o código diz; o aceite confere que o código faz
o que a pessoa queria.

**Quando.** Assim que a implementação termina, a feature entra em "Aguardando
aceite" no `STATE.md`, com a pasta e a data. Ela sai de lá só de dois jeitos:
aceita, ou dispensada por escrito.

**Como.** O agente monta o roteiro a partir dos requisitos da spec: para cada
`REQ`, os passos de "como a pessoa confere" e o que ela deve ver. A pessoa
segue e responde, item por item.

**O agente nunca dá o aceite.** Ele prepara o roteiro, registra o que a pessoa
respondeu e para. "Os testes passaram" não é aceite. Sem resposta da pessoa,
a feature continua aguardando.

**O registro**, em `specs/NNN-nome/acceptance.md`:

```markdown
# Aceite — NNN-nome

## Rodada de <AAAA-MM-DD> — conferido por <quem>

| Requisito | Resultado | Observação |
|---|---|---|
| REQ-001 | passou | |
| REQ-002 | falhou | <o que a pessoa viu> |
| REQ-003 | não conferido | <por quê> |

**Decisão:** <aceita · não aceita · em aberto · dispensada>
```

**O que falhou volta.** Cada item que falhou vira tarefa nova em `tasks.md`,
citando o `REQ`, e a feature continua em "Aguardando aceite". Depois da
correção, confere-se de novo — numa rodada nova, acrescentada ao fim do
arquivo, sem apagar a anterior. Item `não conferido` deixa a decisão em
aberto: nada falhou, mas a feature também não foi aceita.

**Dispensar pode, em silêncio não.** Se a pessoa decide pular o aceite, o
arquivo diz: dispensada por quem, e por quê. Quem dispensa é a pessoa, nunca
o agente.

**Mudança pequena** não ganha arquivo. Quem a termina — qualquer agente,
com ou sem skill — acrescenta em "Aguardando aceite" do `STATE.md` uma linha
neste formato, e ela fica lá até a pessoa responder:

`mudança: <o que mudou, numa frase> — <AAAA-MM-DD>`

A resposta da pessoa vai na mensagem do commit ou na descrição do pull
request.
