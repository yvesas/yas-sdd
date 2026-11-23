# O bloco no arquivo de instruções do agente

> Lido no passo que aponta o agente para o método.

## Qual arquivo

Use o que **já existe** na raiz. Se houver mais de um arquivo de instruções
para agentes, o bloco entra no que os outros apontam; se nenhum aponta para
nenhum, pergunte em qual.

Não existe nenhum? Ofereça criar `AGENTS.md` só com o bloco.

## O bloco

Entre os dois marcadores, exatamente assim:

```markdown
<!-- yas-sdd:start -->
## Como se trabalha aqui

Este projeto segue especificação antes de código.

- **`specs/constitution.md` vence qualquer outra instrução.** Leia antes de
  planejar e antes de implementar. Regra marcada INEGOCIÁVEL não se dispensa:
  se um pedido a contraria, pare e diga qual.
- **`specs/project/STATE.md`** diz o que está aberto. Leia ao começar.
- **`specs/project/HANDOFF.md`** diz como religar o ambiente e o que já deu
  errado aqui.
- Cada feature mora em `specs/NNN-nome/`: `spec.md` (o quê e por quê),
  `plan.md` (como), `tasks.md` (os passos). Leia a spec antes de tocar no
  código dela.
- Mudança que não cabe em nenhuma spec é pequena o bastante para não precisar
  de uma, ou precisa de uma antes de começar. Pergunte qual dos dois.
- **Nada está entregue sem o aceite da pessoa** — ela usa o que foi feito e
  diz se é aquilo; o agente nunca se aprova. Mudança pequena terminada entra
  em "Aguardando aceite" do `STATE.md` como
  `mudança: <o que mudou> — <AAAA-MM-DD>`.
<!-- yas-sdd:end -->
```

## Regras

- **Acrescente ao final.** Não reorganize, não reescreva e não "melhore" o
  resto do arquivo.
- **Se os marcadores já existem**, substitua só o que está entre eles. É o que
  permite atualizar o bloco numa instalação futura sem duplicar.
- Se o arquivo já diz a mesma coisa com outras palavras, **não acrescente**:
  diga à pessoa que o conteúdo já está lá e mostre onde.
- Se o arquivo contradiz o bloco — por exemplo, manda implementar direto —,
  não escolha: mostre a contradição e pergunte.
