# yas-sdd

Um jeito de construir software com IA **começando pela especificação**, e sob
regras que você mesmo escreveu.

O `yas-sdd` é um conjunto de *skills* — arquivos de instrução que o seu agente
de IA lê e segue. Ele conduz você, por conversa, a quatro coisas:

1. uma **constituição**: as leis do seu projeto, que todo plano precisa
   respeitar;
2. uma **especificação** por feature: o que vai ser construído e por quê,
   antes de qualquer código;
3. um **aceite** por feature: o momento em que você usa o que foi feito e diz
   se é aquilo — o agente nunca se aprova sozinho;
4. um **estado** do projeto que cabe numa tela, para você — ou o agente —
   retomar o trabalho sem reler tudo.

Não tem nada para instalar além das próprias skills: sem Node, sem Python,
sem linha de comando própria. É texto, e quem trabalha é o agente.

> **Estado: em construção.** O caminho inteiro está escrito — do início do
> projeto ao aceite —, mas as skills ainda não foram rodadas em sessão real
> nem medidas. Veja [o que existe hoje](#o-que-existe-hoje).

## Para quem é

Para quem fez um produto com ajuda de IA, viu funcionar, e agora quer crescer
sem perder o controle do que foi decidido. Você não precisa saber programar
para usar a constituição; precisa saber o que o seu produto não pode fazer.

## Como instalar

**O jeito mais simples: peça ao seu agente.** Abra o agente na pasta do seu
projeto e diga:

> Instale o yas-sdd neste projeto seguindo as instruções de
> https://github.com/yvesas/yas-sdd/blob/main/INSTALL.md

Ele faz o resto e avisa quando terminar.

**Pelo terminal**, se você preferir:

```bash
git clone https://github.com/yvesas/yas-sdd.git
yas-sdd/bin/install caminho/do/seu/projeto
```

No Windows, o `bin/install` precisa do Git Bash, que vem com o Git para
Windows — ou use o caminho do agente, que não depende disso.

Depois de instalar, abra uma sessão nova do agente e rode:

```
/yas-start
```

## O que existe hoje

| Skill | O que faz |
|---|---|
| `/yas` | Olha onde o projeto está e diz qual é o próximo passo. Não escreve nada. |
| `/yas-start` | Prepara o projeto: descobre de onde você está partindo e cria os arquivos de estado. |
| `/yas-constitution` | Entrevista você e escreve a constituição. Em projeto que já existe, reconhece as regras que ele já pratica. |
| `/yas-specify` | Escreve a spec de uma feature por conversa: o problema, o que a pessoa passa a conseguir fazer e, para cada requisito, como você confere que funcionou. |
| `/yas-plan` | Decide como construir: cada decisão com o motivo, onde cada requisito é atendido, e o plano conferido contra a constituição. |
| `/yas-tasks` | Quebra o plano em tarefas pequenas, cada uma com o seu teste e um "pronto quando" que se confere. |
| `/yas-implement` | Faz as tarefas uma por vez, roda os testes de cada uma e para quando o plano não basta, em vez de improvisar. |
| `/yas-accept` | O aceite: monta o roteiro a partir da spec, você confere no produto, e o que falhou volta como tarefa. |
| `/yas-state` | Mostra o que está aberto e o que espera o seu aceite, arruma o estado e deixa o próximo passo escrito ao pausar. |
| `/yas-audit` | Confere se o repositório cumpre a constituição e mostra o que falta, com a menor correção para cada ponto. Só lê; não altera nada. |
| `/yas-security` | Lê o código e a configuração procurando onde alguém consegue fazer o que não deveria: injeção, login, um cliente vendo dado de outro, segredo exposto, IA, CI. É um primeiro olhar, não um teste de invasão. |

A constituição é montada em **camadas**, escolhidas pelas suas respostas:

| Camada | Entra quando |
|---|---|
| base | sempre — git, código, testes, segredos, CI, documentação |
| Node.js e TypeScript | o projeto usa Node |
| IA dentro do produto | o seu produto chama um modelo de IA |

Camadas de Go, Python, múltiplos clientes, dado sensível, dinheiro e
publicação estão no roteiro. Enquanto não chegam, o que você responder sobre
esses assuntos fica registrado na constituição, numa seção própria.

## Onde foi medido

**Só no Claude Code**, e ainda sem bateria de testes automatizados — isso é
dito aqui porque é verdade, não por modéstia. Em outros agentes e em
plataformas que constroem o app pelo chat, as skills são arquivos de texto
comuns e devem poder ser seguidas, mas ninguém mediu. Se você testar, conte
como foi.

## De onde vem

O método é **baseado no [GitHub Spec Kit](https://github.com/github/spec-kit)**:
a ideia de uma constituição que governa os planos, a sequência especificar →
planejar → tarefas → implementar e o formato dos arquivos de cada feature vêm
de lá. Os arquivos que o `yas-sdd` gera usam o mesmo formato de pasta, então
quem quiser adotar o Spec Kit depois aproveita o que já escreveu.

O que o `yas-sdd` faz de diferente: não tem ferramenta para instalar, é
conduzido por conversa, é escrito em português, a constituição nasce de uma
entrevista sobre o seu produto em vez de um modelo em branco, e toda feature
termina num aceite seu — a sequência ganha um passo depois de implementar.

A auditoria e a revisão de segurança adaptam ideias da
[skill de auditoria de segurança da Cloudflare](https://github.com/cloudflare/security-audit-skill),
que é a ferramenta a procurar quando você precisa de uma revisão completa.

Os créditos e as licenças do que foi adaptado estão em [`NOTICE`](./NOTICE).

## Faz parte de um conjunto

- **[yas-canvas](https://github.com/yvesas/yas-canvas)** ajuda a decidir *o
  que* construir e *por quê*. Se você já passou por ele, o `yas-sdd` lê as
  suas respostas e não pergunta de novo.
- **yas-sdd** cuida de *como* construir, e sob quais regras.

Um não depende do outro.

## Licença

MIT. Veja [`LICENSE`](./LICENSE).
