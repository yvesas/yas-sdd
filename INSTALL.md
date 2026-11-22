# Instalar o yas-sdd — instruções para o agente

> Este arquivo é escrito para **você, agente de IA**, a pedido de uma pessoa
> que quer o yas-sdd no projeto dela. Siga os passos na ordem. A pessoa pode
> não conhecer terminal: não peça que ela rode comandos, a menos que um passo
> diga isso.

## O que você vai fazer

Copiar as skills do pack para dentro do projeto da pessoa. Só isso. Você
**não** cria `specs/`, não edita arquivos do projeto e não commita nada —
preparar o projeto é o trabalho da skill `/yas-start`, que a pessoa roda
depois e que pergunta antes de escrever.

## Passo 1 — Confira onde você está

Confira que a pasta atual é a raiz do projeto da pessoa, e que é um
repositório git. Se não der para conferir, pergunte:

> Esta pasta é a raiz do seu projeto? **RECOMENDAÇÃO: confirme antes de eu
> copiar qualquer coisa.**
>
> A) Sim.
> B) Não — o projeto fica em outro lugar.

Se o projeto ainda não é um repositório git, diga isso e pergunte se ela quer
criar um. Não crie sem perguntar.

## Passo 2 — Descubra para onde as skills vão

| Você é | Pasta de skills |
|---|---|
| Claude Code | `.claude/skills/` na raiz do projeto |
| outro agente, com pasta própria de skills | a pasta que a sua documentação indica |
| um agente sem pasta de skills | `.yas-sdd/skills/` na raiz do projeto |

No terceiro caso — e só nele —, as skills não aparecem como comandos. Veja o
Passo 5.

## Passo 3 — Obtenha o pack

Clone o repositório numa pasta temporária, **fora** do projeto da pessoa:

```bash
git clone --depth 1 https://github.com/yvesas/yas-sdd.git <pasta-temporária>
```

Se você não pode clonar, baixe o arquivo compactado da versão mais recente em
`https://github.com/yvesas/yas-sdd/releases/latest` e descompacte.

Se não puder nem um nem outro, pare e diga à pessoa o que faltou. Não recrie
as skills de memória.

## Passo 4 — Copie as skills

**Se você pode rodar bash**, use o instalador do pack:

```bash
<pasta-temporária>/bin/install --target <pasta-de-skills>
```

Ele mostra o que copiou. Rodar de novo atualiza sem duplicar.

**Se você não pode rodar bash**, copie à mão. Para cada pasta em
`<pasta-temporária>/skills/`:

1. copie o `SKILL.md` para `<pasta-de-skills>/<nome>/SKILL.md`;
2. leia a linha `shared: [...]` do topo do `SKILL.md` e copie cada item de
   `<pasta-temporária>/shared/<item>.md` para `<pasta-de-skills>/<nome>/<item>.md`;
3. leia a linha `references: [...]` e copie cada item de
   `skills/<nome>/references/<item>.md` para
   `<pasta-de-skills>/<nome>/references/<item>.md`.

Copie os arquivos **sem alterar o conteúdo**. Não resuma, não traduza, não
"adapte ao projeto".

## Passo 5 — Só para agente sem pasta de skills

Acrescente ao final do arquivo de instruções que você lê em toda sessão — ou
crie `AGENTS.md` na raiz, se não houver nenhum — este bloco:

```markdown
<!-- yas-sdd:skills -->
Este projeto usa o método yas-sdd. As instruções de cada passo estão em
`.yas-sdd/skills/<nome>/SKILL.md`. Quando a pessoa pedir "yas-start" ou
"yas-constitution", leia o `SKILL.md` correspondente e siga-o do começo.
<!-- /yas-sdd:skills -->
```

Mostre o bloco à pessoa e pergunte antes de gravar: é um arquivo dela.

## Passo 6 — Confira e limpe

- Confira que `<pasta-de-skills>/yas-start/SKILL.md` existe e que, ao lado
  dele, estão `preamble.md` e `workflow.md`.
- Apague a pasta temporária.
- **Não** rode a skill você mesmo agora.

## Passo 7 — Diga à pessoa o que aconteceu

Em poucas linhas:

1. onde as skills ficaram;
2. que nada mais no projeto foi alterado;
3. a **única** coisa a fazer agora: abrir uma sessão nova e rodar
   `/yas-start` — ou pedir "yas-start", se o agente não tiver comandos.

Se algum passo falhou, diga qual e o que você tentou. Não diga que instalou
se a conferência do Passo 6 não passou.

## Para atualizar depois

Repita os passos 3, 4 e 6. O que está em `specs/` não é tocado.
