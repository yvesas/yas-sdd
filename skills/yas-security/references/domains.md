# Os oito domínios

> Lido ao começar a procura. Para cada domínio: o que seguir, as perguntas
> que valem a leitura, e **o que derruba** a suspeita. Adapte os nomes à
> stack do projeto. Isto é um roteiro de leitura, não uma lista de
> verificação: item sem as cinco partes da afirmação não é achado.

## 1. Entrada e injeção

**Siga:** cada dado que vem de fora, da entrada até onde é usado.

- **SQL:** a consulta é montada juntando texto com valor do usuário? Atenção
  a consulta "crua" dentro de um projeto que usa ORM, a nome de coluna ou de
  ordenação vindo da requisição, e a filtro montado dinamicamente.
- **Comando e arquivo:** valor do usuário chega a uma execução de comando, a
  um caminho de arquivo, a um nome de arquivo em upload?
- **Página:** texto do usuário é mostrado sem tratamento? Atenção a HTML
  inserido direto e a markdown ou texto de IA renderizado como HTML.
- **Requisição feita pelo servidor:** o usuário escolhe o endereço que o
  servidor vai buscar?
- **Dado estruturado:** o que chega é validado por schema na borda, ou o
  objeto inteiro da requisição é gravado no banco?

**Derruba:** parâmetro ligado pela biblioteca de banco; schema que restringe
o campo a uma lista fixa; tratamento automático do framework de interface;
valor que na verdade vem do servidor, não do usuário.

## 2. Autenticação e sessão

**Siga:** o login, a criação do token ou da sessão, a conferência em cada
requisição, a saída, e a redefinição de senha — do pedido até a troca.

- **Feito à mão ou por biblioteca?** Autenticação própria pede leitura linha
  a linha; com biblioteca ou serviço, o risco está na configuração e no uso.
- **Token:** a assinatura é conferida em **toda** rota protegida? O algoritmo
  é fixado na conferência? A chave vem de configuração, com tamanho
  adequado? Tem validade? Dá para revogar?
- **Senha:** é guardada com função própria para senha, com custo? Nunca em
  texto, nunca com hash rápido.
- **Redefinição de senha:** o código é aleatório de verdade, vale uma vez,
  expira, e está preso ao usuário certo? A resposta revela se o e-mail
  existe? Trocar a senha encerra as sessões antigas?
- **Onde o token fica no navegador**, e se script da página consegue lê-lo.
- **Tentativas:** há limite por conta e por origem no login e na redefinição?
- **Rotas esquecidas:** alguma rota de dado fica fora do grupo protegido?

**Derruba:** guarda global que cobre a rota; a biblioteca já fixa o
algoritmo; a rota "aberta" só devolve dado público.

Falta de limite de tentativas, sozinha, é observação — vira achado quando
há um caminho concreto, como código de redefinição curto e sem expiração.

## 3. Autorização e isolamento de dados

O domínio que mais importa em sistema com vários clientes.

**Siga:** para cada operação que lê ou altera um registro, **onde** se decide
que este usuário pode mexer **neste** registro.

- **Identificador na requisição:** a rota recebe o identificador de um
  registro e busca sem conferir a quem ele pertence?
- **De onde vem o cliente atual:** da sessão, ou de um campo que o usuário
  envia?
- **Camadas:** a conferência está na rota, no serviço ou no repositório? Se
  está só na rota, existe outro caminho — tarefa em segundo plano, outra
  rota, exportação — que chama o mesmo serviço sem conferir?
- **O banco garante?** Há política no banco, ou o filtro é escrito à mão em
  cada consulta? Filtro à mão: procure a consulta que esqueceu.
- **Papéis:** a rota confere que o usuário está logado, mas não o papel dele?
- **Atalho de administrador** que desliga o filtro: quem consegue ativar?
- **Dados derivados:** busca, relatório, exportação, cache, notificação — o
  isolamento vale ali também?

**Derruba:** política no banco aplicada à conexão usada; o identificador é
buscado **junto** com o cliente da sessão; o serviço recebe o contexto do
usuário e o repositório exige.

## 4. IA dentro do produto

Só quando o produto chama um modelo.

**Siga:** cada chamada a modelo — o que entra no prompt, o que o modelo pode
acionar, e o que se faz com a resposta.

- **Instrução escondida:** entra no prompt conteúdo que vem de fora
  (mensagem, documento, página, transcrição)? Está separado da instrução?
- **As três capacidades juntas:** a mesma chamada lê conteúdo de fora, lê
  dado privado e pode escrever ou enviar algo? Sem pessoa aprovando no meio?
- **Ferramentas:** o que o modelo pode acionar roda com a permissão de quem?
  Há ação sem volta — apagar, enviar, pagar — sem aprovação?
