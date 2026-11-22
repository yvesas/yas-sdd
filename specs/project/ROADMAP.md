# Roadmap

## Agora

- Rodar uma sessão real das quatro skills (`/yas-start`,
  `/yas-constitution`, `/yas-audit`, `/yas-security`) e corrigir o que
  aparecer.
- Bancada de evals, no modelo do `yas-canvas`.
- Scan de segurança das skills na bancada, antes de cada versão — rodar
  também a etapa semântica, que ainda não foi rodada.

## Depois

1. **Fluxo:** `/yas-specify`, `/yas-plan` (com o gate de constituição),
   `/yas-tasks`, `/yas-implement`, `/yas` (roteador), `/yas-state`.
   Todas seguem o aceite da seção 7 do `shared/workflow.md`:
   `/yas-specify` escreve "como a pessoa confere" em cada requisito,
   `/yas-implement` termina deixando a feature em "Aguardando aceite", e
   `/yas-state` cobra o que está parado lá. Se o roteiro de aceite ganha
   skill própria ou fica dentro de `/yas-state`, decide-se ao escrever o
   fluxo.
2. **Git e CI:** `/yas-commit`, `/yas-pr`, `/yas-quick`; guias de git e de CI;
   receitas de workflow; as duas travas opcionais (mensagem de commit e
   arquivo de ambiente).
3. **Cobertura:** camadas de Go, Python e Postgres; módulos de múltiplos
   clientes, dado sensível, dinheiro, interface e publicação; arquivo
   portátil por skill.
4. **Prova:** uma feature inteira num projeto real.

## Entregue

- 2026-11-17 · estrutura do pack, instalador em bash puro, validação estática
- 2026-11-17 · `/yas-start`
- 2026-11-17 · `/yas-constitution`, com as camadas base, Node e IA no produto
- 2026-11-18 · `/yas-audit`, escrita antes do fluxo por decisão do dono
- 2026-11-18 · `/yas-security`, revisão de segurança do código por leitura
