# Veredito, gravidade e relatório

> Lido depois de tentar derrubar as candidatas.

## Os três vereditos

| Veredito | Quando | Gravidade? |
|---|---|---|
| `confirmado` | as cinco partes da afirmação estão no código, e a tentativa de derrubar não achou controle | sim |
| `a confirmar` | a afirmação depende de um fato que não está no repositório | **não** |
| `descartado` | a tentativa de derrubar achou o controle | não |

- `a confirmar` diz **o fato exato** que falta e como a pessoa confere, sem
  testar nada no ar. Não é um "confirmado de baixa confiança".
- `descartado` fica no relatório, numa linha, com o controle que o derrubou.
  Mostra o que foi olhado e evita que a mesma suspeita volte.
- Na dúvida entre `confirmado` e `a confirmar`, é `a confirmar`.

## Gravidade — só para `confirmado`

Mede o resultado **que você mostrou**, não o pior caso imaginável.

| Gravidade | O que quer dizer |
|---|---|
| **crítica** | alguém sem login executa código, lê o banco inteiro ou toma qualquer conta |
| **alta** | um controle explícito é vencido por completo, com consequência real: entrar sem senha, um cliente ler ou alterar dado de outro, script gravado que roda para outros usuários, usuário logado executando código |
| **média** | a fronteira é cruzada, mas com alcance pequeno, condição incomum ou efeito restrito a poucos registros |
| **baixa** | revela detalhe interno que não é segredo, ou exige muito esforço para pouco efeito |

A pergunta que separa alta de média: o controle foi **vencido** ou só
**enfraquecido**? Se você não consegue dizer o dano concreto, a gravidade é
menor do que parece.

## O relatório

```markdown
# Revisão de segurança — <AAAA-MM-DD>

> **Isto é um primeiro olhar, feito lendo o código.** Não é teste de invasão
> e não prova que o sistema é seguro.
> <Se guarda dado sensível: recomendação de revisão dedicada.>

**Escopo:** <os oito domínios | PARCIAL: domínios …>
**Commit revisado:** <identificador curto> · **Árvore:** <limpa | com mudanças>

## Resumo

<N> confirmados (<c> críticos, <a> altos, <m> médios, <b> baixos) ·
<x> a confirmar · <d> descartados · <o> observações.

## Confirmados

### 1. <título: quem consegue fazer o quê> — <gravidade>

- **Quem:** <o ator com menos privilégio>
- **Faz o quê:** <a entrada ou ação> — `<arquivo>:<linha>`
- **O controle que deveria barrar:** <qual, e onde deveria estar>
- **Fronteira cruzada:** <de quem para quem>
- **Resultado:** <o que essa pessoa passa a ver ou poder fazer>
- **O que procurei para derrubar:** <os lugares conferidos>
- **A menor correção:** <a regra que o código precisa garantir, e a mudança>
- **Teste que impede a volta:** <o caso a escrever>

## A confirmar

| Suspeita | O fato que falta | Como conferir, sem testar no ar |
|---|---|---|

## Problemas de estrutura

<O mesmo tipo de achado repetido: descrito uma vez, com exemplos e a
correção que resolve todos.>

## Observações

<O que não tem as cinco partes: boa prática ausente, endurecimento possível.
Sem gravidade. Uma linha cada.>

## Descartados

| Suspeita | O que a derrubou |
|---|---|

## Cobertura

| Domínio | Revisado? | O que foi lido |
|---|---|---|
| 1. Entrada e injeção | <sim / em parte / não> | <pastas e arquivos> |
| … | | |

**Não revisado:** <o que ficou de fora, por extenso>.
**Não dá para ver daqui:** falha conhecida em dependência, configuração feita
na plataforma, quem tem acesso às contas.
```

## Regras do relatório

- **Seção vazia some**, menos o aviso do topo, "Resumo" e "Cobertura".
- **A cobertura é obrigatória** e diz o que **não** foi revisado. Domínio
  lido por amostra é "em parte", com a amostra descrita.
- **Nenhum valor de segredo. Nenhuma carga de ataque pronta.** O caminho no
  código e o resultado bastam para quem vai corrigir.
- **Palavra do tamanho do fato.** O título diz quem consegue fazer o quê.
- **"A confirmar" não tem ordem de prioridade.**
- **Os números do resumo fecham** com as seções.
- **Sem nota e sem selo.** Nunca "aprovado".

## Como dizer na conversa

Nesta ordem: o aviso de que é um primeiro olhar; a contagem; os confirmados
de gravidade crítica e alta, uma linha cada; quantos ficaram a confirmar; o
que não foi revisado; e onde está o relatório — ou que ele foi entregue só
na conversa, porque o repositório é público.
