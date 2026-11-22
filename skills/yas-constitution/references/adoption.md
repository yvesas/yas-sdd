# Adoção — projeto que já existe

> Lido quando o repositório já tem regras escritas ou código rodando. O
> trabalho aqui é **reconhecer** a constituição que o projeto já pratica, não
> impor uma nova.

## Onde procurar, nesta ordem

1. Arquivos de instrução para agentes na raiz e nas pastas de aplicação.
2. Registros de decisão em `docs/` e documentos de arquitetura.
3. `specs/`, se existir — inclusive pastas de outro formato.
4. Arquivos de workflow de CI e de publicação.
5. Manifesto, trava de dependências e configuração de lint, tipos e teste.
6. Arquivos de infraestrutura e o exemplo de variáveis de ambiente.

Não leia arquivo de ambiente com valor real, nem pastas de dependências.

## O que extrair

Para cada regra que o projeto **já segue ou já declara**:

| Sinal | O que significa |
|---|---|
| "nunca", "sempre", "não se negocia", "regra de ouro" | candidata a INEGOCIÁVEL |
| uma armadilha com a consequência escrita | regra com o "Por quê" pronto |
| um hook, um check de CI, um script de gate | o "Verificado por" de alguma regra |
| uma decisão registrada com contexto | princípio ou restrição técnica |

## A regra que não se quebra: fonte ou "confirmar"

Todo princípio proposto leva, **na proposta que você mostra**, de onde saiu —
arquivo e trecho. O que não tem fonte no repositório não é fato do projeto:
é sugestão sua, e vai numa lista separada, "Confirmar antes de adotar".

```
Do que o projeto já diz:
  1. Escrita de IA vira proposta que uma pessoa confirma
     — instruções do agente, seção "Regras que não se negociam", item 4
  2. …

Sugestão minha, sem fonte no repositório — confirmar:
  a. Tempo limite em todo job de CI
     — o workflow atual não tem; a camada base pede
```

A fonte aparece na proposta, não no arquivo final: a constituição fica limpa.

## Conflito entre o projeto e a camada base

Quando o que o projeto pratica contradiz a camada base, **não escolha
sozinho**. Mostre os dois lados e pergunte. A resposta legítima pode ser
"aqui é diferente, e o motivo é este" — e então vira uma regra do projeto,
com o motivo escrito.

## O que não fazer

- Não mover, renomear nem apagar o que existe. A adoção só **cria**
  `specs/constitution.md`.
- Não migrar specs antigas para o formato novo. O método novo vale da próxima
  feature em diante.
- Não copiar para a constituição o conteúdo inteiro dos arquivos lidos. Ela é
  a lei; o detalhe continua onde está.
