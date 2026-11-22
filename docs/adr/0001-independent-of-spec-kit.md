# ADR 0001 — Baseado no Spec Kit, sem depender dele

- **Data:** 2026-11-17
- **Status:** aceito

## Contexto

O método deste pack vem do GitHub Spec Kit: constituição, especificar →
planejar → tarefas → implementar, uma pasta por feature. A primeira ideia foi
entregar o `yas-sdd` **por cima** dele, como preset e extensão.

Isso foi testado em 2026-11-16, com o `specify` 1.4.1, num projeto
descartável:

| Testado | Resultado |
|---|---|
| três presets compondo o modelo de constituição (um substitui, dois acrescentam) | funciona, na ordem esperada |
| pastas sem número em `specs/` ao lado das features | não atrapalham a numeração |
| comando de extensão com nome próprio | **não**: o padrão `speckit.<extensão>.<comando>` é obrigatório |
| apelido curto para o comando | aceito, mas não gera a skill |
| constituição depois de instalar os presets | não é reescrita; só muda quando o comando roda |

Funciona. O custo é que não fecha com quem vai usar:

- instalar exige Python e um gerenciador de pacotes, e são seis passos até a
  primeira constituição;
- o nome das skills não é livre;
- sai versão nova quase toda semana, para acompanhar;
- plataforma que constrói o app pelo chat não roda linha de comando.

E quase nada do Spec Kit **roda** durante o uso: são instruções em markdown, e
scripts que numeram pasta e copiam modelo — o que um agente faz seguindo uma
instrução. Os ganchos de extensão também são instrução: um trecho de texto em
cada comando manda o agente ler o arquivo de ganchos e executar.

## Decisão

O `yas-sdd` é um pack de skills próprio, **baseado** no Spec Kit e
**compatível** no formato dos arquivos, sem nenhuma dependência dele.

- O método e a forma dos artefatos vêm de lá, com crédito no `README` e no
  `NOTICE`.
- Uma feature mora em `specs/NNN-nome/` com `spec.md`, `plan.md` e
  `tasks.md` — o mesmo formato, para quem quiser adotar o Spec Kit depois.
- A constituição mora em `specs/constitution.md`, visível, e não na pasta
  oculta que o Spec Kit usa. Migrar é copiar um arquivo.
- O Spec Kit é revisado de tempos em tempos, e o que foi trazido ou recusado
  fica em `docs/upstream-review.md`.

## Consequências

- **A ordem do método depende da guarda de cada skill.** Não há gancho. Por
  isso toda skill começa conferindo um fato, e o `check` cobra a seção.
- **A qualidade das instruções é responsabilidade deste pack.** As do Spec
  Kit são lapidadas por muita gente; as daqui precisam de medição própria.
- **O que não pode falhar nunca não pode depender de leitura.** Segredo no
  repositório, commit direto na branch principal, atribuição de IA: isso pede
  trava fora do agente — hook de git, CI, proteção de branch.
- **Suporte a outros agentes não vem de graça.** O Spec Kit entrega mais de
  trinta integrações; aqui, vale o que o formato de skills alcançar, mais o
  caminho de texto puro descrito no `INSTALL.md`.

## O que mudaria esta decisão

Se o Spec Kit passar a aceitar nome livre de comando e instalação sem
runtime, vale reavaliar a entrega como extensão — o conteúdo deste pack
serviria quase sem mudança.
