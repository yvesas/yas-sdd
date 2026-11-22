# Retomada

> Para quem volta depois de uma pausa. Este arquivo **não repete o estado**:
> o que está aberto mora no STATE.md.

## Religar o ambiente

Não há o que subir: é markdown e um script.

```bash
npm run check                    # precisa só de Node
bin/install --check <projeto>    # mostra o que seria copiado
```

Para experimentar uma skill, instale num projeto descartável e abra uma
sessão nova do agente lá dentro:

```bash
mkdir /tmp/teste && cd /tmp/teste && git init
<caminho>/yas-sdd/bin/install .
```

## Próximo passo

Rodar `/yas-start` e depois `/yas-constitution` num projeto descartável, ler
o que cada uma fez, e só então escrever as primeiras fixtures de eval.

## O que aprendemos errando

- **Montar sobre o Spec Kit funcionava e não servia.** Seis passos de
  instalação e nome de comando obrigatório, para um público que não usa
  terminal. Ver `docs/adr/0001-independent-of-spec-kit.md`.
