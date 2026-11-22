# Camada base — vale em qualquer projeto

> Lida na montagem. Entra **inteira** em toda constituição; o que muda por
> estágio está marcado com `[MVP+]` (a partir de MVP no ar) ou `[pagantes+]`
> (a partir de clientes pagando).

### Fatia vertical

Cada entrega atravessa o sistema de ponta a ponta e pode ser usada.

- Uma feature DEVE ser planejada como fatia que alguém consegue usar: dado,
  regra, interface e teste juntos — não uma camada de cada vez.
- Ao fechar uma fase, alguém DEVE abrir o que foi entregue e usar como o
  usuário usaria, antes de dar por pronta.
- Uma fatia NÃO DEVE mostrar na tela ação que ainda não funciona.

**Verificado por:** o gate do plano e a revisão ao fechar a feature.
**Por quê:** peças que passam cada uma no seu teste podem formar um produto
inutilizável; só usando o conjunto isso aparece.

### Fluxo de git (INEGOCIÁVEL)

O histórico da branch principal é limpo, legível e de responsabilidade humana.

- Ninguém DEVE commitar ou dar push direto na branch principal. Toda mudança
  sai de uma branch e volta por pull request.
- Mensagens DEVEM seguir Conventional Commits, com assunto em inglês, no
  imperativo, abaixo de 72 caracteres.
- Um pull request DEVE tratar de **um assunto**. Um assunto não é um arquivo:
  mudanças pequenas do mesmo assunto vão juntas.
- A branch DEVE ser atualizada por rebase, nunca por merge da principal; o
  pull request entra por squash.
- Commit, pull request, issue e nota de versão NÃO DEVEM carregar atribuição
  de ferramenta de IA — coautoria, "gerado com", assinatura ou e-mail de robô.
  Ao fazer o squash, o corpo do commit DEVE ser informado à mão.

**Verificado por:** hook de mensagem de commit, proteção da branch principal
e revisão.
**Por quê:** o código é do time, e a responsabilidade é de quem commita. E o
servidor preenche sozinho o corpo de um squash deixado em branco, com
coautoria, sem passar por hook nenhum.

### Código que explica a si mesmo

O código é escrito para quem vai lê-lo depois — pessoa ou agente.

- Função e módulo DEVEM ter um motivo para mudar, e nome que diz o que fazem.
- Erro NÃO DEVE ser engolido: nada de captura vazia nem de erro ignorado.
- Toda entrada vinda de fora DEVE ser validada por schema, na borda do sistema.
- Serviço externo DEVE ficar atrás de uma interface do próprio projeto; o
  domínio não conhece o formato do fornecedor.
- Onde a linguagem tem tipos, eles DEVEM ser estritos, sem válvula de escape.
- Abstração e padrão de projeto NÃO DEVEM ser criados para um problema que
  ainda não existe. A segunda implementação real justifica; a hipotética, não.
- Comentário CONVÉM explicar o porquê; o quê, o código já diz.

**Verificado por:** lint e checagem de tipos do projeto, e revisão.
**Por quê:** erro engolido faz o programa seguir sem saber que falhou, e
abstração feita por precaução é o código mais caro de entender e de remover.

### Mudança cirúrgica

Cada mudança faz o que foi pedido, e só isso.

- Uma mudança NÃO DEVE incluir funcionalidade, configuração ou flexibilidade
  que ninguém pediu.
- Código vizinho que funciona NÃO DEVE ser "melhorado" de passagem. Se algo
  ali merece atenção, é dito à pessoa, não alterado.
- Toda linha alterada DEVE se explicar pelo pedido, pela spec ou pela tarefa.

**Verificado por:** revisão do diff contra a tarefa.
**Por quê:** mudança de passagem é a que ninguém revisou e ninguém testou.

### Testes íntegros (INEGOCIÁVEL)

O teste é a especificação que roda; ele não é ajustado para concordar com o
código.

- O teste DEVE ser escrito na mesma tarefa que o código que ele cobre. Não
  existe tarefa de "escrever os testes" no fim.
- Teste unitário DEVE rodar sem rede e sem banco.
- Dado de teste DEVE ser sintético — nunca dado real de pessoa.
- Teste contra sistema real DEVE ficar atrás de uma variável de ambiente e
  fora do CI.
