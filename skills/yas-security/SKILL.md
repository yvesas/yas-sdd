---
name: yas-security
shared: [preamble, workflow]
references: [domains, report, tools]
description: >
  Revisão de segurança do código e da configuração do projeto: procura, lendo
  o repositório, onde alguém consegue fazer o que não deveria — injeção de
  SQL, de comando ou de instrução em IA, falha de login, de token ou de
  redefinição de senha, um cliente vendo dado de outro, segredo no código,
  configuração de hospedagem ou de CI que expõe algo. Tenta derrubar cada
  achado antes de relatar e mostra a menor correção. Só lê — não roda o app
  nem testa nada no ar. Use ao pedir "revisa a segurança do código", "tem
  vulnerabilidade aqui?", "o login está bem feito?", "revisa o que foi
  implementado", ou depois de implementar uma feature que mexe com acesso,
  dado sensível ou IA. É um primeiro olhar, não um teste de invasão.
allowed-tools: Read, Glob, Grep, Write, AskUserQuestion, Bash(git log*), Bash(git ls-files*), Bash(git diff*)
triggers: [segurança do código, vulnerabilidade, security, sql injection, prompt injection,
  o login está seguro, revisar a implementação]
---

# /yas-security — alguém consegue fazer o que não deveria?

A constituição diz o que deve valer, e a implementação foi feita por um
agente. Esta skill lê o que foi construído e procura onde uma pessoa de fora
— ou um cliente comum — consegue cruzar uma fronteira: ver o que não é dela,
agir como outra, tirar o sistema do ar.

**Ela não prova que o sistema é seguro.** Ela acha o que consegue achar numa
leitura, e diz o que não olhou.

## Guarda — antes de tudo

A primeira chamada de ferramenta confere **dois fatos**:

1. a pasta atual é um repositório com código para ler?
2. `specs/constitution.md` existe?

| Achou | O que fazer |
|---|---|
| não há código | pare: não há o que revisar. Para revisar um **plano**, o caminho é uma revisão de desenho, não esta skill |
| código, com constituição | siga; a constituição diz o que é sensível aqui |
| código, sem constituição | siga, e pergunte no passo 1 o que o sistema guarda de mais sensível |

Depois, leia os dois arquivos ao lado deste — `preamble.md` e `workflow.md`.

## Regras que valem do começo ao fim

- **Só leitura.** Não rode o app, a suíte, o build, script do projeto nem
  migração. Os únicos comandos permitidos consultam o histórico, a lista de
  arquivos e as diferenças do git.
- **Nada no ar.** Não acesse endereço de produção, de homologação, serviço
  externo nem API do projeto. Não use credencial real.
- **Nunca abra arquivo de ambiente com valor real**, e nunca escreva o valor
  de um segredo — nem no relatório, nem na conversa. Diga arquivo e linha.
- **Sem roteiro de ataque.** Descreva o caminho no código e o resultado; não
  escreva a carga pronta para explorar um sistema no ar.
- **Você não altera nada.** Descreve a correção; quem aplica é a pessoa.

## Dois modos — e carregar a skill não autoriza escrever

| Pedido | Modo | Grava arquivo? |
|---|---|---|
| uma pergunta pontual ("essa consulta tem injeção?") | **orientação** | não — responda na conversa, com arquivo e linha |
| "revisa a segurança", ou pedido de relatório | **completa** | só depois da pergunta do passo 7 |

## Revisão completa — o caminho

| | Passo | Onde está |
|---|---|---|
| 1 | Reconhecimento: o mapa do sistema | aqui |
| 2 | Escopo: quais domínios, ou qual mudança | aqui |
| 3 | Procurar, um domínio por vez | `references/domains.md` |
| 4 | Escrever cada suspeita como uma afirmação completa | aqui |
| 5 | Tentar derrubar a afirmação | aqui |
| 6 | Veredito, gravidade e a menor correção | `references/report.md` |
| 7 | Onde gravar — pergunta obrigatória | aqui |
| 8 | Para ir além da leitura — ferramentas opcionais | `references/tools.md` |
| 9 | Fechamento | `preamble.md` |

### 1. Reconhecimento

Antes de procurar falha, entenda o sistema. Leia e monte um mapa de **até
doze linhas**, e mostre à pessoa:

- **por onde entra dado de fora:** rotas, formulários, webhooks, upload,
  mensagens, filas;
- **quem são os atores:** anônimo, usuário, cliente, administrador, serviço;
- **onde a identidade é conferida**, e onde a permissão é conferida;
- **onde o dado mora** e como um cliente é separado do outro;
- **o que sai do sistema:** e-mail, mensagem, chamada a serviço, modelo de IA;
- **os arquivos de configuração:** hospedagem, container, nuvem, CI;
- **o que é mais sensível** — da constituição, ou perguntado agora.

Pergunte se o mapa está certo. Mapa errado produz achado errado.

### 2. Escopo

> O que eu reviso? **RECOMENDAÇÃO: <as letras que o mapa indica>, porque
> <o que você viu>.**
>
> A) Os domínios que eu recomendo.
> B) Tudo — os oito domínios. É longo.
> C) Só o que mudou numa feature ou desde um commit — diga qual.
> D) Um domínio — diga qual.

Os oito domínios estão em `references/domains.md`. Recomende de dois a
quatro, pelo que o mapa mostrou: sistema com vários clientes pede isolamento;
com IA, pede o domínio de IA; e login feito à mão pede autenticação.

Na opção C, o alvo é a diferença do git — mas leia também o que essa mudança
chama: a falha costuma estar na junção com o que já existia.

