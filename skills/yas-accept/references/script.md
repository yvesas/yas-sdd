# O roteiro do aceite

> Lido ao montar o roteiro e durante a conferência. O roteiro é o que a
> pessoa tem na frente enquanto usa o produto.

## Montar

Um item por requisito que tem "Como conferir", na ordem da spec. Em rodada
nova, primeiro os que falharam antes, depois os demais — pergunte se ela
quer reconferir tudo ou só o que falhou.

```markdown
**Antes de começar:** <como abrir o produto, e o que precisa existir — uma
conta, um pedido de exemplo>

**1. REQ-001 — <nome>**
   1. <passo>
   2. <passo>
   → Você deve ver: <o resultado>

**2. REQ-002 — <nome>**
   …
```

Depois do roteiro, liste à parte os requisitos **fora do aceite**, com quem
os confere — "REQ-007: coberto pelos testes da feature". A pessoa precisa
saber que eles não dependem dela, e que ela não os conferiu.

Escreva os passos como a pessoa vê o produto: o nome do botão como está na
tela, a página pelo título. Nada de rota, componente ou tabela.

## Abrir o produto

A pessoa pode não saber subir o ambiente. Antes do primeiro item:

1. Leia "Religar o ambiente" no `HANDOFF.md`.
2. Se o produto roda num endereço de teste, diga qual — se estiver escrito.
3. Se precisa rodar localmente, mostre os comandos, um por vez, explicando
   o que cada um faz — quem roda é ela. Esta skill não roda comando nenhum.
4. Se nada disso está escrito, diga, e pergunte como ela abre o produto. A
   resposta vai para o `HANDOFF.md` no fim — pergunte antes de gravar.

Dado de teste que o roteiro precisa: diga como criá-lo pelo próprio produto,
com dado inventado — nunca com dado real de pessoa.

## Conferir

Pergunte como ela prefere:

> Como você quer conferir? **RECOMENDAÇÃO: A, se forem mais de três itens.**
>
> A) Item por item: você me diz o resultado de cada um antes do próximo.
> B) Tudo de uma vez: você faz o roteiro inteiro e me conta no fim.

No modo B, "deu tudo certo" não basta. Ao fim, passe pelos itens um por um
e pergunte, de cada um, o que apareceu. Item sem resposta própria fica `não
conferido`.

Durante a conferência:

- **Não conduza a resposta.** "Apareceu a mensagem certa?" sugere o sim.
  Pergunte "o que apareceu?".
- **Falha não se discute.** Se ela viu outra coisa, é `falhou`, mesmo que você
  ache que o código está certo. Você pode explicar o que o código faz; o
  registro diz o que ela viu.
- **Passo que ela não conseguiu fazer** — botão que não achou, tela que não
  abriu — também é `falhou`. Roteiro confuso é problema da feature ou do
  roteiro; anote qual dos dois.
- **Silêncio não é resposta.** Se ela parou no meio, o que faltou fica `não
  conferido`.

## Quem conferiu

O registro diz quem conferiu. Pergunte o nome, ou como ela quer aparecer. Se
quem conferiu não foi quem pediu a feature, anote os dois.
