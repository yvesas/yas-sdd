# Estado

> Só o que está **aberto**. O que fecha sai daqui: feature aceita vai para
> o ROADMAP, decisão vira registro em `docs/adr/`, lição vai para o HANDOFF.

**Atualizado em:** 2026-11-22

## Em andamento

_nada_

## Aguardando aceite

_nada_

## Bloqueios

_nenhum_

## Decisões pendentes

- **Onde ficam as skills fora do Claude Code.** O `INSTALL.md` propõe
  `.yas-sdd/skills/` para agente sem pasta de skills. É hipótese.

## A confirmar

- **Nenhuma skill foi rodada numa sessão real.** As onze passam na
  validação estática e nada além disso. As sete do fluxo (2026-11-22) também
  nunca passaram uma pela outra: o que uma grava é o que a seguinte confere
  na guarda, e isso só uma feature inteira prova.
- **`/yas-implement` declara `Bash` sem restrição**, porque precisa rodar os
  comandos do projeto. Conferir se o agente pede permissão a cada comando e
  se isso atrapalha quem é leigo.
- **O aceite depende da pessoa conseguir abrir o produto.** A `/yas-accept`
  lê "Religar o ambiente" do `HANDOFF.md`; num projeto sem isso escrito, ver
  como ela se sai.
- **`/yas-audit` e `/yas-security` declaram comandos de consulta ao git em
  `allowed-tools`.** Conferir se a sintaxe é aceita pelo agente.
- **`/yas-security` manda delegar a um agente novo** a tentativa de derrubar
  cada achado. Conferir se `allowed-tools` impede isso no Claude Code, e
  como a skill se comporta sem subagente.
- **`/yas-security` nunca foi rodada contra um código com falha conhecida.**
  Sem isso não se sabe quanto ela acha nem quanto inventa. É o primeiro eval
  que ela precisa.
- **Não há evals.** O `README` diz isso; continua valendo até a bancada
  existir.
- **Plataformas que constroem o app pelo chat:** não testado. Três perguntas:
  o agente de lá segue o `INSTALL.md`? respeita arquivo de instrução no
  repositório? como fica o uso junto com o Claude Code no mesmo repo?
- **`bin/install` no macOS e no Git Bash do Windows.** Testado só em Linux.
- **Formato de skill do Claude Code:** conferir o frontmatter contra a
  documentação atual.
- **O `INSTALL.md` cita a página de versões do repositório**, que ainda não
  tem nenhuma publicada.
- **Este repositório ainda não tem a própria constituição.**
