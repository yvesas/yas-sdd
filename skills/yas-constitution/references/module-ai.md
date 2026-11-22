# Módulo — IA dentro do produto

> Lido na montagem quando o **produto** chama um modelo de IA: resume,
> classifica, responde, extrai, sugere. Não é sobre usar IA para programar.

## Princípios

### As três perguntas (INEGOCIÁVEL)

Nenhuma chamada a modelo reúne, sem uma pessoa no meio, ler conteúdo de fora,
ler dado privado e agir para fora.

- Toda spec de feature com IA DEVE responder, numa tabela, para cada chamada
  a modelo: (1) lê conteúdo de fora? (2) lê dado privado? (3) pode escrever
  ou enviar algo?
- Uma chamada com **três "sim"** NÃO DEVE ir para produção, a menos que uma
  pessoa aprove antes de qualquer coisa sair, ou que uma das três seja
  cortada.
- As respostas atuais DEVEM estar num documento em `docs/`, atualizado no
  mesmo pull request que muda uma chamada.

**Verificado por:** o gate do plano, que procura a tabela, e revisão.
**Por quê:** cada capacidade sozinha é inocente; juntas, uma instrução
escondida num documento vira uma ação com os dados de outra pessoa.

### Conteúdo de fora é dado, nunca instrução (INEGOCIÁVEL)

O que chega de fora é lido como material, e não muda o que o sistema faz.

- Mensagem de usuário, documento, anexo, imagem, transcrição e página da web
  DEVEM ser tratados como entrada não confiável.
- O prompt DEVE separar instrução de conteúdo, e dizer ao modelo que o
  conteúdo é para citar ou analisar, não para obedecer.
- A saída do modelo DEVE ter formato fixo, validado por schema antes do uso.
- Saída de modelo NÃO DEVE ser exibida de um jeito que execute algo: link
  clicável, imagem carregada de fora ou código rodado sem revisão.

**Verificado por:** teste com conteúdo hostil na suíte e revisão do prompt.
**Por quê:** injeção de instrução não é um defeito que se corrige uma vez; é
uma propriedade de todo texto que o modelo lê.

### A IA propõe, a pessoa confirma

Nada que a IA produz vira fato do sistema sem alguém ter aceitado.

- Escrita originada em IA DEVE ser gravada como **proposta**; quem a torna
  definitiva é uma pessoa com permissão para aquela escrita.
- Toda ação que a IA faz DEVE existir também como ação manual, pelo mesmo
  caminho de código.
- Ação destrutiva ou que sai do sistema — enviar, publicar, apagar, cobrar —
  DEVE ter aprovação humana antes.
- A IA NÃO DEVE ler mais do que a pessoa em nome de quem roda poderia ler.

**Verificado por:** teste de permissão na suíte de integração e revisão.
**Por quê:** uma resposta errada mostrada é um incômodo; uma resposta errada
gravada como verdade é um dado corrompido que alguém vai usar.

### Uma porta só para os modelos

Toda chamada a modelo passa pelo mesmo lugar.

- Chamadas a modelo DEVEM passar por um módulo único do projeto, atrás de uma
  interface, com implementação real e de teste.
- Esse módulo DEVE impor um teto de custo e registrar o uso — sem registrar o
  conteúdo.
- Dado pessoal ou sensível NÃO DEVE ir para log, nem para um provedor sem
  contrato que cubra retenção e uso para treino.
- `[MVP+]` A resposta que afirma um fato CONVÉM citar de onde ele veio; sem
  fonte, isso é dito a quem lê.

**Verificado por:** lint ou teste que proíbe chamar o provedor fora do módulo,
e revisão.
**Por quê:** se cada feature resolve custo, log e contrato por conta própria,
a garantia depende de quem escreveu lembrar de cada item.