- Para fazer a suíte passar, NÃO DEVE ser enfraquecida uma asserção, apagado
  um teste, nem usado o mecanismo de pular teste. Se o teste está errado,
  para-se e confirma-se com a pessoa.
- `[MVP+]` O caminho crítico do usuário DEVE ter teste de ponta a ponta.

**Verificado por:** a suíte do projeto e a revisão de todo diff que toca em
arquivo de teste.
**Por quê:** suíte verde depois de asserção enfraquecida informa o contrário
do que aconteceu.

### Segredos (INEGOCIÁVEL)

Nenhuma credencial sai do lugar onde ela é guardada.

- Segredo NÃO DEVE aparecer em código, teste, log, commit, pull request,
  mensagem ou arquivo de infraestrutura versionado.
- O arquivo de exemplo de ambiente DEVE ter só o **nome** das variáveis.
- Log NÃO DEVE conter dado pessoal.
- Credencial de terceiro DEVE ser usada e descartada quando o fluxo permite;
  quando precisa ficar, DEVE ficar cifrada.
- Se um segredo vazar para o histórico, ele DEVE ser trocado **antes** de
  qualquer limpeza: reescrever o histórico não o invalida.

**Verificado por:** `.gitignore`, hook que barra leitura e escrita de arquivo
de ambiente, e revisão.
**Por quê:** segredo versionado está vazado para sempre, para todo mundo que
tem ou terá acesso ao repositório.

### CI que não desperdiça

O gate de verdade roda na máquina de quem escreve; o CI confirma.

- A verificação completa DEVE poder rodar localmente, com um comando só, e
  DEVE passar antes do push.
- Todo job de CI DEVE ter tempo limite, e uma execução nova DEVE cancelar a
  anterior da mesma branch.
- O mesmo commit NÃO DEVE ser testado duas vezes.
- Cada camada do sistema DEVE rodar só quando algo que a afeta mudou; mudança
  em arquivo compartilhado liga tudo. Na dúvida, roda tudo.
- Ação de terceiro que enxerga um segredo DEVE ser fixada pela identificação
  exata da versão, não por um nome que pode ser movido.
- `[MVP+]` Publicação DEVE ser um fluxo separado do de teste, nunca cancelado
  no meio.

**Verificado por:** o próprio arquivo de workflow e a revisão de toda mudança
nele.
**Por quê:** minuto gasto não aparece no diff — aparece na fatura, ou no dia
em que a cota acaba e ninguém mais tem gate.

### Documentação no lugar certo

Plano e realidade moram em pastas diferentes.

- `specs/` DEVE guardar o plano; `docs/`, o sistema como ele é.
- Decisão estrutural DEVE virar um registro de decisão, um por arquivo, com
  contexto, decisão e consequências.
- O arquivo de instruções do agente DEVE ser um índice curto: o que é o
  projeto, a regra de ouro, os comandos e as armadilhas — cada armadilha com
  a consequência escrita.

**Verificado por:** revisão ao fechar a feature.
**Por quê:** plano e verdade no mesmo arquivo envelhecem juntos, e ninguém
sabe mais qual dos dois está lendo.

### Contexto é orçamento

O que o agente lê toda sessão é pago toda sessão.

- Os arquivos de estado do projeto DEVEM guardar só o que está aberto; o que
  fechou vai para o destino dele.
- Arquivo lido a cada sessão DEVE respeitar um teto de tamanho; passou, é
  podado.
- Esta constituição NÃO DEVE acumular histórico de emendas no próprio texto.

**Verificado por:** a poda ao fechar cada feature.
**Por quê:** arquivo de estado que só cresce vira o maior custo de cada
sessão e o texto que menos se lê.

### Verificação honesta

"Pronto" quer dizer verificado, e a verificação é um fato.

- Um comando passou quando o código de saída é zero — NÃO DEVE ser conferido
  procurando palavra na saída.
- Ferramenta que não está instalada NÃO DEVE contar como verificação feita.
- Quem diz que testou, rodou ou conferiu DEVE ter feito a chamada.

**Verificado por:** revisão do que foi rodado antes de cada commit.
**Por quê:** filtrar a saída por "erro" já deixou passar aviso de formatação
até a branch principal.
