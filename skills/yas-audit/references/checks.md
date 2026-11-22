# Onde procurar a evidência

> Lido no passo de evidência. É um mapa de **onde olhar**, por assunto — não
> uma lista de regras: as regras são as da constituição do projeto, e só
> elas. Adapte os nomes de arquivo à stack que o projeto usa.

## Fluxo de git

| Pergunta | Onde olhar | Veredito possível |
|---|---|---|
| há commits com atribuição de ferramenta? | histórico da branch principal: procure coautoria e "gerado com" nas mensagens | `cumpre` ou `não cumpre`, com o commit |
| as mensagens seguem o padrão? | os últimos ~50 commits da principal | idem — diga quantos olhou |
| existe hook de mensagem de commit? | pasta de hooks versionada; script de preparação no manifesto | `cumpre` se existe **e** há como ele ser ativado; senão `não cumpre` |
| o hook está ativo na máquina de cada um? | fora do repositório | `confirmar` |
| a branch principal é protegida? | fora do repositório | `confirmar` — diga onde fica a configuração na plataforma de git |
| houve commit direto na principal? | histórico: commits que não vieram de pull request | indício; se a plataforma não deixa ver, `confirmar` |

## CI e publicação

Abra **cada** arquivo de workflow.

| Pergunta | O que procurar |
|---|---|
| todo job tem tempo limite? | a chave de tempo limite em **cada** job — um job sem ela já é `não cumpre` |
| execução nova cancela a anterior? | o bloco de concorrência com cancelamento, no workflow de teste |
| o mesmo commit é testado duas vezes? | gatilho de push na principal **e** de pull request no mesmo workflow de teste |
| cada camada roda só quando muda? | guarda de diff por passo; filtro de caminho no gatilho é um sinal de atenção |
| ação de terceiro que vê segredo está fixada? | em job que usa segredo, toda ação referenciada por nome de branch ou por tag é `não cumpre`; por identificador exato, `cumpre` |
| publicação é separada do teste? | workflow próprio; o de publicação **não** pode cancelar execução em andamento |
| o gate roda local, com um comando? | o comando declarado na constituição existe no manifesto? |

Não há workflow nenhum? As regras de CI são `não se aplica ainda` se a
constituição as marca para depois; senão, `não cumpre`.

## Segredos

| Pergunta | Onde olhar |
|---|---|
| arquivo de ambiente está versionado? | a lista de arquivos do git — **nunca** abra o arquivo |
| o ignorado cobre os arquivos de ambiente? | o arquivo de ignorados, incluindo variações com sufixo |
| o arquivo de exemplo tem valor? | o arquivo de exemplo: só nomes e comentários |
| há segredo em arquivo de infraestrutura? | arquivos de hospedagem, de container e de workflow: procure nome de chave seguido de valor literal |
| há segredo no código ou em teste? | busca por padrões comuns de chave e por nomes como token, secret, password com valor literal |
| log tem dado pessoal? | chamadas de log que recebem objeto de usuário inteiro, e-mail, documento |

Achou um candidato a segredo: relate arquivo e linha, **não o valor**, e
diga que a primeira providência é trocar a credencial.

Onde o segredo é guardado de verdade — plataforma, cofre — é `confirmar`.

## Testes

| Pergunta | Onde olhar |
|---|---|
| há teste desligado? | marcas de pular teste da biblioteca usada; teste comentado |
| o teste anda com o código? | nos commits recentes de feature, arquivo de teste mudou junto? — é amostra; diga quantos olhou |
| unitário toca rede ou banco? | importações de cliente de rede ou de banco em arquivo de teste unitário |
| dado de teste é sintético? | fixtures: procure formato de dado real; na dúvida, `confirmar` com a pessoa |
| teste contra sistema real está fora do CI? | a variável que o libera, e a ausência dela no workflow |

Se a suíte **passa** não é pergunta para esta skill: ela não roda a suíte.

## Código

São regras de amostra — diga sempre o que foi coberto.

| Pergunta | O que procurar |
|---|---|
| erro engolido | bloco de captura vazio; erro atribuído e ignorado |
| válvula de escape de tipo | o tipo "qualquer" da linguagem, e supressões de checagem |
| entrada validada na borda | nas rotas ou handlers, há schema antes do uso? |
| serviço externo atrás de interface | chamada direta ao fornecedor fora do módulo que o encapsula |

Busca por padrão acha **indício**. Abra o arquivo antes de dar `não cumpre`:
um bloco de captura pode estar vazio de propósito, com o motivo comentado.

## Documentação e contexto

| Pergunta | Onde olhar |
|---|---|
| plano e realidade estão separados? | existem `specs/` e `docs/`, e cada um guarda o que deve |
| decisão estrutural vira registro? | a pasta de registros de decisão; e decisões recentes que só aparecem no estado |
| o arquivo de instruções do agente é um índice? | o tamanho dele, e se traz regra de ouro, comandos e armadilhas |
| o estado guarda só o que está aberto? | `specs/project/STATE.md`: tamanho, e itens já concluídos que ficaram lá |
| a constituição acumula histórico? | blocos de relato de emenda dentro do próprio arquivo |

## Stack

| Pergunta | Onde olhar |
|---|---|
| um gerenciador de pacotes só? | mais de um arquivo de trava no repositório é `não cumpre` |
| a trava é respeitada no CI? | o comando de instalação do workflow |
| a versão do runtime está fixada? | o arquivo de versão, e se o CI lê dele |
| tipagem estrita? | a configuração de tipos |
| configuração lida em um módulo só? | leituras de variável de ambiente espalhadas pelo código |

## IA dentro do produto

| Pergunta | Onde olhar |
|---|---|
| as três perguntas estão respondidas? | o documento em `docs/` com a tabela por chamada a modelo; e a tabela nas specs de feature com IA |
| alguma chamada tem três "sim" sem aprovação humana? | a própria tabela — e o código da chamada, para ver se bate com ela |
| há uma porta só para os modelos? | chamadas ao fornecedor de modelo fora do módulo único |
| a saída do modelo é validada? | schema aplicado à resposta antes do uso |
| escrita de IA vira proposta? | o caminho de código entre a resposta do modelo e a gravação |
| existe teto de custo? | no módulo único; o valor configurado na plataforma é `confirmar` |

A tabela **dizer** uma coisa e o código **fazer** outra é `não cumpre`, e é
o achado mais importante que esta skill pode ter.

## O que nunca dá para ver daqui

Vai sempre para `confirmar`, com o lugar onde a pessoa olha:

- proteção de branch e regras de merge;
- segredos e variáveis guardados na plataforma;
- quem tem permissão de publicar;
- contrato com fornecedor de modelo (retenção, uso para treino);
- plano e cota da conta de CI;
- se o hook local está ativo na máquina de cada pessoa.
