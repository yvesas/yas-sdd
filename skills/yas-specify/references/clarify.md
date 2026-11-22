# A conversa da spec

> Lido no passo da conversa. Diz o que perguntar, em que ordem, e quando
> parar.

## O que procurar

Percorra os assuntos abaixo **na ordem**. Para cada um, pergunte só se a
resposta muda a spec e ainda não está escrita em lugar nenhum — no pedido,
no canvas, no `PROJECT.md`. O que você já sabe, confirme em uma linha.

| Assunto | A pergunta por trás | Vira |
|---|---|---|
| problema | o que dói hoje, e para quem? | "O problema" |
| quem usa | quais tipos de pessoa usam isto? alguém só vê, alguém aprova? | "Para quem" |
| o fluxo | o que a pessoa faz, do começo ao fim, quando tudo dá certo? | "O que a pessoa consegue fazer" |
| o que pode dar errado | dado faltando, ação repetida, sem permissão, sem conexão | requisitos de erro |
| limites | quanto, quantos, até quando — **só** se a pessoa souber | requisitos com número |
| dados | o que se guarda, de quem, e quem pode ver | requisitos de acesso |
| o que fica de fora | o que parece fazer parte e não entra agora | "Fora desta feature" |
| palavras | algum termo que a pessoa usa com sentido próprio? | uma linha no requisito |

Quem usa o pack é leigo. "Caso de borda" vira "e se a pessoa clicar duas
vezes?"; "permissão" vira "quem pode ver isso?".

## Como perguntar

- **Uma pergunta por vez** — ou duas, do mesmo assunto. No formato do
  `preamble.md`, com recomendação.
- **Recomende pelo produto, não pela técnica.** "Recomendo que só quem criou
  possa apagar, porque é o que evita a reclamação mais comum" — não "porque
  é mais fácil de implementar".
- **Exemplo concreto destrava resposta vaga.** Se a pessoa diz "rápido", pergunte
  "se demorar três segundos, alguém reclama?".
- **Anote na hora.** Cada resposta vai para o rascunho da spec antes da
  próxima pergunta; no fim, a spec já está quase pronta.

## Quando parar

Pare de perguntar quando acontecer **uma** destas:

- todo assunto da tabela está respondido ou foi dispensado pela pessoa;
- já foram umas oito perguntas — o resto vira "A esclarecer";
- a pessoa pediu para fechar.

"A esclarecer" não é falha: é a lista honesta do que ninguém sabe ainda. Mas
o plano não começa com item lá — então, ao parar, diga quais itens ficaram e
qual deles é o mais importante.

## O que não é desta conversa

| Se a pessoa trouxer | O que fazer |
|---|---|
| tecnologia — banco, biblioteca, linguagem | anote em "Restrições para o plano", se ela exige; senão, diga que o plano decide |
| layout, cor, posição de botão | anote como restrição só se ela exige; a spec diz o que a tela permite fazer |
| prazo | fora da spec; se importa, vai para o `ROADMAP.md` |
| outra feature | diga que é outra pasta, anote em "Fora desta feature" |
