---
name: yas-audit
shared: [preamble, workflow]
references: [checks, report]
description: >
  Confere se o repositório cumpre a própria constituição: lê
  `specs/constitution.md`, procura no repositório a evidência de cada regra e
  devolve um relatório com o que cumpre, o que não cumpre, o que só dá para
  confirmar fora do repositório e a menor correção para cada falha. Só lê —
  não altera código nem configuração. Use ao pedir "audita o projeto", "o
  projeto segue a constituição?", "confere as regras", depois de emendar a
  constituição, ou ao adotar o método num projeto que já existe. Não é
  revisão de vulnerabilidades do código.
allowed-tools: Read, Glob, Grep, Write, AskUserQuestion, Bash(git log*), Bash(git ls-files*)
triggers: [auditar o projeto, audit, confere a constituição, o projeto segue as regras,
  conformidade com a constituição]
---

# /yas-audit — a realidade bate com a constituição?

A constituição diz o que **deve** valer. Esta skill olha o repositório e diz
o que **vale**. Ela não corrige nada: mostra, com o arquivo e a linha, e deixa
a decisão com a pessoa.

## Guarda — antes de tudo

A primeira chamada de ferramenta confere **um fato**: `specs/constitution.md`
existe?

- **Existe.** Siga.
- **Não existe.** Pare. Sem constituição não há contra o que auditar: diga
  que o passo anterior é rodar `/yas-constitution`.

Depois, leia os dois arquivos ao lado deste — `preamble.md` e `workflow.md`.

## Dois modos — e carregar a skill não autoriza escrever

| Pedido | Modo | Grava arquivo? |
|---|---|---|
| uma pergunta sobre **uma** regra ("o CI tem tempo limite?") | **orientação** | não — responda na conversa, com a evidência |
| "audita o projeto", "confere tudo", ou pedido de relatório | **completa** | sim, o relatório |

Não deu para saber qual dos dois? Faça **uma** pergunta antes de criar
qualquer arquivo.

## Auditoria completa — o caminho

| | Passo | Onde está |
|---|---|---|
| 1 | Escopo: tudo, ou uma parte | aqui |
| 2 | Listar as regras da constituição | aqui |
| 3 | Procurar a evidência de cada regra | `references/checks.md` |
| 4 | Dar o veredito de cada uma | aqui |
| 5 | A menor correção para cada falha | aqui |
| 6 | Montar e gravar o relatório | `references/report.md` |
| 7 | Fechamento | `preamble.md` |

### 1. Escopo

Pergunte só se o pedido não disse:

> O que eu confiro? **RECOMENDAÇÃO: A, na primeira vez.**
>
> A) A constituição inteira.
> B) Só as regras inegociáveis.
> C) Um princípio — diga qual.

Auditoria de uma parte **se apresenta como parcial**, na primeira linha do
relatório. O que ficou de fora é listado como "não verificado" — nunca fica
subentendido que está em ordem.

Se já existe um relatório anterior em `specs/project/AUDIT.md`, leia. Ele
serve para dizer o que mudou desde então; **não** serve de prova de nada: o
que ele chamou de cumprido é conferido de novo.

### 2. As regras

Leia a constituição inteira e liste cada regra — cada linha com DEVE, NÃO
DEVE ou CONVÉM —, guardando o princípio de onde veio, se ele é INEGOCIÁVEL e
o que o "Verificado por" dele diz. As regras de "Entra em vigor depois"
entram na lista como `não se aplica ainda`, com o gatilho.

Não acrescente regra que a constituição não tem. Se você acha que falta uma,
isso vai numa seção separada do relatório, como sugestão de emenda.

### 3. A evidência

Leia `references/checks.md` e procure, para cada regra, o que o repositório
mostra. Três limites, sem exceção:

- **Só leitura.** Você não roda a suíte, o build nem script do projeto. Os
  únicos comandos permitidos são de consulta ao histórico e à lista de
  arquivos do git.
- **Nunca abra arquivo de ambiente com valor real.** Para saber se um está
  versionado, pergunte ao git a lista de arquivos; para saber as variáveis,
  leia o arquivo de exemplo.
- **Se achar um segredo**, o relatório diz o arquivo e a linha — **nunca o
  valor**.

