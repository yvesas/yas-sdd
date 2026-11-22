# A entrevista — seis blocos

> Lido quando a entrevista começa. Um bloco por vez, até duas perguntas por
> vez. O que já está respondido num arquivo do projeto é **confirmado em uma
> linha**, não perguntado de novo.

## Camadas que este pack traz hoje

| Tipo | Disponíveis |
|---|---|
| base | `base` — sempre entra |
| stack | `stack-node` |
| módulo | `module-ai` |

Resposta que pede uma camada que ainda não existe (Go, Python, dinheiro,
multi-tenant…) **não é descartada**: o que a pessoa disse vai para a seção
"Camadas ainda não cobertas" da constituição, com as palavras dela. Diga em
uma linha que essa camada não veio pronta.

## Bloco 1 — Estágio

Decide o rigor. A mesma regra é certa com cliente pagando e exagero numa
ideia.

> Em que ponto está o produto?
>
> A) **Ideia** — nada no ar, ninguém usando.
> B) **MVP no ar** — tem gente usando, ainda sem cobrar ou cobrando de poucos.
> C) **Clientes pagando** — receita recorrente, gente que depende disso.

Sem recomendação: só a pessoa sabe.

| Estágio | Regras `[MVP+]` | Regras `[pagantes+]` |
|---|---|---|
| Ideia | "Entra em vigor depois" | "Entra em vigor depois" |
| MVP no ar | valem | "Entra em vigor depois" |
| Clientes pagando | valem | valem |

## Bloco 2 — Stack

O que você precisa saber: linguagens, versão do runtime, gerenciador de
pacotes, framework, banco, onde ficam os testes, se é um repositório com
várias aplicações.

**Leia antes de perguntar**: arquivo de manifesto e de trava, arquivo de
versão do runtime, pastas de aplicação. Depois confirme: "Vi Node 22, npm,
Next.js e Postgres. É isso?" Pergunte só o que não deu para ver.

Peça os **comandos reais** — formatar, lint, conferir tipos, testar e o gate
completo. Se o projeto não tem um comando único de gate, diga que vale a pena
criar, e registre o que existe hoje.

## Bloco 3 — Dados

Três perguntas, uma por vez:

1. **De quem é o dado?** Cada cliente vê só o seu (uma empresa, um
   consultório, um escritório), ou é um produto de usuário único?
2. **Entra dado pessoal ou sensível?** Saúde, jurídico, financeiro, documento
   de identidade, dado de menor.
3. **Passa dinheiro pelo sistema?** Cobrança, saldo, repasse.

Cada "sim" pede uma camada. Se ela não existe ainda, registre a resposta em
"Camadas ainda não cobertas", incluindo **qual é a área mais sensível** e
quem pode liberar o acesso a ela.

## Bloco 4 — IA dentro do produto

> O produto chama um modelo de IA — para resumir, responder, classificar,
> extrair ou sugerir?

Se **não**: pule o bloco e não inclua `module-ai`.

Se **sim**, inclua `module-ai` e pergunte, para o uso principal:

1. A IA lê conteúdo que vem de fora — mensagem de cliente, documento, anexo,
   página da web?
2. Ela lê dado privado de usuários?
3. Ela pode escrever no sistema ou enviar algo para fora?

Três "sim" hoje: diga, sem rodeio, que o princípio das três perguntas barra
isso em produção, e pergunte qual das duas saídas vale — aprovação humana
antes de sair, ou cortar uma das três. A resposta entra na constituição.

## Bloco 5 — Operação

1. **Onde roda?** Plataforma de hospedagem, banco gerenciado, mais de um
   serviço.
2. **Qual CI, e em que plano?** Conta gratuita muda a conversa: o gate local
   passa a ser o único que existe quando a cota acaba.
3. **Quem revisa?** Uma pessoa só, ou há um time. Com uma pessoa só,
   "Verificado por: revisão" quer dizer a própria pessoa lendo o diff — diga
   isso com essas palavras.
4. **A branch principal é protegida?** Se a pessoa não sabe, registre como
   "confirmar".

O que esta resposta muda: o "Verificado por" de cada princípio. Nomeie só o
que existe. Hook que o projeto não tem não aparece como verificação.

## Bloco 6 — Regra de ouro

A última, e a que mais vale. Não é um valor ("qualidade", "simplicidade"): é
a invariante que **decide uma discussão**.

> Quando duas coisas boas brigarem neste produto, qual ganha sempre?

Ajude com o contorno, não com a resposta. Uma regra de ouro boa tem um
**teste**: uma pergunta que qualquer pessoa responde sozinha diante de uma
mudança. Mostre a forma com um exemplo neutro:

> "A rastreabilidade nunca cede à conveniência." O teste: se a mudança torna
> uma resposta mais difícil de rastrear até a fonte, ela não entra.

Se a pessoa responder com um valor genérico, empurre uma vez: "Me dá um caso
em que isso te fez dizer não a uma feature." Se não sair nada específico,
grave o que ela disse e marque a regra de ouro como **a revisar** — não
invente uma por ela.

## Depois do último bloco

Mostre, antes de montar, em até oito linhas: estágio, camadas escolhidas,
camadas pedidas e ainda não cobertas, regra de ouro e o que ficou "confirmar".
Pergunte se pode montar.
