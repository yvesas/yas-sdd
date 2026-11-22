# Modelo das tarefas

> Lido na hora de montar `specs/NNN-nome/tasks.md`. O texto entre `<…>` é
> preenchido.

## O arquivo

```markdown
# Tarefas — <nome da feature>

**Feature:** <NNN-nome> · **Plano:** `plan.md` · **Escritas em:** <AAAA-MM-DD>

## Fase 1 — <o que alguém consegue usar ao fim desta fase>

- [ ] T001 · <o que fazer, começando por um verbo> · <REQ-NNN, D-NNN>
  - Arquivos: `<caminho>`, `<caminho>`
  - Teste: <o teste que entra nesta tarefa, e o que ele prova>
  - Pronto quando: <o fato que se confere>

- [ ] T002 · <…>

## Fase 2 — <…>

- [ ] T003 · <…>
```

## As marcas

| Marca | Quer dizer | Quem põe |
|---|---|---|
| `- [ ]` | não feita | esta skill; e o aceite, para as correções |
| `- [x]` | feita, com o "pronto quando" conferido | só a implementação, depois de conferir |
| `- ~~T004 · …~~ — <motivo>` | cancelada; o número não volta | a revisão, com a pessoa |

A tarefa cancelada **perde a caixa**: a linha começa por `- ~~`, sem `[ ]`.
Assim nenhuma conferência a confunde com tarefa aberta, e ela não entra em
contagem nenhuma.

## Tarefa que veio do aceite

Quem escreve estas tarefas é o aceite, não esta skill. Quando ele devolve um
requisito que falhou, a tarefa nova diz de onde veio:

```markdown
- [ ] T012 · <corrigir o que a pessoa viu> · REQ-002 · origem: aceite de <AAAA-MM-DD>
  - Arquivos: `<caminho>`
  - Teste: <o teste que teria pegado a falha>
  - Pronto quando: <o "Deve ver" do requisito acontece>
```

Ela entra numa fase própria no fim, "Correções do aceite", e o teste dela é
o que faltou da primeira vez.

## Tamanho

- Feature com mais de umas vinte tarefas é feature grande demais. Diga e
  proponha dividir a spec.
- Tarefa que toca mais de uns cinco arquivos provavelmente são duas.
- Tarefa só de configuração ("instalar a biblioteca") existe quando outra
  depende dela e ela se confere sozinha.
