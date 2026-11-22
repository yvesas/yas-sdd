# yas-sdd — instruções para o agente

## O que é

Pack de skills de **método** para desenvolvimento guiado por especificação,
com constituição em camadas. Markdown é o produto; o único código é a
bancada (`scripts/`) e o instalador (`bin/install`).

Baseado no GitHub Spec Kit, sem depender dele — ver
`docs/adr/0001-independent-of-spec-kit.md`.

## Golden rule

**Quem usa não instala nada além das skills.** Sem Node, sem Python, sem CLI.

O teste: se uma mudança faz uma skill precisar de um programa para funcionar
— um script que ela chama, um binário que tem que existir —, ela não entra.
O agente segue instrução; o que só um programa garante vira trava opcional,
fora do caminho principal. Node existe aqui só para a bancada de quem mantém.

**E nada que viaja pode citar o que só existe aqui** — comando, pasta de
configuração, nome de projeto. Quem instala pode não ter. O `check` cobra em
`shared/` e `skills/`.

## Bancada

```bash
npm run check                       # validação estática, segundos
bin/install --check <projeto>       # o que mudaria, sem escrever
bin/install <projeto>               # instala num projeto descartável
```

Ainda **não há evals**. Nenhuma skill foi medida — ver
`specs/project/STATE.md`.

## Estrutura

| Caminho | O que é |
|---|---|
| `skills/<nome>/SKILL.md` | uma skill; a pasta dá o nome, e o frontmatter tem que bater |
| `skills/<nome>/references/` | material que **essa** skill lê na fase que precisa |
| `shared/preamble.md` | voz, guarda, nunca inventar, fechamento — toda skill declara |
| `shared/workflow.md` | a ordem do método, numeração, onde cada coisa mora |
| `bin/install` | copia as skills para um projeto; bash puro |
| `scripts/check.mjs` | o gate barato |
| `INSTALL.md` | instalação escrita para o agente de quem usa |
| `NOTICE`, `docs/upstream-review.md` | crédito e registro do que veio de fora |

As camadas da constituição são references da `yas-constitution` — ver
`docs/adr/0002-constitution-layers-as-references.md`.

## Ao escrever uma skill

- **Começa por `## Guarda`**: um fato conferido com uma chamada de
  ferramenta. Sem ganchos, é a guarda que mantém a ordem do método.
- Leia o compartilhado, nunca cole. Tudo que é declarado no frontmatter tem
  que ser mandado ler no corpo.
- Skill só manda rodar skill que existe.
- Teto de 400 linhas. Material de consulta vai em `references/`.
- Quem lê é leigo: termo novo ganha uma frase de explicação.
- **Rode uma sessão de verdade antes de dar a skill por pronta.**

## Idioma

Prosa em **português**. Nome de arquivo, pasta e skill em **inglês**.

## Commits

Conventional Commits, assunto em inglês, abaixo de 72 caracteres. **Nunca**
`Co-Authored-By`, "Generated with" ou assinatura de ferramenta. Branch por
assunto, pull request para a `main`, squash.

## O que não pode entrar neste repositório

Nome de empresa ou cliente, e qualquer identificador de infraestrutura de
projeto privado — endereço, domínio, nome de serviço. Os exemplos usam
valores fictícios.
