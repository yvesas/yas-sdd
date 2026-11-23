# Revisão das fontes

> O que este pack olhou em outros projetos, o que trouxe e o que recusou.
> Sem obrigação de acompanhar cada versão: revisa-se quando há motivo, e a
> revisão fica registrada aqui.

## GitHub Spec Kit

### 2026-11-17 — versão 1.4.1

**Trazido**

| O quê | Para onde |
|---|---|
| constituição como documento que governa os planos, com governança e versão semântica | `yas-constitution`, `references/template.md` |
| desvio de um princípio só com justificativa escrita no plano | `shared/workflow.md` §2, governança do modelo |
| a sequência especificar → planejar → tarefas → implementar | `shared/workflow.md` §1 |
| pasta por feature, `NNN-nome`, com `spec.md`, `plan.md`, `tasks.md` | `shared/workflow.md` §3 |
| relatório de emenda como rascunho, fora do arquivo | regra de montagem 5 do modelo |

**Recusado, e por quê**

| O quê | Por quê |
|---|---|
| CLI de instalação | exige runtime; ver ADR 0001 |
| presets e extensões | a composição em camadas ficou mais simples dentro de uma skill; ver ADR 0002 |
| ganchos de extensão | são instrução lida pelo agente, como a guarda — sem ganho de garantia |
| scripts de numeração e de pré-requisitos | o agente faz seguindo instrução; a guarda confere o arquivo |
| constituição em pasta oculta | quem usa é leigo: o arquivo precisa estar à vista |
| modelo de constituição em branco, com marcadores | a entrevista preenche a partir de camadas prontas |

**Vale olhar na próxima revisão**

- os comandos de esclarecer e de conferir consistência entre spec, plano e
  tarefas, quando as skills do fluxo forem escritas;
- o funil de descoberta antes da especificação — a ideia de que encerrar uma
  ideia com motivo é um bom resultado.

### 2026-11-22 — skills do fluxo, sem nova leitura do upstream

Escritas com base na revisão de 2026-11-17; o Spec Kit não foi relido.

**Trazido**, como ideia e com texto próprio:

| O quê | Para onde |
|---|---|
| esclarecer a spec antes do plano, com perguntas que mudam a spec | `yas-specify`, `references/clarify.md`; marca `[A ESCLARECER]` que trava o plano |
| conferir consistência entre spec, plano e tarefas | `yas-tasks`, passo "Cruzar" |
| o portão da constituição no plano | `yas-plan`, `references/constitution-gate.md` |

**Acrescentado, sem equivalente lá:** o aceite (`yas-accept`) como passo
depois de implementar, com o critério de conferência escrito em cada
requisito desde a spec.

## Cloudflare security-audit-skill

https://github.com/cloudflare/security-audit-skill · licença MIT

### 2026-11-18 — commit de 2026-09-14

Caçador de vulnerabilidades em código, em seis fases, com subagentes
isolados, sandbox e validadores em Node. Responde "que vulnerabilidades
existem neste código?" — pergunta diferente da auditoria de conformidade
deste pack.

**Trazido para a `yas-audit`**, como ideia e com texto próprio:

| Ideia | Como entrou |
|---|---|
| três vereditos: confirmado, precisa de validação, rejeitado | "precisa de validação" diz o fato exato que falta e não recebe gravidade |
| respeitar o que o repositório não mostra | controle que depende da plataforma não é presumido presente nem ausente |
| exigir fronteira e resultado | descumprir a constituição é dito como descumprimento, sem virar "vulnerabilidade" |
| a menor correção que resolve | a auditoria descreve a correção e não altera o código |
| cobertura honesta | rodada parcial se apresenta como parcial |
| modo orientação e modo completo | carregar a skill não autoriza criar arquivos |

Os arquivos de domínio — IA e agentes, isolamento de dados, cadeia de
suprimentos, nuvem — servem de conferência ao escrever ou revisar as camadas
correspondentes da constituição.

**Trazido para a `yas-security`** (2026-11-18), também com texto próprio:

| Ideia | Como entrou |
|---|---|
| todo achado nomeia fronteira e resultado | a afirmação em cinco partes; sem elas, é observação |
| um verificador novo tenta derrubar cada candidato | passo próprio; delega a um agente novo quando o agente permite |
| âncoras de gravidade | traduzidas e resumidas em quatro níveis, só para o confirmado |
| regras de execução segura | só leitura, nada no ar, nenhum valor de segredo, nenhuma carga pronta |
| saída fora do repositório | pergunta obrigatória: repositório público não recebe o relatório |
| os domínios de caça | viraram oito domínios de leitura, bem mais curtos |

**Recusado, e por quê**

