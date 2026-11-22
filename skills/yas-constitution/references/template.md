# Modelo da constituição

> Lido na hora de **montar** o arquivo. O texto entre `<…>` é preenchido; o
> resto fica como está. Nada de marcador sobrando no arquivo final.

## O arquivo

```markdown
<!-- yas-sdd <versão do pack> · camadas: <base, stack-…, module-…> · estágio: <estágio> -->
# Constituição — <nome do projeto>

**Versão:** <1.0.0> · **Ratificada em:** <AAAA-MM-DD> · **Última emenda:** <AAAA-MM-DD>

<Duas ou três linhas: o que o produto é, para quem, e o que ele guarda de
mais sensível.>

## Regra de ouro

**<A invariante que decide as discussões, em uma frase.>**

O teste: <a pergunta concreta que qualquer pessoa — ou agente — consegue
responder sozinha para saber se uma mudança respeita a regra>.

## Princípios

<Os princípios das camadas escolhidas, na ordem base → stacks → módulos,
renumerados de 1 em diante. Cada um no formato abaixo.>

## Restrições técnicas

<A stack, em uma linha por camada. E a tabela de comandos do projeto:>

| Para | Comando |
|---|---|
| formatar | `<…>` |
| lint | `<…>` |
| conferir tipos ou compilação | `<…>` |
| rodar os testes | `<…>` |
| o gate completo, antes de commitar | `<…>` |

## Entra em vigor depois

<As regras marcadas para um estágio mais adiante, cada uma com o gatilho que
a liga. Seção omitida quando vazia.>

## Camadas ainda não cobertas

<O que a pessoa respondeu sobre uma stack ou um domínio para o qual este pack
ainda não traz camada pronta. Seção omitida quando vazia.>

## Governança

- **Esta constituição vence** qualquer outra orientação do repositório. Se um
  pedido a contraria, o trabalho para e a contradição é dita.
- **INEGOCIÁVEL não se dispensa.** Para os demais princípios, um desvio é
  escrito no plano da feature: o que desvia, por quê, e qual alternativa mais
  simples foi recusada.
- **Exceção só existe escrita aqui**, para uma feature nomeada, com a condição
  que a encerra.
- **Emenda** é mudança deliberada, num commit só dela. A versão segue semver:
  MAJOR remove ou redefine um princípio; MINOR acrescenta princípio ou seção;
  PATCH esclarece texto sem mudar o que se exige.
- **Toda regra diz quem a verifica.** Regra que ninguém verifica é revista na
  próxima emenda: ou ganha verificação, ou sai.
- **Agentes de IA seguem esta constituição** como qualquer pessoa do time, e
  não a alteram sem pedido explícito.
```

## O formato de um princípio

```markdown
### <N>. <Nome> (INEGOCIÁVEL)

<Uma frase: o que este princípio garante.>

- <Regra verificável, com DEVE, NÃO DEVE ou CONVÉM.>
- <…>

**Verificado por:** <hook, script, check de CI, gate do plano ou revisão>.
**Por quê:** <o custo real de não ter a regra.>
```

- `(INEGOCIÁVEL)` só aparece nos princípios que a camada marca assim.
- **DEVE** e **NÃO DEVE** obrigam. **CONVÉM** é o padrão esperado, com desvio
  permitido e justificado.
- "Verificado por" nomeia o que existe **neste** projeto. Se a camada sugere
  um hook que o projeto não tem, escreva "revisão" — e avise a pessoa de que
  a regra está sem trava.

## Regras de montagem

1. **Um arquivo só.** As camadas somem como arquivos separados: o resultado é
   uma constituição corrida, sem "trecho da camada X".
2. **Renumere** os princípios na ordem final.
3. **Regra com marca de estágio** — `[MVP+]` ou `[pagantes+]` — fica no
   princípio dela se o projeto já chegou lá. Se não chegou, vai para "Entra em
   vigor depois", sem a marca, com o gatilho escrito por extenso.
4. **Junte o que se repete.** Duas camadas dizendo a mesma coisa viram uma
   regra, na formulação mais específica.
5. **Sem histórico.** O que mudou numa emenda vai na mensagem do commit e na
   resposta à pessoa, nunca num bloco acumulado dentro do arquivo.
6. **Teto.** A constituição é lida a cada plano. Passou de ~450 linhas, corte
   explicação — nunca regra — até caber, e diga o que cortou.
