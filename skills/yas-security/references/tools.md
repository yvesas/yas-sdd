# Para ir além da leitura — ferramentas que a pessoa pode usar

> Lido no fim da revisão, antes do fechamento. Esta skill **não roda nenhuma
> destas ferramentas** e não depende delas. Elas existem para a pessoa — e o
> agente dela — saber o que mais dá para fazer, e decidir se vale a pena.

Todas são projetos abertos e conhecidos, mas **cada uma exige instalar
alguma coisa** — um programa, um container, uma chave de API ou uma etapa no
CI (a automação que roda a cada envio de código). Por isso ficam fora do
caminho principal.

## Como indicar

- Indique **no máximo duas**, as que o mapa do passo 1 justifica. Uma linha
  para cada: o que ela acrescenta ao que esta leitura não viu.
- Pergunte se vale a pena, no formato do `preamble.md`. **Silêncio não é
  sim.**
- **Nunca rode a ferramenta dentro desta skill**, nem instale nada. Se a
  pessoa quiser, ela instala e roda — ou pede isso numa tarefa separada.
- Ferramenta que **ataca o sistema rodando** só se indica com o aviso:
  vale num ambiente da própria pessoa (a máquina dela ou uma cópia de teste),
  **nunca em produção sem autorização escrita**, e nunca em sistema de
  terceiros. Atacar sistema alheio é crime, mesmo "só para testar".

## Lendo o código, sem rodar o app

Fazem o que esta skill faz, de outro jeito — por regra fixa ou com outro
modelo de IA. Servem para conferir, e para rodar sempre.

| Ferramenta | Para que serve | Vale quando |
|---|---|---|
| **Semgrep** — github.com/semgrep/semgrep | procura padrões de código inseguro por regras prontas, em dezenas de linguagens | a pessoa quer uma checagem que roda a cada pull request, igual toda vez |
| **TruffleHog** — github.com/trufflesecurity/trufflehog | procura chaves e senhas vazadas em todo o histórico do git, e diz quais ainda funcionam | apareceu segredo no código, ou o repositório já foi público |
| **Trivy** — github.com/aquasecurity/trivy | acha pacote com falha conhecida e configuração de risco em dependências, container, Kubernetes e Terraform | há `Dockerfile`, arquivo de nuvem ou muitas dependências — cobre o que esta skill diz que não confere |
| **Claude Code Security Review** — github.com/anthropics/claude-code-security-review | etapa de CI que revisa cada pull request com IA e comenta os achados | a pessoa quer revisão automática a cada mudança, não só quando lembra |
| **Codex Security** — github.com/openai/codex-security | acha, valida e propõe correção de vulnerabilidade, no agente da OpenAI ou pela linha de comando | a pessoa usa o Codex, ou quer uma segunda opinião de outro modelo |

## Atacando o sistema rodando

Mostram que a falha **existe de verdade**, porque tentam explorá-la. É o que
esta skill não faz. Só com o aviso de autorização acima.

| Ferramenta | Para que serve | Vale quando |
|---|---|---|
| **Strix** — github.com/usestrix/strix | agentes de IA que agem como invasores contra o app rodando e comprovam cada falha | há achado `a confirmar` que só o app rodando responde, e uma cópia de teste para atacar |
| **Nuclei** — github.com/projectdiscovery/nuclei | testa o app e o servidor contra milhares de falhas conhecidas, por modelos prontos | o sistema já está no ar e usa software pronto (painel, servidor, CMS) |
| **PyRIT** — github.com/microsoft/PyRIT | ataca uma aplicação com IA usando injeção de instrução e tentativas de burlar as regras do modelo | o produto tem chat, agente ou qualquer texto do usuário chegando a um modelo |

## Outros casos

| Ferramenta | Para que serve | Vale quando |
|---|---|---|
| **ClamAV** — github.com/Cisco-Talos/clamav | antivírus aberto, que verifica arquivos | o sistema aceita upload de arquivo e depois entrega esse arquivo a outras pessoas |
| **SkillSpector** — github.com/NVIDIA/SkillSpector | inspeciona skills de agente em busca de instrução escondida ou vazamento de dado | a pessoa vai instalar skills de terceiros — inclusive as deste pack |

## O que não dizer

- Que rodar uma destas ferramentas **prova** que o sistema é seguro. Nenhuma
  prova.
- Que elas substituem uma revisão profissional quando o produto guarda dado
  de saúde, jurídico, financeiro ou de menor.
- Comando de instalação ou de ataque copiado de memória. Aponte o endereço:
  o jeito certo de instalar está lá, e muda.
