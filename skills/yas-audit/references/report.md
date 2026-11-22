# O relatório

> Lido na hora de montar `specs/project/AUDIT.md`. O arquivo é um retrato:
> reescrito a cada auditoria completa.

## O arquivo

```markdown
# Auditoria — <AAAA-MM-DD>

**Escopo:** <a constituição inteira | PARCIAL: só …>
**Constituição:** versão <x.y.z> · **Commit conferido:** <identificador curto>
**Árvore de trabalho:** <limpa | com mudanças não commitadas>

## Resumo

Das <N> regras da constituição: <a> cumprem · <b> não cumprem ·
<c> a confirmar · <d> ainda não se aplicam · <e> não verificadas.

<Uma frase, e só uma, com o que mais importa. Sem adjetivo.>

## Não cumpre

### 1. <a regra, com as palavras da constituição>

- **Princípio:** <nome> <(INEGOCIÁVEL)>
- **O que o repositório mostra:** <o fato> — `<arquivo>:<linha>`
- **A menor correção:** <o que entra ou sai, em qual arquivo>
- **Trava hoje:** <a verificação que existe | nenhuma>

## A confirmar

| Regra | O fato que falta | Onde olhar |
|---|---|---|
| <…> | <…> | <…> |

## Cumpre

| Regra | Evidência |
|---|---|
| <…> | `<arquivo>:<linha>` |

## Ainda não se aplica

| Regra | Passa a valer quando |
|---|---|

## Não verificado

| Regra | Motivo |
|---|---|

## Regras sem verificação possível

<Regras que não dá para conferir nem no repositório nem fora dele. Assunto
para a próxima emenda da constituição: ou ganham verificação, ou saem.>

## Sugestões de emenda

<O que você acha que falta na constituição. Separado de propósito: não é
achado da auditoria.>

## Desde a última auditoria

<Só quando havia relatório anterior: o que foi resolvido, o que apareceu, o
que continua. Seção omitida na primeira vez.>

## O que esta auditoria não é

Ela conferiu as regras escritas na constituição contra o que o repositório
mostra. Não é uma revisão de vulnerabilidades do código.
<Se o produto guarda dado sensível: recomendação, em uma linha, de uma
revisão de segurança dedicada.>
```

## Regras do relatório

- **Seção vazia some**, menos "Resumo" e "O que esta auditoria não é".
- **Os números do resumo têm que fechar** com as tabelas. Conte antes de
  gravar.
- **Palavra do tamanho do fato.** "O job `test` não tem tempo limite", e não
  "falha grave de configuração do CI".
- **Nenhum valor de segredo**, em seção nenhuma.
- **"A confirmar" não tem ordem de prioridade.** É uma lista de perguntas.
- **Amostra se declara.** "Conferidos os últimos 50 commits" vai na célula
  de evidência.
- **Nada de nota, selo ou porcentagem de conformidade.** Um número só convida
  a otimizar o número.

## Como dizer na conversa

Depois de gravar, a resposta à pessoa tem, nesta ordem: a contagem do
resumo; as falhas de princípio inegociável, uma linha cada; quantos itens
ficaram a confirmar; e o caminho do arquivo. O resto ela lê no relatório.