### 4. O veredito

Cada regra recebe exatamente um:

| Veredito | Quando | O que acompanha |
|---|---|---|
| `cumpre` | o repositório mostra a regra sendo seguida | arquivo e linha da evidência |
| `não cumpre` | o repositório mostra a regra sendo quebrada, ou falta algo que **teria** de estar nele | arquivo e linha, ou o caminho onde deveria estar |
| `confirmar` | o fato decisivo mora fora do repositório | **o fato exato** que falta e onde a pessoa olha |
| `não se aplica ainda` | a regra está marcada para um estágio adiante | o gatilho |
| `não verificado` | ficou fora do escopo, ou você não conseguiu conferir | o motivo |

As regras do veredito são o coração desta skill:

- **Ausência no repositório não é ausência no mundo.** Proteção da branch
  principal, segredo guardado na plataforma, permissão de quem publica,
  configuração de hospedagem: nada disso aparece no repositório. É
  `confirmar`, não `cumpre` nem `não cumpre`. Não presuma para nenhum lado.
- **`confirmar` não tem prioridade nem gravidade.** É uma pergunta em aberto,
  não um problema leve.
- **`cumpre` exige evidência.** "Não achei violação" não é evidência de que a
  regra é seguida, se você procurou em três arquivos de trezentos. Diga onde
  procurou; se foi por amostra, o veredito é `não verificado` com a amostra
  descrita.
- **Descumprimento é descumprimento.** Não chame de vulnerabilidade, falha
  crítica ou risco grave o que é uma regra da constituição não seguida. Diga
  a regra e o fato.
- **Regra que ninguém tem como verificar** — nem lendo o repositório, nem
  olhando fora dele — não recebe veredito forçado: vai para a lista "regras
  sem verificação possível", que é assunto para a próxima emenda.

### 5. A menor correção

Para cada `não cumpre`, descreva a **menor** mudança que faz a regra valer:
qual arquivo, o que entra ou sai. Uma correção por falha; nada de "aproveite
e reorganize".

Você **descreve**, não aplica. A pessoa decide entre fazer agora, abrir uma
spec para isso, ou emendar a constituição porque a regra não serve mais — as
três são respostas legítimas.

Ordene as falhas assim: primeiro as de princípio INEGOCIÁVEL, depois as
demais; dentro de cada grupo, as que não têm nenhuma trava antes das que têm.

### 6. O relatório

Leia `references/report.md` e grave `specs/project/AUDIT.md`. O arquivo é
**reescrito** a cada auditoria completa: ele é um retrato, não um histórico —
o histórico é o git.

Depois de gravar, pergunte uma vez:

> Quer que eu registre as falhas como pendências no estado do projeto?
> **RECOMENDAÇÃO: A, para elas não se perderem.**
>
> A) Sim, em `specs/project/STATE.md`.
> B) Não.

## O que esta skill não faz

- **Não é revisão de vulnerabilidades.** Ela confere regras escritas contra
  o que o repositório mostra. Um projeto pode cumprir toda a constituição e
  ter uma falha de segurança no código. Para isso existe `/yas-security`;
  diga isso em uma linha no fim do relatório. Se o produto guarda dado
  sensível, recomende também uma revisão de segurança profissional.
- Não altera código, configuração, workflow nem a constituição.
- Não roda testes, build ou scripts do projeto.
- Não diz "está tudo certo". No máximo: "das N regras conferidas, M cumprem".

## Conferência antes de gravar

- [ ] Toda regra da constituição tem um veredito, ou está em "não verificado"?
- [ ] Todo `cumpre` e todo `não cumpre` cita arquivo e linha?
- [ ] Todo `confirmar` diz o fato exato e onde olhar?
- [ ] Algum veredito presume algo que está fora do repositório?
- [ ] Alguma falha foi descrita com palavra mais forte que o fato?
- [ ] Algum valor de segredo apareceu no relatório? Tire.
- [ ] Se foi parcial, a primeira linha diz isso?

## Fechamento

Como no `preamble.md`. A tarefa única é a **primeira falha da lista
ordenada** — ou, se não houve falha, o primeiro item de `confirmar`, com o
lugar onde a pessoa olha.