**Toda revisão que não cobriu os oito domínios se apresenta como parcial.**

### 3. Procurar

Leia `references/domains.md` ao começar, e trabalhe **um domínio por vez**.
Para cada um, siga o dado: da entrada até onde ele é usado, e da identidade
até a decisão de acesso. Busca por padrão acha onde olhar; o achado vem de
ler o caminho inteiro.

Teto de **oito suspeitas por domínio**. Passou disso, há um problema de
estrutura: diga qual é, em vez de listar vinte sintomas.

### 4. A afirmação completa

Uma suspeita só vira candidata quando você consegue escrever as cinco partes:

1. **Quem** — o ator com menos privilégio que consegue;
2. **Faz o quê** — a entrada ou a ação, com o arquivo e a linha por onde entra;
3. **Que controle deveria barrar** — e onde ele deveria estar;
4. **Que fronteira é cruzada** — de quem para quem;
5. **Com que resultado** — o que essa pessoa passa a ver ou a poder fazer.

Faltou uma parte? Não é vulnerabilidade: é observação. "Não tem limite de
tentativas", "a biblioteca é antiga", "falta um cabeçalho" são observações
— vão para uma seção própria, sem gravidade.

Padrão do projeto não é falha. Injeção de dependência, repositório, camada de
serviço: isso é arquitetura. Só entra aqui o que tem as cinco partes.

### 5. Tentar derrubar

Antes de relatar, **trabalhe contra a sua própria afirmação**. Uma IA lendo
código sozinha encontra falha que não existe, com muita convicção.

- Procure o controle em **outro lugar**: middleware, guarda global, política
  do banco, validação na camada acima, padrão seguro do framework.
- Siga o caminho **inteiro**: a entrada chega mesmo até ali sem ser tratada?
- Confira a suposição sobre o ator: ele alcança essa rota?
- Se o seu agente permite delegar a um agente novo, **delegue a tentativa de
  derrubar**: passe só a afirmação e os caminhos, sem o seu raciocínio. Quem
  achou a falha é o pior juiz dela.

Diga, no relatório, o que você procurou para derrubar cada achado.

### 6. Veredito, gravidade e correção

Leia `references/report.md`. Cada candidata recebe um veredito: `confirmado`,
`a confirmar` ou `descartado`. Só `confirmado` tem gravidade.

Para cada `confirmado`, a **menor correção**: a regra que o código precisa
garantir, e a mudança mais estreita que a garante no último ponto de decisão
confiável. E o teste que impediria a volta do problema.

### 7. Onde gravar — pergunte sempre

Um relatório de vulnerabilidades num repositório público é um mapa para quem
quer atacar.

> Este repositório é público? **RECOMENDAÇÃO: se não tiver certeza,
> responda B.**
>
> A) É privado — grave em `specs/project/SECURITY-REVIEW.md`.
> B) É público, ou não sei — não grave no repositório.

Na resposta B, entregue o relatório **na conversa** e diga à pessoa para
guardá-lo fora do repositório. Não registre os achados em nenhum arquivo
versionado — nem no estado do projeto.

Na resposta A, depois de gravar, ofereça registrar no estado do projeto só
**a contagem** e o caminho do relatório, nunca os detalhes.

### 8. Para ir além da leitura

Leia `references/tools.md`. Há ferramentas abertas que fazem o que esta
leitura não faz: varrer o histórico atrás de segredo, conferir dependências,
atacar uma cópia do app rodando. Indique **no máximo duas**, as que o mapa
justifica, e pergunte se vale a pena.

**Você não roda nem instala nenhuma.** Quem decide e roda é a pessoa.

## O que esta skill não faz

- **Não é teste de invasão** e não substitui uma revisão profissional. Se o
  produto guarda dado de saúde, jurídico, financeiro ou de menor, diga isso
  na primeira e na última linha do relatório, e recomende a revisão
  dedicada antes de crescer.
- **Não confere se há falha conhecida nas dependências**: isso depende de uma
  base atualizada, fora do repositório. Vai para `a confirmar`, com o comando
  de auditoria do gerenciador de pacotes que o projeto usa — e uma ferramenta
  de `references/tools.md`, se o passo 8 a indicar.
- Não vê o que está configurado na plataforma — só o que está em arquivo.
- Não confere regra da constituição: isso é `/yas-audit`.
- **Nunca diz "está seguro".** No máximo: "nos domínios revisados, não
  confirmei nenhuma falha".

## Conferência antes de entregar

- [ ] Todo `confirmado` tem as cinco partes, com arquivo e linha?
- [ ] Para cada um, está dito o que você procurou para derrubar?
- [ ] Algum `a confirmar` recebeu gravidade? Tire.
- [ ] Alguma observação entrou como vulnerabilidade?
- [ ] Algum valor de segredo, ou carga de ataque pronta, apareceu? Tire.
- [ ] A gravidade passa do resultado que você mostrou?
- [ ] A cobertura diz o que **não** foi revisado?
- [ ] Você perguntou se o repositório é público antes de gravar?
- [ ] Indicou no máximo duas ferramentas, sem rodar nenhuma, e com o aviso de
  autorização para as que atacam o sistema rodando?

## Fechamento

Como no `preamble.md`. A tarefa única é **corrigir o achado confirmado de
maior gravidade** — ou, se não houve nenhum, resolver o primeiro item
`a confirmar`. Se havia segredo no código, a tarefa é **trocar a credencial**,
antes de qualquer outra coisa.