- **Dado de vários clientes no mesmo prompt:** a busca que monta o contexto
  respeita o isolamento do domínio 3?
- **A resposta:** é validada antes do uso? É mostrada de um jeito que
  executa algo — link clicável, imagem de fora, HTML?
- **O que vai para o fornecedor e para o log:** dado sensível, o prompt
  inteiro?

**Derruba:** saída com formato fixo e validado; ferramenta sem efeito, que só
dá forma à resposta; aprovação humana no caminho de código, não só na tela.

## 5. Segredos

**Siga:** onde nasce cada credencial e por onde ela passa.

- **No código:** chave, token, senha ou endereço de conexão com valor
  literal — inclusive em teste, em script e em exemplo.
- **No histórico:** arquivo de ambiente já foi versionado alguma vez?
- **No que vai para o navegador:** variável exposta ao código de interface
  que deveria ficar só no servidor.
- **No log e nas mensagens de erro:** o erro devolve a configuração, a
  consulta ou o rastro interno para quem chamou?
- **Padrão inseguro:** chave com valor padrão no código, usado quando a
  variável de ambiente falta.

**Derruba:** o valor é fictício e está marcado assim; a variável exposta é
pública por natureza.

**Achou um segredo:** arquivo e linha, nunca o valor. A correção começa por
**trocar a credencial** — apagar do código não a invalida.

## 6. Configuração e infraestrutura

**Siga:** cada arquivo de hospedagem, de container e de nuvem que o
repositório tem.

- **Hospedagem:** o que fica exposto à internet e não deveria? Serviço
  interno com porta pública? Segredo escrito no arquivo?
- **Origem cruzada e cabeçalhos:** qualquer origem é aceita com credencial?
- **Modo de desenvolvimento em produção:** depuração ligada, rota de teste,
  painel administrativo sem proteção.
- **Container:** roda como administrador sem precisar? Copia arquivo de
  ambiente para dentro da imagem?
- **Nuvem em código:** permissão ampla demais para o que o serviço faz;
  armazenamento de arquivos com leitura pública; regra de rede aberta.
- **Endereço de origem atrás de proxy:** o sistema confia num cabeçalho que
  quem chama consegue forjar? Isso derruba limite de tentativas e registro.
- **Checagem de saúde:** revela versão, configuração ou dado interno?

**Derruba:** o valor é de exemplo; a exposição é o propósito do serviço.

**O que não está em arquivo é `a confirmar`:** segredo guardado na
plataforma, regra de rede feita pelo painel, quem tem acesso à conta.

## 7. CI e cadeia de suprimentos

**Siga:** cada workflow, e o caminho de uma dependência até a produção.

- **Segredo no workflow:** valor literal; segredo impresso no log; segredo
  disponível para execução disparada por contribuição de fora.
- **Texto de fora interpolado em comando:** título de pull request, nome de
  branch ou de arquivo colocado direto num passo de shell.
- **Ação de terceiro por nome móvel**, em job que enxerga segredo.
- **Permissão do token do workflow** maior que o necessário.
- **Publicação:** quem consegue disparar? Há passo que publica a partir de
  código não revisado?
- **Dependências:** há arquivo de trava? A instalação respeita a trava? Há
  dependência buscada de endereço ou de repositório fora do registro oficial?
  Script de instalação que roda algo?

**Derruba:** o workflow não roda em contribuição de fora; o valor passa por
variável de ambiente antes do shell.

**Falha conhecida em dependência é `a confirmar`:** esta skill não tem base
atualizada. Dê o comando de auditoria do gerenciador de pacotes do projeto.

## 8. Dados, arquivos e disponibilidade

- **Upload:** tipo e tamanho são conferidos no servidor? O arquivo é servido
  do mesmo domínio do app, podendo rodar como página? O endereço do arquivo
  é adivinhável e público?
- **Exportação e relatório:** respeitam o isolamento e o papel?
- **Exclusão:** apagar remove também dos derivados — busca, cache, arquivo?
- **Dado pessoal em log, em mensagem de erro, em serviço de monitoramento.**
- **Custo e parada:** uma requisição anônima dispara trabalho caro — chamada
  a modelo, envio de mensagem, relatório pesado — sem limite?

**Derruba:** o endereço é assinado e expira; o trabalho caro exige login e
tem cota.

## Estrutura, quando o problema se repete

Se o mesmo tipo de achado aparece em vários lugares, o achado é **um**, e é
de arquitetura: "a conferência de dono é feita à mão em cada rota". Relate
assim, com dois ou três exemplos, e a correção estrutural — o controle num
lugar só, por onde tudo passa.
