# Modelo da spec

> Lido na hora de montar `specs/NNN-nome/spec.md`. O texto entre `<…>` é
> preenchido; seção marcada como opcional some quando fica vazia.

## O arquivo

```markdown
# <Nome da feature, em português>

**Feature:** <NNN-nome> · **Criada em:** <AAAA-MM-DD> · **Status:** <rascunho | aprovada | entregue>

## O problema

<Duas a quatro linhas: quem sofre, o que acontece hoje, o que muda quando a
feature existir.>

## Para quem

- **<papel>** — <o que essa pessoa faz aqui>

## O que a pessoa consegue fazer

<O fluxo principal, em passos curtos, do ponto de vista de quem usa. Um
bloco por fluxo, quando houver mais de um.>

1. <…>

## Requisitos

### REQ-001 — <nome curto>

<O que o sistema faz, em uma ou duas frases. Sem tecnologia.>

**Como conferir:**
1. <um passo que a pessoa faz no produto>
2. <…>

**Deve ver:** <o resultado que a pessoa observa — um texto na tela, um
número, um e-mail que chega, um botão que some.>

## Fora desta feature

- <o que parece fazer parte e não entra agora, e por quê>

## Restrições para o plano

<Opcional. O que a pessoa exigiu sobre o como — "tem que funcionar no
celular", "sem custo mensal novo" —, com as palavras dela.>

## A esclarecer

<Opcional. Uma linha por pergunta sem resposta:>

- [A ESCLARECER] <a pergunta> — <o que ela muda na spec>
```

## As regras de um requisito

- **Um comportamento por requisito.** "Cadastrar e editar" são dois.
- **O sujeito é o sistema, ou a pessoa.** "A pessoa vê a lista de pedidos do
  mês", não "criar endpoint de pedidos".
- **"Como conferir" é para gente, não para teste automático.** Passos que
  alguém sem conhecimento técnico segue no produto aberto. Se precisar de um
  dado preparado antes ("ter um pedido cancelado"), escreva como primeiro
  passo.
- **"Deve ver" é concreto.** "Funciona" não é resultado. "Aparece a mensagem
  'Pedido enviado' e o pedido some da lista de rascunhos" é.

## Requisito que a pessoa não consegue conferir

Alguns requisitos não aparecem na tela: a senha guardada cifrada, o dado de
um cliente que outro não vê pela API. Eles continuam sendo requisitos, mas o
aceite não os cobre. Escreva assim:

```markdown
### REQ-007 — <nome>

<O que o sistema garante.>

**Como conferir:** fora do aceite — <quem confere: os testes da feature, a
revisão de segurança>.
```

Diga isso à pessoa em uma linha no resumo: esses requisitos dependem dos
testes e da revisão, e não do olho dela.

## Status

- **rascunho** — gravado sem aprovação, a pedido da pessoa.
- **aprovada** — a pessoa aprovou o resumo. É o que o plano espera.
- **entregue** — a feature foi aceita, ou o aceite foi dispensado. Quem muda
  para este status é o aceite.
