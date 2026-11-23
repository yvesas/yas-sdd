# Quando parar

> Lido antes da primeira tarefa, e de novo sempre que algo sair do plano.
> Parar no lugar certo é o que impede o agente de construir outra coisa que
> não a pedida.

## Pare e pergunte

| Situação | O que dizer |
|---|---|
| a tarefa pede uma decisão que o plano não tomou | a decisão, as opções, e que o caminho é `D-NNN` novo no plano |
| o código real é diferente do que o plano supôs | o que o plano diz, o que o código mostra, e o que muda |
| a tarefa precisa tocar arquivo que ela não cita | qual arquivo e por quê; se for um ajuste óbvio, pergunte se pode |
| um princípio da constituição atrapalha a tarefa | qual princípio e qual trecho; INEGOCIÁVEL não se contorna |
| precisa de dependência que o plano não lista | o que ela resolve, e que dependência nova é decisão |
| precisa de segredo, credencial ou serviço que você não tem | o nome da variável que falta — nunca peça o valor na conversa |
| o mesmo erro voltou depois de duas tentativas | o erro, o que você tentou, e a sua melhor hipótese |
| o gate da constituição não existe ou não roda | que a verificação não foi feita; não conte como passou |

Parar não é falhar. A pergunta certa no meio da feature custa um minuto; o
improviso descoberto no aceite custa a feature.

## Pode resolver sozinho

- erro de digitação, import faltando, ajuste de tipo dentro dos arquivos da
  tarefa;
- teste da própria tarefa que falha porque o código ainda está errado —
  corrija o código;
- formatação e lint que o próprio comando do projeto corrige.

Diga o que fez em uma linha.

## Nunca, para a suíte passar

- enfraquecer uma asserção, apagar um teste, ou marcar um teste para ser
  pulado;
- capturar um erro e ignorá-lo;
- desligar uma regra de lint ou de tipos na linha;
- trocar o dado do teste até ele passar sem entender por quê;
- marcar `- [x]` numa tarefa com teste falhando, "para voltar depois".

Se a única saída que você enxerga é uma dessas, isso é uma parada: diga qual
teste, o que ele espera e por que o código não entrega.

## O que nunca dizer

- "Rodei os testes" sem ter rodado. "Os testes passaram" sem ter visto o
  código de saída.
- "Pronto para produção", "tudo funcionando", "entregue".
- "A pessoa vai conferir que…" no lugar de dizer o que **você** conferiu.
