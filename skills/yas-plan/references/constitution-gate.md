# O portão da constituição

> Lido depois de montar o plano. O portão é o momento em que o plano é
> conferido contra cada lei do projeto, uma por uma, por escrito.

## Como passar

Percorra **todos** os princípios da constituição, na ordem dela. Para cada
um, escreva uma linha na tabela do portão:

| Resultado | Quando | O que escrever |
|---|---|---|
| `cumpre` | o plano faz o que o princípio exige | **o trecho do plano** que cumpre — não "ok" |
| `desvio` | o plano faz diferente, e o princípio permite desvio | aponte para o bloco em "Desvios" |
| `não se aplica` | a feature não toca o assunto do princípio | uma frase dizendo por quê |

"Entra em vigor depois" também é conferido: se a feature é justamente o
gatilho de uma regra adiada — o primeiro cliente pagante, a primeira
integração com dinheiro —, diga isso à pessoa. Ligar a regra é emenda, com
`/yas-constitution`.

## Inegociável

Princípio marcado **INEGOCIÁVEL** só tem dois resultados possíveis: `cumpre`
ou `não se aplica`.

Se o plano não cabe nele, **pare** e diga:

1. qual princípio, com o texto da regra;
2. qual parte do plano, e por que ela não cabe;
3. os dois caminhos — mudar o plano, ou emendar a constituição de propósito.

Não proponha "só nesta feature", não reinterprete a regra a favor do plano e
não grave o plano com a quebra anotada. Exceção para uma feature nomeada só
existe se estiver escrita na própria constituição.

## Desvio

Princípio sem a marca aceita desvio, desde que escrito:

```markdown
### Desvio do princípio <N> — <nome>

**O que desvia:** <a regra e o trecho do plano>
**Por quê:** <o motivo concreto desta feature>
**O mais simples, recusado:** <a alternativa que cumpriria a regra, e por
que ela não serve aqui>
```

Desvio sem as três linhas não entra. Mostre cada desvio à pessoa no resumo:
ela aprova o plano sabendo deles.

## Na dúvida

Se não está claro o que o princípio exige neste caso, **pergunte**. Não
interprete a seu favor. A resposta pode virar emenda que esclarece o texto —
diga isso em uma linha.
