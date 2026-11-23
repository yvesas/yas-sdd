# Modelo do plano

> Lido na hora de montar `specs/NNN-nome/plan.md`. O texto entre `<…>` é
> preenchido; seção marcada como opcional some quando fica vazia.

## O arquivo

```markdown
# Plano — <nome da feature>

**Feature:** <NNN-nome> · **Spec:** `spec.md` · **Escrito em:** <AAAA-MM-DD>

## Resumo

<Três a cinco linhas: a abordagem, em linguagem que a pessoa entende.>

## Onde a feature encosta

<A stack, em uma linha. O que já existe e vai ser usado, com o caminho. O
que muda de comportamento para quem já usa o produto.>

## Decisões

### D-001 — <nome curto>

**Por causa de:** <REQ-NNN, ou a restrição da spec>
**Escolha:** <o que foi decidido>
**Alternativas:** <as outras opções, a mais simples sempre entre elas, e por
que não>
**Quem decidiu:** <a pessoa | proposta do agente>
<"**Vira ADR.**" quando a decisão vale além desta feature.>

## Como cada requisito é atendido

| Requisito | Onde e como | Como se prova |
|---|---|---|
| REQ-001 | <arquivo ou parte do sistema, e o que faz ali> | <teste unitário, de integração, de ponta a ponta — e o aceite> |

## O que muda no código

| Arquivo | Novo ou alterado | Para quê |
|---|---|---|
| `<caminho>` | <novo | alterado> | <REQ ou D> |

## Dados

<Opcional. O que se guarda de novo ou de diferente: entidade, campos que
importam, quem pode ler e escrever. Mudança de estrutura no banco diz como
volta atrás.>

## Dependências novas

<Opcional. Nome, para que serve, e a decisão que a trouxe. Versão só se
conferida no repositório ou na documentação oficial.>

## Portão da constituição

| Princípio | Como o plano cumpre | Resultado |
|---|---|---|
| <N. nome> | <o trecho do plano> | <cumpre | desvio | não se aplica> |

## Desvios

<Opcional. Um bloco por desvio, no formato do portão.>

## Para depois

<Opcional. O que apareceu e ficou fora — com o motivo. Não é promessa.>

## A confirmar

<Opcional. Fato que o plano usa e ninguém conferiu, e onde conferir.>
```

## Regras de escrita

- **O plano é lido pela pessoa e pelo agente que implementa.** Resumo e
  decisões em linguagem simples; detalhe técnico nas tabelas.
- **Sem código.** Um nome de função ou de campo, sim; bloco de código, não —
  ele envelhece antes de ser usado.
- **"Como se prova" sempre tem teste**, e tem o aceite quando o requisito tem
  "Como conferir". Requisito fora do aceite precisa de teste que o cubra; se
  não há como testar, diga.
- **Tamanho.** Plano que passa de umas 200 linhas é feature grande demais.
  Diga isso e proponha dividir a spec.