| O quê | Por quê |
|---|---|
| orquestração de subagentes e sandbox | pesado demais para o público; a `yas-security` é uma leitura por um agente só, e se apresenta como primeiro olhar |
| execução de código do alvo, mesmo isolada | exige sandbox que o público não tem |
| livro de cobertura em JSON, entre rodadas | exige validador; aqui a cobertura é uma tabela no relatório |
| validadores em Node e schema de saída | exigem runtime de quem usa |

**Como aparece para quem usa:** o relatório de auditoria diz que não é uma
revisão de vulnerabilidades e, quando o produto guarda dado sensível,
recomenda uma revisão de segurança dedicada — sem nomear ferramenta, porque
quem instala pode não tê-la. A indicação pelo nome fica para o guia de
segurança, quando existir.

**A testar:** eles instalam com um instalador genérico de skills. A estrutura
de pastas é a mesma daqui, mas os arquivos de `shared/` são copiados para
dentro de cada skill pelo `bin/install` — um instalador genérico talvez não
faça isso.

## NVIDIA SkillSpector

https://github.com/NVIDIA/SkillSpector · licença Apache 2.0

### 2026-11-18 — versão 2.12.0

Não é uma skill de método: é um **scanner de skills**, em Python. Responde
"esta skill é segura para instalar?" — injeção de instrução, exfiltração de
dado, agência excessiva, envenenamento de memória, abuso de gatilho, cadeia
de suprimentos.

**Usado como ferramenta da bancada.** Rodado contra este pack em 2026-11-18,
só a etapa estática (`scan <pasta> --no-llm`):

- nenhum problema de segurança detectado;
- cobertura de 96,6%, status **parcial**: um trecho de `scripts/check.mjs`
  não foi resolvido pelo analisador estático;
- um analisador (`tool_misuse`) rodou em modo degradado;
- a etapa semântica, com modelo, **não foi rodada**.

**Ideias para trazer**

| Ideia | Como entraria |
|---|---|
| as categorias de risco de uma skill | lista de conferência para quem escreve skill neste pack |
| abuso de gatilho — descrição que dispara em situação demais | revisão das descrições das skills |
| relatório de completude da inspeção | mesma regra da auditoria: dizer o que não foi inspecionado |
| linha de base de achados aceitos | só se o scan entrar no CI |

**Recusado, e por quê**

| O quê | Por quê |
|---|---|
| embutir o scanner numa skill | exige Python; e ele inspeciona skills, não o produto de quem usa |

**Como aparece para quem usa:** recomendação de hábito — passar um scanner em
qualquer skill de terceiros antes de instalar, as deste pack incluídas.

**Licença:** Apache 2.0 pede mais que a MIT ao adaptar texto (aviso de
mudanças, cópia da licença). Usar como ferramenta não gera obrigação.

## Ferramentas de segurança indicadas pela `yas-security`

### 2026-11-23 — lista de indicação, sem adaptar texto

Nenhuma ideia nem texto foi trazido destas ferramentas: elas são **citadas**
em `skills/yas-security/references/tools.md`, para o agente de quem usa
indicar no máximo duas no fim da revisão. Por isso não entram no `NOTICE`.
É o "guia de segurança" que a seção da Cloudflare deixou para depois.

Conferidas no GitHub nesta data — existem, são mantidas e são dos donos
que dizem ser:

| Ferramenta | Repositório | Grupo |
|---|---|---|
| Semgrep | `semgrep/semgrep` | lendo o código |
| TruffleHog | `trufflesecurity/trufflehog` | lendo o código |
| Trivy | `aquasecurity/trivy` | lendo o código |
| Claude Code Security Review | `anthropics/claude-code-security-review` | lendo o código, no CI |
| Codex Security | `openai/codex-security` | lendo o código |
| Strix | `usestrix/strix` | atacando o sistema rodando |
| Nuclei | `projectdiscovery/nuclei` | atacando o sistema rodando |
| PyRIT | `microsoft/PyRIT` | atacando o sistema rodando |
| ClamAV | `Cisco-Talos/clamav` | outros casos: upload |
| SkillSpector | `NVIDIA/SkillSpector` | outros casos: skills de terceiros |

**Regras da indicação**, para não ferir a regra de ouro: a skill não roda
nem instala nenhuma; quem decide é a pessoa; as que atacam o sistema
rodando vêm sempre com o aviso de que só valem em ambiente próprio, com
autorização; e a skill aponta o endereço, sem comando de instalação
escrito de memória.

**Recusado:** `qybaihe/bla` (Blind LLM Agents) — protege binário e bundle
contra engenharia reversa por IA. Não ajuda a achar falha no produto, e é
projeto de um mantenedor só, recente.

**Atenção para a próxima revisão:** a lista chegou por um post de rede
social em que dois links usavam o domínio `lnkd.id` no lugar do encurtador
oficial `lnkd.in`. Endereço de ferramenta entra aqui conferido direto no
GitHub, nunca copiado de post.
