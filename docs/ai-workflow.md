# AI Workflow

## Princípio

- **Humano = navegador:** define o que, por quê, prioridade e decisões de produto, arquitetura e escopo.
- **IA = piloto:** define o como técnico, escreve código, mantém a documentação sincronizada.

## Fluxo

1. Ler `AGENTS.md` e os docs relevantes à tarefa.
2. Confirmar objetivo, issue/fase, critério de aceite e riscos.
3. Para APIs de Expo/NativeWind, consultar a documentação da versão instalada.
4. Implementar o menor incremento seguro, sem expandir escopo.
5. Rodar os checks de `testing.md`.
6. Fechar a tarefa (abaixo).

## Pedir aprovação humana antes de

- alterar escopo, ordem de fases ou arquitetura;
- adicionar dependência;
- mudar regras de segurança ou o contrato de dados;
- fugir do `design-guidelines.md` ou do Figma;
- remover documentos;
- inventar regra de negócio (registrar como pendência em `data-model.md`).

## Travas de escopo

Não criar issue nova se a atual resolve; não pular fase com checklist aberto; não transformar correção pequena em refatoração ampla. Se o rumo precisa mudar, pausar e perguntar.

## Fechamento de tarefa

Antes de dar como concluída:

1. `docs/issues.md`: status e nota datada em `### Estado atual`.
2. `docs/implementation-plan.md`: marcar checklist e fase.
3. `docs/deployment-log.md`: o que foi feito, arquivos, checks, riscos (mais recente no topo).
4. `docs/decision-log.md`: só se houver decisão duradoura de arquitetura, produto, dados, segurança ou operação.

No chat, resumir arquivos alterados, checks executados, docs atualizados e riscos residuais.

## Logs

`decision-log` guarda o porquê de decisões duradouras; `deployment-log` guarda o que foi entregue; `issues` guarda o estado vivo do trabalho.
