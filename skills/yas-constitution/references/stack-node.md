# Camada de stack — Node.js e TypeScript

> Lida na montagem quando o projeto usa Node. Traz só o que muda por causa da
> stack. Os comandos são **os do projeto**: pergunte ou leia do
> `package.json`; os exemplos abaixo são o padrão quando não há nada definido.

## Para "Restrições técnicas"

Uma linha com o que o projeto realmente usa: versão do Node, gerenciador de
pacotes, framework, banco, biblioteca de validação e de teste.

| Para | Padrão quando o projeto não definiu |
|---|---|
| formatar | `prettier --write` |
| lint | `eslint` |
| conferir tipos | `tsc --noEmit` |
| rodar os testes | `vitest run` |
| o gate completo | um script só, por exemplo `npm run check` |

## Princípio

### Node e TypeScript

A stack é uma só, declarada, e o que roda em produção é o que foi testado.

- O projeto DEVE usar **um** gerenciador de pacotes, com o arquivo de trava
  versionado. No CI, a instalação DEVE respeitar a trava sem resolver de novo.
- A versão do Node DEVE estar fixada num arquivo do repositório, e o CI DEVE
  ler de lá.
- TypeScript DEVE rodar em modo estrito. `any` NÃO DEVE ser usado; quando o
  tipo é mesmo desconhecido, usa-se `unknown` e estreita-se antes do uso.
- Variável de ambiente DEVE ser lida e validada em **um** módulo, na
  inicialização. O resto do código recebe a configuração já tipada.
- Dependência nova DEVE vir com a justificativa no pull request.
- Promessa NÃO DEVE ficar sem tratamento.
- `[MVP+]` Dependência direta CONVÉM ter versão exata, e atualização entra por
  pull request próprio.

**Verificado por:** `tsc`, o lint, a instalação por trava no CI e revisão.
**Por quê:** dois gerenciadores, ou uma trava ignorada, fazem o CI testar uma
árvore de dependências diferente da que vai para produção.

## Armadilhas para o arquivo de instruções do agente

Não entram na constituição; ofereça à pessoa como lembretes, se couberem:

- Em projeto com módulos nativos (ESM), import relativo leva a extensão `.js`.
- Trocar de branch com pasta de build antiga faz a checagem de tipos acusar
  arquivo que não existe mais: apague a pasta de build antes.
