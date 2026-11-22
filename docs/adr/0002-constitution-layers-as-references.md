# ADR 0002 — As camadas da constituição são references de uma skill

- **Data:** 2026-11-17
- **Status:** aceito

## Contexto

A constituição de um projeto é montada em camadas: uma base que vale sempre,
uma ou mais stacks, e módulos de domínio — IA no produto, múltiplos clientes,
dado sensível. Quais entram depende das respostas de uma entrevista.

Três lugares possíveis para os arquivos das camadas:

1. **Uma pasta `constitution/` na raiz do pack.** Lê bem para quem mantém,
   mas o instalador copia só o que uma skill declara: seria preciso um
   segundo mecanismo de cópia, e um lugar novo no projeto de quem usa.
2. **Em `shared/`.** O `shared/` é protocolo que várias skills leem do
   começo ao fim. Camada é material de **uma** skill, lido em **uma** fase.
3. **References da `yas-constitution`** — esta decisão.

## Decisão

Cada camada é um arquivo em `skills/yas-constitution/references/`, declarado
no frontmatter: `base`, `stack-<nome>`, `module-<nome>`. O `template` diz
como montar; o `interview` diz qual resposta escolhe qual camada.

A skill lê **só** as camadas escolhidas e escreve **um** arquivo,
`specs/constitution.md`, com os princípios renumerados. As camadas não
existem como arquivos no projeto de quem usa.

A primeira linha da constituição registra a versão do pack e as camadas
usadas, para uma atualização futura saber o que comparar.

## Regras de uma camada

- Cada princípio segue a forma do `template`: uma frase, regras verificáveis,
  **Verificado por** e **Por quê**.
- `(INEGOCIÁVEL)` só no que realmente não admite desvio.
- Regra que depende do estágio do produto leva `[MVP+]` ou `[pagantes+]`.
- Camada de stack traz só o que muda por causa da stack.
- Nenhuma camada cita empresa, cliente ou infraestrutura real.

## Consequências

- Camada nova é um arquivo, uma entrada no frontmatter, uma menção no corpo
  da skill e uma linha na tabela do `interview`. O `check` cobra as três
  primeiras; a tabela do `interview` é conferida à mão.
- A constituição gerada não se atualiza sozinha quando uma camada muda. É de
  propósito: lei não muda sem alguém decidir. A skill oferece comparar.
- A lista de references cresce com o número de camadas. Se passar de umas
  quinze, vale reabrir esta decisão.
