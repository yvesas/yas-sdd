# Roadmap

## Agora

- Rodar uma sessão real de cada skill e corrigir o que aparecer — as do
  fluxo numa feature inteira, de `/yas-specify` a `/yas-accept`, num projeto
  descartável.
- Bancada de evals, no modelo do `yas-canvas`.
- Scan de segurança das skills na bancada, antes de cada versão — rodar
  também a etapa semântica, que ainda não foi rodada.

## Depois

1. **Git e CI:** `/yas-commit`, `/yas-pr`, `/yas-quick`; guias de git e de CI;
   receitas de workflow; as duas travas opcionais (mensagem de commit e
   arquivo de ambiente).
2. **Cobertura:** camadas de Go, Python e Postgres; módulos de múltiplos
   clientes, dado sensível, dinheiro, interface e publicação; arquivo
   portátil por skill.
3. **Prova:** uma feature inteira num projeto real.

## Entregue

- 2026-11-17 · estrutura do pack, instalador em bash puro, validação estática
- 2026-11-17 · `/yas-start`
- 2026-11-17 · `/yas-constitution`, com as camadas base, Node e IA no produto
- 2026-11-18 · `/yas-audit`, escrita antes do fluxo por decisão do dono
- 2026-11-18 · `/yas-security`, revisão de segurança do código por leitura
- 2026-11-22 · aceite (UAT) como passo do método, em `shared/workflow.md`
- 2026-11-22 · fluxo: `/yas-specify`, `/yas-plan`, `/yas-tasks`, `/yas-implement`,
  `/yas-accept`, `/yas-state` e `/yas` (roteador)
